package com.dblue.farm.application.pages;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.form.OnChangeAjaxBehavior;
import org.apache.wicket.extensions.yui.calendar.DatePicker;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.DropDownChoice;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.FormComponent;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.LoadableDetachableModel;
import org.apache.wicket.model.Model;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.model.util.ListModel;
import org.apache.wicket.validation.validator.RangeValidator;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.Farm;
import com.dblue.farm.StockAudit;
import com.dblue.farm.StockType;
import com.dblue.farm.application.FarmSession;

public class PCStock extends FarmPage {
	
	private TextField<Date> auditDate;	
	private DropDownChoice<StockType> stockType;
	private DropDownChoice<String> operation;	
	private TextField<BigDecimal> quantity;
	private Label sBalance;
	private Label smBalance;
	
	private Button save;

	@Override
	protected void buildPageComponents() {
		
		Form form = new Form("pcstockform");
		
		final StockAudit stockAudit = new StockAudit();
		stockAudit.setFarm(getLoginUserFarm());
		
		this.auditDate = new TextField<Date>("auditDate", new PropertyModel<Date>(stockAudit, "auditDate"));
		this.auditDate.setRequired(true);
		DatePicker datePicker = new DatePicker();
        datePicker.setShowOnFieldClick(true);     
        auditDate.add(datePicker);
        
        this.operation  = new DropDownChoice<String>("operation", new PropertyModel<String>(stockAudit,"operation"),new ListModel<String>(Arrays.asList(new String[]{"Procure","Consume"}))){

			@Override
			protected boolean wantOnSelectionChangedNotifications() {				
				return true;
			}
        	
        };
		this.operation.setRequired(true);
				        
		this.quantity = new TextField<BigDecimal>("quantity", new PropertyModel<BigDecimal>(stockAudit, "quantity"));
		this.quantity.setRequired(true);
		this.quantity.setOutputMarkupId(true);
		//this.quantity.add(new RangeValidator<BigDecimal>(new BigDecimal(0), new BigDecimal(1000)));
		
		this.save = new Button("save"){
			@Override
			public void onSubmit() {
				// TODO Auto-generated method stub
//				List<Farm> allFarms  = objectLoader.findAll(Farm.class);
//				stockAudit.setFarm(allFarms.get(0));
//				
				objectLoader.save(StockAudit.class,stockAudit);	
				StockType stockType = stockAudit.getStockType();
				BigDecimal stockBalance = stockType.getStockBalance();
				if(stockAudit.getOperation().equalsIgnoreCase("Procure")){
					stockBalance = stockBalance.add(stockAudit.getQuantity());
					
				} else if(stockAudit.getOperation().equalsIgnoreCase("Consume")){
					stockBalance = stockBalance.subtract(stockAudit.getQuantity());
				}
				stockType.setStockBalance(stockBalance);
				objectLoader.save(StockType.class, stockType);
				
				// store in session
				FarmSession session = (FarmSession)getSession();
				getSession().info("Stock has been saved or updated");				
				setResponsePage(PCStock.class);
			}			
		};
		
		this.sBalance = new Label("sBalance", new Model<String>(""));
		this.smBalance = new Label("smBalance", new Model<String>(""));
		this.sBalance.setOutputMarkupId(true);
		this.smBalance.setOutputMarkupId(true);
		
		form.add(this.auditDate);
		form.add(buildStockType(stockAudit));	
		this.stockType.add(new OnChangeAjaxBehavior() {
		    @Override
		    protected void onUpdate(AjaxRequestTarget target) {
		        StockType selectedStockType = stockType.getModelObject();
		        if( null != selectedStockType){
		        	//update the components
		        	sBalance.setDefaultModelObject(""+selectedStockType.getStockBalance().doubleValue());
		        	smBalance.setDefaultModelObject(""+selectedStockType.getStockMinLevel().doubleValue());		        	
		        	target.addComponent(sBalance);
		        	target.addComponent(smBalance);
		        }
		    }
		});
		this.quantity.add(new OnChangeAjaxBehavior() {
		    @Override
		    protected void onUpdate(AjaxRequestTarget target) {				    	
		    	String operationValue = (String)operation.getDefaultModelObject();
		    	BigDecimal quantityValue = quantity.getModelObject();		 
		    	StockType selectedStockType = stockType.getModelObject();
		        if( null != quantityValue && selectedStockType != null && null != operationValue){
		        	//update the components
		        	if( "Procure".equals(operationValue)){
		        		sBalance.setDefaultModelObject(""+(selectedStockType.getStockBalance().doubleValue() + quantityValue.doubleValue()));
		        	}else{
		        		sBalance.setDefaultModelObject(""+(selectedStockType.getStockBalance().doubleValue() - quantityValue.doubleValue()));
		        	}
		        	target.addComponent(sBalance);		        	
		        }
		    }
		});
		
		form.add(this.operation);
		form.add(this.quantity);
		form.add(sBalance);
		form.add(smBalance);
		form.add(this.save);
		
		form.add( new FeedbackPanel("feedback"));
		this.add(form);		
		
	}
	
	private FormComponent<StockType> buildStockType(StockAudit stockAudit) {
		this.stockType = new DropDownChoice<StockType>("stockType",
				new PropertyModel<StockType>(stockAudit, "stockType"),
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
		this.stockType.setRequired(true);
		return stockType;

	}

}
