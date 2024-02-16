package com.dblue.farm.application.forms;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.wicket.MarkupContainer;
import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.markup.html.form.AjaxButton;
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

import com.dblue.farm.Farm;
import com.dblue.farm.Ingredient;
import com.dblue.farm.IngredientType;
import com.dblue.farm.application.components.CheckBox;
import com.dblue.farm.application.components.EditorAwareForm;
import com.dblue.farm.application.components.ListEditor;
import com.dblue.farm.application.components.ListItem;
import com.dblue.farm.application.components.RemoveButton;
import com.dblue.farm.application.pages.IngredientList;
import com.dblue.orm.FarmObject;

public class IngredientForm extends AbstractWebForm implements EditorAwareForm {

	// Dropdown list view
	private ListEditor<Ingredient> listEditor;

	private FeedbackPanel errorPanel;

	// Removed dropdown objects from the current user event
	private List<Ingredient> removedObjects = new ArrayList<Ingredient>();

	// Add button
	private Button addButton;

	// Add button
	private Button removeButton;

	// Panel representing dropdowns, container for all dropdown values for a
	// category.
	// Acts as an Ajax target to complete refresh for that panel alone.
	private MarkupContainer rowPanel;

	private Date effectiveDate;

	// formatting date inputs
	private SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

	private TextField<Date> effDate;

	public IngredientForm(String id) {
		super("ingredientForm");
		build();
	}

	private void build() {

		buildEditor();

		this.errorPanel = new FeedbackPanel("feedback");

		this.rowPanel = new WebMarkupContainer("rowPanel");
		rowPanel.add(buildAddButton("addRow"));
		rowPanel.add(buildRemoveButton("removeRow"));
		rowPanel.add(buildUpdateButton("update"));

		rowPanel.add(listEditor);

		add(rowPanel);
		//add(buildFeedBackPanel(this));
		rowPanel.setOutputMarkupId(true);
		errorPanel.setOutputMarkupId(true);
		this.add(errorPanel );	
		
	}

	private void buildEditor() {
		List<Ingredient> allObjects = getAllIngredients();

		IModel<List<Ingredient>> model = new ListModel<Ingredient>(allObjects);

		this.listEditor = new ListEditor<Ingredient>("rows", model) {
			@Override
			protected void onPopulateItem(ListItem<Ingredient> item) {
				// for each row
				// Selected object check box
				CheckBox cBox = new CheckBox("ingredientfeedcheck",
						new Model<Boolean>(false),
						(FarmObject) item.getDefaultModelObject());
				DropDownChoice<IngredientType> ingredientType = new DropDownChoice<IngredientType>(
						"ingredientType", new PropertyModel<IngredientType>(
								item.getModel(), "ingredientType"),
						getAllIngredientTypes());
				ingredientType.setRequired(true);
				TextField<BigDecimal> tdn = new TextField<BigDecimal>("tdn",
						new PropertyModel<BigDecimal>(item.getModel(), "tdn"));
				tdn.setRequired(true);
				TextField<BigDecimal> cp = new TextField<BigDecimal>("cp",
						new PropertyModel<BigDecimal>(item.getModel(), "cp"));
				cp.setRequired(true);
				TextField<BigDecimal> udp = new TextField<BigDecimal>("udp",
						new PropertyModel<BigDecimal>(item.getModel(), "udp"));
				udp.setRequired(true);
				TextField<BigDecimal> rdp = new TextField<BigDecimal>("rdp",
						new PropertyModel<BigDecimal>(item.getModel(), "rdp"));
				rdp.setRequired(true);
				TextField<BigDecimal> ca = new TextField<BigDecimal>("ca",
						new PropertyModel<BigDecimal>(item.getModel(), "ca"));
				ca.setRequired(true);
				TextField<BigDecimal> p = new TextField<BigDecimal>("p",
						new PropertyModel<BigDecimal>(item.getModel(), "p"));
				p.setRequired(true);
				TextField<BigDecimal> rate = new TextField<BigDecimal>("rate",
						new PropertyModel<BigDecimal>(item.getModel(), "rate"));
				rate.setRequired(true);

				item.add(cBox);
				item.add(ingredientType);
				item.add(tdn);
				item.add(cp);
				item.add(udp);
				item.add(rdp);
				item.add(ca);
				item.add(p);
				item.add(rate);

			}
		};
		listEditor.setOutputMarkupId(true);
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
				Ingredient newObject = new Ingredient();
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
				removedObjects.add((Ingredient) item.getModelObject());
			}

		};
		removeLink.setDefaultFormProcessing(false);
		return removeLink;
	}

	private List<Ingredient> getAllIngredients() {
		Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
		return objectLoader.findAll(Ingredient.class,criterion);
	}

	private List<IngredientType> getAllIngredientTypes() {
		Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
		List<IngredientType> allIngredientTypes = objectLoader
				.findAll(IngredientType.class,criterion);
		
		return allIngredientTypes;
	}
	
	
	public ListEditor<?> getEditor() {
		return listEditor;
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
//		List<Farm> allFarms  = objectLoader.findAll(Farm.class);
		
		List<Ingredient> allObjects = listEditor.getItems();
//		for (Ingredient object : allObjects) {
//			object.setFarm(allFarms.get(0));												
//		}		
		farmApplicationDAO.handleDropDownUpdates(Ingredient.class,removedObjects,allObjects);
		removedObjects.clear();
		getSession().info("Ingredient Rate List has been saved or updated");
		setResponsePage(IngredientList.class);
	}
}
