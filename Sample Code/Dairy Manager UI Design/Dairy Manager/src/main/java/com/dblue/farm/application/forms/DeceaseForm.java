package com.dblue.farm.application.forms;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.apache.wicket.MarkupContainer;
import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.markup.html.form.AjaxButton;
import org.apache.wicket.extensions.yui.calendar.DatePicker;
import org.apache.wicket.feedback.FeedbackMessage;
import org.apache.wicket.feedback.IFeedbackMessageFilter;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.DropDownChoice;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.TextArea;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.Model;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.model.util.ListModel;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.security.core.context.SecurityContextHolder;

import com.dblue.farm.Decease;
import com.dblue.farm.DeceaseType;
import com.dblue.farm.Farm;
import com.dblue.farm.Health;
import com.dblue.farm.Livestock;
import com.dblue.farm.application.FarmAuthentication;
import com.dblue.farm.application.FarmSession;
import com.dblue.farm.application.components.CheckBox;
import com.dblue.farm.application.components.EditorAwareForm;
import com.dblue.farm.application.components.ListEditor;
import com.dblue.farm.application.components.ListItem;
import com.dblue.farm.application.components.RemoveButton;
import com.dblue.farm.exception.FarmRuntimeException;
import com.dblue.farm.exception.NotFoundException;
import com.dblue.orm.FarmObject;

public class DeceaseForm extends AbstractWebForm  implements EditorAwareForm{
	

	// Dropdown list view
	private ListEditor<Decease> listEditor;
	
	private FeedbackPanel errorPanel;
	
	// Removed dropdown objects from the current user event
	private List<Decease> removedObjects = new ArrayList<Decease>();

	
	
	//Add button
	private Button addButton;
	
	//Add button
	private Button removeButton;
	
	//Panel representing dropdowns, container for all dropdown values for a category. 
		//Acts as an Ajax target to complete refresh for that panel alone.
		private MarkupContainer rowPanel;

	
	
	public DeceaseForm() {
		super("deceaseForm");
		build();
	}
	
	private void build(){
		
		List<Decease> allObjects =getAllDeceases();
		
		IModel<List<Decease>> model = new ListModel<Decease>(allObjects);
		this.listEditor = new ListEditor<Decease>("rows",model) {
			@Override
			protected void onPopulateItem(ListItem item) {				
				// for each row
				// Selected object check box
				CheckBox cBox = new CheckBox("deceasecheck", new Model<Boolean>(false),(FarmObject)item.getDefaultModelObject());
				DropDownChoice<DeceaseType> deceaseType = new DropDownChoice<DeceaseType>("deceasetype", new PropertyModel<DeceaseType>(item.getModel(), "deceaseType"), getAllDeceaseType());
				TextArea<String> symptoms = new TextArea<String>("symptoms",new PropertyModel<String>(item.getModel(), "symptoms"));
								
				TextField<Date> startDate = new TextField<Date>("startdate",new PropertyModel<Date>(item.getModel(), "startDate"));
				DatePicker datePicker1= new DatePicker();
				datePicker1.setShowOnFieldClick(true);        
				startDate.add(datePicker1);
				
				
				TextField<Date> endDate = new TextField<Date>("enddate",new PropertyModel<Date>(item.getModel(), "endDate"));
				DatePicker datePicker2= new DatePicker();
				datePicker2.setShowOnFieldClick(true);        
				endDate.add(datePicker2);
				
				TextArea<String> medicine = new TextArea<String>("medicine", new PropertyModel<String>(item.getModel(), "medicine"));
				TextField<String> treatment = new TextField<String>("treatmentgiven",new PropertyModel<String>(item.getModel(), "treatmentDescription"));
				TextArea<String> remarks = new TextArea<String>("remarks",new PropertyModel<String>(item.getModel(), "remarks"));
				
				deceaseType.setRequired(true);
				//startDate.setRequired(true);
				//endDate.setRequired(true);
				medicine.setRequired(true);
				treatment.setRequired(true);
				//remarks.setRequired(true);
				
										
				
				item.add(cBox);
				item.add(deceaseType);
				item.add(symptoms);
				item.add(startDate);
				item.add(endDate);
				item.add(medicine);
				item.add(treatment);				
				item.add(remarks);
				
			}
		};		
		
		
		
		this.errorPanel = new FeedbackPanel("feedback");
		
		this.rowPanel = new WebMarkupContainer("rowPanel");
		rowPanel.add(buildAddButton("decease_add"));
		rowPanel.add(buildRemoveButton("decease_remove"));
		rowPanel.add(listEditor);
		add(rowPanel);
		add(buildFeedBackPanel(this));
		rowPanel.setOutputMarkupId(true);
		errorPanel.setOutputMarkupId(true);
	}
	
	
	private Button buildAddButton(String id){
		AjaxButton addLink = new AjaxButton(id, this) {
			@Override
			public void onSubmit(AjaxRequestTarget target, Form form) {
				Decease newObject = new Decease();	
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
				removedObjects.add((Decease)item.getModelObject());
				
			}
			
		};
		removeLink.setDefaultFormProcessing(false);
		return removeLink;
	}
	
	private List<Decease> getAllDeceases(){
		int liveStockId= (Integer) ((FarmSession) getSession()).getStoreValue("livestockid");
		Criterion criterion = Restrictions.eq("id", liveStockId);
		List<Livestock> livestocks =  objectLoader.findAll(Livestock.class,criterion);		
		Livestock livestock = livestocks.get(0);
		Set<Decease> deceases = livestock.getHealth().getDeceases();
		Iterator<Decease> deceasesIterator = deceases.iterator();
		List<Decease> deceaseList = new ArrayList<Decease>();
		while(deceasesIterator.hasNext()){
			//vaccinationsList = new ArrayList<Vaccination>();
			deceaseList.add(deceasesIterator.next());
		}
		return deceaseList;
		
	}
	
	private List<DeceaseType> getAllDeceaseType(){
		Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
		return objectLoader.findAll(DeceaseType.class, criterion);
	}

	public ListEditor<?> getEditor() {
		return listEditor;
	}
	
	@Override
	protected void onError() {
		error("One or more fields have invalid values");
	}
	
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
		try{
			Livestock livestock = objectLoader.load(Livestock.class, (Integer)((FarmSession)getSession()).getStoreValue("livestockid"));
			Health health = livestock.getHealth();
			objectLoader.save(Health.class, health);
			List<Decease> allObjects = listEditor.getItems();
			for( Decease object : allObjects){
				object.setHealth(health);
			}
			farmApplicationDAO.saveHealth(health, Decease.class, removedObjects, allObjects);
			removedObjects.clear();
		}catch(NotFoundException ex){
			throw new FarmRuntimeException(ex.getMessage(),ex); 
		}
	}	
}
