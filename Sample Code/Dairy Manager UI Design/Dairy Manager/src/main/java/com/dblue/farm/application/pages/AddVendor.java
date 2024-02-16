package com.dblue.farm.application.pages;

import java.util.ArrayList;
import java.util.HashSet;
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
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.Address;
import com.dblue.farm.Contact;
import com.dblue.farm.Farm;
import com.dblue.farm.Vendor;
import com.dblue.farm.VendorType;
import com.dblue.farm.application.FarmSession;
import com.dblue.farm.application.pages.validator.UniqueValueValidator;
import com.dblue.farm.exception.FarmRuntimeException;
import com.dblue.farm.exception.NotFoundException;

public class AddVendor extends FarmPage {
	
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
	
	protected List<Integer> contacteditedObjects;
	
	
	protected void addContactEditedObjects(Integer editedObject){
		if( null == contacteditedObjects){
			contacteditedObjects = new ArrayList<Integer>();			
		}
		contacteditedObjects.add(editedObject);
	}

	
	@Override
	protected void buildPageComponents() {
		
		Form form = new Form("addnewvendor");
		
		final Vendor vendor;
		
		final Contact contact;
		
		final Address address ;
		
		FarmSession session = (FarmSession)getSession();
		Integer vendorKeyId = (Integer)session.getStoreValue("vendor_key");
		if(null == vendorKeyId){
			vendor = new Vendor();
			vendor.setFarm(getLoginUserFarm());
			contact = new Contact();
			contact.setFarm(getLoginUserFarm());
			address = new Address();
		}else{
			try{
				vendor = objectLoader.load(Vendor.class, vendorKeyId);
				contact = vendor.getContact();
				address = (Address) contact.getAddresses().iterator().next();
			}catch(NotFoundException ex){
				throw new FarmRuntimeException(ex.getMessage(),ex);
			}
			addEditedObjects(vendor.getId());
			addContactEditedObjects(contact.getId());
		}
		
		
		this.vendorCode = new TextField<String>("vendorCode", new PropertyModel<String>(vendor, "code"));
		this.vendorCode.setRequired(true);
		this.vendorCode.add(new UniqueValueValidator<String>(Vendor.class,"code","Vendor Code"){

			@Override
			public List<Integer> excludeObjects() {
				return getEditedObjects();
						
			}
			
		});
		this.vendorName = new TextField<String>("vendorName", new PropertyModel<String>(vendor, "name"));
		this.vendorName.setRequired(true);
		this.vendorName.add(new UniqueValueValidator<String>(Vendor.class,"name","Vendor Name"){

			@Override
			public List<Integer> excludeObjects() {
				return getEditedObjects();
						
			}
			
		});

		this.contactPerson = new TextField<String>("contactPerson", new PropertyModel<String>(contact, "name"));
		this.contactPerson.setRequired(true);
		this.contactPerson.add(new UniqueValueValidator<String>(Contact.class,"name","Contact Name"){
			@Override
			public List<Integer> excludeObjects() {
				return contacteditedObjects;
			}		
		});
		this.contactNumber = new TextField<String>("contactNumber", new PropertyModel<String>(contact, "phoneNumber1"));
		this.contactNumber.setRequired(true);
		this.alternativeContactNumber = new TextField<String>("alternativeContactNumber", new PropertyModel<String>(contact, "phoneNumber2"));
		this.emailId = new TextField<String>("emailId", new PropertyModel<String>(contact, "emailId"));
		//this.emailId.setRequired(true);
		this.addressLine1 = new TextField<String>("addressLine1", new PropertyModel<String>(address, "line1"));
		this.addressLine1.setRequired(true);
		this.addressLine2 = new TextField<String>("addressLine2", new PropertyModel<String>(address, "line2"));
		this.addressLine3 = new TextField<String>("addressLine3", new PropertyModel<String>(address, "line3"));
		this.city = new TextField<String>("city", new PropertyModel<String>(address, "city"));
		this.city.setRequired(true);
		this.state = new TextField<String>("state", new PropertyModel<String>(address, "state"));
		this.state.setRequired(true);
		this.country = new TextField<String>("country", new PropertyModel<String>(address, "country"));
		this.country.setRequired(true);
		this.zipCode = new TextField<String>("zipCode", new PropertyModel<String>(address, "zip"));
		this.zipCode.setRequired(true);
		address.setType("P");
		
		this.remarks = new TextArea<String>("remarks", new PropertyModel<String>(vendor, "remarks"));
		
		this.save = new Button("save"){


			@Override
			public void onSubmit() {
				// TODO Auto-generated method stub
				
				Set<Address>  addresses= new HashSet<Address>();				
				addresses.add(address);
				contact.setAddresses(addresses);
				
				
				address.setContact(contact);
				
						
				vendor.setContact(contact);	
							
							
				farmApplicationDAO.saveVendor(contact, address, vendor);
				
				// store in session
				FarmSession session = (FarmSession)getSession();
				session.addToStore("vendor_key", vendor.getId());
				getSession().info("Vendor "+vendor.getCode()+" has been saved or updated");				
				setResponsePage(ListVendors.class);
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
						Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
						return objectLoader.findAll(VendorType.class,criterion);
					}

				});
		this.vendorType.setRequired(true);
		return vendorType;

	}

}
