package com.dblue.farm.application.forms;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.apache.wicket.MarkupContainer;
import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.form.OnChangeAjaxBehavior;
import org.apache.wicket.ajax.markup.html.form.AjaxButton;
import org.apache.wicket.extensions.yui.calendar.DatePicker;
import org.apache.wicket.feedback.FeedbackMessage;
import org.apache.wicket.feedback.IFeedbackMessageFilter;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.DropDownChoice;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.Model;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.model.util.ListModel;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.security.core.context.SecurityContextHolder;

import com.dblue.farm.DeVermitizationType;
import com.dblue.farm.Devermitization;
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

public class DewormForm extends AbstractWebForm implements EditorAwareForm {

	// Dropdown list view
	private ListEditor<Devermitization> listEditor;

	private FeedbackPanel errorPanel;

	// Removed dropdown objects from the current user event
	private List<Devermitization> removedObjects = new ArrayList<Devermitization>();

	// Add button
	private Button addButton;

	// Add button
	private Button removeButton;

	// Panel representing dropdowns, container for all dropdown values for a
	// category.
	// Acts as an Ajax target to complete refresh for that panel alone.
	private MarkupContainer rowPanel;

	public DewormForm() {
		super("deWormForm");
		build();
	}

	private void build() {

		List<Devermitization> allObjects = getAllDevermitization();

		IModel<List<Devermitization>> model = new ListModel<Devermitization>(
				allObjects);

		this.listEditor = new ListEditor<Devermitization>("rows", model) {
			@Override
			protected void onPopulateItem(ListItem<Devermitization> item) {
				// for each row
				// Selected object check box
				CheckBox cBox = new CheckBox("wormcheck", new Model<Boolean>(
						false), (FarmObject) item.getDefaultModelObject());
				DropDownChoice<DeVermitizationType> DevermitizationType = new DropDownChoice<DeVermitizationType>(
						"wormType", new PropertyModel<DeVermitizationType>(
								item.getModel(), "deVermitizationType"),
						getAllDevermitizationType()){

							@Override
							protected boolean wantOnSelectionChangedNotifications() {
								return true;
							}					
					
				};

				TextField<Date> lastDevermitizationDate = new TextField<Date>(
						"lastDate", new PropertyModel<Date>(item.getModel(),
								"lastVermitizationDate"));
				DatePicker datePicker1 = new DatePicker();
		        datePicker1.setShowOnFieldClick(true);        
		        lastDevermitizationDate.add(datePicker1);
				
				final TextField<Date> devermitizationDate = new TextField<Date>(
						"givenDate", new PropertyModel<Date>(item.getModel(),
								"vermitizationDate"));							
				DatePicker datePicker2= new DatePicker();
				datePicker2.setShowOnFieldClick(true);        
				devermitizationDate.add(datePicker2);
				
				final TextField<Date> nextDevermitizationDate = new TextField<Date>(
						"nextDate", new PropertyModel<Date>(item.getModel(),
								"nextVermitizationDate"));
				
				devermitizationDate.add(new OnChangeAjaxBehavior(){

					@Override
					protected void onUpdate(AjaxRequestTarget target) {
						// get selected vaccination type	
						if( ( null != devermitizationDate.getDefaultModel()) &&  ((PropertyModel)devermitizationDate.getDefaultModel()).getTarget() != null) {
							Devermitization vermitization = (Devermitization)((PropertyModel)devermitizationDate.getDefaultModel()).getTarget();
							if( null != vermitization.getDeVermitizationType()){
							Integer period = vermitization.getDeVermitizationType().getIntervalPeriod();
							if( null!=period && period > 0){
							 Calendar cal = Calendar.getInstance();
							 cal.setTime((Date)devermitizationDate.getDefaultModelObject());
							 cal.add(Calendar.DAY_OF_YEAR, (null == period?0:period));
							 nextDevermitizationDate.setDefaultModelObject(cal.getTime());
							 nextDevermitizationDate.modelChanged();
							}
							}
						}
						target.addComponent(nextDevermitizationDate);
					}
					
				});
				
				DatePicker datePicker3= new DatePicker();
				datePicker3.setShowOnFieldClick(true);        
				nextDevermitizationDate.add(datePicker3);
				
				TextField<String> manName = new TextField<String>("manName",
						new PropertyModel<String>(item.getModel(),
								"manufacturerName"));
				
				TextField<String> batchNumber = new TextField<String>("batchNumber",
						new PropertyModel<String>(item.getModel(),
								"batchNumber"));
				
				TextField<Date> manDate = new TextField<Date>("manDate",
						new PropertyModel<Date>(item.getModel(),
								"manufacturedDate"));
				DatePicker datePicker4= new DatePicker();
				datePicker4.setShowOnFieldClick(true);        
				manDate.add(datePicker4);
				
				TextField<Date> expiryDate = new TextField<Date>("expDate",
						new PropertyModel<Date>(item.getModel(), "expiryDate"));
				DatePicker datePicker5= new DatePicker();
				datePicker5.setShowOnFieldClick(true);        
				expiryDate.add(datePicker5);

				DevermitizationType.setRequired(true);
				//lastDevermitizationDate.setRequired(true);
				devermitizationDate.setRequired(true);
				//nextDevermitizationDate.setRequired(true);
				//manName.setRequired(true);
				//manDate.setRequired(true);
				//expiryDate.setRequired(true);

				item.add(cBox);
				item.add(DevermitizationType);
				item.add(lastDevermitizationDate);
				item.add(devermitizationDate);
				item.add(nextDevermitizationDate);
				item.add(manName);
				item.add(batchNumber);
				item.add(manDate);
				item.add(expiryDate);

			}
		};
		// ListEditor.setReuseItems(true);

		this.errorPanel = buildFeedBackPanel(this);

		this.rowPanel = new WebMarkupContainer("rowPanel");
		rowPanel.add(buildAddButton("worm_add"));
		rowPanel.add(buildRemoveButton("worm_remove"));
		rowPanel.add(listEditor);
		add(rowPanel);
		add(errorPanel);
		// add(buildValidator());
		rowPanel.setOutputMarkupId(true);
		errorPanel.setOutputMarkupId(true);
	}

	private FeedbackPanel buildFeedBackPanel(final DewormForm form) {
		FeedbackPanel fp = new FeedbackPanel("feedback");
		fp.setFilter(new IFeedbackMessageFilter() {

			public boolean accept(FeedbackMessage message) {
				return form == message.getReporter();
			}
		});
		return fp;
	}

	private Button buildAddButton(String id) {
		AjaxButton addLink = new AjaxButton(id, this) {
			@Override
			public void onSubmit(AjaxRequestTarget target, Form form) {
				Devermitization newObject = new Devermitization();
				newObject.setFarm(getLoginUserFarm());
				listEditor.addItem(newObject);
				if (target != null) {
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

	private Button buildRemoveButton(String removeButtonId) {
		AjaxButton removeLink = new RemoveButton(removeButtonId, listEditor) {

			@Override
			protected boolean isItemSelected(ListItem<?> item) {
				CheckBox cBox = (CheckBox) item.get(0);
				return "on".equals(cBox.getValue())
						|| "true".equals(cBox.getValue());
			}

			@Override
			protected void trackRemovedDomainObject(ListItem<?> item) {
				removedObjects.add((Devermitization)item.getModelObject());				
			}

		};
		removeLink.setDefaultFormProcessing(false);
		return removeLink;
	}

	private List<Devermitization> getAllDevermitization() {
		
		int liveStockId= (Integer) ((FarmSession) getSession()).getStoreValue("livestockid");
		Criterion criterion = Restrictions.eq("id", liveStockId);
		List<Livestock> livestocks =  objectLoader.findAll(Livestock.class,criterion);		
		Livestock livestock = livestocks.get(0);
		Set<Devermitization> devermitizations = livestock.getHealth().getDevermitizations();
		Iterator<Devermitization> devermitizationIterator = devermitizations.iterator();
		List<Devermitization> devermitizationsList = new ArrayList<Devermitization>();
		while(devermitizationIterator.hasNext()){
			//vaccinationsList = new ArrayList<Vaccination>();
			devermitizationsList.add(devermitizationIterator.next());
		}
		return devermitizationsList;
	}

	private List<DeVermitizationType> getAllDevermitizationType() {
		Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
		return objectLoader.findAll(DeVermitizationType.class, criterion);
	}

	public ListEditor<?> getEditor() {
		return listEditor;
	}

	@Override
	protected void onSubmit() {

		try {
			Livestock livestock = objectLoader.load(Livestock.class,
					(Integer) ((FarmSession) getSession())
							.getStoreValue("livestockid"));
			Health health = livestock.getHealth();
			objectLoader.save(Health.class, health);
			// save objects.
			List<Devermitization> allObjects = listEditor.getItems();
			for (Devermitization object : allObjects) {
				object.setHealth(health);
			}
			farmApplicationDAO.saveHealth(health, Devermitization.class, removedObjects, allObjects);
			removedObjects.clear();
		} catch (NotFoundException ex) {
			throw new FarmRuntimeException(ex.getMessage(), ex);
		}

	}

	@Override
	protected void onError() {
		error("One or more fields have invalid values");
	}

}
