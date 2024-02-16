package com.dblue.farm.application.pages;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.PropertyModel;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.transaction.annotation.Transactional;

import com.dblue.farm.Farm;
import com.dblue.farm.Production;
import com.dblue.farm.ProductionConfig;
import com.dblue.farm.ProductionFarm;
import com.dblue.farm.application.FarmSession;
import com.dblue.orm.FarmObject;

public class AddDailyMilkProduction extends FarmPage {

	private Button save;
	
	private List<TextField> allProductionFields = new ArrayList<TextField>();
	
	private Date effectiveDate;

	private SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

	private TextField<Date> effDate;
	
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
				setResponsePage(AddDailyMilkProduction.class,params);				
			}
		});
		
		DatePicker datePicker = new DatePicker();
        datePicker.setShowOnFieldClick(true);        
        effDate.add(datePicker);		
		return effDate;
	}

	@Override
	protected void buildPageComponents() {

		Form form = new Form("dailyproductionfarm");
		this.sdf = new SimpleDateFormat("dd/MM/yyyy");
		
		this.effectiveDate = getEffectiveDate();
		this.effDate = buildEffectiveDate();
		
		final FeedbackPanel feedBack = new FeedbackPanel("feedback");
		feedBack.setOutputMarkupId(true);
			
		form.add(effDate);
		
		
		final List<ProductionConfig> productionConfigList = getAlllProductionConfigs();
		final ListView<ProductionConfig> ProductionConfigView = new ListView<ProductionConfig>(
				"rows", productionConfigList) {
			protected void populateItem(
					final ListItem<ProductionConfig> listItem) {

				listItem.add(new Label("yeildSlotName",
						new PropertyModel<String>(listItem.getModel(),
								"yeildSlotName")));

				List<ProductionFarm> allProductions = getMilkProductionBySlot(listItem
						.getModelObject());
				final ListView<ProductionFarm> productionListView = new ListView<ProductionFarm>(
						"prods", allProductions) {

					@Override
					protected void populateItem(
							ListItem<ProductionFarm> productionItem) {

						TextField<BigDecimal> yield = new TextField<BigDecimal>(
								"yield", new PropertyModel<BigDecimal>(
										productionItem.getModelObject(),
										"yield"));
						TextField<BigDecimal> fatPercentile = new TextField<BigDecimal>(
								"fatPercentile",
								new PropertyModel<BigDecimal>(
										productionItem.getModelObject(),
										"fatPercentile"));
						TextField<BigDecimal> snf = new TextField<BigDecimal>(
								"snf",
								new PropertyModel<BigDecimal>(
										productionItem.getModelObject(),
										"snf"));
						
						TextField<BigDecimal> clr = new TextField<BigDecimal>(
								"clr",
								new PropertyModel<BigDecimal>(
										productionItem.getModelObject(),
										"clr"));
						
						TextField<BigDecimal> rejection = new TextField<BigDecimal>(
								"rejection",
								new PropertyModel<BigDecimal>(
										productionItem.getModelObject(),
										"rejection"));
						
						TextField<BigDecimal> deduction = new TextField<BigDecimal>(
								"deduction",
								new PropertyModel<BigDecimal>(
										productionItem.getModelObject(),
										"deduction"));

						productionItem.add(yield);
						productionItem.add(fatPercentile);
						productionItem.add(snf);
						productionItem.add(clr);
						productionItem.add(rejection);
						productionItem.add(deduction);

						allProductionFields.add(yield);
					}

				};

				productionListView.setOutputMarkupId(true);
				listItem.add(productionListView);

			}
		};

		this.save = new AjaxButton("save") {

			
			@Override
			protected void onSubmit(AjaxRequestTarget target, Form<?> form) {
				FarmSession session = (FarmSession) getSession();
				saveAllProductions();
				getSession().info("Daily Milk Production has been saved or updated");
				target.addComponent(feedBack);
				
			}
		};
		
		
		
		form.add(this.save);		
		form.add(ProductionConfigView);
		form.add(feedBack);
		this.add(form);
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
	
	private ProductionFarm createNewProductionFarm(ProductionConfig productionConfig,Farm farm){
		ProductionFarm newProduction = new ProductionFarm();
		newProduction.setProductionConfig(productionConfig);
		newProduction.setDate(this.effectiveDate);
		newProduction.setMonth(this.effectiveDate.getMonth());
		newProduction.setFarm(farm);		
		return newProduction;
	}
	
	private List<ProductionFarm> getMilkProductionBySlot(
			ProductionConfig productionConfig) {			
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ProductionFarm.class);
		criteria.add(Restrictions.eq("farm", getLoginUserFarm()));
		criteria.add(Restrictions.eq("productionConfig.id", productionConfig.getId()));
		criteria.add(Restrictions.eq("date", this.effectiveDate));		
		List<ProductionFarm> allProductionFarms = objectLoader.findAll(
				ProductionFarm.class, criteria);
		
		Farm farm = getLoginUserFarm();
		
		if( allProductionFarms.size() > 0){
			return allProductionFarms;
		}else{
			ProductionFarm productionFarm = createNewProductionFarm(productionConfig, farm);
			List<ProductionFarm> newProductionForms = new ArrayList<ProductionFarm>();
			newProductionForms.add(productionFarm);
			return newProductionForms;
		}		
	}

	private Date getRequestDate(Date currentDate) {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		PageParameters pageParameters = getWebRequestCycle().getPageParameters();
		
		String dateString = null;
		if( pageParameters != null){
			dateString = pageParameters.getString("editdate");
		}
		if(null!=dateString){
			try {
				currentDate = sdf.parse(dateString);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}	
		}
		return currentDate;
	}

	@Transactional
	protected void saveAllProductions() {
		
		List<FarmObject> allObjects = new ArrayList<FarmObject>();
		
		for (TextField<ProductionFarm> proTextField : allProductionFields) {
			ProductionFarm productionFarm = (ProductionFarm) ((PropertyModel) proTextField
					.getModel()).getTarget();
			if (null != productionFarm.getYield()){
				allObjects.add(productionFarm);		
			}
		}
		farmApplicationDAO.saveAllObjects(ProductionFarm.class,allObjects);
	}

	

}

