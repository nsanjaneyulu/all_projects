package com.dblue.farm.application.pages;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.model.Model;
import org.apache.wicket.spring.injection.annot.SpringBean;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.Farm;
import com.dblue.farm.FeedType;
import com.dblue.farm.Livestock;
import com.dblue.farm.StateType;
import com.dblue.farm.SuggestedFeeding;
import com.dblue.farm.application.FarmSession;
import com.dblue.farm.exception.FarmRuntimeException;
import com.dblue.orm.ObjectLoader;

public class SuggestedFeedReport extends WebPage {

	@SpringBean(name = "objectLoader")
	protected ObjectLoader objectLoader;
	
	@SpringBean(name="sessionFactory")
	protected SessionFactory sessionFactory;


	private Date effectiveDate;
	
	private Integer sum = new Integer(0);


	protected Date calculateEffectiveDate(String effectiveDateString) {		
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
			return sdf.parse(effectiveDateString);
		} catch (Exception ex) {			
			throw new FarmRuntimeException("Invalid report parameters",ex);
		}
	}

	public SuggestedFeedReport() {
		String effectiveDateString = (String) getWebRequestCycle()
				.getPageParameters().getString("effectiveDate");
		this.effectiveDate = calculateEffectiveDate(effectiveDateString);
		add(buildHeader());
		add(buildData());
		add( new Label("eff_date", new Model<String>(effectiveDateString)));
	}
	
	private ListView buildHeader(){
			ListView<String> headerRow = new ListView<String>("headerlist",getAllFeedTypeStrings()) { 
			
			@Override
			protected void populateItem(final ListItem<String> rowItem) {
				rowItem.add(new Label("header",rowItem.getModelObject()));
			}			
		};
		return headerRow;
	}
	
	private ListView buildData(){
		// build the reports.
		ListView<StateType> listview = new ListView<StateType>("rows", getAllLiveStockState()) {
			@Override
			protected void populateItem(final ListItem<StateType> rowItem) {				
				// for each available fodders count the sum.
				ListView<String> row = new ListView<String>("row_id",
						getAllFeedTypeStrings2()) {

					@Override
					protected void populateItem(ListItem<String> columnItem) {
						// for each state and feed type get the count.
						String stateType = rowItem.getModelObject()
								.getStateType();
						int realLiveStockCount = getLiveStockByState(stateType);

						if ("sum".equals(columnItem.getModelObject())) {
							columnItem.add(new Label("count",
									new Model<Integer>(sum)));
							SuggestedFeedReport.this.sum=0;							
						} else {

							
							String feedType = columnItem.getModelObject();
							Criterion criterion = null;
							Criterion cr1 = Restrictions.eq("stateType",
									stateType);
							Criterion cr2 = Restrictions.eq("feedType",
									feedType);
							Criterion cr3 = Restrictions.eq("schduledDate",
									effectiveDate);

							criterion = Restrictions.and(cr1,
									Restrictions.and(cr2, cr3));

							List<SuggestedFeeding> feeds = objectLoader
									.findAll(SuggestedFeeding.class, criterion);

							// todo: need improved implementation. Add count API
							// on
							// objectloader
							Integer count = new Integer(0);
							for (SuggestedFeeding feed : feeds) {
								count += feed.getFeedQuantity();
								SuggestedFeedReport.this.sum += (feed
										.getFeedQuantity() * realLiveStockCount);
							}
							columnItem.add(new Label("count",
									new Model<Integer>(count)));
						}
					}

				};
				
				String stateType = rowItem.getModelObject().getStateType();								
				
				rowItem.add(new Label("livestock_count",new Model<Integer>( getLiveStockByState(stateType))));
				rowItem.add(new Label("rowhead",new Model<String>(rowItem.getModelObject().getStateType())));
				rowItem.add(row);
			}
		};
		return listview;
	}
	

	private Integer getLiveStockByState(String state) {
		Session session = sessionFactory.getCurrentSession();
		Criteria criteria = session.createCriteria(Livestock.class).add(Restrictions.eq("farm",getLoginUserFarm())).add(Restrictions.eq("deceased","N")).createCriteria("stateType");		
		criteria.add(Restrictions.eq("stateType", state));
		List<Livestock> allLiveStock = objectLoader.findAll(Livestock.class, criteria);		
		return allLiveStock.size();
	}

	
	private List<StateType> getAllLiveStockState() {
		Criterion criterion  = Restrictions.eq("farm", getLoginUserFarm());
		List<StateType> allStates = objectLoader.findAll(StateType.class, criterion);
		return allStates;

	}

	private List<String> getAllFeedTypeStrings(){
		Criterion criterion  = Restrictions.eq("farm", getLoginUserFarm());
		List<FeedType> allFeeds = objectLoader.findAll(FeedType.class, criterion);
		List<String> allStateStrings = new ArrayList<String>();
		allStateStrings.add("State");
		allStateStrings.add("LiveStock Count");
		for(FeedType feed: allFeeds){
			allStateStrings.add(feed.getFeedType());
			allStateStrings.add("sum");
		}
		return allStateStrings;
	}
	
	private List<String> getAllFeedTypeStrings2(){
		Criterion criterion  = Restrictions.eq("farm", getLoginUserFarm());
		List<FeedType> allFeeds = objectLoader.findAll(FeedType.class, criterion);
		List<String> allStateStrings = new ArrayList<String>();
		for(FeedType feed: allFeeds){
			allStateStrings.add(feed.getFeedType());
			allStateStrings.add("sum");
		}
		return allStateStrings;
	}
	
	protected Farm getLoginUserFarm(){
		FarmSession farmSession = (FarmSession)getSession();
		return farmSession.getFarm();
	}

}
