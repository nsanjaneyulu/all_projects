package com.dblue.farm.application.pages;

import java.util.List;

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.PropertyModel;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.transaction.annotation.Transactional;

import com.dblue.farm.DeVermitizationType;
import com.dblue.farm.VaccineType;

public class IntervalConfiguration extends FarmPage {
	
	private Button vaccinTypeSave;
	private Button deVermitizationTypeSave;

	//private List<TextField> intervalVaccineFeilds = new ArrayList<TextField>();

	@Override
	protected void buildPageComponents() {
		buildVaccineType();	
		buildDevermitizationType();
		
	}

	private void buildVaccineType() {
		Form form = new Form("vaccineTypeForm");

		final List<VaccineType> vaccineTypeList = loadAllVaccineTypes();

		final ListView<VaccineType> VaccineTypeListView = new ListView<VaccineType>(
				"vaccine_rows", vaccineTypeList) {

			protected void populateItem(final ListItem<VaccineType> listItem) {
				
				listItem.add(new Label("vaccine",
						new PropertyModel<String>(listItem.getModel(),
								"vaccine")));

				listItem.add( new TextField<String>("intervalPeriod", new PropertyModel<String>(
						listItem.getModel(), "intervalPeriod")));
				
			}
		};
		this.vaccinTypeSave = new Button("vaccinTypeSave") {

			@Override
			public void onSubmit() {				
				saveAllVaccineTypes(vaccineTypeList);
				getSession().info("Vaccination Interval has been saved or updated");
				setResponsePage(IntervalConfiguration.class);
			}
			
			
		};
		form.add(this.vaccinTypeSave);
		form.add(VaccineTypeListView);
		form.add(new FeedbackPanel("feedback"));
		this.add(form);
	}
	
	private void buildDevermitizationType() {
		Form form = new Form("devermitizationTypeForm");

		final List<DeVermitizationType> deVermitizationTypeList = loadAllDeVermitizationTypes();

		final ListView<DeVermitizationType> vaccineTypeListView = new ListView<DeVermitizationType>(
				"rows", deVermitizationTypeList) {

			protected void populateItem(final ListItem<DeVermitizationType> listItem) {
				
				listItem.add(new Label("deVermitizationType",
						new PropertyModel<String>(listItem.getModel(),
								"deVermitizationType")));

				listItem.add(new TextField<String>("intervalPeriod", new PropertyModel<String>(
						listItem.getModel(), "intervalPeriod")));
				
			}
		};
		this.deVermitizationTypeSave = new Button("deVermitizationTypeSave") {

			@Override
			public void onSubmit() {				
				saveAllDeVermitizationTypes(deVermitizationTypeList);
				getSession().info("De-Vermitization Interval has been saved or updated");
				setResponsePage(IntervalConfiguration.class);
			}
			
			
		};
		form.add(this.deVermitizationTypeSave);
		form.add(vaccineTypeListView);
		form.add(new FeedbackPanel("feedback"));
		this.add(form);
	}
	
	@Transactional
	protected void saveAllVaccineTypes(List<VaccineType> vaccineTypeList) {
		for(VaccineType vaccineType :vaccineTypeList){
			objectLoader.save(VaccineType.class, vaccineType);
		}
	}
	
	@Transactional
	protected void saveAllDeVermitizationTypes(List<DeVermitizationType> deVermitizationTypeList){
		for(DeVermitizationType deVermitizationType: deVermitizationTypeList){
			objectLoader.save(DeVermitizationType.class, deVermitizationType);
		}
	}

	private List<VaccineType> loadAllVaccineTypes() {
		Criterion criterion = Restrictions.eq("farm",getLoginUserFarm());
		List<VaccineType>  vaccineTypes = objectLoader.findAll(VaccineType.class, criterion);

		return vaccineTypes;
	}
	
	private List<DeVermitizationType> loadAllDeVermitizationTypes(){
		Criterion criterion = Restrictions.eq("farm",getLoginUserFarm());
		List<DeVermitizationType> deVermitizationTypes = objectLoader.findAll(DeVermitizationType.class,criterion);
		return deVermitizationTypes;
	}
}