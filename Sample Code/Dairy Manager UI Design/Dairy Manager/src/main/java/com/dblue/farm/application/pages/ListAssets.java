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

import com.dblue.farm.Asset;
import com.dblue.farm.application.FarmSession;

public class ListAssets extends FarmPage {

	private Label assetCode;
	private Label assetType;
	private Label assetName;
	private Label description;
	private Label purchaseDate;
	private Label quantitiy;
	private Label unitCost;
	private Label totalCost;
	private Label remarks;

	@Override
	protected void buildPageComponents() {
		final List<Asset> assetList = loadAllAssets();

		final ListView<Asset> assetListView = new ListView<Asset>("rows",
				assetList) {

			protected void populateItem(final ListItem<Asset> listItem) {
				
				AjaxLink editAssetLink =new AjaxLink("asset_edit"){

					@Override
					public void onClick(AjaxRequestTarget target) {
						//redirect to add assets
						// add session key
						Integer assetid = listItem.getModelObject().getId();
						((FarmSession)getSession()).addToStore("asset_key", assetid);
						setResponsePage(AddAsset.class);
					}
					
				};
				
				
				editAssetLink.add(new Label("assetCode", new PropertyModel<String>(
						listItem.getModel(), "assetCode")));
				listItem.add(editAssetLink );

				
				listItem.add(new Label("assetType", new PropertyModel<String>(
						listItem.getModel(), "assetType.asset")));

				listItem.add(new Label("assetName", new PropertyModel<String>(
						listItem.getModel(), "assetName")));

				listItem.add(new Label("description",
						new PropertyModel<String>(listItem.getModel(),
								"description")));

				listItem.add(new Label("purchaseDate",
						new PropertyModel<String>(listItem.getModel(),
								"purchaseDate")));
				
				listItem.add(new Label("warrantyEndDate",
						new PropertyModel<String>(listItem.getModel(),
								"warrantyEndDate")));

				listItem.add(new Label("quantitiy",
						new PropertyModel<String>(listItem.getModel(),
								"quantitiy")));

				listItem.add(new Label("unitCost",
						new PropertyModel<String>(listItem.getModel(),
								"unitCost")));
				
				listItem.add(new Label("totalCost",
						new PropertyModel<String>(listItem.getModel(),
								"totalCost")));

				listItem.add(new Label("remarks", new PropertyModel<String>(
						listItem.getModel(), "remarks")));

			}
		};

		add(assetListView);
		add( new FeedbackPanel("feedback"));

	}

	private List<Asset> loadAllAssets() {
		Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
		List<Asset> assets = objectLoader.findAll(Asset.class,criterion);

		return assets;
	}
}