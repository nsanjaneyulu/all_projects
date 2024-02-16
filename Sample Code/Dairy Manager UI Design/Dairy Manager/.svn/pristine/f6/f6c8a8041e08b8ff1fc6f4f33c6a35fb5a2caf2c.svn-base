package com.dblue.farm.application.pages;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.form.OnChangeAjaxBehavior;
import org.apache.wicket.behavior.AbstractBehavior;
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

import com.dblue.farm.Asset;
import com.dblue.farm.AssetType;
import com.dblue.farm.Farm;
import com.dblue.farm.StockCategory;
import com.dblue.farm.StockType;
import com.dblue.farm.application.FarmSession;
import com.dblue.farm.application.pages.validator.UniqueValueValidator;
import com.dblue.farm.exception.FarmRuntimeException;
import com.dblue.farm.exception.NotFoundException;

public class AddStockType extends FarmPage {
	
	private TextField<String> stockCode;
	private DropDownChoice<StockCategory> stockCategory;	
	private TextField<String> stockName;
	private TextField<BigDecimal> stockBalance;
	private TextField<BigDecimal> stockMinLevel;	
		
	private Button save;
	
	

	@Override
	protected void buildPageComponents() {
		
		Form form = new Form("addnewstock");
		
		final StockType stockType;
		
		FarmSession session = (FarmSession)getSession();
		Integer stockKeyId = (Integer)session.getStoreValue("stock_key");
		if(null == stockKeyId){
			stockType =  new StockType();
			stockType.setFarm(getLoginUserFarm());
		}else{
			try{
				stockType = objectLoader.load(StockType.class, stockKeyId);
			}catch(NotFoundException ex){
				throw new FarmRuntimeException(ex.getMessage(),ex);
			}
			addEditedObjects(stockType.getId());
		}
		
				
		
		this.stockCode = new TextField<String>("stockCode", new PropertyModel<String>(stockType, "stockCode"));
		this.stockCode.setRequired(true);
		this.stockCode.add(new UniqueValueValidator<String>(StockType.class,"stockCode","Stock Code"){

			@Override
			public List<Integer> excludeObjects() {
				return getEditedObjects();
			}
			
		});
		this.stockName = new TextField<String>("stockName", new PropertyModel<String>(stockType, "stockName"));
		this.stockName.setRequired(true);
		this.stockBalance = new TextField<BigDecimal>("stockBalance", new PropertyModel<BigDecimal>(stockType, "stockBalance"));
		this.stockBalance.setRequired(true);
		this.stockMinLevel = new TextField<BigDecimal>("stockMinLevel", new PropertyModel<BigDecimal>(stockType, "stockMinLevel"));
		this.stockMinLevel.setRequired(true);
		
		this.save = new Button("save"){


			@Override
			public void onSubmit() {
				// TODO Auto-generated method stub
				
				objectLoader.save(StockType.class,stockType);		

				// store in session
				FarmSession session = (FarmSession)getSession();
				session.addToStore("stock_key", stockType.getId());
				getSession().info("Stock "+stockType.getStockCode()+" has been saved or updated");				
				setResponsePage(ListStockTypes.class);
			}			
		};
		
		form.add(this.stockCode);
		form.add(this.stockName);
		form.add(buildStockCategory(stockType));
		form.add(this.stockMinLevel);
		form.add(this.stockBalance);
		
		form.add(this.save);
		
		form.add( new FeedbackPanel("feedback"));
		this.add(form);				
		
	}	
	
	private FormComponent<StockCategory> buildStockCategory(StockType stockType){		
		this.stockCategory = new DropDownChoice<StockCategory>("stockCategory",
				new PropertyModel<StockCategory>(stockType, "stockCategory"),
				new LoadableDetachableModel<List<StockCategory>>() {

					@Override
					protected List<StockCategory> load() {
						Criterion criterion  = Restrictions.eq("farm", getLoginUserFarm());
						return objectLoader.findAll(StockCategory.class,criterion);
					}

				});
		this.stockCategory.setRequired(true);
		return stockCategory;
		//add(this.breed);
	}

}



