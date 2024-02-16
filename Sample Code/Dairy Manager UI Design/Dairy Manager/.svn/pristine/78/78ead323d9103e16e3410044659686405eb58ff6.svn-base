package com.dblue.farm.application.forms;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.wicket.MarkupContainer;
import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.markup.html.form.AjaxButton;
import org.apache.wicket.feedback.FeedbackMessage;
import org.apache.wicket.feedback.IFeedbackMessageFilter;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.CheckBox;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.FormComponent;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.form.validation.AbstractFormValidator;
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

import com.dblue.farm.IngredientOptions;
import com.dblue.farm.IngredientType;
import com.dblue.farm.Purchases;
import com.dblue.farm.application.components.EditorAwareForm;
import com.dblue.farm.application.components.ListEditor;
import com.dblue.farm.application.components.ListItem;
import com.dblue.farm.application.components.RemoveButton;
import com.dblue.farm.application.pages.IngredientOptionsList;

public class IngredientOptionsListForm extends AbstractWebForm implements
		EditorAwareForm {

	// Dropdown list view
	private ListEditor<IngredientType> ingredientTypeListEditor;

	private ListEditor<String> ingredientOptionsListEditor;

	private FeedbackPanel errorPanel;

	// Removed dropdown objects from the current user event
	private List<TextField<String>> removedObjects = new ArrayList<TextField<String>>();

	// Add button
	private Button addButton;

	// Add button
	private Button removeButton;

	// Panel representing dropdowns, container for all dropdown values for a
	// category.
	// Acts as an Ajax target to complete refresh for that panel alone.
	private MarkupContainer rowPanel;
	
	List<IngredientOptions> allIngredientOptions;
	
	Map<TextField<String>, List<IngredientOptions>> formulaMap = new HashMap<TextField<String>, List<IngredientOptions>>();
	
//	Map<String, TextField<String>> updatedFormulaLookup = new HashMap<String, TextField<String>>();

	public IngredientOptionsListForm(String id) {
		super("ingredientOptionsForm");
		build();
	}

	private void build() {

		buildEditor();

		this.errorPanel = new FeedbackPanel("feedback");

		this.rowPanel = new WebMarkupContainer("rowPanel");

		rowPanel.add(ingredientTypeListEditor);
		rowPanel.add(ingredientOptionsListEditor);

		rowPanel.add(buildAddButton("addRow"));
		rowPanel.add(buildRemoveButton("removeRow"));
		rowPanel.add(buildUpdateButton("update"));

		add(rowPanel);
		add(errorPanel);
		//add(buildFeedBackPanel(this));

		rowPanel.setOutputMarkupId(true);

		errorPanel.setOutputMarkupId(true);
		
		this.add(errorPanel);
		
		add(new AbstractFormValidator(){

			public FormComponent<?>[] getDependentFormComponents() {
				// TODO Auto-generated method stub
				return null;
			}

			public void validate(Form<?> form) {
				Iterator<TextField<String>> names = formulaMap.keySet().iterator();
				List<String> existingNames = new ArrayList<String>();
				
				while(names.hasNext()){
					TextField<String> name = names.next();
					if(existingNames.contains(name.getRawInput())){
						form.error("Formula names have to be unique");
					}else{
						existingNames.add(name.getRawInput());
					}
				}
			}
			
		});
	}

	private void buildEditor() {
		List<IngredientType> ingredientTypes = getAllIngredientTypes();

		IModel<List<IngredientType>> ingredientType = new ListModel<IngredientType>(
				ingredientTypes);

		this.ingredientTypeListEditor = new ListEditor<IngredientType>(
				"columns", ingredientType) {
			@Override
			protected void onPopulateItem(ListItem<IngredientType> item) {

				Label ingredient = new Label(
						"ingredient",
						new PropertyModel<String>(item.getModel(), "ingredient"));

				item.add(ingredient);

			}
		};
		ingredientTypeListEditor.setOutputMarkupId(true);

		// editor objects
		IModel<List<String>> optionsmodel = new ListModel<String>(
				getAllFormulas());
		this.ingredientOptionsListEditor = new ListEditor<String>("list",
				optionsmodel) {

			@Override
			protected void onPopulateItem(ListItem<String> item) {
				String formulaName = item.getModelObject();
				allIngredientOptions = getIngredientOptions(formulaName);
				

				if (allIngredientOptions.size() == 0) {
					// add elementgs
					List<IngredientType> allIngredientTypes = getAllIngredientTypes();
					for (IngredientType ingredientType : allIngredientTypes) {
						IngredientOptions newIngredientOptions = new IngredientOptions();
						newIngredientOptions.setFarm(getLoginUserFarm());
						newIngredientOptions.setLabel(formulaName);
						newIngredientOptions.setIngredientType(ingredientType);
						allIngredientOptions.add(newIngredientOptions);
					}
				}
				CheckBox cBox = new CheckBox("ingredientfeedcheck", new Model<Boolean>());
				TextField<String> forumlaField =new TextField<String>("label", new Model<String>(formulaName));
				forumlaField.setRequired(true);
				// add input fields.
				item.add(cBox);
				item.add(forumlaField);
				
				ListEditor<IngredientOptions> ingredientOptionsEditors = new ListEditor<IngredientOptions>(
						"listeditor", new ListModel<IngredientOptions>(
								allIngredientOptions)) {
					@Override
					protected void onPopulateItem(
							ListItem<IngredientOptions> item) {
						if( item.getModelObject().getValue() == null){
							item.getModelObject().setValue(new BigDecimal(0));
						}
						item.add(new TextField<IngredientOptions>("value", new PropertyModel<IngredientOptions>(item.getModelObject(), "value")).setRequired(true));
					}
				};
				item.add(ingredientOptionsEditors);
			//	updatedFormulaLookup.put(formulaName,forumlaField );
				formulaMap.put(forumlaField, allIngredientOptions);
			}
		};

	}

	protected List<IngredientOptions> getIngredientOptions(String formula) {
		Session session = sessionFactory.getCurrentSession();
		Criteria criteria = session.createCriteria(IngredientOptions.class);
		criteria.add(Restrictions.eq("farm",getLoginUserFarm()));		
		criteria.add(Restrictions.eq("label", formula));
		return objectLoader.findAll(IngredientOptions.class, criteria);
	}

	private Button buildUpdateButton(String id) {
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

	private Button buildAddButton(String id) {
		AjaxButton addLink = new AjaxButton(id, this) {
			@Override
			public void onSubmit(AjaxRequestTarget target, Form form) {				
				
				ingredientOptionsListEditor.addItem(Calendar.getInstance().getTimeInMillis()+"");
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
		AjaxButton removeLink = new RemoveButton(removeButtonId,
				ingredientOptionsListEditor) {

			@Override
			protected boolean isItemSelected(ListItem<?> item) {
				CheckBox cBox = (CheckBox) item.get(0);
				return "on".equals(cBox.getValue())
						|| "true".equals(cBox.getValue());
			}

			@Override
			protected void trackRemovedDomainObject(ListItem<?> item) {
				
				TextField<String> removedItem = (TextField<String>)item.get(1);				
				removedObjects.add(removedItem);
			}

		};

		return removeLink;
	}

	private List<String> getAllFormulas() {
		Query query = sessionFactory.getCurrentSession().createQuery(
				"select distinct iop.label from IngredientOptions iop where iop.farm ="+getLoginUserFarm().getId());
		List<String> labels = query.list();
		return labels;
	}

	private List<IngredientType> getAllIngredientTypes() {
		Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
		List<IngredientType> allIngredientTypes = objectLoader
				.findAll(IngredientType.class,criterion);

		return allIngredientTypes;
	}

	public ListEditor<?> getEditor() {
		return ingredientOptionsListEditor;
	}

//	@Override
//	protected void onError() {
//		error("One or more fields have invalid values");
//	}

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
	protected void onSubmit() {		
		Iterator  iterator = formulaMap.keySet().iterator();
		
		List<List<IngredientOptions>> superRemovedObjects = new ArrayList<List<IngredientOptions>>();
		List<List<IngredientOptions>> superAllObjects = new ArrayList<List<IngredientOptions>>();
		
		while(iterator.hasNext()){
			TextField<String> oldForumlaValue = (TextField<String>)iterator.next();
//			TextField<String> formulaField = updatedFormulaLookup.get(oldForumlaValue);
//			String newFormulaValue = formulaField.getModelObject();
			
			List<IngredientOptions> removedObjects1 = new ArrayList<IngredientOptions>();
			List<IngredientOptions> allObjects = new ArrayList<IngredientOptions>();
			
			List<IngredientOptions> ingredientOptionsList = (List<IngredientOptions>) formulaMap.get(oldForumlaValue);
			for(IngredientOptions ingredientOptions:ingredientOptionsList){
				// before save get the value and update in ingredentoptions
				ingredientOptions.setLabel(oldForumlaValue.getModelObject());
				if(removedObjects.contains(oldForumlaValue)){
					//objectLoader.delete(IngredientOptions.class, ingredientOptions);
					removedObjects1.add(ingredientOptions);
				}else{
					allObjects.add(ingredientOptions);
					//objectLoader.save(IngredientOptions.class, ingredientOptions);
				}
			}
			superRemovedObjects.add(removedObjects1);
			superAllObjects.add(allObjects);			
		}
		
		farmApplicationDAO.handleIngredientOptionsList(IngredientOptions.class, superRemovedObjects, superAllObjects);
		
		for(TextField<String> removedField : removedObjects){
			formulaMap.remove(removedField);
		}
		removedObjects.clear();
		getSession().info("Ingredient Options List has been saved or updated");
		setResponsePage(IngredientOptionsList.class);
	}
}
