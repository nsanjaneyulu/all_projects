package com.dblue.farm.application.pages;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.wicket.extensions.yui.calendar.DatePicker;
import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.DropDownChoice;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.model.util.ListModel;

import com.dblue.farm.Address;
import com.dblue.farm.Contact;
import com.dblue.farm.Farm;
import com.dblue.farm.Person;
import com.dblue.farm.application.FarmSession;
import com.dblue.farm.application.pages.validator.UniqueValueValidator;
import com.dblue.farm.exception.FarmRuntimeException;
import com.dblue.farm.exception.NotFoundException;

public class AddEmployee extends FarmPage {

	private TextField<String> employeeNumber;
	private TextField<String> name;
	private TextField<String> deptNumber;
	private TextField<String> deptName;
	private TextField<BigDecimal> salary;
	private TextField<String> hikeDetails;
	private TextField<Date> hireDate;
	private TextField<Date> releiveDate;
	private TextField<String> academicQual;
	private TextField<BigDecimal> yearPassing;
	private DropDownChoice<Character> sex;
	private TextField<Date> dateOfBirth;
	private DropDownChoice<Character> maritalStatus;
	private DropDownChoice<Character> jobType;
	private TextField<String> bloodGroup;
	private TextField<String> spouseName;
	private TextField<String> contactPerson;
	private TextField<String> contactNumber;
	private TextField<String> alternativeContactNumber;
	private TextField<String> emailId;
	private TextField<String> currentAddressLine1;
	private TextField<String> currentAddressLine2;
	private TextField<String> currentAddressLine3;
	private TextField<String> currentCity;
	private TextField<String> currnetState;
	private TextField<String> currentCountry;
	private TextField<String> currnetZipCode;

	private TextField<String> permanentAddressLine1;
	private TextField<String> permanentAddressLine2;
	private TextField<String> permanentAddressLine3;
	private TextField<String> permanentCity;
	private TextField<String> permanentState;
	private TextField<String> permanentCountry;
	private TextField<String> permanentZipCode;

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

		Form form = new Form("addnewemployee");

		final Person person ;

		final Contact contact ;

		final Address currentAddress;

		final Address permanentAddress;

		FarmSession session = (FarmSession)getSession();
		Integer employeeKeyId = (Integer)session.getStoreValue("employee_key");
		if(null == employeeKeyId){
			person =  new Person();
			person.setFarm(getLoginUserFarm());
			contact = new Contact();
			contact.setFarm(getLoginUserFarm());
			currentAddress = new Address();
			permanentAddress = new Address();

		}else{
			try{
				person = objectLoader.load(Person.class, employeeKeyId);
				contact = person.getContact();
				currentAddress = contact.getTemporaryAddress();
				permanentAddress = contact.getPermanentAddress();
			}catch(NotFoundException ex){
				throw new FarmRuntimeException(ex.getMessage(),ex);
			}
			addEditedObjects(person.getId());
			addContactEditedObjects(contact.getId());
		}

		this.employeeNumber = new TextField<String>("employeeNumber",new PropertyModel<String>(person, "employeeNumber"));
		this.employeeNumber.setRequired(true);
		this.employeeNumber.add(new UniqueValueValidator<String>(Person.class,"employeeNumber","Employee Number"){

			@Override
			public List<Integer> excludeObjects() {
				return getEditedObjects();
			}

		});
		this.name = new TextField<String>("name", new PropertyModel<String>(person, "name"));
		this.name.setRequired(true);
		this.name.add(new UniqueValueValidator<String>(Person.class,"name","Employee Name"){

			@Override
			public List<Integer> excludeObjects() {
				return getEditedObjects();
			}

		});

		this.deptNumber = new TextField<String>("deptNumber",new PropertyModel<String>(person, "deptNumber"));
		//this.deptNumber.setRequired(true);
		this.deptName = new TextField<String>("deptName",new PropertyModel<String>(person, "deptName"));
		this.deptName.setRequired(true);
		this.salary = new TextField<BigDecimal>("salary",new PropertyModel<BigDecimal>(person, "salary"));
		this.salary.setRequired(true);
		this.hikeDetails = new TextField<String>("hikeDetails",new PropertyModel<String>(person, "hikeDetails"));
		//this.hikeDetails.setRequired(true);
		this.hireDate = new TextField<Date>("hireDate",new PropertyModel<Date>(person, "hireDate"));
		this.hireDate.setRequired(true);
		DatePicker datePicker1 = new DatePicker();
		datePicker1.setShowOnFieldClick(true);
		hireDate.add(datePicker1);
		this.releiveDate = new TextField<Date>("releiveDate",new PropertyModel<Date>(person, "releiveDate"));
		//this.releiveDate.setRequired(true);
		DatePicker datePicker2 = new DatePicker();
		datePicker2.setShowOnFieldClick(true);
		releiveDate.add(datePicker2);
		this.academicQual = new TextField<String>("academicQual",new PropertyModel<String>(person, "academicQual"));
		//this.academicQual.setRequired(true);
		this.yearPassing = new TextField<BigDecimal>("yearPassing",new PropertyModel<BigDecimal>(person, "yearPassing"));
		//this.yearPassing.setRequired(true);
		this.sex  = new DropDownChoice<Character>("sex", new PropertyModel<Character>(person,"sex"),new ListModel<Character>(Arrays.asList(new Character[]{'M','F'})));

		this.sex.setRequired(true);
		this.dateOfBirth = new TextField<Date>("dateOfBirth",new PropertyModel<Date>(person, "dateOfBirth"));
		this.dateOfBirth.setRequired(true);
		DatePicker datePicker3 = new DatePicker();
        datePicker3.setShowOnFieldClick(true);
        dateOfBirth.add(datePicker3);

        this.maritalStatus  = new DropDownChoice<Character>("maritalStatus", new PropertyModel<Character>(person,"maritalStatus"),new ListModel<Character>(Arrays.asList(new Character[]{'M','N','D'})));

		this.maritalStatus.setRequired(true);
		
		this.jobType  = new DropDownChoice<Character>("jobType", new PropertyModel<Character>(person,"jobType"),new ListModel<Character>(Arrays.asList(new Character[]{'P','T'})));
		this.jobType.setRequired(true);
		
		this.bloodGroup = new TextField<String>("bloodGroup",new PropertyModel<String>(person, "bloodGroup"));
		this.bloodGroup.setRequired(true);



		this.spouseName = new TextField<String>("spouseName",new PropertyModel<String>(person, "spouseName"));

		this.contactPerson = new TextField<String>("contactPName", new PropertyModel<String>(contact, "name"));
		this.contactPerson.setRequired(true);

		this.contactPerson.add(new UniqueValueValidator<String>(Contact.class,"name","Contact Person Name"){

			@Override
			public List<Integer> excludeObjects() {
				return contacteditedObjects;
			}

		});


		this.contactNumber = new TextField<String>("contactNumber", new PropertyModel<String>(contact, "phoneNumber1"));
		this.contactNumber.setRequired(true);
		this.alternativeContactNumber = new TextField<String>("alternativeContactNumber", new PropertyModel<String>(contact, "phoneNumber2"));
		this.emailId = new TextField<String>("emailId", new PropertyModel<String>(contact, "emailId"));
		this.emailId.add(new UniqueValueValidator<String>(Contact.class,"emailId","Employee Email"){

			@Override
			public List<Integer> excludeObjects() {
				return contacteditedObjects;
			}

		});
		//this.emailId.setRequired(true);

		this.currentAddressLine1 = new TextField<String>("currentAddressLine1", new PropertyModel<String>(currentAddress, "line1"));
		this.currentAddressLine1.setRequired(true);
		this.currentAddressLine2 = new TextField<String>("currentAddressLine2", new PropertyModel<String>(currentAddress, "line2"));
		this.currentAddressLine3 = new TextField<String>("currentAddressLine3", new PropertyModel<String>(currentAddress, "line3"));
		this.currentCity = new TextField<String>("currentCity", new PropertyModel<String>(currentAddress, "city"));
		this.currentCity.setRequired(true);
		this.currnetState = new TextField<String>("currnetState", new PropertyModel<String>(currentAddress, "state"));
		this.currnetState.setRequired(true);
		this.currentCountry = new TextField<String>("currentCountry", new PropertyModel<String>(currentAddress, "country"));
		this.currentCountry.setRequired(true);
		this.currnetZipCode = new TextField<String>("currnetZipCode", new PropertyModel<String>(currentAddress, "zip"));
		this.currnetZipCode.setRequired(true);

		this.permanentAddressLine1 = new TextField<String>("permanentAddressLine1", new PropertyModel<String>(permanentAddress, "line1"));
		this.permanentAddressLine1.setRequired(true);
		this.permanentAddressLine2 = new TextField<String>("permanentAddressLine2", new PropertyModel<String>(permanentAddress, "line2"));
		this.permanentAddressLine3 = new TextField<String>("permanentAddressLine3", new PropertyModel<String>(permanentAddress, "line3"));
		this.permanentCity = new TextField<String>("permanentCity", new PropertyModel<String>(permanentAddress, "city"));
		this.permanentCity.setRequired(true);
		this.permanentState = new TextField<String>("permanentState", new PropertyModel<String>(permanentAddress, "state"));
		this.permanentState.setRequired(true);
		this.permanentCountry = new TextField<String>("permanentCountry", new PropertyModel<String>(permanentAddress, "country"));
		this.permanentCountry.setRequired(true);
		this.permanentZipCode = new TextField<String>("permanentZipCode", new PropertyModel<String>(permanentAddress, "zip"));
		this.permanentZipCode.setRequired(true);

		currentAddress.setType("T");
		permanentAddress.setType("P");


		this.save = new Button("save") {
			//TODO: move this to transactional code
			@Override
			public void onSubmit() {
				// TODO Auto-generated method stub


				Set<Address> addresses = new HashSet<Address>();
				addresses.add(currentAddress);
				addresses.add(permanentAddress);
				contact.setAddresses(addresses);

				currentAddress.setContact(contact);
				permanentAddress.setContact(contact);


				person.setContact(contact);
//				List<Farm> allFarms  = objectLoader.findAll(Farm.class);
//				person.setFarm(allFarms.get(0));


				farmApplicationDAO.savePerson(contact, currentAddress, permanentAddress, person);

				// store in session
				FarmSession session = (FarmSession)getSession();
				session.addToStore("employee_key", person.getId());
				getSession().info("Employee "+person.getEmployeeNumber()+" has been saved or updated");
				setResponsePage(ListEmployees.class);

			}
		};

		form.add(this.employeeNumber);
		form.add(this.name);
		form.add(this.deptName);
		form.add(this.salary);
		form.add(this.hireDate);
		form.add(this.sex);
		form.add(this.jobType);
		form.add(this.dateOfBirth);
		form.add(this.maritalStatus);
		form.add(this.contactPerson);
		form.add(this.bloodGroup);
		form.add(this.contactNumber);
		form.add(this.currentAddressLine1);
		form.add(this.currentCity);
		form.add(this.currnetState);
		form.add(this.currentCountry);
		form.add(this.currnetZipCode);
		form.add(this.permanentAddressLine1);
		form.add(this.permanentCity);
		form.add(this.permanentState);
		form.add(this.permanentCountry);
		form.add(this.permanentZipCode);
		form.add(this.deptNumber);
		form.add(this.hikeDetails);
		form.add(this.releiveDate);
		form.add(this.academicQual);
		form.add(this.yearPassing);
		form.add(this.spouseName);
		form.add(this.alternativeContactNumber);
		form.add(this.emailId);
		form.add(this.currentAddressLine2);
		form.add(this.currentAddressLine3);
		form.add(this.permanentAddressLine2);
		form.add(this.permanentAddressLine3);
		form.add(this.save);
		form.add(new FeedbackPanel("feedback"));
		this.add(form);

	}

}

