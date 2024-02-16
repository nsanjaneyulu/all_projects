package com.dblue.farm.application.pages.summary;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.model.Model;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.FeedType;
import com.dblue.farm.application.pages.FarmPage;

public class FeedSummary extends BaseSummary {

	public FeedSummary(FarmPage page) {
		final Map<String, FeedSummaryHelper> reportData = new LinkedHashMap<String, FeedSummaryHelper>();

		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DAY_OF_YEAR, 1);
		
		Query query = sessionFactory.getCurrentSession().createQuery("select month(fh.feedDate), fh.feedType, sum(fh.quantity) from FeedingHistory fh where fh.farm=:farm and fh.feedDate > :feedDate group by month(fh.feedDate),fh.feedType");
		query.setInteger("farm", getLoginUserFarm().getId());
		query.setDate("feedDate", calendar.getTime());
		
		List feedHistory =  query.list();
		
		Iterator feedIteraotr = feedHistory.iterator();
		while( feedIteraotr.hasNext()){
			Object[] objects = (Object[])feedIteraotr.next();
			String month = getDisplayMonth((Integer)objects[0]);
			String feedType = (String)objects[1];
			BigDecimal quantity= (BigDecimal) objects[2];
			
			FeedSummaryHelper feedSummaryHelper = reportData.get(month);
			if( null == feedSummaryHelper){
				feedSummaryHelper = new FeedSummaryHelper();
				feedSummaryHelper.month = (Integer)objects[0];
				reportData.put(month,feedSummaryHelper);
			}
			
			feedSummaryHelper.summaryValues.put(feedType, quantity);
		}
		
		

		ListView<String> rows = new ListView<String>("feeding_rows",
				Arrays.asList(reportData.keySet().toArray(new String[0]))) {

			@Override
			protected void populateItem(ListItem<String> item) {

				final String month = item.getModelObject();
				item.add(new Label("month", new Model(month)));
				// add columns
				Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(FeedType.class).add(Restrictions.eq("farm", getLoginUserFarm()));
				final List<FeedType> allFeedTypes = objectLoader
						.findAll(FeedType.class, criteria);

				ListView<FeedType> columns = new ListView<FeedType>(
						"feeding_columns", allFeedTypes) {

					@Override
					protected void populateItem(ListItem<FeedType> item) {
						String feedType = item.getModelObject().getFeedType();
						FeedSummaryHelper feedSummaryHelper = reportData
								.get(month);
						Number value = feedSummaryHelper.summaryValues
								.get(feedType);
						item.add(new Label("column", new Model(
								null == value ? 0 : value)));

					}
				};
				item.add(columns);
			}
		};
		page.add(buildFeedSummaryHeader());
		page.add(rows);

	}

//	private FeedSummaryHelper getFeddSummaryReport(Date startDate, Date endDate) {
//
//		FeedSummaryHelper snapData = new FeedSummaryHelper();
//
//		Date snapshortStartDate = getEffectiveDate(startDate);
//		if (snapshortStartDate == null) {
//			return snapData;
//		}
//
//		// get all other dates.
//		List<Date> availableSnapshotDates = getAvailableScheduledDates(
//				startDate, endDate);
//
//		Date previousDate = snapshortStartDate;
//		for (Date availableSnapShotDate : availableSnapshotDates) {
//			// compute the gap.
//			int noOfApplicableDays = getDays(
//					(startDate.after(snapshortStartDate) ? startDate
//							: snapshortStartDate), availableSnapShotDate);
//			FeedSummaryHelper prevSnapData = getSuggestedFeeding(previousDate);
//			prevSnapData.applyNumberOfDays(noOfApplicableDays);
//			snapData.add(prevSnapData);
//			previousDate = availableSnapShotDate;
//		}
//
//		// for the last snapshot data check with endDate
//		FeedSummaryHelper lastSnapData = getSuggestedFeeding(previousDate);
//		int noOfApplicableDays = getDays(previousDate, endDate);
//		if (noOfApplicableDays > 0) {
//			lastSnapData.applyNumberOfDays(noOfApplicableDays);
//		}
//
//		snapData.add(lastSnapData);
//		return snapData;
//
//	}

//	private Date getEffectiveDate(Date startDate) {
//
//		Session session = sessionFactory.getCurrentSession();
//		Criteria criteria = session.createCriteria(SuggestedFeeding.class);
//		criteria.add(Restrictions.le("schduledDate", startDate));
//		criteria.addOrder(Order.asc("schduledDate"));
//		criteria.setMaxResults(1);
//
//		List<SuggestedFeeding> suggestedFeedings = objectLoader.findAll(
//				SuggestedFeeding.class, criteria);
//
//		if (suggestedFeedings.size() != 0) {
//			return suggestedFeedings.get(0).getSchduledDate();
//		}
//
//		return null;
//	}
//
//	private FeedSummaryHelper getSuggestedFeeding(Date startDate) {
//
//		String queryString = "select sum(s.livestockTotal),s.feedType,month(s.schduledDate) from SuggestedFeeding s where s.farm=:farm and s.schduledDate=:sDate group by month(s.schduledDate),s.feedType order by s.schduledDate,s.feedType";
//		Query query = sessionFactory.getCurrentSession()
//				.createQuery(queryString).setInteger("farm", getLoginUserFarm().getId()).setDate("sDate", startDate);
//		Iterator it = query.iterate();
//
//		FeedSummaryHelper feedData = new FeedSummaryHelper();
//		while (it.hasNext()) {
//			Object[] row = (Object[]) it.next();
//			Integer month = (Integer) row[2];
//			Number value = (Number) row[0];
//			String feedType = (String) row[1];
//			feedData.month = month;
//			feedData.summaryValues.put(feedType, value);
//
//		}
//		return feedData;
//	}
//
//	private int getDays( Date startDate, Date endDate){
//		return Days.daysBetween(new DateTime(startDate), new DateTime(endDate)).getDays();
//	}
//
//
//	private List<Date> getAvailableScheduledDates(Date startDateQuery,
//			Date endDateQuery) {
//		String queryString = "select s.schduledDate from SuggestedFeeding s where where s.farm=:farm and s.schduledDate > :startDate and s.schduledDate<:endDate group by s.schduledDate order by s.schduledDate asc";
//		Query query = sessionFactory.getCurrentSession()
//				.createQuery(queryString).setInteger("farm", getLoginUserFarm().getId()).setDate("startDate", startDateQuery)
//				.setDate("endDate", endDateQuery);
//		Iterator it = query.iterate();
//		List<Date> allDates = new ArrayList<Date>();
//		while (it.hasNext()) {
//			allDates.add((Timestamp) it.next());
//		}
//		return allDates;
//	}

	protected ListView<FeedType> buildFeedSummaryHeader() {

		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(FeedType.class).add(Restrictions.eq("farm", getLoginUserFarm())).addOrder(Order.asc("feedType"));
		List<FeedType> productionConfigs = objectLoader.findAll(FeedType.class,
				criteria);

		ListView<FeedType> headerView = new ListView<FeedType>("feed_header",
				productionConfigs) {

			@Override
			protected void populateItem(ListItem<FeedType> item) {
				// add items here
				item.add(new Label("feed_headr_id", new Model(item
						.getModelObject().getFeedType())));

			}
		};
		return headerView;
	}

}

class FeedSummaryHelper implements Serializable {

	public int month;
	public Map<String, Number> summaryValues = new LinkedHashMap<String, Number>();

	public void applyNumberOfDays(int factor) {
		Iterator<String> summaryValueItertor = summaryValues.keySet()
				.iterator();

		while (summaryValueItertor.hasNext()) {
			String feedType = summaryValueItertor.next();

			Number currentValue = summaryValues.get(feedType);

			currentValue = currentValue.doubleValue() * factor;
			summaryValues.put(feedType, currentValue);
		}
	}

	public void add(FeedSummaryHelper that) {
		synchronized (summaryValues) {
			Map<String, Number> thatAggregationData = that.summaryValues;
			Iterator<String> keyIterator = that.summaryValues.keySet()
					.iterator();
			while (keyIterator.hasNext()) {
				String key = keyIterator.next();
				Number thatValue = thatAggregationData.get(key);
				if (summaryValues.containsKey(key)) {
					Number existingValue = summaryValues.get(key);
					Number newValue = new Double(existingValue.doubleValue()
							+ thatValue.doubleValue());
					summaryValues.put(key, newValue);
				} else {
					summaryValues.put(key, thatValue);
				}
			}
		}
	}

}
