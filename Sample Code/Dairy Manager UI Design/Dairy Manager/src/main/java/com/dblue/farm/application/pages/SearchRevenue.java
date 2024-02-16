package com.dblue.farm.application.pages;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.wicket.Application;
import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.markup.html.form.AjaxButton;
import org.apache.wicket.extensions.markup.html.repeater.util.SortableDataProvider;
import org.apache.wicket.extensions.yui.calendar.DatePicker;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.FormComponent;
import org.apache.wicket.markup.html.form.validation.AbstractFormValidator;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.navigation.paging.PagingNavigator;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.markup.repeater.Item;
import org.apache.wicket.markup.repeater.data.DataView;
import org.apache.wicket.markup.repeater.data.IDataProvider;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.LoadableDetachableModel;
import org.apache.wicket.model.Model;
import org.apache.wicket.model.PropertyModel;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.FarmConfiguration;
import com.dblue.farm.Purchases;
import com.dblue.farm.ReceiptType;
import com.dblue.farm.Vendor;
import com.dblue.farm.application.FarmApplication;
import com.dblue.farm.application.FarmSession;
import com.dblue.farm.application.pages.pagination.DynamicDataProviderWrapper;
import com.dblue.farm.application.pages.pagination.EmptyFarmObjectQueryBasedDataProvider;
import com.dblue.farm.application.pages.pagination.QuerySupport;
import com.dblue.farm.application.pages.pagination.SearchDataProvider;
import com.dblue.farm.application.pages.search.CriteionAwareDropDownChoice;
import com.dblue.farm.application.pages.search.CriterionAware;
import com.dblue.farm.application.pages.search.CriterionAwareTextField;
import com.dblue.orm.FarmObject;

public class SearchRevenue extends FarmPage {

	private FeedbackPanel feedbackPanel;

	private List<FormComponent<?>> searchFields;

	private WebMarkupContainer dataWrapper;

	private SortableDataProvider<FarmObject> expenseDataProvider;

	private DataView<FarmObject> dataView;
	
	private ReceiptType receiptType;
	
	private Date saleDate;
	
	private Date saleEndDate;
	
	private Vendor vendor;
	
	@Override
	protected void buildPageComponents() {

		this.searchFields = new ArrayList<FormComponent<?>>();

		Form form = new Form("revenuesesearch");
		searchFields.add(buildReceiptType());		
		searchFields.add(new CriterionAwareTextField<String>("rcptnumber",new Model<String>(),"receiptNumber"));
		searchFields.add(buildSaleDate());
		searchFields.add(buildSaleEndDate());
		searchFields.add(buildvendors());

		for (FormComponent<?> component : searchFields) {
			form.add(component);
		}
		
		form.add(buildSearch(searchFields));
		
		form.add(new AbstractFormValidator() {

			public FormComponent<?>[] getDependentFormComponents() {
				return searchFields.toArray( new FormComponent<?>[0]);
			}

			public void validate(Form<?> form) {
				boolean hasSearchContent =false;
				for( FormComponent<?> component : searchFields){
					if( !isNull(component.getRawInput())){
						hasSearchContent=true;
					}
				}
				if (!hasSearchContent) {
					form.error("Please enter atleast one search criteria");
				}

			}

		});
		
		this.expenseDataProvider = new EmptyFarmObjectQueryBasedDataProvider<FarmObject>();
		

		this.dataWrapper = new WebMarkupContainer("datawrapper");
		this.dataWrapper.setOutputMarkupId(true);
		this.dataWrapper.add(buildDataView());
		this.dataWrapper.add(new PagingNavigator("navigator", dataView));
		//this.dataWrapper.add(new OrderByBorder("orderbycode", "receiptNumber", expenseDataProvider));	
		
		
		this.feedbackPanel = new FeedbackPanel("feedback");
		this.feedbackPanel.setOutputMarkupId(true);
		
		form.add(feedbackPanel);
		add(dataWrapper);
		add(form);	
		
	}
	
private DataView<FarmObject> buildDataView(){
		
		FarmConfiguration farmConfiguration =farmConfigurationProvider.getFarmConfiguration();
		Integer paginationSize = farmConfiguration.getPagination();		
		
		this.dataView = new DataView<FarmObject>("rows",new DynamicDataProviderWrapper<SearchRevenue>(this), paginationSize) {
			protected void populateItem(final Item<FarmObject> item) {
				IModel<FarmObject> expenseModel = (IModel<FarmObject>)item.getModel();
				final Purchases purchases = (Purchases)expenseModel.getObject();
				Link editLink=new Link<FarmObject>("revenue_edit", expenseModel) {
					public void onClick() {
						
						Integer purchaseId = purchases.getId();
						((FarmSession)getSession()).addToStore("revenue_key", purchaseId);
						setResponsePage(AddRevenue.class);											
					}
				};
				
				editLink.add(new Label("rcptNumberlbl",
								new PropertyModel<String>(purchases,
										"receiptNumber")));
				
				item.add(editLink);
				
				
				item.add(new Label("receiptType",
						new PropertyModel<String>(purchases,
								"receiptType.receipt")));
				
				item.add(new Label("vendorCode",
						new PropertyModel<String>(item.getModel(),
								"vendor.name")));
				
				item.add(new Label("saleDate",
						new PropertyModel<String>(item.getModel(),
								"saleDate")));				
				
				item.add(new Label("quantity",
						new PropertyModel<String>(item.getModel(),
								"quantity")));
				
				item.add(new Label("unitPrice",
						new PropertyModel<String>(item.getModel(),
								"unitPrice")));				
				
				item.add(new Label("amount",
						new PropertyModel<String>(item.getModel(),
								"amount")));
				
				item.add(new Label("remarks",
						new PropertyModel<String>(item.getModel(),
								"remarks")));
			}
		};
		dataView.setOutputMarkupId(true);
		return dataView;
	}
	
	private FormComponent<Vendor> buildvendors() {
		CriteionAwareDropDownChoice<Vendor> vendors = new CriteionAwareDropDownChoice<Vendor>(
				"vendor", new PropertyModel<Vendor>(this,"vendor"),
				new LoadableDetachableModel<List<Vendor>>() {

					@Override
					protected List<Vendor> load() {
						Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
						return objectLoader.findAll(Vendor.class, criterion);
					}

				}, "vendor.name");
		// breed.setRequired(true);
		vendors.setNullValid(true);
		return vendors;
	}

	private FormComponent<Date> buildSaleDate() {
		
		CriterionAwareTextField<Date> bDateFild = new CriterionAwareTextField<Date>("saleDate",new PropertyModel(this,"saleDate"),"saleDate");		
		//bDateFild.setRequired(true);
		DatePicker datePicker = new DatePicker();
		datePicker.setShowOnFieldClick(true);
		bDateFild.add(datePicker);
		return bDateFild;

	}
	
	private FormComponent<Date> buildSaleEndDate() {
			
			CriterionAwareTextField<Date> bDateFild = new CriterionAwareTextField<Date>("saleEndDate",new PropertyModel(this,"saleEndDate"),"saleDate");		
			//bDateFild.setRequired(true);
			DatePicker datePicker = new DatePicker();
			datePicker.setShowOnFieldClick(true);
			bDateFild.add(datePicker);
			return bDateFild;
	
		}

	private FormComponent<ReceiptType> buildReceiptType() {
		CriteionAwareDropDownChoice<ReceiptType> receiptType = new CriteionAwareDropDownChoice<ReceiptType>(
				"receiptType", new PropertyModel<ReceiptType>(this,"receiptType"),
				new LoadableDetachableModel<List<ReceiptType>>() {

					@Override
					protected List<ReceiptType> load() {
						Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
						return objectLoader.findAll(ReceiptType.class,criterion);
					}

				}, "receiptType.receipt");
		// breed.setRequired(true);
		receiptType.setNullValid(true);
		return receiptType;
	}

	private List<FormComponent<?>> getValidSearchFields() {

		List<FormComponent<?>> validSearchFields = new ArrayList<FormComponent<?>>();

		for (FormComponent<?> component : searchFields) {
			if (!isNull(component.getValue())) {
				validSearchFields.add(component);
			}
		}
		return validSearchFields;
	}

	private boolean isNull(String object) {
		return (null == object || "".equals(object.trim()) || "-1"
				.equals(object));
	}

	private AjaxButton buildSearch(List<FormComponent<?>> searchFields) {
		// add search button
		AjaxButton search = new AjaxButton("search") {

			@Override
			protected void onSubmit(AjaxRequestTarget target, Form<?> form) {

				List<FormComponent<?>> validSearchFields = getValidSearchFields();

				String queryString = "select distinct l from Purchases l ";
				String countQueryString = "select count(distinct l) from Purchases l ";

				if (validSearchFields.size() > 0) {
					queryString += " where  l.farm = "+ getLoginUserFarm().getId()+"  and  ";
					countQueryString += " where  l.farm = "+ getLoginUserFarm().getId()+"  and  ";
				}

				int index = 0;
				for (FormComponent<?> formComponent : validSearchFields) {
					String componentId = formComponent.getId();
					String queryVar = ((CriterionAware<?>) formComponent)
							.getProperty();
					String whereCondition = "l." + queryVar + "=?";
					if("saleDate".equals(componentId)){
						whereCondition = "l." + queryVar + ">=?";
					}else if("saleEndDate".equals(componentId)){
						whereCondition = "l." + queryVar + "<=?";
					}					
					queryString += whereCondition;
					countQueryString += whereCondition;
					if (index != (validSearchFields.size() - 1)) {
						queryString += " and ";
						countQueryString += " and ";
					}
					index++;
				}

				final List queryParams = new ArrayList();
				for (FormComponent<?> formComponent : validSearchFields) {
					Object object = formComponent.getDefaultModel().getObject();					
					if( object instanceof Date){
						queryParams.add(object);
					}else{
						String value = formComponent.getDefaultModelObjectAsString();
						queryParams.add(value);
					}
					
				}
				
				// set up the table with pagination

				expenseDataProvider = new SearchDataProvider<FarmObject>(
						"id", queryString, countQueryString) {

					@Override
					protected QuerySupport createCountQuery() {
						return new QuerySupport(getCountQueryString(),
								queryParams);
					}

					@Override
					protected QuerySupport createDataQuery() {
						return new QuerySupport(getQueryString(), queryParams);
					}
				};

				target.addComponent(dataWrapper);

			}

			@Override
			protected void onError(AjaxRequestTarget target, Form<?> form) {
				target.addComponent(form);
				target.addComponent(feedbackPanel);
			}

		};

		return search;
	}

	@Override
	public IDataProvider<FarmObject> getDataProvider() {
		
		return expenseDataProvider;
	}
	
	
	
}
