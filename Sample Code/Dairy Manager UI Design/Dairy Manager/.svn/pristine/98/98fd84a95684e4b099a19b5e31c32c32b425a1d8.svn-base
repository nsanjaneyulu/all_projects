package com.dblue.farm.application.pages;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.markup.html.form.AjaxButton;
import org.apache.wicket.extensions.yui.calendar.DatePicker;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.FormComponent;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.form.validation.AbstractFormValidator;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.Model;
import org.apache.wicket.model.PropertyModel;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.StateType;
import com.dblue.farm.SuggestedFeeding;



public class FeedingHistory extends FarmPage{
	
	// query start date
	private Date startDate;
	
	// query end date
	private Date endDate;
	
	private Map<String, List<Double>> dataMapping	;
	
	private WebMarkupContainer reportContainer;
	
	
	
	@Override
	protected void buildPageComponents() {
		
		this.dataMapping = new LinkedHashMap<String,List<Double>>();
		this.reportContainer = new WebMarkupContainer("reportContainer");
		reportContainer.add(buildListView());	
		reportContainer.add(buildHeader());
		reportContainer.setOutputMarkupId(true);
		
		Form form = buildForm();
		form.add(buildSearch());
		
		add(this.reportContainer);
		add(form);
		
		
		
	}
	
	public List<String> getReportKeys(){				
		return Arrays.asList(dataMapping.keySet().toArray(new String[0]));
	}
	
	
	private ListView buildHeader() {
		
		Query query = sessionFactory.getCurrentSession().createQuery("select f.feedType from FeedType f where f.farm=:farm order by f.feedType");
		query.setInteger("farm", getLoginUserFarm().getId());
		Iterator headIterator = query.list().iterator();
		
		List<String> allFeedTypeStrings = new ArrayList<String>();
		allFeedTypeStrings.add("Live Stock State");
		while( headIterator.hasNext()){
			allFeedTypeStrings.add((String)headIterator.next());
		}
		
		
		ListView<String> headerRow = new ListView<String>("headerlist",allFeedTypeStrings) {

			@Override
			protected void populateItem(final ListItem<String> rowItem) {
				rowItem.add(new Label("header", rowItem.getModelObject()));
			}
		};
		return headerRow;
	}
	
	private ListView<String> buildListView(){
		
		ListView<String> listview = new ListView<String>("rows", new PropertyModel<List<String>>(this, "reportKeys")) {
			@Override
			protected void populateItem(final ListItem<String> rowItem) {
				List<Double> values = dataMapping.get(rowItem.getModelObject());
								
				// for each available fodders count the sum.
				ListView<Number> row = new ListView<Number>("row_id",values) {

					@Override
					protected void populateItem(ListItem<Number> columnItem) {
						// for each state and feed type get the count.												
						
						columnItem.add(new Label("count", new Model<Number>((Number)columnItem.getDefaultModelObject())));											
					}

				};				
				row.setOutputMarkupId(true);
				rowItem.add(new Label("rowhead",new Model<String>(rowItem.getModelObject())));
				rowItem.add(row);
			}
		};
		
		listview.setOutputMarkupId(true);
		return listview;
	}
	
	private AjaxButton buildSearch() {
		// add search button
		AjaxButton search = new AjaxButton("search") {

			@Override
			protected void onSubmit(AjaxRequestTarget target, Form<?> form) {

				// clear existing entitites
				dataMapping.clear();
				int farmId= getLoginUserFarm().getId();
				List<String> allStateTypes = getAllStates();

				for (String stateType : allStateTypes) {

					PreparedStatement pstmt = null;
					ResultSet rs = null;

					try {
						pstmt = sessionFactory
								.getCurrentSession()
								.connection()
								.prepareStatement(
										"select ft.feed_type, sum(rs1.quantity) ,state_type from feed_type ft left join (select * from feeding_history s where s.feed_date>= ? and s.feed_date <= ? and state_type=? and s.farm_id=?) as rs1 on ft.feed_type=rs1.feed_type where ft.farm_id=? group by ft.feed_type order by ft.feed_type");
						pstmt.setDate(1, new java.sql.Date(
								FeedingHistory.this.startDate.getTime()));
						pstmt.setDate(2, new java.sql.Date(
								FeedingHistory.this.endDate.getTime()));
						pstmt.setString(3, stateType);
						pstmt.setInt(4,farmId);
						pstmt.setInt(5, farmId);
						

						List<Double> values = new ArrayList<Double>();
						dataMapping.put(stateType, values);

						rs = pstmt.executeQuery();

						while (rs.next()) {
							// add the values.
							Double rowValue = rs.getDouble(2);
							if (null == rowValue) {
								values.add(new Double(0));
							} else {
								values.add(((Number) rowValue).doubleValue());
							}

						}
					} catch (SQLException ex) {
						ex.printStackTrace();
					} finally {
						try {
							if (null != rs) {
								rs.close();
							}
							if (null != pstmt) {
								pstmt.close();
							}
						} catch (SQLException ex) {
						}
					}
				}
				dataMapping.put("Total", calculateTotals());
				target.addComponent(reportContainer);

			}

			@Override
			protected void onError(AjaxRequestTarget target, Form<?> form) {
				dataMapping.clear();
				target.addComponent(form);
				target.addComponent(reportContainer);
			}

		};
		return search;
	}
	
	private List<Double> calculateTotals(){
		Double[] totals = null;					
		Iterator<String> dataMapIterator = dataMapping.keySet().iterator();
		
		while( dataMapIterator.hasNext()){
			List<Double> values = dataMapping.get(dataMapIterator.next());
			if( null == totals){
				totals = new Double[values.size()];
			}
			
			int index =0;
			
			for(Double value:values){				
				Double currentValue = totals[index];
				totals[index] = (null == currentValue ? value:(currentValue+value));
				index++;
			}
			
		}
		return Arrays.asList(totals);
	}
	
	private List<String> getAllStates(){
		Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
		List<StateType> allStates = objectLoader.findAll(StateType.class,criterion);
		List<String> stateTypes = new ArrayList();
		for( StateType stateType : allStates){
			stateTypes.add(stateType.getStateType());
		}
		return stateTypes;
	}
	
	private Form buildForm(){
		
		Form form = new Form("feedquery");
		final TextField<Date> startDateField = new TextField<Date>("startDate",new PropertyModel<Date>(this, "startDate"));
		DatePicker datePicker1= new DatePicker();
		datePicker1.setShowOnFieldClick(true);        
		startDateField.add(datePicker1);
		
		final TextField<Date> endDateField = new TextField<Date>("endDate",new PropertyModel<Date>(this, "endDate"));
		DatePicker datePicker2= new DatePicker();
		datePicker2.setShowOnFieldClick(true);        
		endDateField.add(datePicker2);

		form.add(startDateField);
		form.add(endDateField);
		
		
		form.add(new AbstractFormValidator() {

			public FormComponent<?>[] getDependentFormComponents() {
				return new TextField<?>[] { startDateField, endDateField };
			}

			public void validate(Form<?> form) {
				String startDateQuery = startDateField.getRawInput();
				String endDateQuery = endDateField.getRawInput();
				if (isNull(startDateQuery) && isNull(endDateQuery)) {
					form.error("Please enter a valid search criteria");
				}else{				
					// check if there is snapshot available with start date
					Date startDate = null;
					try{
						startDate=sdf.parse(startDateQuery);
					}catch(ParseException ex){}
					
					Date snapshortStartDate = getEffectiveDate(startDate);	
					if( isNull(snapshortStartDate)){
						form.error("Suggested feeding is not available for given start date");
					}
				}

			}

		});
		
		FeedbackPanel feedbackPanel = new FeedbackPanel("feedback");
		feedbackPanel.setOutputMarkupId(true);
		form.add(feedbackPanel);
		add(form);
		return form;
	}
	
	
	
	private boolean isNull(Object object) {
		return (null == object || "".equals(object.toString().trim()));
	}
		
	private Date getEffectiveDate(Date startDate){

		Session session = sessionFactory.getCurrentSession();
		Criteria criteria = session.createCriteria(SuggestedFeeding.class);		
		criteria.add(Restrictions.le("schduledDate", startDate));
		criteria.addOrder(Order.asc("schduledDate"));
		criteria.setMaxResults(1);
		
		List<SuggestedFeeding> suggestedFeedings = objectLoader.findAll(SuggestedFeeding.class, criteria);
		
		if( suggestedFeedings.size() != 0){
			return suggestedFeedings.get(0).getSchduledDate();
		}

		return null;		
	}		

}	
