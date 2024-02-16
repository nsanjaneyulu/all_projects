package com.dblue.farm.application.pages;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.ListIterator;
import java.util.Locale;

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

public class ListMilkProduction extends FarmPage {

	@SpringBean(name = "sessionFactory")
	protected SessionFactory sessionFactory;

	private Integer year = new Date().getYear()+1900;
	
	private WebMarkupContainer markupContainer;
	
	private WebMarkupContainer yearSelection;

	@Override
	protected void buildPageComponents() {

		
		this.markupContainer = new WebMarkupContainer("reportpanel");
		
		PropertyModel<List<MilkProduction>> model = new PropertyModel<List<MilkProduction>>(this, "allProductions");
		
		final ListView<MilkProduction> productionListView = new ListView<MilkProduction>("rows", model) {

			protected void populateItem(final ListItem listItem) {

				AjaxLink editProductionLink =new AjaxLink("milkproduction_edit"){

					@Override
					public void onClick(AjaxRequestTarget target) {
						//redirect to add assets
						// add session key
						MilkProduction  currentProduction = (MilkProduction )listItem.getModelObject();						
						PageParameters params = new PageParameters();
						params.add("month", ""+currentProduction.getMonthForNav());						
						params.add("year", ""+currentProduction.getYear());
						setResponsePage(ListMonthlyMilkProduction.class,params);
					}
					
				};
				
				
				editProductionLink.add(new Label("month", new PropertyModel<String>(
						listItem.getModel(), "month")));
				listItem.add(editProductionLink );

				listItem.add(new Label("yield", new PropertyModel<String>(
						listItem.getModel(), "yield")));
				
				listItem.add(new Label("fatPercentile", new PropertyModel<String>(
						listItem.getModel(), "fatPercentile")));
				
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
		buildYearSelection();
		add(markupContainer);
		add(new FeedbackPanel("feedback"));

	}
	
	private void buildYearSelection(){
		yearSelection  = new WebMarkupContainer("yearselection");
		
		Calendar calendar = Calendar.getInstance();
		List<Integer> allyears = new ArrayList<Integer>();
		for( int i=0;i<5;i++){
			allyears.add(calendar.get(Calendar.YEAR));
			calendar.add(Calendar.YEAR, -1);
		}
		
		ListView<Integer> yearRenderer = new ListView<Integer>("yearrepeater",allyears) {

			@Override
			protected void populateItem(final ListItem<Integer> selectedYear) {
				AjaxLink link = new AjaxLink("year") {

					@Override
					public void onClick(AjaxRequestTarget target) {
						ListMilkProduction.this.year = (Integer)selectedYear.getDefaultModelObject();
						if( null != target){
							target.addComponent(markupContainer);
						}
					}
				};
				
				link.setOutputMarkupId(true);
				Label label =new Label("yerlabel",selectedYear.getDefaultModelObjectAsString());
				label.setOutputMarkupId(true);
				link.add(label);
				selectedYear.add(link);
				
			}
		};
		
		yearSelection.add(yearRenderer);
		add(yearSelection);
		
	}

	public List<MilkProduction> getAllProductions() {
		Session session = sessionFactory.getCurrentSession();
		
		
		List results = session
				.createCriteria(ProductionFarm.class)
				.add(Restrictions.eq("farm", getLoginUserFarm()))
				.add(Restrictions.sqlRestriction("YEAR(date)="+year))
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
								.add(Projections.sum("rejection"),
										"rejection")	
								.add(Projections.sum("deduction"),
										"deduction")	
								.add(Projections.groupProperty("month"),
										"month"))

				.addOrder(Order.desc("month")).list();

		List<MilkProduction> list = new ArrayList<MilkProduction>();
		MilkProduction milkProduction;
		ListIterator iterator = results.listIterator();
		while (iterator.hasNext()) {
			Object[] obj = (Object[]) iterator.next();
			milkProduction = new MilkProduction();
			milkProduction.setYield(((BigDecimal) obj[0]));
			if(null!=obj[1]){
				milkProduction.setFatPercentile(((Double) obj[1]).doubleValue());	
			}
			if(null!=obj[2]){
				milkProduction.setSnf(((Double) obj[2]).doubleValue());	
			}
			if(null!=obj[3]){
				milkProduction.setClr(((Double) obj[3]).doubleValue());	
			}
			if(null!=obj[4]){
				milkProduction.setRejection(((BigDecimal) obj[4]));	
			}
			if(null!=obj[5]){
				milkProduction.setDeduction(((BigDecimal) obj[5]));	
			}
			milkProduction.setMonth(((Integer) obj[6]));
			milkProduction.setYear(year);
			list.add(milkProduction);

		}

		return list;
	}

}

class MilkProduction {
	
	private static Calendar calendar = Calendar.getInstance();
	
	BigDecimal yield;
	double fatPercentile;
	double snf;
	double clr;
	BigDecimal rejection;
	BigDecimal deduction;
	int month;
	int year;
	
	public double getSnf() {
		return snf;
	}
	public void setSnf(double snf) {
		this.snf = snf;
	}
	public double getClr() {
		return clr;
	}
	public void setClr(double clr) {
		this.clr = clr;
	}	

	public BigDecimal getRejection() {
		return rejection;
	}
	public void setRejection(BigDecimal rejection) {
		this.rejection = rejection;
	}
	public BigDecimal getDeduction() {
		return deduction;
	}
	public void setDeduction(BigDecimal deduction) {
		this.deduction = deduction;
	}
	
	public BigDecimal getYield() {
		return yield;
	}
	public void setYield(BigDecimal yield) {
		this.yield = yield;
	}
	public double getFatPercentile() {
		return fatPercentile;
	}
	public void setFatPercentile(double fatPercentile) {
		this.fatPercentile = fatPercentile;
	}
	public String getMonth() {
		calendar.set(Calendar.MONTH, month);
		return calendar.getDisplayName(Calendar.MONTH, Calendar.SHORT, Locale.getDefault());		
	}
	
	public void setMonth(int month) {
		this.month=month;
	}
	
	public int getMonthForNav(){
		return month;
	}
	
	Date date;
	
	public Date getDate(){
		return date;		
	}
	public void SetDate(Date date){
		this.date = date;
	}
	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}
	
	
	
	
}