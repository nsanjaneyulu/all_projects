package com.dblue.farm.application.pages;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Set;

import org.apache.wicket.PageParameters;
import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.form.AjaxFormComponentUpdatingBehavior;
import org.apache.wicket.ajax.markup.html.form.AjaxButton;
import org.apache.wicket.extensions.markup.html.form.DateTextField;
import org.apache.wicket.extensions.yui.calendar.DatePicker;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.markup.html.navigation.paging.PagingNavigator;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.markup.repeater.Item;
import org.apache.wicket.markup.repeater.data.DataView;
import org.apache.wicket.markup.repeater.data.IDataProvider;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.spring.injection.annot.SpringBean;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.Farm;
import com.dblue.farm.FarmConfiguration;
import com.dblue.farm.Lactation;
import com.dblue.farm.Livestock;
import com.dblue.farm.MilkingStatus;
import com.dblue.farm.Production;
import com.dblue.farm.ProductionConfig;
import com.dblue.farm.ProductionFarm;
import com.dblue.farm.StateType;
import com.dblue.farm.application.FarmSession;
import com.dblue.farm.application.pages.pagination.FarmObjectCriteriaBasedDataProvider;
import com.dblue.orm.FarmObject;

public class DailyMilkProduction extends FarmPage {

	@SpringBean(name = "sessionFactory")
	protected SessionFactory sessionFactory;

	private Button save;
	private Button next;

	private String calfStateType;
	private String heiferStateType;
	private Character dryingOff = 'Y';
	private Character deceased = 'Y';

	private Date effectiveDate;

	private SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

	private TextField<Date> effDate;

	private FarmObjectCriteriaBasedDataProvider getLiveStockDataProvider() {
		FarmObjectCriteriaBasedDataProvider<Livestock> liveStockDataProvider = new FarmObjectCriteriaBasedDataProvider<Livestock>() {

			@Override
			protected Criteria createCriteria() {
				FarmConfiguration farmConfiguration = DailyMilkProduction.this.farmConfigurationProvider.getFarmConfiguration();
				MilkingStatus nonMilkingStatus = farmConfiguration.getNonMlikingStatus();
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(Livestock.class);
				criteria.add(Restrictions.eq("farm", getLoginUserFarm()));
				criteria.add(Restrictions.ne("milkingStatus", nonMilkingStatus));
				criteria.add(Restrictions.eq("deceased", "N"));
				return criteria;
			}
		};
		return liveStockDataProvider;
	}

	private Date getEffectiveDate() {
		String effectiveDateString = (String) getWebRequestCycle()
				.getPageParameters().getString("effectiveDate");
		Date currentDate = new Date();
		currentDate.setHours(0);
		currentDate.setMinutes(0);
		currentDate.setSeconds(0);
		
		Date reqDate =null;
		
		if( null != effectiveDateString){
			try{
				reqDate = sdf.parse(effectiveDateString);
			}catch(ParseException ex){
				reqDate = currentDate;
			}
		}else{
			reqDate  = currentDate;
		}
		
		return reqDate;
	}
	
	private TextField<Date> buildEffectiveDate(){
		this.effDate = new DateTextField("effectiveDate", new PropertyModel<Date>(this, "effectiveDate"),"dd/MM/yyyy");
		
		effDate.add(new AjaxFormComponentUpdatingBehavior("onChange") {
			
			@Override
			protected void onUpdate(AjaxRequestTarget target) {				
				PageParameters params = new PageParameters();
				String effDateString = effDate.getDefaultModelObjectAsString();
				params.add("effectiveDate", effDateString);
				setResponsePage(DailyMilkProduction.class,params);				
			}
		});
		
		DatePicker datePicker = new DatePicker();
        datePicker.setShowOnFieldClick(true);        
        effDate.add(datePicker);		
		return effDate;
	}
	
	@Override
	protected void buildPageComponents() {

		FarmConfiguration farmConfiguration = farmConfigurationProvider.getFarmConfiguration();
		
		Form form = new Form("dailyproduction");
		this.sdf = new SimpleDateFormat("dd/MM/yyyy");
		
		this.effectiveDate = getEffectiveDate();
		this.effDate = buildEffectiveDate();

		this.calfStateType = farmConfiguration.getCalf().getStateType();
		this.heiferStateType = farmConfiguration.getHeafer().getStateType();

		 

		//form.add(new Label("today", sdf.format(currentDate)));
		form.add(effDate);

		final List<Livestock> liveStockList = loadAllLiveStocks();

		// TODO: should be specific to daily milk production
		Integer paginationSize = farmConfiguration.getMilkProductionPagination();
		final FeedbackPanel feedBack = new FeedbackPanel("feedback");
		feedBack.setOutputMarkupId(true);
		final SaveAwareDataView dataView = new SaveAwareDataView("rows",
				getLiveStockDataProvider(), paginationSize);
		this.save = new AjaxButton("save") {

			@Override
			protected void onSubmit(AjaxRequestTarget target, Form<?> form) {
				FarmSession session = (FarmSession) getSession();
				dataView.save();
				getSession().info(
						"Daily Milk Production has been saved or updated");
				target.addComponent(feedBack);

			}
		};
		this.next = new Button("next"){
			@Override
			public void onSubmit() {						
					PageParameters params = new PageParameters();
					String effDateString = effDate.getDefaultModelObjectAsString();
					params.add("effectiveDate", effDateString);
					setResponsePage(AddDailyMilkProduction.class,params);	

			}
		};	
		form.add(this.save);
		//form.add(this.next);
		form.add(dataView);
		form.add(new PagingNavigator("navigator", dataView));
		form.add(feedBack);
		this.add(form);

	}

	protected StateType getStateType(String state) {
		Session session = sessionFactory.getCurrentSession();
		Criteria criteria = session.createCriteria(StateType.class);
		criteria.add(Restrictions.eq("farm", getLoginUserFarm()));
		criteria.add(Restrictions.eq("stateType", state));
		List<StateType> allStateTypes = objectLoader.findAll(StateType.class,
				criteria);
		return allStateTypes.size() > 0 ? allStateTypes.get(0) : null;
	}

	protected List<Production> getMilkProductionByLiveStock(Livestock livestock) {

		Criterion liveStockCriteria = Restrictions.eq("livestock.id",
				livestock.getId());
		Criterion dateCriteria = Restrictions.eq("date", effectiveDate);
		Criterion criteria = Restrictions.and(liveStockCriteria, dateCriteria);
		Farm farm = getLoginUserFarm();
		List<Production> allproduction = objectLoader.findAll(Production.class,
				criteria);

		if (allproduction.size() == 0) {
			List<ProductionConfig> productionConfigs = getAlllProductionConfigs();
			for (ProductionConfig productionConfig : productionConfigs) {
				Production newProduction = new Production();
				newProduction.setProductionConfig(productionConfig);
				newProduction.setLivestock(livestock);
				newProduction.setDate(effectiveDate);
				newProduction.setMonth(effectiveDate.getMonth());
				newProduction.setFarm(farm);
				allproduction.add(newProduction);
			}
		}

		if (allproduction.size() == 1) {
			Production production = allproduction.get(0);
			List<ProductionConfig> productionConfigs = getAlllProductionConfigs();
			for (ProductionConfig productionConfig : productionConfigs) {
				if (productionConfig.getYeildSlotName().equals(
						production.getProductionConfig().getYeildSlotName()))
					continue;
				Production newProduction = new Production();
				newProduction.setProductionConfig(productionConfig);
				newProduction.setLivestock(livestock);
				newProduction.setDate(effectiveDate);
				newProduction.setMonth(effectiveDate.getMonth());
				newProduction.setFarm(farm);
				allproduction.add(newProduction);
			}
		}

		Collections.sort(allproduction, new ProductionComparator());
		return allproduction;
	}

	private List<Livestock> loadAllLiveStocks() {
		Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
		List<Livestock> livestocks = objectLoader.findAll(Livestock.class,
				criterion);
		return livestocks;
	}

	private List<ProductionConfig> getAlllProductionConfigs() {

		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				ProductionConfig.class);
		criteria.add(Restrictions.eq("farm", getLoginUserFarm()));
		criteria.addOrder(Order.asc("order"));
		List<ProductionConfig> productionConfigs = objectLoader.findAll(
				ProductionConfig.class, criteria);
		return productionConfigs;
	}

	class SaveAwareDataView extends DataView<Livestock> {

		private List<TextField> allProductionFields = new ArrayList<TextField>();

		protected SaveAwareDataView(String id,
				IDataProvider<Livestock> dataProvider, int itemsPerPage) {
			super(id, dataProvider, itemsPerPage);
		}

		public void save() {
			// save the data
			List<FarmObject> allObjects = new ArrayList<FarmObject>();
			for (TextField<Production> proTextField : allProductionFields) {
				Production production = (Production) ((PropertyModel) proTextField
						.getModel()).getTarget();
				if (null != production.getYield())
					allObjects.add(production);
			}

			farmApplicationDAO.saveAllObjects(Production.class, allObjects);
			// save the farm level production data
			List<FarmObject> allFarmProductions = new ArrayList<FarmObject>();
			for(ProductionConfig productionConfig : getAlllProductionConfigs()){
				allFarmProductions.add(getMilkProductionBySlot(productionConfig));
			}
			
			// save 
			farmApplicationDAO.saveAllObjects(ProductionFarm.class, allFarmProductions);
		}

		@Override
		protected void populateItem(final Item<Livestock> listItem) {
			listItem.add(new Label("rfid", new PropertyModel<String>(listItem
					.getModel(), "rfid")));

			listItem.add(new Label("code", new PropertyModel<String>(listItem
					.getModel(), "code")));

			listItem.add(new Label("breedTypeByBreedTypeId",
					new PropertyModel<String>(listItem.getModel(),
							"breedTypeByBreedTypeId.breedType")));

			listItem.add(new Label("milkingStatus", new PropertyModel<String>(
					listItem.getModel(), "milkingStatus.status")));
			Lactation currentLactation = new Lactation();
			Set<Lactation> lactations = listItem.getModelObject().getLactations();
			List<Lactation> listLactations = new ArrayList<Lactation>();
			if(lactations.size()>0){
				listLactations.addAll(lactations);			
				Collections.sort(listLactations, new LactationComparator());
				currentLactation = listLactations.get(listLactations.size()-1);			
			}
			

			listItem.add(new Label("lactationNumber",
					new PropertyModel<String>(currentLactation,
							"lactationNumber")));

			listItem.add(new Label("lactationDays", new PropertyModel<String>(
					currentLactation, "startDate")));
			final ListView<Production> productionListView = new ListView<Production>(
					"prods",
					getMilkProductionByLiveStock(listItem.getModelObject())) {

				@Override
				protected void populateItem(ListItem<Production> productionItem) {
					TextField<Production> yield = new TextField<Production>(
							"yield", new PropertyModel<Production>(
									productionItem.getModelObject(), "yield"));
					TextField<Production> fatPercentile = new TextField<Production>(
							"fatPercentile", new PropertyModel<Production>(
									productionItem.getModelObject(),
									"fatPercentile"));
					allProductionFields.add((yield));
					TextField<Production> snf = new TextField<Production>(
							"snf", new PropertyModel<Production>(
									productionItem.getModelObject(), "snf"));
					TextField<Production> clr = new TextField<Production>(
							"clr", new PropertyModel<Production>(
									productionItem.getModelObject(), "clr"));
					productionItem.add(yield);
					productionItem.add(fatPercentile);
					productionItem.add(snf);
					productionItem.add(clr);
					Livestock stock = productionItem.getModelObject()
							.getLivestock();

					/*if (calfStateType.equals(stock.getStateType()
							.getStateType())
							|| heiferStateType.equals(stock.getStateType()
									.getStateType())
							|| dryingOff.equals(stock.getStopMilkingStatus())
							|| deceased.equals(stock.getDeceased())) {
						yield.setEnabled(false);
						fatPercentile.setEnabled(false);
						snf.setEnabled(false);
						clr.setEnabled(false);
					}*/

				}

			};

			productionListView.setOutputMarkupId(true);
			listItem.add(productionListView);

		}

	}
	
	
	private List getAllProductions(Date currentDate,
			ProductionConfig productionConfig) {
		
		Session session = sessionFactory.getCurrentSession();
		
		List results = session
				.createCriteria(Production.class).
				add(Restrictions.eq("farm", getLoginUserFarm())).
				add(Restrictions.eq("productionConfig.id", productionConfig.getId())).
				add(Restrictions.eq("date", currentDate))
				.setProjection(
						Projections
								.projectionList()
								.add(Projections.sum("yield"), "yield")
								.add(Projections.avg("fatPercentile"),
										"fatPercentile")
								.add(Projections.avg("snf"),
										"snf")
								.add(Projections.avg("clr"),
										"clr")
								.add(Projections
										.groupProperty("productionConfig"),
										"productionConfig"))
				.addOrder(Order.asc("productionConfig")).list();

		return results;
	}
	
	
	private ProductionFarm getMilkProductionBySlot(
			ProductionConfig productionConfig) {

		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				ProductionFarm.class);
		criteria.add(Restrictions.eq("farm", getLoginUserFarm()));
		criteria.add(Restrictions.eq("productionConfig.id",
				productionConfig.getId()));
		criteria.add(Restrictions.eq("date", this.effectiveDate));
		List<ProductionFarm> allProductionFarms = objectLoader.findAll(
				ProductionFarm.class, criteria);

		Farm farm = getLoginUserFarm();

		ProductionFarm productionFarm = (allProductionFarms.size() > 0) ? allProductionFarms
				.get(0) : createNewProductionFarm(productionConfig, farm);

		// now update the data from daily prodution detail.s
		List allProductions = getAllProductions(this.effectiveDate,
				productionConfig);
		if (allProductions.size() > 0) {
			// update productionFarm data with daily information.
			Object[] objects = (Object[]) allProductions.get(0);
			if (null != objects[0])
				productionFarm.setYield((BigDecimal) objects[0]);
			if (null != objects[1]) {
				double vlaue = ((Double) objects[1]).doubleValue();
				productionFarm.setFatPercentile(new BigDecimal(vlaue));
			}
			if (null != objects[2]) {
				double vlaue = ((Double) objects[2]).doubleValue();
				productionFarm.setSnf(new BigDecimal(vlaue));
			}
			if (null != objects[3]) {
				double vlaue = ((Double) objects[3]).doubleValue();
				productionFarm.setClr(new BigDecimal(vlaue));
			}
		}
		return productionFarm;
	}
			
	private ProductionFarm createNewProductionFarm(ProductionConfig productionConfig,Farm farm){
		ProductionFarm newProduction = new ProductionFarm();
		newProduction.setProductionConfig(productionConfig);
		newProduction.setDate(this.effectiveDate);
		newProduction.setMonth(this.effectiveDate.getMonth());
		newProduction.setFarm(farm);		
		return newProduction;
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

class ProductionComparator implements Comparator<Production> {

	public int compare(Production o1, Production o2) {
		if (o1 == null || o2 == null) {
			throw new IllegalArgumentException(
					"Production object cant be null for comparision");
		}

		int o1Order = o1.getProductionConfig().getOrder();
		int o2Order = o2.getProductionConfig().getOrder();
		return (o1Order > o2Order ? 1 : (o1Order == o2Order ? 0 : -1));
	}
	
	
	

}


