package com.dblue.farm.application.pages;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.apache.wicket.Application;
import org.apache.wicket.Session;
import org.apache.wicket.authorization.strategies.role.annotations.AuthorizeInstantiation;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.repeater.data.IDataProvider;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.spring.injection.annot.SpringBean;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.security.core.context.SecurityContextHolder;

import com.dblue.farm.Farm;
import com.dblue.farm.application.FarmApplication;
import com.dblue.farm.application.FarmAuthentication;
import com.dblue.farm.application.FarmConfigurationProvider;
import com.dblue.farm.application.FarmSession;
import com.dblue.farm.application.dao.FarmApplicationDAO;
import com.dblue.farm.application.services.LicensingService;
import com.dblue.farm.exception.FarmRuntimeException;
import com.dblue.farm.exception.NotFoundException;
import com.dblue.orm.FarmObject;
import com.dblue.orm.ObjectLoader;
import com.esw.components.licensing.LicenseProvider;
import com.esw.components.licensing.aspect.LicenseVerifier;

@AuthorizeInstantiation(value={"ROLE_ADMIN","ROLE_USER"})
public abstract class FarmPage extends BasePage {
	
	@SpringBean(name="objectLoader")
	protected ObjectLoader objectLoader;
		
	@SpringBean(name="sessionFactory")
	protected SessionFactory sessionFactory;
	
	@SpringBean
	FarmApplicationDAO farmApplicationDAO;
		
	@SpringBean
	LicensingService licensingService;
	
	@SpringBean(name="farmConfigurationProvider")
	protected FarmConfigurationProvider farmConfigurationProvider;
	
	protected SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

	protected List<Integer> editedObjects;
	
	protected String generateLiveStockCode(){
		FarmApplication application = (FarmApplication)getApplication();
		
		Integer seq = null;
		
		Statement stmt=null;
		ResultSet rs=null;
		
		try {
			
			stmt = sessionFactory.openSession().connection().createStatement();

			Integer farmid = farmConfigurationProvider.getLoginUserFarm()
					.getId();

			rs = stmt
					.executeQuery("select max(CONVERT(substring(code,3),UNSIGNED INTEGER)) as seq from livestock where farm_id="
							+ farmid.toString());
			if( rs.next()){
				seq = rs.getInt("seq");
			}
		} catch (SQLException ex) {
			ex.printStackTrace();
		}finally{
			try{
			rs.close();
			stmt.close();
			}catch(SQLException ex){}
		}
		String preFix = farmConfigurationProvider.getFarmConfiguration().getCodePrefix();		
/*		Query query  = sessionFactory.getCurrentSession().createQuery("select max(cast(substring(l.code,3) as INTEGER)) from Livestock l where l.farm.id=:farmid");
		query.setInteger("farmid", getLoginUserFarm().getId());
		Number seq = (Number)query.uniqueResult();
*/		if(null==seq){
			seq=0;
		}
		// this is weak logic. Needs to be changed to sequence; Also add a prefix if required
		return preFix+(seq.intValue() +1);
	}
	
	protected Farm getLoginUserFarm(){
		FarmSession farmSession = (FarmSession)getSession();
		return farmSession.getFarm();
	}
	
	
	protected void addEditedObjects(Integer editedObject){
		if( null == editedObjects){
			editedObjects = new ArrayList<Integer>();			
		}
		editedObjects.add(editedObject);
	}
	
	protected List<Integer> getEditedObjects(){
		return editedObjects;
	}
	
	public FarmPage(){
		buildComponents();
		// testing
	}
	
	public void buildComponents(){
		
		
		Label dairyFarmName = (new Label("dairyFarmName",new PropertyModel<String>(getLoginUserFarm(),	"name")));
		
		Link homePageLink = new Link("topnav_home") {
			@Override
			public void onClick() {
				setResponsePage(HomePage.class);				
			}
		};
		
		Link contactUs = new Link("topnav_contact"){
			@Override
			public void onClick() {
				setResponsePage(HomePage.class);
			}
		};
		
		Link signout = new Link("topnav_signout"){
			@Override
			public void onClick() {
				// invalidate session
				FarmSession session = (FarmSession)Session.get();
				session.signOut();
				getSession().invalidate();
				getRequestCycle().setRedirect(true);
				setResponsePage(LoginPage.class);
			}

			@Override
			public boolean isEnabled() {
				FarmSession session = (FarmSession)Session.get();
				return session.isSignedIn();
			}
			
			
		};
		
		
		Link addLiveStock = new Link("livestock_new"){
			@Override
			public void onClick() {
				getFarmSession().removeObjectFromStore("livestockid");
				setResponsePage(LiveStockNew.class);
			}
		};
		
		Link editLiveStock = new Link("livestock_edit"){
			@Override
			public void onClick() {
				getFarmSession().removeObjectFromStore("livestockid");
				setResponsePage(EditUpdateSearch.class);
			}
		};
		
		Link listLiveStock = new Link("livestock_list"){
			@Override
			public void onClick() {
				getFarmSession().removeObjectFromStore("livestockid");
				setResponsePage(ListLiveStocks.class);
			}
		};
		Link listPromotions = new Link("promotion_history"){
			@Override
			public void onClick() {
				setResponsePage(PromotionHistoryList.class);
			}
		};
		
		Link listDeceased = new Link("discarded_history"){
			@Override
			public void onClick() {
				setResponsePage(DiscardedList.class);
			}
		};
		
		

		Link addMilkPage = new Link("milkproduction_new"){
			@Override
			public void onClick() {
				setResponsePage(AddDailyMilkProduction.class);
			}
		};
		
		Link dailyMilkPage = new Link("milkproduction_daily"){
			@Override
			public void onClick() {
				setResponsePage(DailyMilkProduction.class);
			}
		};
		
		
		
		Link editMilkPage = new Link("milkproduction_list"){
			@Override
			public void onClick() {
				setResponsePage(ListMilkProduction.class);
			}
		};
		
		Link ingreList = new Link("ingre_list"){
			@Override
			public void onClick() {
				setResponsePage(IngredientList.class);
			}
		};
		
		Link ingreOptioins = new Link("ingre_options"){
			@Override
			public void onClick() {
				setResponsePage(IngredientOptionsList.class);
			}
		};
		
		Link formCost = new Link("formula_cost"){
			@Override
			public void onClick() {
				setResponsePage(IngredientFormulaCost.class);
			}
		};
		
		
		
		Link addNewVendor = new Link("vendor_new"){
			@Override
			public void onClick() {
				FarmSession session = (FarmSession)getSession();
				session.removeObjectFromStore("vendor_key");				
				setResponsePage(AddVendor.class);
			}
		};
		
		Link listVen = new Link("vendor_list"){
			@Override
			public void onClick() {
				setResponsePage(ListVendors.class);
			}
		};
		
		
		
		Link addNewAsset = new Link("asset_new"){
			@Override
			public void onClick() {
				FarmSession session = (FarmSession)getSession();
				session.removeObjectFromStore("asset_key");

				setResponsePage(AddAsset.class);
			}
		};
		
		Link AssetList = new Link("asset_list"){
			@Override
			public void onClick() {
				setResponsePage(ListAssets.class);
			}
		};
		
		
		
		Link addNewStock = new Link("stock_new"){
			@Override
			public void onClick() {
				FarmSession session = (FarmSession)getSession();
				session.removeObjectFromStore("stock_key");
				setResponsePage(AddStockType.class);
			}
		};
		
		Link listStock = new Link("stock_list"){
			@Override
			public void onClick() {
				setResponsePage(ListStockTypes.class);
			}
		};
		
		Link stockAdd = new Link("stock_add"){
			@Override
			public void onClick() {
				setResponsePage(PCStock.class);
			}
		};
		
		Link stockAuditSearch = new Link("stock_audit_search"){
			@Override
			public void onClick() {
				setResponsePage(ListStock.class);
			}
		};
		
		
		Link addNewEmp = new Link("employee_new"){
			@Override
			public void onClick() {
				FarmSession session = (FarmSession)getSession();
				session.removeObjectFromStore("employee_key");
				setResponsePage(AddEmployee.class);
			}
		};
		
		Link listEmp = new Link("employee_list"){
			@Override
			public void onClick() {
				setResponsePage(ListEmployees.class);
			}
		};
		
		Link addNewRev = new Link("revenue_new"){
			@Override
			public void onClick() {
				FarmSession session = (FarmSession)getSession();
				session.removeObjectFromStore("revenue_key");
				setResponsePage(AddRevenue.class);
			}
		};
		
		Link listRev = new Link("revenue_list"){
			@Override
			public void onClick() {
				setResponsePage(ListRevenues.class);
			}
		};
		
		Link searchRev = new Link("search_revenue"){
			@Override
			public void onClick() {
				setResponsePage(SearchRevenue.class);
			}
		};
		
		Link addNewExp = new Link("expense_new"){
			@Override
			public void onClick() {
				FarmSession session = (FarmSession)getSession();
				session.removeObjectFromStore("expense_key");
				setResponsePage(AddExpense.class);
			}
		};
		
		Link listExp = new Link("expenses_list"){
			@Override
			public void onClick() {
				setResponsePage(ListExpenses.class);
			}
		};
		
		Link searchExp = new Link("search_exp"){
			@Override
			public void onClick() {
				setResponsePage(SearchExpenses.class);
			}
		};
		
//		Link searchCriteriya = new Link("search_Criteriya"){
//			@Override
//			public void onClick() {
//				setResponsePage(SearchCriteriya.class);
//			}
//		};
		
		Link configDrpdn = new Link("config_drpdn"){
			@Override
			public void onClick() {
				setResponsePage(ConfigureDropdown.class);
			}
		};

//		Link report_page = new Link("report_page"){
//			@Override
//			public void onClick() {
//				setResponsePage(ReportPage.class);
//			}
//		};
		
		Link farm_config = new Link("farm_config"){
			@Override
			public void onClick() {
				setResponsePage(FarmConfigurationPage.class);
			}
		};
		
		
		
		Link suggestedFeeding = new Link("suggest_feeding"){

			@Override
			public void onClick() {				
				setResponsePage(SuggestedFeeding.class);
			}
			
		};
		
		Link feedingHistory = new Link("feeding_history"){
			@Override
			public void onClick() {				
				setResponsePage(FeedingHistory.class);
			}
		};
		
		Link landingPage = new Link("landing_page"){
			@Override
			public void onClick() {				
				setResponsePage(LandingPage.class);
			}
		};
		
		Link interConfig = new Link("interval_config"){
			@Override
			public void onClick() {				
				setResponsePage(IntervalConfiguration.class);
			}
		};
		
		
		add(dairyFarmName);
		add(homePageLink);
		add(contactUs);
		add(addLiveStock);
		add(listLiveStock);
		add(listPromotions);
		add(listDeceased);
		add(configDrpdn);
		add(farm_config);
		//add(searchCriteriya);
		add(editLiveStock);
		add(addMilkPage);
		add(dailyMilkPage);
		add(editMilkPage);
		add(ingreList);
		add(ingreOptioins);
		add(formCost);
		add(addNewVendor);
		add(listVen);
		

		add(addNewAsset);
		add(AssetList);
		add(addNewStock);
		add(listStock);
		add(stockAdd);
		add(stockAuditSearch);
		add(addNewEmp);
		add(listEmp);
		add(addNewRev);
		add(searchRev);
		add(listRev);
		add(addNewExp);
		add(listExp);
		add(searchExp);
		add(suggestedFeeding);
	//	add(report_page);
		add(feedingHistory);
		add(signout);
		add(landingPage);
		add(interConfig);
		buildPageComponents();
	}
	
	protected abstract void buildPageComponents();
	
	public IDataProvider<FarmObject> getDataProvider(){
		throw new FarmRuntimeException("Page "+ this.getClass().getName()+ " doesnt support pagination");
	}
}
