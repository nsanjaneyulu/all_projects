package com.dblue.farm.application.pages;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.wicket.AttributeModifier;
import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.markup.html.AjaxLink;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.Model;
import org.apache.wicket.model.PropertyModel;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.Purchases;
import com.dblue.farm.application.FarmSession;

public class ListRevenues extends FarmPage {

	private Integer year = new Date().getYear() + 1900;
	
	private String month = "January";

	private WebMarkupContainer markupContainer;

	private WebMarkupContainer yearSelection;
	
	private WebMarkupContainer monthSelection;
		

	@Override
	protected void buildPageComponents() {

		this.markupContainer = new WebMarkupContainer("reportpanel");

		PropertyModel<List<Purchases>> model = new PropertyModel<List<Purchases>>(
				this, "allRevenues");

		final ListView<Purchases> revenueListView = new ListView<Purchases>(
				"rows", model) {

			protected void populateItem(final ListItem listItem) {
				
				AjaxLink editRevenueLink =new AjaxLink("revenue_edit"){

					@Override
					public void onClick(AjaxRequestTarget target) {
						//redirect to add assets
						// add session key
						Purchases purchases = (Purchases) listItem.getModelObject();						
						Integer revenueId = purchases.getId();
						((FarmSession)getSession()).addToStore("revenue_key", revenueId);
						setResponsePage(AddRevenue.class);
					}
					
				};
				editRevenueLink.add(new Label("receiptNumber",
						new PropertyModel<String>(listItem.getModel(),
								"receiptNumber")));

				listItem.add(editRevenueLink);



				listItem.add(new Label("receiptType",
						new PropertyModel<String>(listItem.getModel(),
								"receiptType.receipt")));
				
				listItem.add(new Label("vendorCode",
						new PropertyModel<String>(listItem.getModel(),
								"vendor.code")));
				
				listItem.add(new Label("saleDate",
						new PropertyModel<String>(listItem.getModel(),
								"saleDate")));
				
				listItem.add(new Label("quantity",
						new PropertyModel<String>(listItem.getModel(),
								"quantity")));
				
				listItem.add(new Label("unitPrice",
						new PropertyModel<String>(listItem.getModel(),
								"unitPrice")));
				
				
				listItem.add(new Label("amount",
						new PropertyModel<String>(listItem.getModel(),
								"amount")));
				
				listItem.add(new Label("remarks",
						new PropertyModel<String>(listItem.getModel(),
								"remarks")));
			}
		};

		this.markupContainer.add(revenueListView);
		markupContainer.setOutputMarkupId(true);
		buildYearSelection();
		buildMonthSelection();
		add(markupContainer);
		add(new FeedbackPanel("feedback"));

	}
	
	private void buildMonthSelection() {
		monthSelection = new WebMarkupContainer("monthSelection");

		List<String> months = getAllMonths();
		
		ListView<String> monthRenderer = new ListView<String>("monthrepeater", months) {

			@Override
			protected void populateItem(final ListItem<String> selectedMonth) {
				AjaxLink link = new AjaxLink("month") {

					@Override
					public void onClick(AjaxRequestTarget target) {
						ListRevenues.this.month =  selectedMonth.getDefaultModelObjectAsString();
						if (null != target) {
							target.addComponent(markupContainer);
						}						
					}
				};

				link.setOutputMarkupId(true);
				Label label = new Label("monthlabel",
						selectedMonth.getDefaultModelObjectAsString());
				label.setOutputMarkupId(true);
				link.add(label);
				selectedMonth.add(link);

			}
		};

		monthSelection.add(monthRenderer);
		add(monthSelection);
	}
	
	private void buildYearSelection() {
		yearSelection = new WebMarkupContainer("yearselection");

		Calendar calendar = Calendar.getInstance();
		List<Integer> allyears = new ArrayList<Integer>();
		for (int i = 0; i < 5; i++) {
			allyears.add(calendar.get(Calendar.YEAR));
			calendar.add(Calendar.YEAR, -1);
		}

		ListView<Integer> yearRenderer = new ListView<Integer>("yearrepeater",
				allyears) {

			@Override
			protected void populateItem(final ListItem<Integer> selectedYear) {
				AjaxLink link = new AjaxLink("year") {

					@Override
					public void onClick(AjaxRequestTarget target) {
						ListRevenues.this.year = (Integer) selectedYear
								.getDefaultModelObject();
						if (null != target) {
							target.addComponent(markupContainer);
						}
					}
				};

				link.setOutputMarkupId(true);
				Label label = new Label("yerlabel",
						selectedYear.getDefaultModelObjectAsString());
				label.setOutputMarkupId(true);
				link.add(label);
				selectedYear.add(link);

			}
		};

		yearSelection.add(yearRenderer);
		add(yearSelection);
	}

	public List<Purchases> getAllRevenues() {
		
		Session session = sessionFactory.getCurrentSession();
		Criteria criteria = session.createCriteria(Purchases.class);
		criteria.add(Restrictions.eq("farm",getLoginUserFarm()));
		criteria.add(Restrictions.sqlRestriction("YEAR(sale_date)="+year));
		criteria.add(Restrictions.sqlRestriction("MONTH(sale_date)="+(getAllMonths().indexOf(month)+1)));
		List<Purchases> revenueList = objectLoader.findAll(Purchases.class,criteria);
		
		// add a new purchase with sum.
		Purchases totalPurchases = new Purchases();
		totalPurchases.setAmount(new BigDecimal(0));
		totalPurchases.setQuantity(new BigDecimal(0));
		
		
		for(Purchases purchases: revenueList){
			totalPurchases.setQuantity( new BigDecimal(totalPurchases.getQuantity().doubleValue() + purchases.getQuantity().doubleValue()));
			totalPurchases.setAmount( new BigDecimal(totalPurchases.getAmount().doubleValue() + purchases.getAmount().doubleValue()));
		}
		revenueList.add(totalPurchases);
		return revenueList;
	}
	
	public List<String> getAllMonths(){
		List<String> months = Arrays.asList(Arrays.copyOf(new java.text.DateFormatSymbols().getMonths(), 12));		
		return months;
	}

}
