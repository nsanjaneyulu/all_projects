package com.dblue.farm.application.pages;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.ListIterator;

import org.apache.wicket.PageParameters;
import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.markup.html.AjaxLink;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.spring.injection.annot.SpringBean;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.ProductionFarm;
import com.dblue.farm.application.FarmSession;

public class ListMonthlyMilkProduction extends FarmPage {

	@SpringBean(name = "sessionFactory")
	protected SessionFactory sessionFactory;

	
	
	private WebMarkupContainer markupContainer;

	private WebMarkupContainer yearSelection;

	private SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
	
	@Override
	protected void buildPageComponents() {
		
		this.markupContainer = new WebMarkupContainer("reportpanel");

		PropertyModel<List<MilkProduction>> model = new PropertyModel<List<MilkProduction>>(
				this, "allProductions");

		final ListView<MilkProduction> productionListView = new ListView<MilkProduction>("rows", model) {

			protected void populateItem(final ListItem listItem) {
				MilkProduction  currentProduction = (MilkProduction )listItem.getModelObject();
//				final Date effDate =currentProduction.getDate();
//				AjaxLink editMonthlyProductionLink =new AjaxLink("milkproduction_month_edit"){
//
//					@Override
//					public void onClick(AjaxRequestTarget target) {
//												
//						PageParameters params = new PageParameters();
//						String reqDate = sdf.format(effDate);
//						params.add("effectiveDate", reqDate);	
//						
//						setResponsePage(AddDailyMilkProduction.class,params);
//					}
//					
//				};
//		
//				
//				editMonthlyProductionLink.add();
				listItem.add(new Label("date", new PropertyModel<String>(
						listItem.getModel(), "date")) );


				listItem.add(new Label("yield", new PropertyModel<String>(
						listItem.getModel(), "yield")));

				listItem.add(new Label("fatPercentile",
						new PropertyModel<String>(listItem.getModel(),
								"fatPercentile")));

				listItem.add(new Label("snf", new PropertyModel<String>(
						listItem.getModel(), "snf")));

				listItem.add(new Label("clr", new PropertyModel<String>(
						listItem.getModel(), "clr")));

				listItem.add(new Label("rejection", new PropertyModel<String>(
						listItem.getModel(), "rejection")));

				listItem.add(new Label("deduction", new PropertyModel<String>(
						listItem.getModel(), "deduction")));

			}
		};

		this.markupContainer.add(productionListView);
		markupContainer.setOutputMarkupId(true);
	//	buildYearSelection();
		add(markupContainer);
		add(new FeedbackPanel("feedback"));
	}

	public List<MilkProduction> getAllProductions() {
		Session session = sessionFactory.getCurrentSession();
		
		FarmSession farmsession = (FarmSession)getSession();
		
		Integer month =0;
		Integer year = new Date().getYear() + 1900;
		if(null!=getWebRequestCycle().getPageParameters())
		{
			month = getWebRequestCycle().getPageParameters().getInt("month")+1;
			year = getWebRequestCycle().getPageParameters().getInt("year");
		}
		
		List results = session
				.createCriteria(ProductionFarm.class)
				.add(Restrictions.eq("farm", getLoginUserFarm()))
				.add(Restrictions.sqlRestriction("MONTH(date)=" + month))
				.add(Restrictions.sqlRestriction("YEAR(date)=" + year))
				.setProjection(
						Projections
								.projectionList()
								.add(Projections.sum("yield"), "yield")
								.add(Projections.avg("fatPercentile"),
										"fatPercentile")
								.add(Projections.avg("snf"), "snf")
								.add(Projections.avg("clr"), "clr")
								.add(Projections.sum("rejection"), "rejection")
								.add(Projections.sum("deduction"), "deduction")
								.add(Projections.groupProperty("date"),
										"date"))

				.addOrder(Order.desc("date")).list();

		List<MilkProduction> list = new ArrayList<MilkProduction>();
		MilkProduction milkProduction;
		ListIterator iterator = results.listIterator();
		while (iterator.hasNext()) {
			Object[] obj = (Object[]) iterator.next();
			milkProduction = new MilkProduction();
			milkProduction.setYield(((BigDecimal) obj[0]));
			if (null != obj[1]) {
				milkProduction
						.setFatPercentile(((Double) obj[1]).doubleValue());
			}
			if (null != obj[2]) {
				milkProduction.setSnf(((Double) obj[2]).doubleValue());
			}
			if (null != obj[3]) {
				milkProduction.setClr(((Double) obj[3]).doubleValue());
			}
			if (null != obj[4]) {
				milkProduction.setRejection(((BigDecimal) obj[4]));
			}
			if (null != obj[5]) {
				milkProduction.setDeduction(((BigDecimal) obj[5]));
			}
			milkProduction.SetDate(((Date) obj[6]));
			list.add(milkProduction);

		}

		return list;
	}

}
