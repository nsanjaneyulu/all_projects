package com.dblue.farm.application.pages;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.wicket.Application;
import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.markup.html.form.AjaxButton;
import org.apache.wicket.extensions.markup.html.repeater.data.sort.OrderByBorder;
import org.apache.wicket.extensions.markup.html.repeater.util.SortableDataProvider;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.FormComponent;
import org.apache.wicket.markup.html.form.validation.AbstractFormValidator;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.navigation.paging.PagingNavigator;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.markup.repeater.Item;
import org.apache.wicket.markup.repeater.data.DataView;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.LoadableDetachableModel;
import org.apache.wicket.model.Model;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.model.util.ListModel;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.BreedType;
import com.dblue.farm.FarmConfiguration;
import com.dblue.farm.Livestock;
import com.dblue.farm.MilkingStatus;
import com.dblue.farm.OriginType;
import com.dblue.farm.StateType;
import com.dblue.farm.application.FarmApplication;
import com.dblue.farm.application.FarmSession;
import com.dblue.farm.application.pages.pagination.DynamicDataProviderWrapper;
import com.dblue.farm.application.pages.pagination.EmptyFarmObjectQueryBasedDataProvider;
import com.dblue.farm.application.pages.pagination.QuerySupport;
import com.dblue.farm.application.pages.pagination.SearchDataProvider;
import com.dblue.farm.application.pages.search.CriteionAwareDropDownChoice;
import com.dblue.farm.application.pages.search.CriterionAware;
import com.dblue.farm.application.pages.search.CriterionAwareTextField;
import com.dblue.orm.FarmObject;

public class EditUpdateSearch extends FarmPage {
	
	private FeedbackPanel feedbackPanel;
	
	private BreedType breedTypeByBreedTypeId;
	
	private StateType stateType;
	
	private MilkingStatus milkingStatus;

	private OriginType originType;
	
	private Character sex;

	private Character stopMilkingStatus;
	
	private List<FormComponent<?>> searchFields;
	
	private WebMarkupContainer dataWrapper;
	
	private SortableDataProvider<FarmObject> liveStockDataProvider;
	
	DataView<FarmObject> dataView;
	
	
	@Override
	protected void buildPageComponents() {
		
		searchFields= new ArrayList<FormComponent<?>>();

		Form form = new Form("stockSearch");
		CriterionAwareTextField<String> rfid = new CriterionAwareTextField<String>("rfid",new Model<String>(),"rfid");
		CriterionAwareTextField<String> code = new CriterionAwareTextField<String>("code",new Model<String>(),"code");
		
		
		searchFields.add(rfid);
		searchFields.add(code);
		searchFields.add(buildBreed());
		searchFields.add(buildOrigin());
		searchFields.add(buildStockType());
		searchFields.add(buildMilkingStatus());
		searchFields.add(buildStopMilkingStatus());
		searchFields.add(buildSex());
		
		for( FormComponent<?> component : searchFields){
			form.add(component);
		}
		
		form.add(buildSearch(searchFields));

		form.add(new AbstractFormValidator() {

			public FormComponent<?>[] getDependentFormComponents() {
				return searchFields.toArray( new FormComponent<?>[0]);
			}

			public void validate(Form<?> form) {
				boolean hasSearchContent =false;
				for( FormComponent<?> component : searchFields){
					if( !isNull(component.getRawInput())){
						hasSearchContent=true;
					}
				}
				if (!hasSearchContent) {
					form.error("Please enter atleast one search criteria");
				}

			}

		});
		
		this.liveStockDataProvider = new EmptyFarmObjectQueryBasedDataProvider<FarmObject>();
		
		this.dataWrapper = new WebMarkupContainer("datawrapper");
		this.dataWrapper.setOutputMarkupId(true);
		this.dataWrapper.add(buildDataView());
		this.dataWrapper.add(new PagingNavigator("navigator", dataView));
		//this.dataWrapper.add(new OrderByBorder("orderbycode", "code", liveStockDataProvider));	

		
		this.feedbackPanel = new FeedbackPanel("feedback");
		this.feedbackPanel.setOutputMarkupId(true);
		
		form.add(feedbackPanel);
		add(dataWrapper);
		add(form);		

	}
	
	public SortableDataProvider<FarmObject> getDataProvider(){
		return liveStockDataProvider;
	}
	
	private DataView<FarmObject> buildDataView(){
		FarmConfiguration farmConfiguration =farmConfigurationProvider.getFarmConfiguration(); 
		Integer paginationSize = farmConfiguration.getPagination();
		
		this.dataView = new DataView<FarmObject>("rows",new DynamicDataProviderWrapper<EditUpdateSearch>(this), paginationSize) {
			protected void populateItem(final Item<FarmObject> item) {
				IModel<FarmObject> liveStockModel = (IModel<FarmObject>)item.getModel();
				final Livestock livestock = (Livestock)liveStockModel.getObject();
				Link editLink=new Link<FarmObject>("livestock_edit", liveStockModel) {
					public void onClick() {
						
						Integer livestockId = livestock.getId();
						((FarmSession) getSession()).addToStore("livestockid",
								livestockId);
						setResponsePage(LiveStockNew.class);
					}
				};
				
				editLink.add(new Label("lsLiveStockCode",
								new PropertyModel<String>(item.getModel(),
										"code")));
				
				item.add(editLink);
				
				
				item.add(new Label("lsBreedType",
						new PropertyModel<String>(item.getModel(),
								"breedTypeByBreedTypeId.breedType")));

				item.add(new Label("lsRfid", new PropertyModel<String>(
						item.getModel(), "rfid")));

				item.add(new Label("lsStateType",
						new PropertyModel<String>(item.getModel(),
								"StateType.stateType")));

				item.add(new Label("milkingStatus",
						new PropertyModel<String>(item.getModel(),
								"milkingStatus.status")));

				item.add(new Label("originType", new PropertyModel<String>(
						item.getModel(), "OriginType.originType")));
				
				Link motherlscode = new Link<FarmObject>("motherlscode",
						item.getModel()) {
					public void onClick() {
						Livestock livestock = (Livestock)item.getModelObject();
						String motherCode = livestock.getMothercode();
						if (null != motherCode) {
							Criterion motherCodeRestriction = Restrictions.eq(
									"code", motherCode);
							List<Livestock> allMothers = objectLoader.findAll(
									Livestock.class, motherCodeRestriction);
							if (allMothers.size() > 0) {
								Livestock mother = allMothers.get(0);
								((FarmSession) getSession()).addToStore(
										"livestockid", mother.getId());
								setResponsePage(LiveStockNew.class);
							}
						}
					}
				};
				
				motherlscode.add(new Label("lsmotherlbl",livestock.getMothercode()));
				
				item.add(motherlscode);

				
			}
		};
		dataView.setOutputMarkupId(true);
		return dataView;
	}
	
	
	private List<FormComponent<?>> getValidSearchFields(){
		
		List<FormComponent<?>>  validSearchFields = new ArrayList<FormComponent<?>>();
		
		for( FormComponent<?> component : searchFields){
			if( !isNull(component.getValue())){
				validSearchFields.add(component);
			}
		}
		return validSearchFields;
	}
	
	private Criterion buildCriterion(List<FormComponent<?>> validSearchFields){
		
		Criterion criterion =null;
		
		if( validSearchFields.size() == 1){
			criterion = ((CriterionAware<?>)validSearchFields.get(0)).getCriterion();
		}else{
			for( FormComponent<?> searchField : validSearchFields){
				if( null == criterion){
					criterion = ((CriterionAware<?>)searchField).getCriterion();
				}else{
					criterion = Restrictions.or(criterion, ((CriterionAware<?>)searchField).getCriterion());
				}
			}
		}
		
		return criterion;
	}

	private AjaxButton buildSearch(List<FormComponent<?>> searchFields) {
		// add search button
		AjaxButton search = new AjaxButton("search") {

			@Override
			protected void onSubmit(AjaxRequestTarget target, Form<?> form) {
				
				List<FormComponent<?>> validSearchFields = getValidSearchFields();
				
				String queryString = "select distinct l from Livestock l ";
				String countQueryString = "select count(distinct l) from Livestock l ";
							
				if( validSearchFields.size() > 0 ){
					queryString += " where  l.farm ="+getLoginUserFarm().getId()+"  and  ";
					countQueryString+= " where  l.farm ="+getLoginUserFarm().getId()+"  and  ";
				}
				
				int index=0;
				for( FormComponent<?> formComponent : validSearchFields){
					String queryVar = ((CriterionAware<?>)formComponent).getProperty();
					String whereCondition = "l."+queryVar+"=?";
					queryString += whereCondition;
					countQueryString+=whereCondition;
					if( index != (validSearchFields.size()-1)){
						queryString +=" and ";
						countQueryString +=" and ";
					}
					index++;					
				}
								
				final List queryParams = new ArrayList();				
				for( FormComponent<?> formComponent : validSearchFields){					
					String value = formComponent.getDefaultModelObjectAsString();
					queryParams.add(value);
				}
				queryString +=" and l.deceased='N'";				
				countQueryString +=" and l.deceased='N'";				
				System.out.println("Search query::::"+queryString);
				
				// set up the table with pagination
				
				liveStockDataProvider = new SearchDataProvider<FarmObject> ("id", queryString,countQueryString) {
					
					@Override
					protected QuerySupport createCountQuery() {
						return new QuerySupport(getCountQueryString(), queryParams);
					}


					@Override
					protected QuerySupport createDataQuery() {
						return new QuerySupport(getQueryString(), queryParams);
					}
				};

				target.addComponent(dataWrapper);
				
			}

			@Override
			protected void onError(AjaxRequestTarget target, Form<?> form) {
				target.addComponent(form);
				target.addComponent(feedbackPanel);
			}
			
			

		};

		return search;
	}

	private boolean isNull(String object) {
		return (null == object || "".equals(object.trim())|| "-1".equals(object));
	}

	
	private FormComponent<Character> buildSex() {		
		CriteionAwareDropDownChoice<Character> sex = new CriteionAwareDropDownChoice<Character>("sex",
				new PropertyModel<Character>(this, "sex"), new ListModel<Character>(Arrays.asList(new Character[]{'M','F'})),"sex");
		sex.setNullValid(true);
		//sex.setRequired(true);
		return sex;		
	}

	private FormComponent<Character> buildStopMilkingStatus() {		
		CriteionAwareDropDownChoice<Character> stopMilkingStatus = new CriteionAwareDropDownChoice<Character>("stopMilkingStatus",
				new PropertyModel<Character>(this, "stopMilkingStatus"), new ListModel<Character>(Arrays.asList(new Character[]{'Y','N'})),"stopMilkingStatus");
		//stopMilkingStatus.setRequired(true);
		stopMilkingStatus.setNullValid(true);
		return stopMilkingStatus;		
	}
	
	
	
	private FormComponent<OriginType> buildOrigin() {		
		CriteionAwareDropDownChoice<OriginType> origin = new CriteionAwareDropDownChoice<OriginType>("origin",
				new PropertyModel<OriginType>(this, "originType"),
				new LoadableDetachableModel<List<OriginType>>() {
			
					@Override
					protected List<OriginType> load() {
						Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
						return objectLoader.findAll(OriginType.class, criterion);
					}

				},"originType.originType");
		//origin.setRequired(true);
		origin.setNullValid(true);
		return origin;		
	}
	
	private FormComponent<BreedType> buildBreed(){		
		CriteionAwareDropDownChoice<BreedType> breed = new CriteionAwareDropDownChoice<BreedType>("breedTypeByBreedType",
				new PropertyModel<BreedType>(this, "breedTypeByBreedTypeId"),
				new LoadableDetachableModel<List<BreedType>>() {

					@Override
					protected List<BreedType> load() {
						Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
						return objectLoader.findAll(BreedType.class, criterion);
					}

				},"breedTypeByBreedTypeId.breedType");
		//breed.setRequired(true);
		breed.setNullValid(true);
		return breed;		
	}
	
	private FormComponent<StateType> buildStockType(){
		CriteionAwareDropDownChoice<StateType> stateType=new CriteionAwareDropDownChoice<StateType>("stateType",
				new PropertyModel<StateType>(this, "stateType"),
				new LoadableDetachableModel<List<StateType>>() {

					@Override
					protected List<StateType> load() {
						Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
						return objectLoader.findAll(StateType.class,criterion);
					}

				},"stateType.stateType");
		//stateType.setRequired(true);
		stateType.setNullValid(true);
		return stateType;		
	}
	
	private FormComponent<MilkingStatus> buildMilkingStatus(){
		CriteionAwareDropDownChoice<MilkingStatus>  milkStatus = new CriteionAwareDropDownChoice<MilkingStatus>("milkingStatus",
				new PropertyModel<MilkingStatus>(this, "milkingStatus"),
				new LoadableDetachableModel<List<MilkingStatus>>() {

					@Override
					protected List<MilkingStatus> load() {
						Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
						return objectLoader.findAll(MilkingStatus.class, criterion);
					}

				},"milkingStatus.status");
		//milkStatus.setRequired(true);
		milkStatus.setNullValid(true);
		return milkStatus;
	}
	
	

	
}