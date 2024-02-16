package com.dblue.farm.application.pages.summary;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.model.Model;

import com.dblue.farm.application.pages.FarmPage;

public class ProfitLossSummary extends BaseSummary {
	
	public ProfitLossSummary(FarmPage page){
		buildProfitLossReport(page);
	}



	
	


	protected void buildProfitLossReport(FarmPage p) {

		List<Object[]> allPurchases = getPurchases(getYearStartDate(),
				getYearEndDate());
		List<Object[]> allExpenses = getExpenses(getYearStartDate(),
				getYearEndDate());
		Number totalPurchases = getTotalPurchases();
		Number totalExpenses = getTotalExpense();

		Number netprofitLoss = totalPurchases.doubleValue()
				- totalExpenses.doubleValue();

		final Map<Integer, Number> monthlyProfitLoss = new HashMap<Integer, Number>();

		// monthly net
		for (Object[] purchase : allPurchases) {
			monthlyProfitLoss.put((Integer) purchase[0], (Number) purchase[1]);
		}

		for (Object[] expenses : allExpenses) {
			Number purchase = monthlyProfitLoss.get(expenses[0]);
			if (null == purchase) {
				// add negetive expense
				Number netProfitLoss = -1
						* ((Number) expenses[1]).doubleValue();
				monthlyProfitLoss.put((Integer) expenses[0], netProfitLoss);
			} else {
				Number netProfitLoss = purchase.doubleValue()
						- ((Number) expenses[1]).doubleValue();
				monthlyProfitLoss.put((Integer) expenses[0], netProfitLoss);
			}
		}

		p.add(new Label("netprofit_loss_count",
				new Model<Number>(netprofitLoss)));
		// ok we have the list assing to a list view
		ListView netProfitLossListView = new ListView("net_profit_loss_rows",
				Arrays.asList(monthlyProfitLoss.keySet().toArray())) {

			@Override
			protected void populateItem(ListItem item) {
				Integer month = (Integer) item.getModelObject();
				Number value = (Number) monthlyProfitLoss.get(month);

				item.add(new Label("state", new Model<String>(
						getDisplayMonth(month))));
				item.add(new Label("count", new Model<Number>(value)));
			}
		};
		p.add(netProfitLossListView);
	}

}
