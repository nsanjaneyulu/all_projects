package com.dblue.farm.application.pages;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.form.OnChangeAjaxBehavior;
import org.apache.wicket.extensions.yui.calendar.DatePicker;
import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.DropDownChoice;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.FormComponent;
import org.apache.wicket.markup.html.form.TextArea;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.LoadableDetachableModel;
import org.apache.wicket.model.PropertyModel;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.ExpenseType;
import com.dblue.farm.Expenses;
import com.dblue.farm.Farm;
import com.dblue.farm.Vendor;
import com.dblue.farm.application.FarmSession;
import com.dblue.farm.application.pages.validator.UniqueValueValidator;
import com.dblue.farm.exception.FarmRuntimeException;
import com.dblue.farm.exception.NotFoundException;

public class AddExpense extends FarmPage {
	
	private TextField<String> receiptNumber;
	private DropDownChoice<ExpenseType> expenseType;
	private DropDownChoice<Vendor> vendor;
	private TextField<Date> saleDate;
	private TextField<BigDecimal> amount;
	private TextField<BigDecimal> unitprice;
	private TextField<BigDecimal> quantity;
	private TextArea<String> remarks;
	
	private Button save;
	
	
	@Override
	protected void buildPageComponents() {
		
		Form form = new Form("addnewexpense");
		
		final Expenses expenses ;
		
		FarmSession session = (FarmSession)getSession();
		Integer expenseKeyId = (Integer)session.getStoreValue("expense_key");
		if(null == expenseKeyId){
			expenses = new Expenses();
			expenses.setFarm(getLoginUserFarm());
		}else{
			try{
				expenses = objectLoader.load(Expenses.class, expenseKeyId);
			}catch(NotFoundException ex){
				throw new FarmRuntimeException(ex.getMessage(),ex);
			}
			addEditedObjects(expenses.getId());
		}
		
		
		
		
		this.receiptNumber = new TextField<String>("voucherNumber", new PropertyModel<String>(expenses, "receiptNumber"));
		this.receiptNumber.setRequired(true);
		this.receiptNumber.add(new UniqueValueValidator<String>(Expenses.class,"receiptNumber","Voucher Number"){
			@Override
			public List<Integer> excludeObjects() {
				return getEditedObjects();
			}			
		});
		this.saleDate = new TextField<Date>("voucherDate", new PropertyModel<Date>(expenses, "saleDate"));
		this.saleDate.setRequired(true);
		DatePicker datePicker = new DatePicker();
        datePicker.setShowOnFieldClick(true);     
        saleDate.add(datePicker);
		this.amount = new TextField<BigDecimal>("amount", new PropertyModel<BigDecimal>(expenses, "amount"));
		this.amount.setRequired(true);
		this.amount.setOutputMarkupId(true);
		
		this.quantity = new TextField<BigDecimal>("quantity", new PropertyModel<BigDecimal>(expenses, "quantity"));
		this.quantity.setRequired(true);
		
		this.unitprice = new TextField<BigDecimal>("unitprice", new PropertyModel<BigDecimal>(expenses, "unitPrice"));
		this.unitprice.setRequired(true);
		
		quantity.add(new OnChangeAjaxBehavior() {
			
			@Override
			protected void onUpdate(AjaxRequestTarget target) {
				BigDecimal 	quantityValue = (BigDecimal)quantity.getDefaultModel().getObject();
				BigDecimal  unitPriceValue = (BigDecimal)unitprice.getDefaultModel().getObject();
				
				Double totalValue = calculateTotal(unitPriceValue, quantityValue);
				amount.setDefaultModelObject(totalValue);
				amount.modelChanged();				
				target.addComponent(amount);
			}
		});
		
		unitprice.add(new OnChangeAjaxBehavior() {
			
			@Override
			protected void onUpdate(AjaxRequestTarget target) {
				BigDecimal 	quantityValue = (BigDecimal)quantity.getDefaultModel().getObject();
				BigDecimal  unitPriceValue = (BigDecimal)unitprice.getDefaultModel().getObject();
				
				Double totalValue = calculateTotal(unitPriceValue, quantityValue);
				amount.setDefaultModelObject(totalValue);
				amount.modelChanged();				
				target.addComponent(amount);
			}
		});
		
		
		this.remarks = new TextArea<String>("remarks", new PropertyModel<String>(expenses, "remarks"));
		
		this.save = new Button("save"){
			@Override
			public void onSubmit() {
				// TODO Auto-generated method stub
				
								
				objectLoader.save(Expenses.class,expenses);		
				// store in session
				FarmSession session = (FarmSession)getSession();
				session.addToStore("expense_key", expenses.getId());
				getSession().info("Expense/Purchase "+expenses.getReceiptNumber()+" has been saved or updated");				
				setResponsePage(ListExpenses.class);
			}			
		};
		
		form.add(this.receiptNumber);
		form.add(buildExpenseType(expenses));
		form.add(buildVendorList(expenses));
		form.add(this.saleDate);
		form.add(this.amount);
		form.add(this.quantity);
		form.add(this.unitprice);
		form.add(this.remarks);
		
		
		form.add(this.save);
		
		form.add( new FeedbackPanel("feedback"));
		this.add(form);	
		
		
	}
	
	private Double calculateTotal(BigDecimal unitPrice,BigDecimal quantity){
		if( null == unitPrice || quantity == null){
			return 0.0;
		}else{
			return unitPrice.doubleValue() * quantity.doubleValue();
		}
	}
	
	private FormComponent<Vendor> buildVendorList(Expenses expenses){		
		this.vendor = new DropDownChoice<Vendor>("vendor",
				new PropertyModel<Vendor>(expenses, "vendor"),
				new LoadableDetachableModel<List<Vendor>>() {

					@Override
					protected List<Vendor> load() {
						Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
						return objectLoader.findAll(Vendor.class, criterion);
					}

				});
		this.vendor.setRequired(true);
		return vendor;
		//add(this.breed);
	}
	
	private FormComponent<ExpenseType> buildExpenseType(Expenses expenses){		
		this.expenseType = new DropDownChoice<ExpenseType>("voucherType",
				new PropertyModel<ExpenseType>(expenses, "expenseType"),
				new LoadableDetachableModel<List<ExpenseType>>() {

					@Override
					protected List<ExpenseType> load() {
						Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
						return objectLoader.findAll(ExpenseType.class,criterion);
					}

				});
		this.expenseType.setRequired(true);
		return expenseType;
		//add(this.breed);
	}



}
