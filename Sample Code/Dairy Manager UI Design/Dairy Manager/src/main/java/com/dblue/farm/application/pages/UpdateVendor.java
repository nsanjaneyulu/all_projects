package com.dblue.farm.application.pages;

import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.DropDownChoice;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.FormComponent;
import org.apache.wicket.markup.html.form.TextArea;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.LoadableDetachableModel;
import org.apache.wicket.model.PropertyModel;

import com.dblue.farm.Address;
import com.dblue.farm.Contact;
import com.dblue.farm.Vendor;
import com.dblue.farm.VendorType;

public class UpdateVendor extends FarmPage {
	
	private TextField<String> vendorCode;
	private DropDownChoice<VendorType> vendorType;	
	private TextField<String> vendorName;
	private TextField<String> contactPerson;
	private TextField<String> contactNumber;
	private TextField<String> alternativeContactNumber; 
	private TextField<String> emailId;
	private TextField<String> addressLine1;
	private TextField<String> addressLine2;
	private TextField<String> addressLine3;
	private TextField<String> city;
	private TextField<String> state;
	private TextField<String> country;
	private TextField<String> zipCode;	
	private TextArea<String>  remarks;
	private Button save;
	

	@Override
	protected void buildPageComponents() {
		
		Form form = new Form("editupdatevendor");
		
		List<Vendor> allVendors = objectLoader.findAll(Vendor.class);
		
		Vendor vendor = allVendors.get(1);
		
		Contact contact = vendor.getContact();
		
		Set addresses = contact.getAddresses();
		
		Iterator<Address> iterator = addresses.iterator();
		
		Address address = iterator.next();
		
		this.vendorCode = new TextField<String>("vendorCode", new PropertyModel<String>(vendor, "code"));
		this.vendorName = new TextField<String>("vendorName", new PropertyModel<String>(vendor, "name"));
		this.contactPerson = new TextField<String>("contactPerson", new PropertyModel<String>(contact, "name"));
		this.contactNumber = new TextField<String>("contactNumber", new PropertyModel<String>(contact, "phoneNumber1"));
		this.alternativeContactNumber = new TextField<String>("alternativeContactNumber", new PropertyModel<String>(contact, "phoneNumber2"));
		this.emailId = new TextField<String>("emailId", new PropertyModel<String>(contact, "emailId"));
		this.addressLine1 = new TextField<String>("addressLine1", new PropertyModel<String>(address, "line1"));
		this.addressLine2 = new TextField<String>("addressLine2", new PropertyModel<String>(address, "line2"));
		this.addressLine3 = new TextField<String>("addressLine3", new PropertyModel<String>(address, "line3"));
		this.city = new TextField<String>("city", new PropertyModel<String>(address, "city"));
		this.state = new TextField<String>("state", new PropertyModel<String>(address, "state"));
		this.country = new TextField<String>("country", new PropertyModel<String>(address, "country"));
		this.zipCode = new TextField<String>("zipCode", new PropertyModel<String>(address, "zip"));
		address.setType("P");
		
		this.remarks = new TextArea<String>("remarks", new PropertyModel<String>(vendor, "remarks"));
		
		this.save = new Button("save"){


			@Override
			public void onSubmit() {
//				// TODO Auto-generated method stub
//				
//				Set<Address>  addresses= new HashSet<Address>();				
//				addresses.add(address);
//				contact.setAddresses(addresses);
//				
//				objectLoader.save(Contact.class,contact);
//				
//				address.setContact(contact);
//				
//				objectLoader.save(Address.class,address);
//				
//				vendor.setContact(contact);	
//				
//				List<Farm> allFarms  = objectLoader.findAll(Farm.class);
//				vendor.setFarm(allFarms.get(0));
//				
//				objectLoader.save(Vendor.class,vendor);				
			}			
		};
		
		form.add(this.vendorCode);
		form.add(buildVendorType(vendor));
		form.add(this.vendorName);
		form.add(this.contactPerson);
		form.add(this.contactNumber);
		form.add(this.alternativeContactNumber);
		form.add(this.emailId);
		form.add(this.addressLine1);
		form.add(this.addressLine2);
		form.add(this.addressLine3);
		form.add(this.city);
		form.add(this.state);
		form.add(this.country);
		form.add(this.zipCode);
		form.add(this.remarks);		
		
		form.add(this.save);
		
		form.add( new FeedbackPanel("feedback"));
		this.add(form);		

		
	}
	
	private FormComponent<VendorType> buildVendorType(Vendor vendor){		
		this.vendorType = new DropDownChoice<VendorType>("vendorType",
				new PropertyModel<VendorType>(vendor, "vendorType"),
				new LoadableDetachableModel<List<VendorType>>() {

					@Override
					protected List<VendorType> load() {
						return objectLoader.findAll(VendorType.class);
					}

				});
		this.vendorType.setRequired(true);
		return vendorType;

	}

}

