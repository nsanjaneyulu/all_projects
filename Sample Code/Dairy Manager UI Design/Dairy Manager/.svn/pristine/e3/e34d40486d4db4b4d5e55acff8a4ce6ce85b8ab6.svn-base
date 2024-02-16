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
import org.hibernate.NonUniqueObjectException;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.Farm;
import com.dblue.farm.Purchases;
import com.dblue.farm.ReceiptType;
import com.dblue.farm.Vendor;
import com.dblue.farm.application.FarmSession;
import com.dblue.farm.application.pages.validator.UniqueValueValidator;
import com.dblue.farm.exception.FarmRuntimeException;
import com.dblue.farm.exception.NotFoundException;

public class AddRevenue extends FarmPage {

	private TextField<String> receiptNumber;
	private DropDownChoice<ReceiptType> receiptType;
	private DropDownChoice<Vendor> vendor;
	private TextField<Date> saleDate;
	private TextField<BigDecimal> amount;
	private TextField<BigDecimal> unitprice;
	private TextField<BigDecimal> quantity;
	private TextArea<String> remarks;
	
	private Button save;
	
	
	@Override
	protected void buildPageComponents() {
		
		Form form = new Form("addnewrevenue");
		
		final Purchases revenue ;
			
		FarmSession session = (FarmSession)getSession();
		Integer revenueKeyId = (Integer)session.getStoreValue("revenue_key");
		if(null == revenueKeyId){
			revenue = new Purchases();
			revenue.setFarm(getLoginUserFarm());
		}else{
			try{
				revenue = objectLoader.load(Purchases.class, revenueKeyId);
			}catch(NotFoundException ex){
				throw new FarmRuntimeException(ex.getMessage(),ex);
			}
			addEditedObjects(revenue.getId());
		}
		
		

		
		this.receiptNumber = new TextField<String>("receiptNumber", new PropertyModel<String>(revenue, "receiptNumber"));
		this.receiptNumber.setRequired(true);
		this.receiptNumber.add(new UniqueValueValidator<String>(Purchases.class,"receiptNumber","Receipt Number"){
			@Override
			public List<Integer> excludeObjects() {
				return getEditedObjects();
			}			
		});
		
		this.saleDate = new TextField<Date>("saleDate", new PropertyModel<Date>(revenue, "saleDate"));
		this.saleDate.setRequired(true);
		DatePicker datePicker = new DatePicker();
        datePicker.setShowOnFieldClick(true);     
        saleDate.add(datePicker);
		this.amount = new TextField<BigDecimal>("amount", new PropertyModel<BigDecimal>(revenue, "amount"));
		this.amount.setRequired(true);
		this.amount.setOutputMarkupId(true);
		
		this.quantity = new TextField<BigDecimal>("quantity", new PropertyModel<BigDecimal>(revenue, "quantity"));
		this.quantity.setRequired(true);
		
		this.unitprice = new TextField<BigDecimal>("unitprice", new PropertyModel<BigDecimal>(revenue, "unitPrice"));
		this.unitprice.setRequired(true);
		
		this.remarks = new TextArea<String>("remarks", new PropertyModel<String>(revenue, "remarks"));
		

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
		
		this.save = new Button("save"){
			@Override
			public void onSubmit() {
				// TODO Auto-generated method stub
				
				
//				//why wer require below 3 lines?
//				Farm currentFarm  = getLoginUserFarm();
//				currentFarm.getPurchaseses().add(revenue);				
//				objectLoader.save(Farm.class , currentFarm);
//				
//				
				try{
					objectLoader.save(Purchases.class,revenue);
				}catch(NonUniqueObjectException ex){
					Purchases mergedRevenue = (Purchases)sessionFactory.getCurrentSession().merge(revenue);
					objectLoader.save(Purchases.class,mergedRevenue);
				}

				
				// store in session
				FarmSession session = (FarmSession)getSession();
				session.addToStore("revenue_key", revenue.getId());
				getSession().info("Revenue "+revenue.getReceiptNumber()+" has been saved or updated");				
				setResponsePage(ListRevenues.class);
			}			
		};
		
		form.add(this.receiptNumber);
		form.add(buildReceiptType(revenue));
		form.add(buildVendorList(revenue));
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
	
	private FormComponent<Vendor> buildVendorList(Purchases revenue){		
		this.vendor = new DropDownChoice<Vendor>("vendor",
				new PropertyModel<Vendor>(revenue, "vendor"),
				new LoadableDetachableModel<List<Vendor>>() {

					@Override
					protected List<Vendor> load() {
						Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
						return objectLoader.findAll(Vendor.class,criterion);
					}

				});
		this.vendor.setRequired(true);
		return vendor;
		//add(this.breed);
	}
	
	private FormComponent<ReceiptType> buildReceiptType(Purchases revenue){		
		this.receiptType = new DropDownChoice<ReceiptType>("receiptType",
				new PropertyModel<ReceiptType>(revenue, "receiptType"),
				new LoadableDetachableModel<List<ReceiptType>>() {

					@Override
					protected List<ReceiptType> load() {
						Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
						return objectLoader.findAll(ReceiptType.class, criterion);
					}

				});
		this.receiptType.setRequired(true);
		return receiptType;
		//add(this.breed);
	}

}
