package com.dblue.farm.application.pages;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.apache.wicket.Application;
import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.markup.html.form.AjaxButton;
import org.apache.wicket.extensions.markup.html.repeater.data.sort.OrderByBorder;
import org.apache.wicket.extensions.yui.calendar.DatePicker;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.form.DropDownChoice;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.FormComponent;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.form.validation.AbstractFormValidator;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.navigation.paging.PagingNavigator;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.markup.repeater.Item;
import org.apache.wicket.markup.repeater.data.DataView;
import org.apache.wicket.markup.repeater.data.IDataProvider;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.LoadableDetachableModel;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.model.util.ListModel;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.FarmConfiguration;
import com.dblue.farm.StockAudit;
import com.dblue.farm.StockType;
import com.dblue.farm.application.FarmApplication;
import com.dblue.farm.application.FarmSession;
import com.dblue.farm.application.pages.pagination.DynamicDataProviderWrapper;
import com.dblue.farm.application.pages.pagination.EmptyFarmObjectQueryBasedDataProvider;
import com.dblue.farm.application.pages.pagination.FarmObjectQueryBasedDataProvider;
import com.dblue.farm.application.pages.pagination.QuerySupport;
import com.dblue.farm.application.pages.pagination.SearchDataProvider;
import com.dblue.orm.FarmObject;

public class ListStock extends FarmPage {
	
	private FeedbackPanel feedbackPanel;
		
	private StockType stockType;
	
	private String operation;
	
	private Date startDate;
	
	private Date endDate;
	
	private List<FormComponent<?>> searchFields;
	
	private WebMarkupContainer dataWrapper;
	
	private FarmObjectQueryBasedDataProvider<FarmObject> stockDataProvider;
	
	DataView<FarmObject> dataView;
	
	@Override
	protected void buildPageComponents() {
		
		searchFields= new ArrayList<FormComponent<?>>();

		Form form = new Form("stockSearch");
		
		DropDownChoice<String> operationDpDn  = new DropDownChoice<String>("operation", new PropertyModel<String>(this, "operation") ,new ListModel<String>(Arrays.asList(new String[]{"Procure","Consume"})));		
		DropDownChoice<StockType> stockTypeDpDn = buildStockType(); 				
		
		
		TextField<Date> startDateField= new TextField<Date>("startDate", new PropertyModel<Date>(this, "startDate"));
		startDateField.setRequired(true);
		DatePicker datePicker = new DatePicker();
        datePicker.setShowOnFieldClick(true);     
        startDateField.add(datePicker);
        
        TextField<Date> endDateField= new TextField<Date>("endDate", new PropertyModel<Date>(this, "endDate"));
		endDateField.setRequired(true);
		DatePicker datePicker2 = new DatePicker();
        datePicker2.setShowOnFieldClick(true);     
        endDateField.add(datePicker2);
		
		searchFields.add(operationDpDn);
		searchFields.add(stockTypeDpDn);
		searchFields.add(startDateField);
		searchFields.add(endDateField);
		
		for( FormComponent<?> component : searchFields){
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
		
		this.stockDataProvider = new EmptyFarmObjectQueryBasedDataProvider<FarmObject>();
		
		this.dataWrapper = new WebMarkupContainer("datawrapper");
		this.dataWrapper.setOutputMarkupId(true);
		this.dataWrapper.add(buildDataView());
		this.dataWrapper.add(new PagingNavigator("navigator", dataView));
		this.dataWrapper.add(new OrderByBorder("orderbycode", "code", stockDataProvider));	

		
		this.feedbackPanel = new FeedbackPanel("feedback");
		this.feedbackPanel.setOutputMarkupId(true);
		
		form.add(feedbackPanel);
		add(dataWrapper);
		add(form);		

	}
	
	
	
	
	private DataView<FarmObject> buildDataView(){
		FarmConfiguration farmConfiguration =farmConfigurationProvider.getFarmConfiguration();
		Integer paginationSize = farmConfiguration.getPagination();
		
		this.dataView = new DataView<FarmObject>("rows",new DynamicDataProviderWrapper<ListStock>(this), paginationSize) {
			protected void populateItem(final Item<FarmObject> item) {				
				
				item.add(new Label("stockCode",
								new PropertyModel<String>(item.getModel(),
										"stockType.stockCode")));
				
				//item.add(editLink);
				
				
				item.add(new Label("stockName",
						new PropertyModel<String>(item.getModel(),
								"stockType.stockName")));

				item.add(new Label("stockCategory", new PropertyModel<String>(
						item.getModel(), "stockType.StockCategory.stock")));

				item.add(new Label("au_operation",
						new PropertyModel<String>(item.getModel(),
								"operation")));

				item.add(new Label("au_quanity",
						new PropertyModel<String>(item.getModel(),
								"quantity")));				
			}
		};
		dataView.setOutputMarkupId(true);
		return dataView;
	}

	
	
	private List<FormComponent<?>> getValidSearchFields(){
		
		List<FormComponent<?>>  validSearchFields = new ArrayList<FormComponent<?>>();
		
		for( FormComponent<?> component : searchFields){
			if( !isNull(component.getValue())){
				validSearchFields.add(component);
			}
		}
		return validSearchFields;
	}
	
	private boolean isNull(String object) {
		return (null == object || "".equals(object.trim())|| "-1".equals(object));
	}
	
	private AjaxButton buildSearch(List<FormComponent<?>> searchFields) {
		// add search button
		AjaxButton search = new AjaxButton("search") {

			@Override
			protected void onSubmit(AjaxRequestTarget target, Form<?> form) {
				
				
				String queryString = "select distinct sa from StockAudit sa where sa.farm =? and sa.stockType.id=? and sa.auditDate >=? and sa.auditDate <=?";
				String countQueryString = "select count(distinct sa ) from StockAudit sa  where sa.farm =? and sa.stockType.id=? and sa.auditDate >=? and sa.auditDate <=?";
				
				
				
				if( !isNull(ListStock.this.operation)){
					queryString += " and sa.operation=?";
					countQueryString += " and sa.operation=?";
				}
				
				
				
			
								
				final List queryParams = new ArrayList();
				queryParams.add(getLoginUserFarm().getId());
				queryParams.add(stockType.getId());
				queryParams.add(startDate);
				queryParams.add(endDate);
				
				if( !isNull(ListStock.this.operation)){
					queryParams.add(operation);
				}
				
				// set up the table with pagination
				
				stockDataProvider = new SearchDataProvider<FarmObject> ("id", queryString,countQueryString) {
					
					@Override
					protected QuerySupport createCountQuery() {
						return new QuerySupport(getCountQueryString(), queryParams);
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

	
	
	private DropDownChoice<StockType> buildStockType() {
		DropDownChoice<StockType> stockTypedpdn= new DropDownChoice<StockType>("stockType", new PropertyModel<StockType>(this, "stockType"),
				
				new LoadableDetachableModel<List<StockType>>() {

					@Override
					protected List<StockType> load() {
						Criterion criterion  = Restrictions.eq("farm", getLoginUserFarm());
						return objectLoader.findAll(StockType.class,criterion);
					}

				}) {

			

			@Override
			protected boolean wantOnSelectionChangedNotifications() {
				return true;
			}

		};
		stockTypedpdn.setRequired(true);
		return stockTypedpdn;

	}

	
	public IDataProvider<FarmObject> getDataProvider(){
		return stockDataProvider;
	}

	
}