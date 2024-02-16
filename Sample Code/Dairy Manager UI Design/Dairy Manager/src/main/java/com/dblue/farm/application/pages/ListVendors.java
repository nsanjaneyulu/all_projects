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

import com.dblue.farm.Vendor;
import com.dblue.farm.application.FarmSession;

public class ListVendors extends FarmPage {

	private Label vendorCode;
	private Label vendorType;
	private Label vendorName;
	private Label vendorContactPerson;
	private Label contactNumber;
	private Label alternateContactNumber;
	private Label remarks;

	@Override
	protected void buildPageComponents() {

		final List<Vendor> vendorList = loadAllVendors();

		final ListView<Vendor> vendorListView = new ListView<Vendor>(
				"rows", vendorList) {

			protected void populateItem(final ListItem<Vendor> listItem) {
				
				AjaxLink editVendorLink =new AjaxLink("vendor_edit"){

					@Override
					public void onClick(AjaxRequestTarget target) {
						//redirect to add assets
						// add session key
						Integer vendorId = listItem.getModelObject().getId();
						((FarmSession)getSession()).addToStore("vendor_key", vendorId);
						setResponsePage(AddVendor.class);
					}
					
				};
				editVendorLink.add(new Label("vendorCode",
						new PropertyModel<String>(listItem.getModel(),
								"code")));

				listItem.add(editVendorLink);

				listItem.add(new Label("vendorType",
						new PropertyModel<String>(listItem.getModel(),
								"vendorType.vendor")));

				listItem.add(new Label("vendorName", new PropertyModel<String>(
						listItem.getModel(), "name")));

				listItem.add(new Label("vendorContactPerson", new PropertyModel<String>(
						listItem.getModel(), "contact.name")));

				listItem.add(new Label("contactNumber", new PropertyModel<String>(
						listItem.getModel(), "contact.phoneNumber1")));
				
				listItem.add(new Label("alternateContactNumber", new PropertyModel<String>(
						listItem.getModel(), "contact.phoneNumber2")));
				
				listItem.add(new Label("vendorAddress", new PropertyModel<String>(
						listItem.getModel(), "contact.permanentAddress.readableAddress")));

				listItem.add(new Label("remarks", new PropertyModel<String>(
						listItem.getModel(), "remarks")));

			}
		};

		add(vendorListView);
        add( new FeedbackPanel("feedback"));
	}

	private List<Vendor> loadAllVendors() {
		Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
		List<Vendor> vendors = objectLoader.findAll(Vendor.class,criterion);

		return vendors;
	}
}
