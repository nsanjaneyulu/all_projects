package com.dblue.farm.application.pages;

import java.util.List;

import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.markup.html.AjaxLink;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.PropertyModel;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.StockType;
import com.dblue.farm.application.FarmSession;

public class ListStockTypes extends FarmPage {

	private Label stockCode;
	private Label stockName;
	private Label stockCategory;	
	private Label stockMinLevel;
	private Label stockBalance;
	
	@Override
	protected void buildPageComponents() {
		final List<StockType> stockList = loadAllStockTypes();

		final ListView<StockType> stockListView = new ListView<StockType>("rows",
				stockList) {

			protected void populateItem(final ListItem<StockType> listItem) {
				
				AjaxLink editStockLink =new AjaxLink("stock_edit"){

					@Override
					public void onClick(AjaxRequestTarget target) {
						//redirect to add assets
						// add session key
						Integer stockId = listItem.getModelObject().getId();
						((FarmSession)getSession()).addToStore("stock_key", stockId);
						setResponsePage(AddStockType.class);
					}
					
				};
								
				editStockLink.add(new Label("stockCode", new PropertyModel<String>(
						listItem.getModel(), "stockCode")));
				listItem.add(editStockLink );


				listItem.add(new Label("stockCategory", new PropertyModel<String>(
						listItem.getModel(), "stockCategory.stock")));

				listItem.add(new Label("stockName", new PropertyModel<String>(
						listItem.getModel(), "stockName")));

				listItem.add(new Label("stockBalance",
						new PropertyModel<String>(listItem.getModel(),
								"stockBalance")));
				
				listItem.add(new Label("stockMinLevel",
						new PropertyModel<String>(listItem.getModel(),
								"stockMinLevel")));

				
			}
		};

		add(stockListView);
		add( new FeedbackPanel("feedback"));
	}

	private List<StockType> loadAllStockTypes() {
		Criterion criterion  = Restrictions.eq("farm", getLoginUserFarm());
		List<StockType> stockTypes = objectLoader.findAll(StockType.class,criterion);

		return stockTypes;
	}
}