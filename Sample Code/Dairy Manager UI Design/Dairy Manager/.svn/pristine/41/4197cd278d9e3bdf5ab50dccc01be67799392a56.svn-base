package com.dblue.farm.tasks;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.wicket.spring.injection.annot.SpringBean;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.security.core.context.SecurityContextHolder;

import com.dblue.farm.Farm;
import com.dblue.farm.FarmConfiguration;
import com.dblue.farm.Livestock;
import com.dblue.farm.PromotionHistory;
import com.dblue.farm.StateType;
import com.dblue.farm.application.FarmApplication;
import com.dblue.farm.application.FarmAuthentication;
import com.dblue.farm.application.FarmConfigurationProvider;
import com.dblue.farm.application.dao.FarmApplicationDAO;
import com.dblue.farm.application.services.FeedingHistoryService;
import com.dblue.farm.exception.NotFoundException;
import com.dblue.orm.ObjectLoader;



public class LiveStockPromotionStockImpl implements LiveStockPromotionStock,ApplicationContextAware{

	private ObjectLoader objectLoader;
	
	private SessionFactory sessionFactory;
	
	private ApplicationContext applicationContext;
	
	private FarmApplicationDAO farmApplicationDAO;
	
	private FeedingHistoryService feedingHistoryService;
		
	protected FarmConfigurationProvider farmConfigurationProvider;
	
	
	public void setFeedingHistoryService(FeedingHistoryService feedingHistoryService){
		this.feedingHistoryService = feedingHistoryService;
	}

	public void setFarmApplicationDAO(FarmApplicationDAO farmApplicationDAO) {
		this.farmApplicationDAO = farmApplicationDAO;
	}



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

	public void promoteCalfToHeafer() {
				
		FarmConfiguration farmConfiguration = farmConfigurationProvider.getFarmConfiguration();
		// updating feeding history
		feedingHistoryService.updateFeedingHistory();
		
		
		System.err.println("Trying to promote calfs to heafers");
		try {
			StateType heafer = farmConfiguration.getHeafer();
			if( null == heafer){
				System.err.println("Please check configuration parameter, unable to get StateType for Heifer");
				return;
			}
			List<Livestock> promotableCalves = getPromotableCalf();

			for (Livestock livestock : promotableCalves) {
				System.out.println("Promoting live stock  calf to heafer:"+livestock.getCode());
				PromotionHistory promotionHistory = new PromotionHistory();
				promotionHistory.setFarm(getLoginUserFarm());
				promotionHistory.setLivestock(livestock);
				promotionHistory.setPromotionDate(new Date());
				promotionHistory.setStateTypeByFinalStateType(heafer);
				promotionHistory.setStateTypeByInitialStateType(livestock
						.getStateType());
				
				livestock.setStateType(heafer);
				try{
				System.err.println("Promoting livestock "+livestock.getId() +" from calf to heifer");
				saveObjectsWithTransactoin(Livestock.class, livestock,
						PromotionHistory.class, promotionHistory);
				System.err.println("Promoted livestock "+livestock.getId() +" from calf to heifer");
				}catch (Exception ex){
					System.err.println("Failed promoting livestock from calf to heifer; Livestock code : "+ livestock.getCode());
					ex.printStackTrace();
				}
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		System.err.println("Promoted calfs to heafer");
		
		System.err.println("Trying to promote heifers to herds");
		try {
			StateType herd = farmConfiguration.getHerd();
			if( null == herd){
				System.err.println("Please check configuration parameter, unable to get StateType for Herd");
				return;
			}
			List<Livestock> promotableCalves = getPromotableHeafer();

			for (Livestock livestock : promotableCalves) {
				System.err.println("Promoting live stock heafer to herd  :"+livestock.getCode());
				PromotionHistory promotionHistory = new PromotionHistory();
				promotionHistory.setFarm(getLoginUserFarm());
				promotionHistory.setLivestock(livestock);
				promotionHistory.setPromotionDate(new Date());
				promotionHistory.setStateTypeByFinalStateType(herd);
				promotionHistory.setStateTypeByInitialStateType(livestock
						.getStateType());				
				livestock.setStateType(herd);				
				try{
					System.err.println("Promoting livestock "+livestock.getId() +" from heifer to herd");
				saveObjectsWithTransactoin(Livestock.class, livestock,
						PromotionHistory.class, promotionHistory);
				System.err.println("Promoted livestock "+livestock.getId() +" from heifer to herd");
				}catch (Exception ex){
					System.err.println("Failed promoting livestock from heafer to herd; Livestock code : "+ livestock.getCode());
					ex.printStackTrace();
				}
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		System.err.println("Promoted heifers to herds");

	}
	
	public void promoteHeaferToHeard(){
		FarmApplication farmApplication = (FarmApplication)applicationContext.getBean("farmApplication");	
	}

	
	private void saveObjectsWithTransactoin(Class liveStockClass,
			Livestock livestock, Class promotionHistoryClass,
			PromotionHistory promotionHistory) {		
		farmApplicationDAO.promoteLiveStock(liveStockClass, livestock, promotionHistoryClass, promotionHistory);
	}

	protected StateType getStateType(String state) {
		Criterion stateType = Restrictions.eq("stateType", state);
		List<StateType> allStateTypes = objectLoader.findAll(StateType.class,
				stateType);
		return allStateTypes.size() > 0 ? allStateTypes.get(0) : null;
	}
	
	
	protected List<Livestock> getPromotableHeafer() {				
		FarmConfiguration farmConfiguration = farmConfigurationProvider.getFarmConfiguration();
		Query query  = sessionFactory.getCurrentSession().createQuery("select l from Livestock l where l.conceivedDate is not null and l.stateType.stateType = :stateType and l.deceased='N' and l.farm.id=:farmid" );		
		query.setParameter("stateType", farmConfiguration.getHeafer().getStateType());
		query.setInteger("farmid", farmConfiguration.getFarm().getId());
		return query.list();
	}


	protected List<Livestock> getPromotableCalf() {		
		FarmConfiguration farmConfiguration = farmConfigurationProvider.getFarmConfiguration();
		
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MONTH, -6);
		
		Query query  = sessionFactory.getCurrentSession().createQuery("select l from Livestock l where l.birthDate < :bdate and l.stateType.stateType = :stateType and l.deceased='N' and l.farm.id=:farmid");
		query.setParameter("bdate", calendar.getTime());
		query.setParameter("stateType", farmConfiguration.getCalf().getStateType());
		query.setInteger("farmid", farmConfiguration.getFarm().getId());
		return query.list();
	}



	public void setApplicationContext(ApplicationContext context)
			throws BeansException {
		this.applicationContext =context;
		
	}
	
	private Farm getLoginUserFarm() {
		FarmAuthentication farmAuthentication = (FarmAuthentication)SecurityContextHolder.getContext().getAuthentication();
		int farmId = ((Long)farmAuthentication.getFarmid()).intValue();
		Farm farm=null;
		try {
			farm = objectLoader.load(Farm.class, farmId);
		} catch (NotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return farm;
	}

}