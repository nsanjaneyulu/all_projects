package com.dblue.farm.application.pages;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.markup.html.AjaxLink;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.PropertyModel;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.Expenses;
import com.dblue.farm.Purchases;
import com.dblue.farm.application.FarmSession;

public class ListExpenses extends FarmPage {

	private Integer year = new Date().getYear() + 1900;

	private WebMarkupContainer markupContainer;

	private WebMarkupContainer yearSelection;
	
	private String month = "January";
	
	private WebMarkupContainer monthSelection;

	@Override
	protected void buildPageComponents() {

		this.markupContainer = new WebMarkupContainer("reportpanel");

		PropertyModel<List<Expenses>> model = new PropertyModel<List<Expenses>>(
				this, "allExpenses");

		final ListView<Expenses> expenseListView = new ListView<Expenses>(
				"rows", model) {

			protected void populateItem(final ListItem listItem) {
				
				AjaxLink editExpenseLink =new AjaxLink("expense_edit"){

					@Override
					public void onClick(AjaxRequestTarget target) {
						//redirect to add assets
						// add session key
						Expenses expenses = (Expenses) listItem.getModelObject();						
						Integer expenseId = expenses.getId();						
						((FarmSession)getSession()).addToStore("expense_key", expenseId);
						setResponsePage(AddExpense.class);
					}
					
				};
				
				
				editExpenseLink.add(new Label("receiptNumber",
						new PropertyModel<String>(listItem.getModel(),
								"receiptNumber")));
				
				listItem.add(editExpenseLink );

				

				listItem.add(new Label("receiptType",
						new PropertyModel<String>(listItem.getModel(),
								"expenseType.expense")));
				
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

		this.markupContainer.add(expenseListView);
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
						ListExpenses.this.month =  selectedMonth.getDefaultModelObjectAsString();
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
						ListExpenses.this.year = (Integer) selectedYear
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

	public List<Expenses> getAllExpenses() {
		Session session = sessionFactory.getCurrentSession();
		Criteria criteria = session.createCriteria(Expenses.class);
		criteria.add(Restrictions.eq("farm",getLoginUserFarm()));
		criteria.add(Restrictions.sqlRestriction("YEAR(sale_date)="+year));
		criteria.add(Restrictions.sqlRestriction("MONTH(sale_date)="+(getAllMonths().indexOf(month)+1)));
		List<Expenses> expenseList = objectLoader
				.findAll(Expenses.class,criteria);
		
		
		Expenses totalExpenses = new Expenses();
		totalExpenses.setAmount(new BigDecimal(0));
		totalExpenses.setQuantity(new BigDecimal(0));
		
		
		for(Expenses expense: expenseList){
			totalExpenses.setQuantity( new BigDecimal(totalExpenses.getQuantity().doubleValue() + expense.getQuantity().doubleValue()));
			totalExpenses.setAmount( new BigDecimal(totalExpenses.getAmount().doubleValue() + expense.getAmount().doubleValue()));
		}
		expenseList.add(totalExpenses);
		return expenseList;
	}
	
	public List<String> getAllMonths(){
		List<String> months = Arrays.asList(Arrays.copyOf(new java.text.DateFormatSymbols().getMonths(), 12));		
		return months;
	}
	
}
