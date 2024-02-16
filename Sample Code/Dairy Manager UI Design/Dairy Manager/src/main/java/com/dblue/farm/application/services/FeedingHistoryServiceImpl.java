package com.dblue.farm.application.services;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.wicket.Application;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.joda.time.DateTime;
import org.joda.time.Days;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.dblue.farm.Farm;
import com.dblue.farm.FarmConfiguration;
import com.dblue.farm.FeedingHistory;
import com.dblue.farm.StockType;
import com.dblue.farm.SuggestedFeeding;
import com.dblue.farm.application.FarmApplication;
import com.dblue.farm.application.FarmConfigurationProvider;
import com.dblue.orm.ObjectLoader;

public class FeedingHistoryServiceImpl implements FeedingHistoryService {

	private ObjectLoader objectLoader;

	private SessionFactory sessionFactory;
	
	protected FarmConfigurationProvider farmConfigurationProvider;

	public void setObjectLoader(ObjectLoader objectLoader) {
		this.objectLoader = objectLoader;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	public void setFarmConfigurationProvider(
			FarmConfigurationProvider farmConfigurationProvider) {
		this.farmConfigurationProvider = farmConfigurationProvider;
	}
	
	
	private Integer getFarmId(){
		FarmConfiguration farmConfiguration = farmConfigurationProvider.getFarmConfiguration();
		Integer farmId = farmConfiguration.getFarm().getId();
		return farmId;
	}
	
	private Farm getFarm(){
		FarmConfiguration farmConfiguration = farmConfigurationProvider.getFarmConfiguration();
		return farmConfiguration.getFarm();
		
	}
	
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void updateFeedingHistory() {
		System.err.println("Updating Feeding History ");
		// fetch date for last entry				
		
		Query query = sessionFactory.getCurrentSession().createQuery(
				"select max(fh.feedDate) from FeedingHistory fh where fh.farm.id=:farmId");
		query.setInteger("farmId", getFarmId());
		
		// iterate through days for the same.
		Date currentDate = getDateComponent(Calendar.getInstance().getTime());			
		Date lastEntryDate = (Date) query.uniqueResult();
		
		if( null == lastEntryDate){
			// get a day before date.
			
			Calendar ydayCal = Calendar.getInstance();
			ydayCal.setTime(currentDate);
			ydayCal.add(Calendar.DAY_OF_MONTH, -1);
		
			lastEntryDate = ydayCal.getTime();
		}
		createHistoryEntriesBetweenDates(lastEntryDate, currentDate);
		System.err.println("Completed updating Feeding History ");
	}
	
	private void createHistoryEntriesBetweenDates(Date startDate, Date endDate){
		System.err.println("Creating Feeding History entries for dates between "+ startDate +" and "+ endDate);
		Date date = getDateComponent(startDate);
		Date date2 = getDateComponent(endDate);
		
		if(date.equals(date2) || date.after(date2)){
			return;
		}
		
		Calendar dateIterator = Calendar.getInstance();
		dateIterator.setTime(date);
		dateIterator.add(Calendar.DAY_OF_MONTH, 1);
		
		
		
		for( Calendar c = dateIterator; (dateIterator.getTime().before(date2) || dateIterator.getTime().equals(date2));dateIterator.add(Calendar.DAY_OF_MONTH,1)){
			Date entryDate = dateIterator.getTime();
			List<SuggestedFeeding> feedConfigurations = getEffectiveSuggestedFeeding(entryDate);
			
			for( SuggestedFeeding feedConfig : feedConfigurations){				
				// calculate the livestock_total
				Query query = sessionFactory.getCurrentSession().createQuery("select count(ls) from Livestock ls where ls.stateType.stateType=:stateType and ls.deceased='N' and ls.farm.id=:farmid");
				query.setString("stateType", feedConfig.getStateType());
				query.setInteger("farmid", getFarmId());
				Long livestock_total = (Long)query.uniqueResult(); 
				if( livestock_total > 0 ){
					BigDecimal quantity = new BigDecimal(feedConfig.getFeedQuantity() * livestock_total);				
					createFeedingHistoryEntry(feedConfig.getFeedType(),quantity , entryDate, feedConfig.getStateType(), livestock_total.intValue());
				}
			}
			
		}
		System.err.println("Created Feeding History entries for dates between "+ startDate +" and "+ endDate);
	}
	
	private void createFeedingHistoryEntry(String feed_type, BigDecimal quantity,
			Date feed_date, String state_type, Integer livestock_total){
		FeedingHistory feedingHistory = new FeedingHistory();
		feedingHistory.setFeedDate(feed_date);
		feedingHistory.setFeedType(feed_type);
		feedingHistory.setQuantity(quantity);
		feedingHistory.setStateType(state_type);
		feedingHistory.setLivestockTotal(livestock_total);
		feedingHistory.setFarm(getFarm());
		
		// get stock type which is the feed_type
		//TODO: Tx required... 
		Criterion criterion = Restrictions.eq("stockCode", feed_type);
		Criterion criterion2 = Restrictions.eq("farm.id", getFarmId());
		List<StockType> allStockTypes= objectLoader.findAll(StockType.class, Restrictions.and(criterion, criterion2));
		
		if( allStockTypes.size() > 0 ){
			StockType stockType = allStockTypes.get(0);
			BigDecimal netBalance = new BigDecimal(stockType.getStockBalance().doubleValue() - feedingHistory.getQuantity().doubleValue());
			stockType.setStockBalance(netBalance);			
			stockType.setFarm(getFarm());
			objectLoader.save(StockType.class, stockType);
		}else{
			System.err.println("Configurtion Mismatch unable to find Stock Code for given feed_type:"+feed_type);
		}
		
		objectLoader.save(FeedingHistory.class, feedingHistory);
		
	}
	
	private List<SuggestedFeeding> getEffectiveSuggestedFeeding(Date effDate) {
		
		Date feed_Config_Date = getEffectiveSuggestedFeedingDate(effDate);
		
		Criterion criterion = Restrictions.eq("schduledDate", feed_Config_Date);
		Criterion criterion2 = Restrictions.eq("farm.id", getFarmId());
		
		List<SuggestedFeeding> allFeeds = objectLoader.findAll(SuggestedFeeding.class,Restrictions.and(criterion, criterion2) );
		return allFeeds;
	}
	
	
	private Date getEffectiveSuggestedFeedingDate(Date startDate) {

		Session session = sessionFactory.getCurrentSession();
		Criteria criteria = session.createCriteria(SuggestedFeeding.class);
		criteria.add(Restrictions.le("schduledDate", startDate));
		criteria.add(Restrictions.eq("farm.id", getFarmId()));
		criteria.addOrder(Order.desc("schduledDate"));
		criteria.setMaxResults(1);

		List<SuggestedFeeding> suggestedFeedings = objectLoader.findAll(
				SuggestedFeeding.class, criteria);

		if (suggestedFeedings.size() != 0) {
			return suggestedFeedings.get(0).getSchduledDate();
		}

		return null;
	}

	
	private Date getDateComponent(Date date){
		Date dt = new Date(date.getTime());
		
		dt.setHours(0);
		dt.setMinutes(0);
		dt.setSeconds(0);
		return dt;
	}
	
	private int getDays( Date startDate, Date endDate){
		return Days.daysBetween(new DateTime(startDate), new DateTime(endDate)).getDays();
	}


}
