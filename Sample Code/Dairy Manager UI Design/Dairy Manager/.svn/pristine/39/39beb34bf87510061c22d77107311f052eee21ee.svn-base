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

import com.dblue.farm.Person;
import com.dblue.farm.application.FarmSession;

public class ListEmployees extends FarmPage {

	@Override
	protected void buildPageComponents() {
		
		final List<Person> employeeList = loadAllEmployees();

		final ListView<Person> employeeListView = new ListView<Person>(
				"rows", employeeList) {
			
			protected void populateItem(final ListItem<Person> listItem) {
				
				AjaxLink editEmployeeLink =new AjaxLink("employee_edit"){

					@Override
					public void onClick(AjaxRequestTarget target) {
						//redirect to add assets
						// add session key
						Person person = listItem.getModelObject();						
						Integer employeeId = person.getId();
						((FarmSession)getSession()).addToStore("employee_key", employeeId);
						setResponsePage(AddEmployee.class);
					}
					
				};
				
				editEmployeeLink.add(new Label("employeeNumber",
						new PropertyModel<String>(listItem.getModel(),
								"employeeNumber")));

				listItem.add(editEmployeeLink);				

				listItem.add(new Label("name",
						new PropertyModel<String>(listItem.getModel(),
								"name")));
				
				listItem.add(new Label("deptName",
						new PropertyModel<String>(listItem.getModel(),
								"deptName")));
				
				listItem.add(new Label("jobType",
						new PropertyModel<String>(listItem.getModel(),
								"jobType")));
				
				listItem.add(new Label("contactNumber",
						new PropertyModel<String>(listItem.getModel(),
								"contact.phoneNumber1")));
				
				listItem.add(new Label("sex",
						new PropertyModel<String>(listItem.getModel(),
								"sex")));
				
				listItem.add(new Label("dateOfBirth",
						new PropertyModel<String>(listItem.getModel(),
								"dateOfBirth")));
				
				listItem.add(new Label("salary",
						new PropertyModel<String>(listItem.getModel(),
								"salary")));
						
				listItem.add(new Label("bloodGroup",
						new PropertyModel<String>(listItem.getModel(),
								"bloodGroup")));				
				
			}
		};

		add(employeeListView);
		add( new FeedbackPanel("feedback"));

	}

	private List<Person> loadAllEmployees() {
		Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
		List<Person> employeeList = objectLoader.findAll(Person.class, criterion);
		return employeeList;
	}

}
