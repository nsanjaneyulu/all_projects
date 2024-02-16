package com.dblue.farm.application.forms;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.wicket.MarkupContainer;
import org.apache.wicket.PageParameters;
import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.form.AjaxFormComponentUpdatingBehavior;
import org.apache.wicket.ajax.form.OnChangeAjaxBehavior;
import org.apache.wicket.ajax.markup.html.form.AjaxButton;
import org.apache.wicket.extensions.markup.html.form.DateTextField;
import org.apache.wicket.extensions.yui.calendar.DatePicker;
import org.apache.wicket.feedback.FeedbackMessage;
import org.apache.wicket.feedback.IFeedbackMessageFilter;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.DropDownChoice;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.link.BookmarkablePageLink;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.link.PopupSettings;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.Model;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.model.util.ListModel;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.FeedType;
import com.dblue.farm.Livestock;
import com.dblue.farm.StateType;
import com.dblue.farm.SuggestedFeeding;
import com.dblue.farm.application.components.CheckBox;
import com.dblue.farm.application.components.EditorAwareForm;
import com.dblue.farm.application.components.ListEditor;
import com.dblue.farm.application.components.ListItem;
import com.dblue.farm.application.components.RemoveButton;
import com.dblue.farm.application.pages.SuggestedFeedReport;
import com.dblue.farm.exception.FarmRuntimeException;
import com.dblue.orm.FarmObject;



/**
 * Supporting wicket component which builds various all forms pertaining to dropdown management.
 * 
 * @author dblue
 *
 */
public class SuggestedFeedingForm extends AbstractWebForm  implements EditorAwareForm{
	

	// Dropdown list view
	private ListEditor<SuggestedFeeding> listEditor;
	
	private FeedbackPanel errorPanel;
	
	// Removed dropdown objects from the current user event
	private List<SuggestedFeeding> removedObjects = new ArrayList<SuggestedFeeding>();

	
	
	//Add button
	private Button addButton;
	
	//Add button
	private Button removeButton;
	
	//Panel representing dropdowns, container for all dropdown values for a category. 
		//Acts as an Ajax target to complete refresh for that panel alone.
		private MarkupContainer rowPanel;
		
	private Date effectiveDate;

	//formatting date inputs
	private SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
	
	private TextField<Date> effDate;
	
	public SuggestedFeedingForm(String effDate) {		
		super("suggestedForm");			
		
		
		try{			
			Date lastEffectiveDate = computeLatestSuggestedFeedingDate();
			this.effectiveDate = (null == effDate) ? (null != lastEffectiveDate?lastEffectiveDate :new Date()) : sdf.parse(effDate);
		}catch(ParseException ex){
			throw new FarmRuntimeException(ex);
		}
		build();
	}
	
	private void build(){
		
				
		
		buildEditor();
		
		this.errorPanel = new FeedbackPanel("feedback");
		
		this.rowPanel = new WebMarkupContainer("rowPanel");
		rowPanel.add(buildAddButton("suggest_addRow"));
		rowPanel.add(buildRemoveButton("suggest_removeRow"));
		rowPanel.add(buildUpdateButton("suggest_update"));
				
		rowPanel.add(listEditor);
		rowPanel.add(buildEffectiveDate());
		rowPanel.add(buildReportLink());
		
		add(rowPanel);
		//add(buildFeedBackPanel(this));
		rowPanel.setOutputMarkupId(true);
		errorPanel.setOutputMarkupId(true);
		this.add(errorPanel);
	}
	
	private Link buildReportLink(){

		PopupSettings popupSettings = new PopupSettings(PopupSettings.SCROLLBARS).setHeight(400)
	            .setWidth(1000);
		// make params
		PageParameters params = new PageParameters();
		String effDateString = effDate.getDefaultModelObjectAsString();
		params.add("effectiveDate", effDateString);
		
		BookmarkablePageLink reportLink=  new BookmarkablePageLink("report", SuggestedFeedReport.class,params);
		reportLink.setPopupSettings(popupSettings);
		return reportLink;
	}
	
	private void buildEditor(){
		List<SuggestedFeeding> allObjects =getAllSuggestedFeedings();
		
		IModel<List<SuggestedFeeding>> model = new ListModel<SuggestedFeeding>(allObjects);
		
		this.listEditor = new ListEditor<SuggestedFeeding>("rows",model) {
			@Override
			protected void onPopulateItem(ListItem<SuggestedFeeding> item) {				
				// for each row
				// Selected object check box
				CheckBox cBox = new CheckBox("suggestedfeedcheck", new Model<Boolean>(false),(FarmObject)item.getDefaultModelObject());
				final TextField<Integer> feedquantity = new TextField<Integer>("feedquantity",new PropertyModel<Integer>(item.getModel(), "feedQuantity"));
				final Label overallQuantity = new Label("overallquantity",new PropertyModel<String>(item.getModel(), "livestockTotal"));
				
				String slectedStateType = (null == item.getModel()) ? "":item.getModelObject().getStateType();
				final Label liveStockTotal = new Label("livestock_total",new Model<Integer>(getLiveStockByState(slectedStateType)));
				
				DropDownChoice<String> liveStockState = new DropDownChoice<String>("state_type", new PropertyModel<String>(item.getModel(), "stateType"), getAllLiveStockState()){
					
					protected boolean wantOnSelectionChangedNotifications() {
		                return true;
		            }
					
					@Override
					protected void onSelectionChanged(String newSelection) {
						// update label
						String selectedState = getModelObject();
						// get a count of all live stock for the state
						liveStockTotal.setDefaultModelObject(getLiveStockByState(selectedState));
						liveStockTotal.modelChanged();
					}
					
				};
				DropDownChoice<String> feedingType = new DropDownChoice<String>("feed", new PropertyModel<String>(item.getModel(), "feedType"), getAllFeedTypes());
				/*
				feedquantity.add(new OnChangeAjaxBehavior() {
					
					@Override
					protected void onUpdate(AjaxRequestTarget target) {
						Integer numberOfLiveStock = (Integer)liveStockTotal.getDefaultModel().getObject();
						Integer quantity = (Integer)feedquantity.getDefaultModel().getObject();
						if( numberOfLiveStock != null && quantity != null){
							Integer overallQuantityValue = numberOfLiveStock*quantity;
							// update the label
							overallQuantity.setDefaultModelObject(overallQuantityValue);
							overallQuantity.modelChanged();
						}
						target.addComponent(overallQuantity);
					}
				});
				*/
				
				overallQuantity.setOutputMarkupId(true);
				liveStockState.setRequired(true);
				feedingType.setRequired(true);
				feedquantity.setRequired(true);				
										
				
				item.add(cBox);
				item.add(liveStockState);
				item.add(feedingType);
				item.add(feedquantity);
				//item.add(overallQuantity);
				item.add(liveStockTotal);								
				
			}
		};
		listEditor.setOutputMarkupId(true);
	}
	
	private TextField<Date> buildEffectiveDate(){
		this.effDate = new DateTextField("effectiveDate", new PropertyModel<Date>(this, "effectiveDate"),"dd/MM/yyyy");
		
		effDate.add(new AjaxFormComponentUpdatingBehavior("onChange") {
			
			@Override
			protected void onUpdate(AjaxRequestTarget target) {				
				PageParameters params = new PageParameters();
				String effDateString = effDate.getDefaultModelObjectAsString();
				params.add("effectiveDate", effDateString);
				setResponsePage(com.dblue.farm.application.pages.SuggestedFeeding.class,params);				
			}
		});
		
		DatePicker datePicker = new DatePicker();
        datePicker.setShowOnFieldClick(true);        
        effDate.add(datePicker);		
		return effDate;
	}
	
	private Date computeLatestSuggestedFeedingDate(){
		Query query = sessionFactory.getCurrentSession().createQuery("select max(sf.schduledDate) from SuggestedFeeding sf where sf.farm="+getLoginUserFarm().getId());
		return (Date)query.uniqueResult();
	}
	
	
	private Button buildUpdateButton(String id){
		AjaxButton updateLink = new AjaxButton(id, this) {
			@Override
			public void onSubmit(AjaxRequestTarget target, Form form) {				
				target.addComponent(errorPanel);
				
			}
			
			@Override
			protected void onError(AjaxRequestTarget target, Form<?> form) {				
				super.onError(target, form);
				target.addComponent(errorPanel);
			}
		};		
		return updateLink;
	}
	
	private Button buildAddButton(String id){
		AjaxButton addLink = new AjaxButton(id, this) {
			@Override
			public void onSubmit(AjaxRequestTarget target, Form form) {
				SuggestedFeeding newObject = new SuggestedFeeding();	
				newObject.setFarm(getLoginUserFarm());
				listEditor.addItem(newObject);
				if (target != null){
					target.addComponent(rowPanel);
					target.addComponent(errorPanel);
				}
			}
			
			@Override
			protected void onError(AjaxRequestTarget target, Form<?> form) {				
				super.onError(target, form);
				target.addComponent(errorPanel);
			}
		};		
		addLink.setDefaultFormProcessing(false);
		return addLink;
	}
	
	private Button buildRemoveButton(String removeButtonId){
		AjaxButton removeLink = new RemoveButton(removeButtonId,listEditor) {

			@Override
			protected boolean isItemSelected(ListItem<?> item) {
				CheckBox cBox = (CheckBox)item.get(0);
				return "on".equals(cBox.getValue() )|| "true".equals(cBox.getValue());
			}

			@Override
			protected void trackRemovedDomainObject(ListItem<?> item) {
				removedObjects.add((SuggestedFeeding)item.getModelObject());				
			}
			
		};
		removeLink.setDefaultFormProcessing(false);
		return removeLink;
	}
	
	private List<SuggestedFeeding> getAllSuggestedFeedings(){
		Session session = sessionFactory.getCurrentSession();
		Criteria criteria = session.createCriteria(SuggestedFeeding.class);
		criteria.add(Restrictions.eq("farm",getLoginUserFarm()));		
		criteria.add(Restrictions.eq("schduledDate", effectiveDate));
		return objectLoader.findAll(SuggestedFeeding.class,criteria);
	}
	
	private List<String> getAllLiveStockState(){		
		Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
		List<StateType> allStates = objectLoader.findAll(StateType.class,criterion);
		List<String> allStateStrings = new ArrayList<String>();
		for(StateType state: allStates){
			allStateStrings.add(state.getStateType());			
		}
		return allStateStrings;
				
	}
	
	private List<String> getAllFeedTypes(){
		Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
		List<FeedType> allFeeds = objectLoader.findAll(FeedType.class, criterion);
		List<String> allStateStrings = new ArrayList<String>();
		for(FeedType feed: allFeeds){
			allStateStrings.add(feed.getFeedType());			
		}
		return allStateStrings;
	}
	
	private Integer getLiveStockByState(String state){
		
		Session session = sessionFactory.getCurrentSession();
		Criteria criteria = session.createCriteria(Livestock.class).add(Restrictions.eq("farm",getLoginUserFarm())).add(Restrictions.eq("deceased","N")).createCriteria("stateType");		
		criteria.add(Restrictions.eq("stateType", state));
		List<Livestock> allLiveStock = objectLoader.findAll(Livestock.class, criteria);		
		return allLiveStock.size();
		
	}


	public ListEditor<?> getEditor() {
		return listEditor;
	}
	
//	@Override
//	protected void onError() {
//		error("One or more fields have invalid values");
//	}
	
	private FeedbackPanel buildFeedBackPanel(final Form form){
		FeedbackPanel fp = new FeedbackPanel("feedback");
		fp.setFilter(new IFeedbackMessageFilter() {
			
			public boolean accept(FeedbackMessage message) {
				return form  == message.getReporter();
			}
		});
		return fp;
	}
	@Override
	protected void onSubmit() {
		
		// update removed items first
		
		/*for(SuggestedFeeding suggestedFeeding : removedObjects){
			objectLoader.delete(SuggestedFeeding.class, suggestedFeeding);
		}*/
		
		
		List<SuggestedFeeding> allObjects = listEditor.getItems();
		for( SuggestedFeeding object : allObjects){
			object.setSchduledDate(effectiveDate);
			//objectLoader.save(SuggestedFeeding.class, object);				
		}		
		farmApplicationDAO.handleDropDownUpdates(SuggestedFeeding.class, removedObjects, allObjects);
		removedObjects.clear();
		//farmApplicationDAO.saveAllObjects(SuggestedFeeding.class, (List<SuggestedFeeding>)allObjects);
		getSession().info("Suggested Feed has been saved or updated");
		setResponsePage(com.dblue.farm.application.pages.SuggestedFeeding.class);
	}
}
