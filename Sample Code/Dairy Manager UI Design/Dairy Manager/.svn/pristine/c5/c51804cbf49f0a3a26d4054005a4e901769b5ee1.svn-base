package com.dblue.farm.application.pages;

import java.util.Date;
import java.util.List;

import org.apache.wicket.extensions.markup.html.form.DateTextField;
import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.DropDownChoice;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.FormComponent;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.LoadableDetachableModel;
import org.apache.wicket.model.PropertyModel;

import com.dblue.farm.BreedType;
import com.dblue.farm.DeceaseType;
import com.dblue.farm.Health;
import com.dblue.farm.Livestock;
import com.dblue.farm.MilkingStatus;
import com.dblue.farm.OriginType;
import com.dblue.farm.Production;
import com.dblue.farm.StateType;
import com.dblue.farm.VaccineType;

public class LiveStockSearch extends FarmPage {

	private TextField<String> lsRFID;

	private TextField<String> lsLiveStockCode;

	private DropDownChoice<BreedType> lsBreedType;

	private DropDownChoice<StateType> lsLiveStockStateType;

	private DropDownChoice<MilkingStatus> milkingStatus;

	private DropDownChoice<OriginType> origin;

	private Button lsSearch;

	private TextField<String> hsRFID;

	private TextField<String> hsLiveStockCode;

	private DropDownChoice<BreedType> hsBreedType;

	private DropDownChoice<VaccineType> vaccineType;

	private DropDownChoice<DeceaseType> deceaseType;

	private Button hsSearch;
	
	private DateTextField fromDate;
	
	private DateTextField toDate;
	
	private TextField<String> mpRFID;

	private TextField<String> mpLiveStockCode;
	
	private DropDownChoice<StateType> mpLiveStockStateType;

	private DropDownChoice<BreedType> mpBreedType;
	
	private Button mpSearch;
	
	private TextField<String> rpRFID;

	private TextField<String> rpLiveStockCode;
	
	private DropDownChoice<BreedType> rpBreedType;
	
	private Button rpSearch;

	@Override
	protected void buildPageComponents() {

		buildLiveStockSearch();
		buildHealthSearch();
		buildMilkProductionSearch();
		buildReProductionSearch();

	}
	
	private void buildReProductionSearch() {

		Form reProductionSearchForm = new Form("reProductionSearch");

		final Livestock liveStock = new Livestock();
		
		this.rpRFID = new TextField<String>("rpRFID", new PropertyModel<String>(liveStock, "rfid"));
		this.rpLiveStockCode = new TextField<String>("rpLiveStockCode", new PropertyModel<String>(liveStock, "code"));
		this.rpSearch = new Button("rpSearch");

		reProductionSearchForm.add(this.rpRFID);
		reProductionSearchForm.add(this.rpLiveStockCode);
		reProductionSearchForm.add(rpBuildBreedType(liveStock));
		reProductionSearchForm.add(this.rpSearch);
		reProductionSearchForm.add(new FeedbackPanel("feedback"));
		
		this.add(reProductionSearchForm);
		

	}
	
	private void buildMilkProductionSearch() {
		// TODO Auto-generated method stub

		Form milkProductionSearchForm = new Form("milkproductionsearch");
		
		final Livestock liveStock = new Livestock();
		
		final Production production = new Production();
		
		this.fromDate = new DateTextField("fromDate", new PropertyModel<Date>(production, "date"));
		this.toDate = new DateTextField("toDate", new PropertyModel<Date>(production, "date"));
		this.mpRFID = new TextField<String>("mpRFID", new PropertyModel<String>(liveStock, "rfid"));
		this.mpLiveStockCode = new TextField<String>("mpLiveStockCode", new PropertyModel<String>(liveStock, "code"));
		this.mpSearch = new Button("mpSearch");
		
		milkProductionSearchForm.add(this.fromDate);
		milkProductionSearchForm.add(this.toDate);
		milkProductionSearchForm.add(this.mpRFID);
		milkProductionSearchForm.add(this.mpLiveStockCode);
		milkProductionSearchForm.add(mpBuildBreedType(liveStock));
		milkProductionSearchForm.add(mpBuildLiveStockState(liveStock));
		milkProductionSearchForm.add(mpSearch);
		milkProductionSearchForm.add(new FeedbackPanel("feedback"));
		
		this.add(milkProductionSearchForm);
		

	}


	private void buildHealthSearch() {
		// TODO Auto-generated method stub

		Form healthSearchForm = new Form("healthsearch");
		
		final Livestock liveStock = new Livestock();
		
		final Health health = new Health();
		
		this.hsRFID = new TextField<String>("hsRFID", new PropertyModel<String>(liveStock, "rfid"));
		this.hsLiveStockCode = new TextField<String>("hsLiveStockCode", new PropertyModel<String>(liveStock, "code"));
		this.hsSearch = new Button("hsSearch");
		
		healthSearchForm.add(this.hsRFID);
		healthSearchForm.add(this.hsLiveStockCode);
		healthSearchForm.add(hsBuildBreedType(liveStock));
		healthSearchForm.add(buildvaccinations(health));
		healthSearchForm.add(builddecease(health));
		healthSearchForm.add(hsSearch);
		healthSearchForm.add(new FeedbackPanel("feedback"));
		
		this.add(healthSearchForm);
		

	}

	private void buildLiveStockSearch() {

		Form liveStockSearchForm = new Form("liveStockSearch");

		final Livestock liveStock = new Livestock();
		
		this.lsRFID = new TextField<String>("lsRFID", new PropertyModel<String>(liveStock, "rfid"));
		this.lsLiveStockCode = new TextField<String>("lsLiveStockCode", new PropertyModel<String>(liveStock, "code"));
		this.lsSearch = new Button("lsSearch");

		liveStockSearchForm.add(this.lsRFID);
		liveStockSearchForm.add(this.lsLiveStockCode);
		liveStockSearchForm.add(lsBuildBreedType(liveStock));
		liveStockSearchForm.add(lsBuildLiveStockState(liveStock));
		liveStockSearchForm.add(buildMilkingStatus(liveStock));
		liveStockSearchForm.add(buildOrigin(liveStock));
		liveStockSearchForm.add(this.lsSearch);
		liveStockSearchForm.add(new FeedbackPanel("feedback"));
		
		this.add(liveStockSearchForm);
		

	}

	private FormComponent<VaccineType> buildvaccinations(Health health) {
		this.vaccineType = new DropDownChoice<VaccineType>("vaccineType",
				new PropertyModel<VaccineType>(health, "vaccinations"),
				new LoadableDetachableModel<List<VaccineType>>() {

					@Override
					protected List<VaccineType> load() {
						return objectLoader.findAll(VaccineType.class);
					}

				});
		this.vaccineType.setRequired(true);
		return vaccineType;
		// add(this.vaccine);
	}

	private FormComponent<DeceaseType> builddecease(Health health) {
		this.deceaseType = new DropDownChoice<DeceaseType>("deceaseType",
				new PropertyModel<DeceaseType>(health, "deceases"),
				new LoadableDetachableModel<List<DeceaseType>>() {

					@Override
					protected List<DeceaseType> load() {
						return objectLoader.findAll(DeceaseType.class);
					}

				});
		this.deceaseType.setRequired(true);
		return deceaseType;
		// add(this.vaccine);
	}

	private FormComponent<OriginType> buildOrigin(Livestock livestock) {
		this.origin = new DropDownChoice<OriginType>("origin",
				new PropertyModel<OriginType>(livestock, "originType"),
				new LoadableDetachableModel<List<OriginType>>() {

					@Override
					protected List<OriginType> load() {
						return objectLoader.findAll(OriginType.class);
					}

				});
		this.origin.setRequired(true);
		return origin;
		// add(this.origin);
	}

	private FormComponent<BreedType> lsBuildBreedType(Livestock livestock) {
		this.lsBreedType = new DropDownChoice<BreedType>("lsBreedType",
				new PropertyModel<BreedType>(livestock,
						"breedTypeByBreedTypeId"),
				new LoadableDetachableModel<List<BreedType>>() {

					@Override
					protected List<BreedType> load() {
						return objectLoader.findAll(BreedType.class);
					}

				});
		this.lsBreedType.setRequired(true);
		return lsBreedType;
		// add(this.breed);
	}
	
	private FormComponent<BreedType> hsBuildBreedType(Livestock livestock) {
		this.hsBreedType = new DropDownChoice<BreedType>("hsBreedType",
				new PropertyModel<BreedType>(livestock,
						"breedTypeByBreedTypeId"),
				new LoadableDetachableModel<List<BreedType>>() {

					@Override
					protected List<BreedType> load() {
						return objectLoader.findAll(BreedType.class);
					}

				});
		this.hsBreedType.setRequired(true);
		return hsBreedType;
		// add(this.breed);
	}
	
	private FormComponent<BreedType> mpBuildBreedType(Livestock livestock) {
		this.mpBreedType = new DropDownChoice<BreedType>("mpBreedType",
				new PropertyModel<BreedType>(livestock,
						"breedTypeByBreedTypeId"),
				new LoadableDetachableModel<List<BreedType>>() {

					@Override
					protected List<BreedType> load() {
						return objectLoader.findAll(BreedType.class);
					}

				});
		this.mpBreedType.setRequired(true);
		return mpBreedType;
		// add(this.breed);
	}
	
	private FormComponent<BreedType> rpBuildBreedType(Livestock livestock) {
		this.rpBreedType = new DropDownChoice<BreedType>("rpBreedType",
				new PropertyModel<BreedType>(livestock,
						"breedTypeByBreedTypeId"),
				new LoadableDetachableModel<List<BreedType>>() {

					@Override
					protected List<BreedType> load() {
						return objectLoader.findAll(BreedType.class);
					}

				});
		this.rpBreedType.setRequired(true);
		return rpBreedType;
		// add(this.breed);
	}

	private FormComponent<StateType> lsBuildLiveStockState(Livestock livestock) {
		this.lsLiveStockStateType = new DropDownChoice<StateType>("lsLiveStockStateType",
				new PropertyModel<StateType>(livestock, "stateType"),
				new LoadableDetachableModel<List<StateType>>() {

					@Override
					protected List<StateType> load() {
						return objectLoader.findAll(StateType.class);
					}

				});
		this.lsLiveStockStateType.setRequired(true);
		return lsLiveStockStateType;
		// add(this.state);
	}
	
	private FormComponent<StateType> mpBuildLiveStockState(Livestock livestock) {
		this.mpLiveStockStateType = new DropDownChoice<StateType>("mpLiveStockStateType",
				new PropertyModel<StateType>(livestock, "stateType"),
				new LoadableDetachableModel<List<StateType>>() {

					@Override
					protected List<StateType> load() {
						return objectLoader.findAll(StateType.class);
					}

				});
		this.mpLiveStockStateType.setRequired(true);
		return mpLiveStockStateType;
		// add(this.state);
	}

	private FormComponent<MilkingStatus> buildMilkingStatus(Livestock livestock) {
		this.milkingStatus = new DropDownChoice<MilkingStatus>("milkingStatus",
				new PropertyModel<MilkingStatus>(livestock, "milkingStatus"),
				new LoadableDetachableModel<List<MilkingStatus>>() {

					@Override
					protected List<MilkingStatus> load() {
						return objectLoader.findAll(MilkingStatus.class);
					}
				});
		this.milkingStatus.setRequired(true);
		return milkingStatus;
		// add(this.milkingStatus);
	}

}
