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
import org.apache.wicket.validation.validator.RangeValidator;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.Asset;
import com.dblue.farm.AssetType;
import com.dblue.farm.Farm;
import com.dblue.farm.application.FarmSession;
import com.dblue.farm.application.pages.validator.UniqueValueValidator;
import com.dblue.farm.exception.FarmRuntimeException;
import com.dblue.farm.exception.NotFoundException;

public class AddAsset extends FarmPage {

	private TextField<String> assetCode;
	private DropDownChoice<AssetType> assetType;	
	private TextField<String> assetName;
	private TextField<Date> dateOfPurchase;
	private TextField<Date> warrantyEndDate;
	private TextField<BigDecimal> quantity;
	private TextField<BigDecimal> cost;	
	private TextField<BigDecimal> totalCost;
	private TextArea<String> description;
	private TextArea<String> remarks;
		
	private Button save;
	

	@Override
	protected void buildPageComponents() {
		
		Form form = new Form("addnewasset");
		
		final Asset asset;
		
		FarmSession session = (FarmSession)getSession();
		Integer assetKeyId = (Integer)session.getStoreValue("asset_key");
		if(null == assetKeyId){
			asset = new Asset();
			asset.setFarm(getLoginUserFarm());
		}else{
			try{
			asset = objectLoader.load(Asset.class, assetKeyId);
			}catch(NotFoundException ex){
				throw new FarmRuntimeException(ex.getMessage(),ex);
			}
			addEditedObjects(asset.getId());
		}
		
		
		
		this.assetCode = new TextField<String>("assetCode", new PropertyModel<String>(asset, "assetCode"));
		this.assetCode.setRequired(true);
		this.assetCode.add(new UniqueValueValidator<String>(Asset.class,"assetCode","Asset Code"){

			@Override
			public List<Integer> excludeObjects() {
				// TODO Auto-generated method stub
				return getEditedObjects();
			}
			
		});
		this.assetName = new TextField<String>("assetName", new PropertyModel<String>(asset, "assetName"));
		this.assetName.setRequired(true);
		
		this.dateOfPurchase = new TextField<Date>("dateOfPurchase", new PropertyModel<Date>(asset, "purchaseDate"));
		this.dateOfPurchase.setRequired(true);
		DatePicker datePicker = new DatePicker();
        datePicker.setShowOnFieldClick(true);     
        dateOfPurchase.add(datePicker);
        
        this.warrantyEndDate = new TextField<Date>("warrantyEndDate", new PropertyModel<Date>(asset, "warrantyEndDate"));
		DatePicker datePicker1 = new DatePicker();
		datePicker1.setShowOnFieldClick(true);     
		warrantyEndDate.add(datePicker1);
        
		this.quantity = new TextField<BigDecimal>("quantity", new PropertyModel<BigDecimal>(asset, "quantitiy"));
		this.quantity.setRequired(true);
		this.quantity.add(new RangeValidator<BigDecimal>(new BigDecimal(0), new BigDecimal(999999)));
		this.cost = new TextField<BigDecimal>("cost", new PropertyModel<BigDecimal>(asset, "unitCost"));
		this.cost.setRequired(true);
		this.totalCost = new TextField<BigDecimal>("totalCost", new PropertyModel<BigDecimal>(asset, "totalCost"));
		this.totalCost.setRequired(true);
		this.description = new TextArea<String>("description", new PropertyModel<String>(asset, "description"));
		this.description.setRequired(true);
		this.remarks = new TextArea<String>("remarks", new PropertyModel<String>(asset, "remarks"));
		this.save = new Button("save"){


			@Override
			public void onSubmit() {
				// TODO Auto-generated method stub
				
				objectLoader.save(Asset.class,asset);	
				
				// store in session
				FarmSession session = (FarmSession)getSession();
				session.addToStore("asset_key", asset.getId());
				getSession().info("Asset "+asset.getAssetCode()+" has been saved or updated");				
				setResponsePage(ListAssets.class);
			}			
		};
		
		form.add(this.assetCode);
		form.add(buildAssetType(asset));
		form.add(this.assetName);
		form.add(this.dateOfPurchase);
		form.add(this.warrantyEndDate);
		form.add(this.quantity);
		form.add(this.cost);
		form.add(this.totalCost);
		form.add(this.description);
		form.add(this.remarks);
				
		
		form.add(this.save);
		
		addAjaxBehaviorForCost(quantity);
		addAjaxBehaviorForCost(cost);
		totalCost.setOutputMarkupId(true);
		
		form.add( new FeedbackPanel("feedback"));
		this.add(form);		

		
	}
	
	private FormComponent<AssetType> buildAssetType(Asset asset){		
		this.assetType = new DropDownChoice<AssetType>("assetType",
				new PropertyModel<AssetType>(asset, "assetType"),
				new LoadableDetachableModel<List<AssetType>>() {

					@Override
					protected List<AssetType> load() {
						Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
						return objectLoader.findAll(AssetType.class,criterion);
					}

				});
		this.assetType.setRequired(true);
		return assetType;

	}


	// automate cost calculations
	private void addAjaxBehaviorForCost(TextField field){
		
		AbstractBehavior calculateCostBehavior = new OnChangeAjaxBehavior() {
			
			@Override
			protected void onUpdate(AjaxRequestTarget target) {
				BigDecimal 	purchaseValue = (BigDecimal)quantity.getDefaultModel().getObject();
				BigDecimal  unitCostValue = (BigDecimal)cost.getDefaultModel().getObject();				
				Double totalValue = calculateTotal(purchaseValue, unitCostValue);				
				PropertyModel<BigDecimal> totalValuePropertyModel = (PropertyModel<BigDecimal>)totalCost.getModel();
				totalValuePropertyModel.setObject(new BigDecimal(totalValue));		
				totalCost.modelChanged();			
				target.addComponent(totalCost);
			}
		};
		
		
		field.add(calculateCostBehavior);		
	}
	
	private String getFieldValue(TextField<BigDecimal> field){
		return field.getDefaultModelObjectAsString();
		
		/*String filedValue = field.getInput();
		if( null == filedValue){
			BigDecimal bigDecimal = field.getModelObject();
			if ( null != bigDecimal){
				filedValue = ""+bigDecimal.doubleValue();
			}
		}
		return filedValue;*/
	}
	
	private Double getNumberValue(String value){
		return Double.parseDouble(value);		
	}
	
	
	private boolean isNumber(String value){
		if( null == value || "".equals(value.toString().trim())){
			return false;
		}
		try{
			Double.parseDouble(value);
			return true;
		}catch(NumberFormatException ex){
			return false;
		}
	}
	
	private Double calculateTotal(BigDecimal unitPrice,BigDecimal quantity){
		if( null == unitPrice || quantity == null){
			return 0.0;
		}else{
			return unitPrice.doubleValue() * quantity.doubleValue();
		}
	}

	
}
