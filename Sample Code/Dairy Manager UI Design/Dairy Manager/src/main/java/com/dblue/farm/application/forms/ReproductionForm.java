package com.dblue.farm.application.forms;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.apache.wicket.MarkupContainer;
import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.form.OnChangeAjaxBehavior;
import org.apache.wicket.ajax.markup.html.form.AjaxButton;
import org.apache.wicket.behavior.AbstractBehavior;
import org.apache.wicket.extensions.yui.calendar.DatePicker;
import org.apache.wicket.feedback.FeedbackMessage;
import org.apache.wicket.feedback.IFeedbackMessageFilter;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.basic.Label;
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
import org.joda.time.DateMidnight;
import org.joda.time.DateTime;
import org.joda.time.Years;

import com.dblue.farm.Lactation;
import com.dblue.farm.Livestock;
import com.dblue.farm.Reproduction;
import com.dblue.farm.application.FarmSession;
import com.dblue.farm.application.components.CheckBox;
import com.dblue.farm.application.components.EditorAwareForm;
import com.dblue.farm.application.components.ListEditor;
import com.dblue.farm.application.components.ListItem;
import com.dblue.farm.application.components.RemoveButton;
import com.dblue.farm.application.pages.HealthNew;
import com.dblue.farm.application.pages.ListLiveStocks;
import com.dblue.farm.application.pages.LiveStockNew;
import com.dblue.farm.exception.FarmRuntimeException;
import com.dblue.farm.exception.NotFoundException;
import com.dblue.orm.FarmObject;

public class ReproductionForm extends AbstractWebForm implements EditorAwareForm{
	// Dropdown list view
		private ListEditor<Reproduction> listEditor;

		private FeedbackPanel errorPanel;

		// Removed dropdown objects from the current user event
		private List<Reproduction> removedObjects = new ArrayList<Reproduction>();

		// Add button
		private Button addButton;

		// Add button
		private Button removeButton;
		
		protected SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		
		// Panel representing dropdowns, container for all dropdown values for a
		// category.
		// Acts as an Ajax target to complete refresh for that panel alone.
		private MarkupContainer rowPanel;

	public ReproductionForm() {
		super("reproductionForm");
		build();
	}
	
	private void build() {

		List<Reproduction> allObjects = getAllReproduction();

		IModel<List<Reproduction>> model = new ListModel<Reproduction>(allObjects);

		this.listEditor = new ListEditor<Reproduction>("rows", model) {
			@Override
			protected void onPopulateItem(ListItem<Reproduction> item) {
				
				Livestock livestock=null;
				try{
					livestock =objectLoader.load(Livestock.class,(Integer) ((FarmSession) getSession()).getStoreValue("livestockid"));
				}catch(NotFoundException ex){
					throw new FarmRuntimeException(ex.getMessage(),ex);
				}
				// for each row
				// Selected object check box
				CheckBox cBox = new CheckBox("reprod_check",
						new Model<Boolean>(false),
						(FarmObject) item.getDefaultModelObject());
				Label lactationNumber = new Label("lactationNumber",new PropertyModel<String>(item.getModel(),"lactationNumber"));
				TextField<String> semenNumber = new TextField<String>("semenNumber",new PropertyModel<String>(item.getModel(),"semenNumber"));
				
				TextField<Date> semenGivenDate = new TextField<Date>("semenGivenDate", new PropertyModel<Date>(item.getModel(), "semenGivenDate"));
				DatePicker datePicker1= new DatePicker();
				datePicker1.setShowOnFieldClick(true);        
				semenGivenDate.add(datePicker1);
				
				TextField<Date> pregnencyTestDate = new TextField<Date>("pregnencyTestDate",new PropertyModel<Date>(item.getModel(),"pregnencyTestDate"));
				DatePicker datePicker2= new DatePicker();
				datePicker2.setShowOnFieldClick(true);        
				pregnencyTestDate.add(datePicker2);
				
				DropDownChoice<Character>  pregnencyResult = new DropDownChoice<Character>("pregnencyResult", new PropertyModel<Character>(item.getModel(),"pregnencyResult"),new ListModel<Character>(Arrays.asList(new Character[]{'P','F'})));
				
				//TextField<String> pregnencyResult = new TextField<String>("pregnencyResult",new PropertyModel<String>(item.getModel(),"pregnencyResult"));
				
				
				final TextField<Date> deliveryDate = new TextField<Date>("deliveryDate",new PropertyModel<Date>(item.getModel(),"deliveryDate"));
				DatePicker datePicker3= new DatePicker();
				datePicker3.setShowOnFieldClick(true);        
				deliveryDate.add(datePicker3);
				
				TextField<String> numberOfCalfs = new TextField<String>("numberOfCalfs",new PropertyModel<String>(item.getModel(),"numberOfCalfs")){
					@Override
					public boolean isRequired(){
						String rawValue = deliveryDate.getRawInput();
						return rawValue != null && !"".equals(rawValue.trim());						
					}
				};
								
				//TextField<String> calfsSex = new TextField<String>("calfsSex",new PropertyModel<String>(item.getModel(),"calfsSex"));
				DropDownChoice<String> calfsSex = new DropDownChoice<String>("calfsSex", new PropertyModel<String>(item.getModel(),"calfsSex"),new ListModel<String>(Arrays.asList(new String[]{"M","F"}))){
				@Override
				public boolean isRequired(){
					String rawValue = deliveryDate.getRawInput();
					return rawValue != null && !"".equals(rawValue.trim());						
				}
			};
				TextArea<String> remarks = new TextArea<String>("remarks",new PropertyModel<String>(item.getModel(), "remarks"));
				
				//lactationNumber.setRequired(true);
				semenNumber.setRequired(true);
				semenGivenDate.setRequired(true);
				
				// add behavior
				ReproductionForm.this.addAjaxBehaviorForCalvate(semenGivenDate, pregnencyResult, deliveryDate);

				item.add(cBox);
				item.add(lactationNumber);
				item.add(semenNumber);
				item.add(semenGivenDate);
				item.add(remarks);
				item.add(pregnencyTestDate);
				item.add(pregnencyResult);
				item.add(deliveryDate);
				item.add(numberOfCalfs);
				item.add(calfsSex);

			}
		};
		// ListEditor.setReuseItems(true);

		this.errorPanel = new FeedbackPanel("feedback");

		this.rowPanel = new WebMarkupContainer("rowPanel");
		rowPanel.add(buildAddButton("add_row"));
		rowPanel.add(buildRemoveButton("del_row"));
		rowPanel.add(buildBack());
		rowPanel.add(buildSave());
		rowPanel.add(listEditor);
		add(rowPanel);
		add(buildFeedBackPanel(this));
		rowPanel.setOutputMarkupId(true);
		errorPanel.setOutputMarkupId(true);
	}
	
	private void addAjaxBehaviorForCalvate(final TextField semenGivenDate, final DropDownChoice pregnencyResult,final TextField<Date> deliveryDate) {
		semenGivenDate.add(new CalvDateBehavior(semenGivenDate,pregnencyResult,deliveryDate));
		pregnencyResult.add(new CalvDateBehavior(semenGivenDate,pregnencyResult,deliveryDate));
	}
	
	class CalvDateBehavior extends OnChangeAjaxBehavior{
		
		private TextField semenGivenDate;
		private DropDownChoice pregnencyResult;
		private TextField<Date> deliveryDate;
		
		public CalvDateBehavior(TextField semenGivenDate,DropDownChoice pregnencyResult,TextField<Date> deliveryDate){
			this.semenGivenDate=semenGivenDate;
			this.pregnencyResult=pregnencyResult;
			this.deliveryDate = deliveryDate;
		}
		
		@Override
		protected void onUpdate(AjaxRequestTarget target) {
			// update the cost			
			String semenGivenDateString = semenGivenDate.getDefaultModelObjectAsString();
			String pregnencyResultString = pregnencyResult.getDefaultModelObjectAsString();
			
			if (null != semenGivenDateString && "P".equals(pregnencyResultString)) {
				try {
					Date birthDateDate = sdf.parse(semenGivenDateString);
					Calendar calendar = Calendar.getInstance();
					calendar.setTime(birthDateDate);
					//TODO: add the exact number of days.
					calendar.add(Calendar.DAY_OF_MONTH,30);						
					PropertyModel<Date> deliveryDateModel = (PropertyModel<Date>) deliveryDate.getModel();
					deliveryDateModel.setObject(calendar.getTime());
					deliveryDate.modelChanged();
				} catch (Exception ex) {
					ex.printStackTrace();
				}
			}else{
				PropertyModel<Date> deliveryDateModel = (PropertyModel<Date>) deliveryDate.getModel();
				deliveryDateModel.setObject(null);
				deliveryDate.modelChanged();
			}
			target.addComponent(deliveryDate);
		}
	}
	
	private AjaxButton buildSave(){
		AjaxButton save = new AjaxButton("save") {
				
				@Override
				protected void onSubmit(AjaxRequestTarget target, Form<?> form) {
					target.addComponent(form);						
				}

				@Override
				protected void onError(AjaxRequestTarget target, Form<?> form) {
					target.addComponent(form);		
				}
				
				

				@Override
				public boolean isVisible() {
					return licensingService.hasValidLicense();
				}

				@Override
				public boolean isEnabled() {
					return licensingService.hasValidLicense();
				}
				
				
			};
			return save;
	}
	
	private AjaxButton buildBack(){
		AjaxButton back = new AjaxButton("back") {
			
			@Override
			protected void onSubmit(AjaxRequestTarget target, Form<?> form) {
				setResponsePage(HealthNew.class);				
			}
		};
		
		return back;
	}

	private Button buildAddButton(String id) {
		AjaxButton addLink = new AjaxButton(id, this) {
			@Override
			public void onSubmit(AjaxRequestTarget target, Form form) {
				Reproduction newObject = new Reproduction();
				newObject.setFarm(getLoginUserFarm());
				int liveStockId= (Integer) ((FarmSession) getSession()).getStoreValue("livestockid");
				Criterion criterion = Restrictions.eq("id", liveStockId);
				List<Livestock> livestocks =  objectLoader.findAll(Livestock.class,criterion);		
				Livestock livestock = livestocks.get(0);
				Set<Lactation> lactations = livestock.getLactations();
				List<Lactation> listLactations = new ArrayList<Lactation>();
				int currentLactation = 0;
				if(lactations.size()>0){
					listLactations.addAll(lactations);			
					Collections.sort(listLactations, new LactationComparator());
					currentLactation = listLactations.get(listLactations.size()-1).getLactationNumber();			
				}
				newObject.setLactationNumber(currentLactation);
				
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
				removedObjects.add((Reproduction)item.getModelObject());
			}

		};
		removeLink.setDefaultFormProcessing(false);
		return removeLink;
	}

	private List<Reproduction> getAllReproduction() {
		int liveStockId= (Integer) ((FarmSession) getSession()).getStoreValue("livestockid");
		Criterion criterion = Restrictions.eq("id", liveStockId);
		List<Livestock> livestocks =  objectLoader.findAll(Livestock.class,criterion);		
		Livestock livestock = livestocks.get(0);
		Set<Reproduction> reproductions = livestock.getReproductions();
		Iterator<Reproduction> reproductionsIterator = reproductions.iterator();
		List<Reproduction> reproductionsList = new ArrayList<Reproduction>();
		while(reproductionsIterator.hasNext()){
			//vaccinationsList = new ArrayList<Vaccination>();
			reproductionsList.add(reproductionsIterator.next());
		}
		return reproductionsList;
		
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
			// save objects.
			//objectLoader.save(Livestock.class,livestock);
			List<Reproduction> allObjects = listEditor.getItems();
			int totalNewLiveStock = 0;
			for (Reproduction object : allObjects) {
				object.setLivestock(livestock);
				//objectLoader.save(Reproduction.class, object);
				//livestock.getReproductions().add(object);
				
				if (object.getId() == null
						&& object.getDeliveryDate() != null) {
				
					totalNewLiveStock += object.getNumberOfCalfs();
				}
			}			
			if(!licensingService.hasValidLicense(totalNewLiveStock)){
				error("Your license doesnt allow creation of "+ totalNewLiveStock +" more livestocks");
				//throw new LicensingException("Your license doesnt allow creation of "+ totalNewLiveStock +" more livestocks");				
			}else{
				farmApplicationDAO.saveReproduction(livestock, removedObjects, allObjects);
				getSession().info("Live Stock "+livestock.getCode()+" has been saved or updated");
				setResponsePage(ListLiveStocks.class);
			}
		} catch (NotFoundException ex) {
			throw new FarmRuntimeException(ex.getMessage(), ex);
		}
	}
	
	private class LactationComparator implements Comparator<Lactation> {

		public int compare(Lactation o1, Lactation o2) {
			if (o1 == null || o2 == null) {
				throw new IllegalArgumentException(
						"Lactation object cant be null for comparision");
			}

			int o1Order = o1.getLactationNumber();
			int o2Order = o2.getLactationNumber();
			return (o1Order > o2Order ? 1 : (o1Order == o2Order ? 0 : -1));
		}

	}
	
}
