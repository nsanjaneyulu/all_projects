package com.dblue.farm.application.forms;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
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
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.model.util.ListModel;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.Farm;
import com.dblue.farm.Production;
import com.dblue.farm.ProductionConfig;
import com.dblue.farm.application.components.EditorAwareForm;
import com.dblue.farm.application.components.ListEditor;
import com.dblue.farm.application.components.ListItem;

public class MilkProductionForm extends AbstractWebForm implements EditorAwareForm {

	// Dropdown list view
	private ListEditor<Production> listEditor;

	private FeedbackPanel errorPanel;
//	// Removed dropdown objects from the current user event
//	private List<Production> removedObjects = new ArrayList<Production>();
//
//	// Add button
//	private Button addButton;
//
//	// Add button
//	private Button removeButton;

	// Panel representing dropdowns, container for all dropdown values for a
	// category.
	// Acts as an Ajax target to complete refresh for that panel alone.
	private MarkupContainer rowPanel;

//	private Date effectiveDate;
//
	// formatting date inputs
	private SimpleDateFormat sdf = new SimpleDateFormat("dd-MMM-yyyy");
//
//	private TextField<Date> effDate;

	public MilkProductionForm(String id) {
		super("milkproductionform");
		build();
	}

	private void build() {

		buildEditor();

		this.errorPanel = new FeedbackPanel("feedback");

		this.rowPanel = new WebMarkupContainer("rowPanel");
//		rowPanel.add(buildAddButton("addRow"));
		//rowPanel.add(buildRemoveButton("removeRow"));
		rowPanel.add(buildUpdateButton("update"));

		rowPanel.add(listEditor);

		add(rowPanel);
		add(buildFeedBackPanel(this));
		rowPanel.setOutputMarkupId(true);
		errorPanel.setOutputMarkupId(true);
	}

	private void buildEditor() {
		
		Date currentDate = new Date();
		currentDate.setHours(0);
		currentDate.setMinutes(0);
		currentDate.setSeconds(0);
		
		
		
		List<Production> allObjects = getAllProductions(currentDate);

		IModel<List<Production>> model = new ListModel<Production>(allObjects);
		
		

		this.listEditor = new ListEditor<Production>("rows", model) {
			@Override
			protected void onPopulateItem(ListItem<Production> item) {
				// for each row
				// Selected object check box
//				CheckBox cBox = new CheckBox("dailytfeedcheck",
//						new Model<Boolean>(false),
//						(FarmObject) item.getDefaultModelObject());
				
//				TextField<Date> date = new TextField<Date>("date",
//						new PropertyModel<Date>(item.getModel(), "date"));
				
				DropDownChoice<ProductionConfig> productionConfig = new DropDownChoice<ProductionConfig>(
						"productionConfig", new PropertyModel<ProductionConfig>(
								item.getModel(), "productionConfig"),
						getAllProductionConfigs());
				
				TextField<BigDecimal> yield = new TextField<BigDecimal>("yield",
						new PropertyModel<BigDecimal>(item.getModel(), "yield"));
				TextField<BigDecimal> fatPercentile = new TextField<BigDecimal>("fatPercentile",
						new PropertyModel<BigDecimal>(item.getModel(), "fatPercentile"));
				
			//	date.setRequired(true);
				productionConfig.setRequired(true);
				yield.setRequired(true);
				fatPercentile.setRequired(true);
				
			//	item.add(cBox);
//				item.add(date);
				item.add(productionConfig);				
				item.add(yield);
				item.add(fatPercentile);
				

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

//	private Button buildAddButton(String id) {
//		AjaxButton addLink = new AjaxButton(id, this) {
//			@Override
//			public void onSubmit(AjaxRequestTarget target, Form form) {
//				Production newObject = new Production();
//				listEditor.addItem(newObject);
//				if (target != null) {
//					target.addComponent(rowPanel);
//					target.addComponent(errorPanel);
//				}
//			}
//
//			@Override
//			protected void onError(AjaxRequestTarget target, Form<?> form) {
//				super.onError(target, form);
//				target.addComponent(errorPanel);
//			}
//		};
//		return addLink;
//	}

//	private Button buildRemoveButton(String removeButtonId) {
//		AjaxButton removeLink = new RemoveButton(removeButtonId, listEditor) {
//
//			@Override
//			protected boolean isItemSelected(ListItem<?> item) {
//				CheckBox cBox = (CheckBox) item.get(0);
//				return "on".equals(cBox.getValue())
//						|| "true".equals(cBox.getValue());
//			}
//
//			@Override
//			protected void trackRemovedDomainObject(ListItem<?> item) {
//				removedObjects.add((Production) item.getModelObject());
//			}
//
//		};
//
//		return removeLink;
//	}

	
	private List<Production> getAllProductions(Date currentDate) {
		
			
		Session session = sessionFactory.getCurrentSession();
		
		List results = session
				.createCriteria(Production.class).add(Restrictions.eq("date", currentDate))
				.setProjection(
						Projections
								.projectionList()								
								.add(Projections.sum("yield"), "yield")								
								.add(Projections.avg("fatPercentile"),"fatPercentile")								
								.add(Projections.groupProperty("productionConfig"),"productionConfig"))								
								.addOrder(Order.asc("productionConfig")).list();
		
		
				
		return results;
	}

	private List<ProductionConfig> getAllProductionConfigs() {
		List<ProductionConfig> productionConfigs = objectLoader
				.findAll(ProductionConfig.class);
		
		return productionConfigs;
	}
	
	
	public ListEditor<?> getEditor() {
		return listEditor;
	}

	@Override
	protected void onError() {
		error("One or more fields have invalid values");
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
	protected void onSubmit() {

		// update removed items first
//		for (Production production : removedObjects) {
//			objectLoader.delete(Production.class, production);
//		}
//		removedObjects.clear();
		List<Farm> allFarms  = objectLoader.findAll(Farm.class);
		
		List<Production> allObjects = listEditor.getItems();
		for (Production object : allObjects) {
			object.setFarm(allFarms.get(0));
			object.setMonth(object.getDate().getMonth());
			objectLoader.save(Production.class, object);
		}
	}
}
