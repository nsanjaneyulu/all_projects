package com.dblue.farm.application.pages.summary;

import java.util.List;

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.model.Model;

import com.dblue.farm.application.pages.FarmPage;

public class PurchaseSummary extends BaseSummary {

	public PurchaseSummary(FarmPage page) {
		// TODO:Assuming that its required for current year.
		page.add(new Label("purcchase_count", new Model<Number>(
				getTotalPurchases())));

		// get the group items.

		List<Object[]> results = getPurchases(getYearStartDate(),
				getYearEndDate());

		ListView<Object[]> purchaseListView = new ListView<Object[]>(
				"purchase_rows", results) {

			@Override
			protected void populateItem(ListItem<Object[]> item) {
				Object[] resultElements = item.getModelObject();
				item.add(new Label("state", new Model<String>(
						getDisplayMonth((Integer) resultElements[0]))));
				item.add(new Label("count", new Model<Number>(
						(Number) resultElements[1])));

			}
		};

		page.add(purchaseListView);

	}

}
