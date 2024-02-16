package com.dblue.farm.application.forms;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.wicket.MarkupContainer;
import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.markup.html.form.AjaxButton;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.FormComponent;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.Model;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.spring.injection.annot.SpringBean;
import org.apache.wicket.validation.IValidatable;
import org.apache.wicket.validation.IValidator;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.security.core.context.SecurityContextHolder;

import com.dblue.farm.Farm;
import com.dblue.farm.FarmObjectImpl;
import com.dblue.farm.OriginType;
import com.dblue.farm.application.FarmAuthentication;
import com.dblue.farm.application.FarmSession;
import com.dblue.farm.application.components.CheckBox;
import com.dblue.farm.application.dao.FarmApplicationDAO;
import com.dblue.farm.application.pages.ConfigureDropdown;
import com.dblue.farm.application.pages.IngredientList;
import com.dblue.farm.exception.DropDownCantBeDeletedException;
import com.dblue.farm.exception.FarmRuntimeException;
import com.dblue.farm.exception.NotFoundException;
import com.dblue.orm.FarmObject;


/**
 * Supporting wicket component which builds various all forms pertaining to dropdown management.
 * 
 * @author dblue
 *
 */
public class DropDownForm<T extends FarmObject> extends AbstractWebForm {
	
	// All check boxes presented on the view
	private List<CheckBox> checkBoxes = new ArrayList<CheckBox>();
	
	// Removed dropdown objects from the current user event
	private List<T> removedObjects = new ArrayList<T>();
	
	// Dropdown list view
	private ListView<T> listView;
	
	//Add button
	private Button addButton;
	
	//Add button
	private Button removeButton;

	//Add button
	private Button updateButton;
	
	//Panel representing dropdowns, container for all dropdown values for a category. 
	//Acts as an Ajax target to complete refresh for that panel alone.
	private MarkupContainer rowPanel;
	
	//object type;
	private Class type;
	
	private FeedbackPanel errorPanel;
	
	private String configName;
	
	@SpringBean
	FarmApplicationDAO farmApplicationDAO;
	
	/**
	 * Initializes a dropdown form based on the following parameters
	 * 
	 * @param formId wicket id of the form
	 * @param addButtonId	wicket id of add button
	 * @param removeButtonId	wicket id of the remove button
	 * @param updateButtonId	wicket id of the update button
	 * @param objectTypeFieldName	wicket property expression mapping to the type object. For example "originType" {@link OriginType}
	 * @param objectDescriptionFieldName wicket property expression mapping to the description object. For example "description" {@link OriginType} 
	 */
	public DropDownForm(String configName,Class type,String formId, String addButtonId,
			String removeButtonId, String updateButtonId,
			String objectTypeId,String objectDescriptionId,String checkBoxId,
			String objectTypeFieldName, String objectDescriptionFieldName) {
		super(formId);	
		this.type = type;
		this.configName=configName;		
		buildForm(addButtonId, removeButtonId, updateButtonId, objectTypeId, objectDescriptionId, checkBoxId, objectTypeFieldName, objectDescriptionFieldName);
	}	
	
	
	public void buildForm( String addButtonId,
			String removeButtonId, String updateButtonId,
			String objectTypeId,String objectDescriptionId,String checkBoxId,
			String objectTypeFieldName, String objectDescriptionFieldName){
		
		// all existing dropdown values
		List<T> allObjects = loadObjects();
		
		this.listView = buildView(objectTypeId, objectDescriptionId, checkBoxId,
				 objectTypeFieldName, objectDescriptionFieldName,allObjects);
		
		this.addButton = buildAddButton(addButtonId);
		this.removeButton = buildRemoveButton(removeButtonId,allObjects);
		this.updateButton = buildUpdateButton(updateButtonId);
		this.rowPanel = new WebMarkupContainer("rowPanel");
		rowPanel.setOutputMarkupId(true);
		
		// add various components.		
		rowPanel.add(listView);
		rowPanel.add(addButton);
		rowPanel.add(removeButton);			
		rowPanel.add(updateButton);
		this.add(rowPanel);
			
		this.errorPanel =new FeedbackPanel("feedback"); 
		errorPanel.setOutputMarkupId(true);
		
		this.add(errorPanel );		
		//this.add( new FormValidator(configName,listView));
		

	}
	
	
	private Button buildAddButton(String id){
		AjaxButton addLink = new AjaxButton(id, this) {
			@Override
			public void onSubmit(AjaxRequestTarget target, Form form) {
				T newObject = getObject();
				listView.getModelObject().add(newObject);
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
		return addLink;
	}
	
	private Button buildRemoveButton(String removeButtonId, final List<T> allObjects){
		AjaxButton removeLink = new AjaxButton(removeButtonId, this) {
			@Override
			public void onSubmit(AjaxRequestTarget target, Form form) {
				
				List<T> removedItems = new ArrayList<T>();				
				
				Iterator  itemIterator = listView.iterator();				
				while(itemIterator.hasNext()){
					ListItem item= (ListItem)itemIterator.next();
					CheckBox cBox = (CheckBox)item.get(0);
					if (cBox.getModelObject() != null && cBox.getModelObject()) {
						T deletedObject = (T)cBox.getState();
						removedItems.add(deletedObject);		
						cBox.getModel().setObject(false);
					}
				}
				for (T removedObject : removedItems) {
					removedObjects.add(removedObject);
					listView.getModelObject().remove(removedObject);
				}				

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
		
		return removeLink;
	}
	
	
	private Button buildUpdateButton(String updateId){
		
		AjaxButton updateLink = new AjaxButton(updateId, this) {
			@Override
			public void onSubmit(AjaxRequestTarget target, Form form) {
				
				List<T> savedObjects = new ArrayList<T>();
				for (T objectType : listView.getModelObject()) {
					((FarmObjectImpl)objectType).setFarm(getLoginUserFarm());
					savedObjects.add(objectType);
				}
				
				try{
					farmApplicationDAO.handleDropDownUpdates(getClazz(), (List<FarmObject>)removedObjects, (List<FarmObject>)savedObjects);
				}catch(DropDownCantBeDeletedException ex){
					getSession().info("Unable to process request as one or more deleted values are being used by the application");
					setResponsePage(ConfigureDropdown.class);
				}
				removedObjects.clear();
				
				if (target != null){
					target.addComponent(rowPanel);
					target.addComponent(errorPanel);
				}
				getSession().info("Configuration has been saved or updated");
				setResponsePage(ConfigureDropdown.class);
			}

			@Override
			protected void onError(AjaxRequestTarget target, Form<?> form) {
				super.onError(target, form);
				target.addComponent(errorPanel);
			}						
		};		
		updateLink.add( new IValidator(){

			public void validate(IValidatable validatable) {
				/*Map<String,Object> config = new HashMap<String,Object>();
				config.put("configurationElement", configurationElement);
				*/
				
				List<FormComponent> components = new ArrayList<FormComponent>();
				List<String> types = new ArrayList<String>();
				Iterator  itemIterator = listView.iterator();
				while(itemIterator.hasNext()){
					ListItem item= (ListItem)itemIterator.next();
					TextField<String> type = (TextField<String>)item.get(1);
					TextField<String> desc = (TextField<String>)item.get(2);
					desc.setDefaultModelObject("");
					desc.modelChanged();
					components.add(type);
					//components.add(desc);
				}
				
				//TODO: check duplicates				
				
				for( FormComponent fc : components){
					if( isEmpty((TextField<String>)fc)){
						error(configName + " has one or more empty mandaotry field ");						
						return;
					}else if(isDuplicate((TextField<String>)fc,types)){
						error(configName + " has one or more duplicate values");		
						return;
					}
				}				
				
			}
			
		});
		return updateLink;
	}
	
	private ListView<T> buildView(final String objectTypeId,final String objectDescriptionId,final String checkBoxId,
			final String objectTypeFieldName, final String objectDescriptionFieldName, List<T> allObjects){
		
		ListView<T> listView = new ListView<T>("rows",allObjects) {
			@Override
			protected void populateItem(ListItem item) {				
				// for each row
				// Selected object check box
				CheckBox cBox = new CheckBox(checkBoxId, new Model<Boolean>(false),(FarmObject)item.getDefaultModelObject());
				TextField<String> objectType = new TextField<String>(objectTypeId,new PropertyModel<String>(item.getModel(), objectTypeFieldName));				
				TextField<String> objectDescription = new TextField<String>(objectDescriptionId,new PropertyModel<String>(item.getModel(), objectDescriptionFieldName));
				
				
				checkBoxes.add(cBox);
				
				item.add(cBox);
				item.add(objectType);
				item.add(objectDescription);	
				
				
				
			}
		};
		listView.setReuseItems(true);
		return listView;
	}
	
	private List<T> loadObjects(){			
		Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());		
		List<T> objectTypes = objectLoader.findAll(getClazz(),criterion);
		return objectTypes;
	}
	
	private Class getClazz(){
		return type;

	}
	
	private T getObject() {
		Class<T> clazz = getClazz();
		try{			
			return clazz.newInstance();
		}catch(Exception ex){
			throw new FarmRuntimeException("Unable to create object of type : "+ clazz , ex);
		}
	}

	
	public Boolean validateForm(){
		Iterator  itemIterator = listView.iterator();				
		while(itemIterator.hasNext()){
			ListItem item= (ListItem)itemIterator.next();
			TextField<String> type = (TextField<String>)item.get(1);
			TextField<String> desc = (TextField<String>)item.get(2);
			if( isEmpty(type) || isEmpty(desc)){
				return false;
			}
		}
		return true;
	}
	
	private Boolean isDuplicate(TextField<String> tf, List<String> keys){
		String fieldValue = tf.getValue();
		// we are gauranteed that this value is not null
		if( keys.contains(fieldValue)){
			return true;
		}else{
			keys.add(fieldValue);
			return false;
		}
	}
	
	private Boolean isEmpty(TextField<String> tf){
		if( null == tf ){
			return true;
		}
		
		String fieldValue = tf.getValue();
		if( null == fieldValue || "".equals(fieldValue.trim())){
			return true;
		}
		return false;
	}
	
	protected Farm getLoginUserFarm(){
		FarmSession farmSession = (FarmSession)getSession();
		return farmSession.getFarm();
	}
	
	
}