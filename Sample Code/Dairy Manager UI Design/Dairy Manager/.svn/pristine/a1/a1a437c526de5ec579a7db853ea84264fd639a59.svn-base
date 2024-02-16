package com.dblue.farm.application.forms;

import java.math.BigDecimal;
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
import org.hibernate.Query;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.security.core.context.SecurityContextHolder;

import com.dblue.farm.Farm;
import com.dblue.farm.Health;
import com.dblue.farm.Livestock;
import com.dblue.farm.Vaccination;
import com.dblue.farm.VaccineType;
import com.dblue.farm.application.FarmApplication;
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

public class VaccinationForm extends AbstractWebForm implements EditorAwareForm {

	// Dropdown list view
	private ListEditor<Vaccination> listEditor;

	private FeedbackPanel errorPanel;

	// Removed dropdown objects from the current user event
	private List<Vaccination> removedObjects = new ArrayList<Vaccination>();

	// Add button
	private Button addButton;

	// Add button
	private Button removeButton;
		

	// Panel representing dropdowns, container for all dropdown values for a
	// category.
	// Acts as an Ajax target to complete refresh for that panel alone.
	private MarkupContainer rowPanel;

	public VaccinationForm() {
		super("vaccineHealthForm");
		build();
	}

	private void build() {

		List<Vaccination> allObjects = getAllVaccination();

		IModel<List<Vaccination>> model = new ListModel<Vaccination>(allObjects);

		this.listEditor = new ListEditor<Vaccination>("rows", model) {
			@Override
			protected void onPopulateItem(ListItem<Vaccination> item) {
				// for each row
				// Selected object check box
				CheckBox cBox = new CheckBox("vaccinehealthcheck",
						new Model<Boolean>(false),
						(FarmObject) item.getDefaultModelObject());
				DropDownChoice<VaccineType> vaccineType = new DropDownChoice<VaccineType>(
						"vaccinetype", new PropertyModel<VaccineType>(
								item.getModel(), "vaccineType"),
						getAllVaccinationType()){
							
							protected boolean wantOnSelectionChangedNotifications() {
				                return true;
				            }
							
							/*@Override
							protected void onSelectionChanged(VaccineType newSelection) {
								VaccinationForm.this.selectedVaccineType=newSelection.getVaccine();
							}*/
							
						};
				
				TextField<Date> lastVaccinationDate = new TextField<Date>(
						"last_vaccination_date", new PropertyModel<Date>(
								item.getModel(), "lastVaccinationDate"));
				DatePicker datePicker1 = new DatePicker();
		        datePicker1.setShowOnFieldClick(true);        
		        lastVaccinationDate.add(datePicker1);
		        
				final TextField<Date> vaccinationDate = new TextField<Date>(
						"given_date", new PropertyModel<Date>(item.getModel(),
								"vaccinationDate"));
				
								
				
				DatePicker datePicker2= new DatePicker();
				datePicker2.setShowOnFieldClick(true);        
				vaccinationDate.add(datePicker2);
		        
				final TextField<Date> nextVaccinationDate = new TextField<Date>(
						"next_vaccination_date", new PropertyModel<Date>(
								item.getModel(), "nextVaccinationDate"));
				DatePicker datePicker3= new DatePicker();
				datePicker3.setShowOnFieldClick(true);        
				nextVaccinationDate.add(datePicker3);
				
				
				// add behavior to calculate the next vaccination date
				vaccinationDate.add(new OnChangeAjaxBehavior(){

					@Override
					protected void onUpdate(AjaxRequestTarget target) {
						// get selected vaccination type	
						if ((null != vaccinationDate.getDefaultModel())
								&& ((PropertyModel) vaccinationDate
										.getDefaultModel()).getTarget() != null) {
							Vaccination vaccination = (Vaccination) ((PropertyModel) vaccinationDate
									.getDefaultModel()).getTarget();
							if (null != vaccination.getVaccineType()) {
								Integer period = vaccination.getVaccineType()
										.getIntervalPeriod();
								if (null!=period && period > 0) {
									Calendar cal = Calendar.getInstance();
									cal.setTime((Date) vaccinationDate
											.getDefaultModelObject());
									cal.add(Calendar.DAY_OF_YEAR,
											(null == period ? 0 : period));
									nextVaccinationDate
											.setDefaultModelObject(cal
													.getTime());
									nextVaccinationDate.modelChanged();
								}
							}
						}
						target.addComponent(nextVaccinationDate);
					}
					
				});

						
				TextField<String> manName = new TextField<String>("man_name",
						new PropertyModel<String>(item.getModel(),
								"manufacturerName"));
				//unused vaccineBrand column for batchNumber purposes
				TextField<String> batchNumber = new TextField<String>("batchNumber",
						new PropertyModel<String>(item.getModel(),
								"vaccineBrand"));
				
				TextField<Date> manDate = new TextField<Date>("man_date",
						new PropertyModel<Date>(item.getModel(),
								"manufacturedDate"));
				DatePicker datePicker4= new DatePicker();
				datePicker4.setShowOnFieldClick(true);        
				manDate.add(datePicker4);
				
				TextField<Date> expiryDate = new TextField<Date>("expiry_date",
						new PropertyModel<Date>(item.getModel(),
								"vaccineExpiryDate"));
				DatePicker datePicker5= new DatePicker();
				datePicker5.setShowOnFieldClick(true);        
				expiryDate.add(datePicker5);

				vaccineType.setRequired(true);
				//lastVaccinationDate.setRequired(true);
				//vaccineType.setRequired(true);
				vaccinationDate.setRequired(true);
				//nextVaccinationDate.setRequired(true);
				//manName.setRequired(true);
				//manDate.setRequired(true);
				//expiryDate.setRequired(true);
				//vaccineType.setRequired(true);

				item.add(cBox);
				item.add(vaccineType);
				item.add(lastVaccinationDate);
				item.add(vaccinationDate);
				item.add(nextVaccinationDate);
				item.add(manName);
				item.add(batchNumber);
				item.add(manDate);
				item.add(expiryDate);

			}
		};
		// ListEditor.setReuseItems(true);

		this.errorPanel = new FeedbackPanel("feedback");

		this.rowPanel = new WebMarkupContainer("rowPanel");
		rowPanel.add(buildAddButton("vaccination_add"));
		rowPanel.add(buildRemoveButton("vaccination_remove"));
		rowPanel.add(listEditor);
		add(rowPanel);
		add(buildFeedBackPanel(this));
		rowPanel.setOutputMarkupId(true);
		errorPanel.setOutputMarkupId(true);
	}

	private Button buildAddButton(String id) {
		AjaxButton addLink = new AjaxButton(id, this) {
			@Override
			public void onSubmit(AjaxRequestTarget target, Form form) {
				Vaccination newObject = new Vaccination();
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
				removedObjects.add((Vaccination)item.getModelObject());
				
			}

		};
		removeLink.setDefaultFormProcessing(false);
		return removeLink;
	}

	private List<Vaccination> getAllVaccination() {
		int liveStockId= (Integer) ((FarmSession) getSession()).getStoreValue("livestockid");
		Criterion criterion = Restrictions.eq("id", liveStockId);
		List<Livestock> livestocks =  objectLoader.findAll(Livestock.class,criterion);		
		Livestock livestock = livestocks.get(0);
		Set<Vaccination> vaccinations = livestock.getHealth().getVaccinations();
		Iterator<Vaccination> vaccinationIterator = vaccinations.iterator();
		List<Vaccination> vaccinationsList = new ArrayList<Vaccination>();
		while(vaccinationIterator.hasNext()){
			//vaccinationsList = new ArrayList<Vaccination>();
			vaccinationsList.add(vaccinationIterator.next());
		}
		return vaccinationsList;
		
	}

	private List<VaccineType> getAllVaccinationType() {
		Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
		return objectLoader.findAll(VaccineType.class, criterion);
	}

	public ListEditor<?> getEditor() {
		return listEditor;
	}

	private FeedbackPanel buildFeedBackPanel(final Form form) {
		FeedbackPanel fp = new FeedbackPanel("feedback");
		fp.setFilter(new IFeedbackMessageFilter() {

			public boolean accept(FeedbackMessage message) {
				return form == message.getReporter();
			}
		});
		return fp;
	}

	@Override
	protected void onError() {
		error("One or more fields have invalid values");
	}

	@Override
	protected void onSubmit() {

		try {
			Livestock livestock = objectLoader.load(Livestock.class,
					(Integer) ((FarmSession) getSession())
							.getStoreValue("livestockid"));
			Health health = livestock.getHealth();
			List<Vaccination> allObjects = listEditor.getItems();
			for (Vaccination object : allObjects) {
				object.setHealth(health);
				//object.setVaccineBrand("Default");
				object.setDosage(new BigDecimal(1));				
			}
			
			farmApplicationDAO.saveHealth(health, Vaccination.class, removedObjects, allObjects);			
			removedObjects.clear();			
		} catch (NotFoundException ex) {
			throw new FarmRuntimeException(ex.getMessage(), ex);
		}
	}
	
}
