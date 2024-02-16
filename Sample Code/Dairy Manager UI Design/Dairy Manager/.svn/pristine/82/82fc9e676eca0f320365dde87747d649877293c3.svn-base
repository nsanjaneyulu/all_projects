package com.dblue.farm.application.pages;

import java.util.List;

import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.markup.html.AjaxLink;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.PropertyModel;

import com.dblue.farm.Livestock;
import com.dblue.farm.application.FarmSession;

public class ListReProduction extends FarmPage {

	private Label rsLiveStockCode;
	private Label rsRfid;
	private Label rsStateType;
	private Label breedTypeByBreedTypeId;

	@Override
	protected void buildPageComponents() {

		final List<Livestock> reproductionlivestockList = loadAllReProductionLivestock();

		final ListView<Livestock> reproductionlivestockListView = new ListView<Livestock>(
				"rows", reproductionlivestockList) {

			protected void populateItem(final ListItem<Livestock> listItem) {
				
				AjaxLink editReProductionLivestockLink =new AjaxLink("reproductionlivestock_edit"){

					@Override
					public void onClick(AjaxRequestTarget target) {
						//redirect to add assets
						// add session key
						Integer livestockId = listItem.getModelObject().getId();
						((FarmSession)getSession()).addToStore("reproductionlivestock_key", livestockId);
						setResponsePage(LiveStockNew.class);
					}
					
				};
				editReProductionLivestockLink.add(new Label("rsLiveStockCode",
						new PropertyModel<String>(listItem.getModel(),
								"code")));

				listItem.add(editReProductionLivestockLink);

				listItem.add(new Label("rsBreedType",
						new PropertyModel<String>(listItem.getModel(),
								"breedTypeByBreedTypeId.breedType")));

				listItem.add(new Label("lsRfid", new PropertyModel<String>(
						listItem.getModel(), "rfid")));

				listItem.add(new Label("rsStateType", new PropertyModel<String>(
						listItem.getModel(), "StateType.stateType")));

			}
		};

		add(reproductionlivestockListView);
        add( new FeedbackPanel("feedback"));
	}

	private List<Livestock> loadAllReProductionLivestock() {

		List<Livestock>  reproductionlivestock = objectLoader.findAll(Livestock.class);

		return reproductionlivestock;
	}
}