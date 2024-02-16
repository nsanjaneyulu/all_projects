package com.dblue.farm.application.pages;

import org.apache.wicket.authorization.strategies.role.annotations.AuthorizeInstantiation;
import org.apache.wicket.markup.html.form.Form;

import com.dblue.farm.AssetType;
import com.dblue.farm.BreedType;
import com.dblue.farm.DeVermitizationType;
import com.dblue.farm.DeceaseType;
import com.dblue.farm.ExpenseType;
import com.dblue.farm.FeedType;
import com.dblue.farm.IngredientType;
import com.dblue.farm.MilkingStatus;
import com.dblue.farm.OriginType;
import com.dblue.farm.ReceiptType;
import com.dblue.farm.StateType;
import com.dblue.farm.StockCategory;
import com.dblue.farm.VaccineType;
import com.dblue.farm.VendorType;
import com.dblue.farm.application.forms.DropDownForm;

@AuthorizeInstantiation(value={"ROLE_ADMIN"})
public class ConfigureDropdown extends FarmPage {

	@Override
	protected void buildPageComponents() {

		add(buildBreedComponents());
		add(buildStateConfiguration());
		add(buildOriginConfiguration());
		add(buildMilkingStatusConfiguration());
		add(buildVaccineStatusConfiguration());
		add(buildDeceaseConfiguration());
		add(buildFeedingComponents());
		add(buildIngredientConfiguration());
		add(buildDeVermitizationConfiguration());
		add(buildRevenueConfiguration());
		add(buildExpenseConfiguration());
		add(buildStockCategoryConfiguration());
		add(buildAssetTypeConfiguration());
		add(vendorTypeConfiguration());
	}

	private Form buildOriginConfiguration() {
		DropDownForm<OriginType> originForm = new DropDownForm<OriginType>("Live Stock Origin",OriginType.class,
				"originForm", "origin_addRow", "origin_removeRow",
				"origin_update", "originType", "origindesc", "origincheck",
				"originType", "description");
		return originForm;
	}
	
	private Form buildStateConfiguration(){
		DropDownForm<StateType> originForm = new DropDownForm<StateType>("Live Stock State",StateType.class,
				"stateForm", "state_addRow", "state_removeRow",
				"state_update", "stateType", "statedesc", "statecheck",
				"stateType", "description");
		return originForm;
	}
	

	private Form buildBreedComponents(){
		DropDownForm<BreedType> originForm = new DropDownForm<BreedType>("Live Stock Breed",BreedType.class,
				"breedForm", "breed_addRow", "breed_removeRow",
				"breed_update", "breedtype", "breeddesc", "breedcheck",
				"breedType", "description");
		return originForm;
	}
	
	private Form buildMilkingStatusConfiguration(){
		DropDownForm<MilkingStatus> originForm = new DropDownForm<MilkingStatus>("Live Stock Milking Status",MilkingStatus.class,
				"milkingstatusForm", "milking_addrow", "milking_removerow",
				"milking_updaterow", "status", "description", "milkcheck",
				"status", "description");
		return originForm;
	}
	
	private Form buildVaccineStatusConfiguration(){
		DropDownForm<VaccineType> originForm = new DropDownForm<VaccineType>("Live Stock Vaccination Type",VaccineType.class,
				"vaccinationForm", "vaccine_add", "vaccine_remove",
				"vaccine_update", "vaccine", "description", "vaccinecheck",
				"vaccine", "description");
		return originForm;
	}
	
	private Form buildDeceaseConfiguration(){
		DropDownForm<DeceaseType> originForm = new DropDownForm<DeceaseType>("Live Stock Disease Type",DeceaseType.class,
				"deceaseForm", "decease_add", "decease_remove",
				"decease_update", "decease", "deceasedesc", "deceasecheck",
				"decease", "description");
		return originForm;
	}
	
	private Form buildFeedingComponents(){
		DropDownForm<FeedType> originForm = new DropDownForm<FeedType>("Live Stock Feed ",FeedType.class,
				"feedForm", "feed_add", "feed_del",
				"feed_update", "feed", "desc", "feedcheck",
				"feedType", "description");
		return originForm;
	}
	
	public Form buildIngredientConfiguration(){
		DropDownForm<IngredientType> originForm = new DropDownForm<IngredientType>("Ingredient Type ",IngredientType.class,
				"ingredientForm", "ingredient_add", "ingredient_del",
				"ingredient_update", "ingredientType", "description", "ingredientcheck",
				"ingredient", "description");
		return originForm;
	}
	
	private Form buildDeVermitizationConfiguration() {
		DropDownForm<DeVermitizationType> originForm = new DropDownForm<DeVermitizationType>("Live Stock De-Vermitization Type",DeVermitizationType.class,
				"deVermitizationForm", "deVermitization_add", "deVermitization_del",
				"deVermitization_update", "deVermitizationType", "description", "deVermitizationtcheck",
				"deVermitizationType", "description");
		return originForm;
	}
	
	private Form buildRevenueConfiguration() {
		DropDownForm<ReceiptType> originForm = new DropDownForm<ReceiptType>("Revenue Type",ReceiptType.class,
				"receiptForm", "receipt_add", "receipt_del",
				"receipt_update", "receipt", "desc", "receiptcheck",
				"receipt", "description");
		return originForm;
	}
	
	private Form buildExpenseConfiguration() {
		DropDownForm<ExpenseType> originForm = new DropDownForm<ExpenseType>("Expense Type",ExpenseType.class,
				"expenseForm", "expense_add", "expense_del",
				"expense_update", "expense", "desc", "expensecheck",
				"expense", "description");
		return originForm;
	}
	
	private Form buildStockCategoryConfiguration() {
		DropDownForm<StockCategory> originForm = new DropDownForm<StockCategory>("Stock Category",StockCategory.class,
				"stockCategoryForm", "stock_add", "stock_del",
				"stock_update", "stock", "desc", "stockcategorycheck",
				"stock", "description");
		return originForm;
	}
	
	private Form buildAssetTypeConfiguration() {
		DropDownForm<AssetType> originForm = new DropDownForm<AssetType>("Asset Type",AssetType.class,
				"assetForm", "asset_add", "asset_del",
				"asset_update", "asset", "desc", "assetcheck",
				"asset", "description");
		return originForm;
	}
	
	private Form vendorTypeConfiguration() {
		DropDownForm<VendorType> originForm = new DropDownForm<VendorType>("Vendor Type",VendorType.class,
				"vendorForm", "vendor_add", "vendor_del",
				"vendor_update", "vendor", "desc", "vendorcheck",
				"vendor", "description");
		return originForm;
	}
	
}
