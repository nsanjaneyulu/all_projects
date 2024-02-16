package com.dblue.farm.application.pages;

import com.dblue.farm.application.pages.summary.ExpenseSummary;
import com.dblue.farm.application.pages.summary.FeedSummary;
import com.dblue.farm.application.pages.summary.LiveStockDueVaccinationSummary;
import com.dblue.farm.application.pages.summary.LiveStockDueWormingSummary;
import com.dblue.farm.application.pages.summary.LiveStockStopFeedingSummary;
import com.dblue.farm.application.pages.summary.LiveStockStopMilkingSummary;
import com.dblue.farm.application.pages.summary.LiveStockSummary;
import com.dblue.farm.application.pages.summary.MilkProductionSummary;
import com.dblue.farm.application.pages.summary.PersonSummary;
import com.dblue.farm.application.pages.summary.ProfitLossSummary;
import com.dblue.farm.application.pages.summary.PurchaseSummary;

public class LandingPage extends FarmPage{
	

	@Override
	protected void buildPageComponents() {
		LiveStockSummary liveStockSummary = new LiveStockSummary();
		liveStockSummary.buildLiveStockSummaryByState(this);	
		liveStockSummary.buildLiveStockSummaryBySex(this);
		liveStockSummary.buildLiveStockSummaryByBreed(this);	
		new PersonSummary(this);			
		new ExpenseSummary(this);
		new PurchaseSummary(this);
		new LiveStockStopMilkingSummary(this);	
		new LiveStockStopFeedingSummary(this);		
		new ProfitLossSummary(this);
		new MilkProductionSummary(this);	
		new LiveStockDueVaccinationSummary(this);
		new LiveStockDueWormingSummary(this);	
		new FeedSummary(this);		
		
	}
	
}




