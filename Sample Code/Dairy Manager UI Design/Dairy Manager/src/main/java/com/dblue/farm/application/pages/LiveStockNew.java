package com.dblue.farm.application.pages;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.form.OnChangeAjaxBehavior;
import org.apache.wicket.behavior.AbstractBehavior;
import org.apache.wicket.behavior.SimpleAttributeModifier;
import org.apache.wicket.extensions.yui.calendar.DatePicker;
import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.DropDownChoice;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.FormComponent;
import org.apache.wicket.markup.html.form.TextArea;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.LoadableDetachableModel;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.model.util.ListModel;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.joda.time.DateMidnight;
import org.joda.time.DateTime;
import org.joda.time.Years;

import com.dblue.farm.BreedType;
import com.dblue.farm.Health;
import com.dblue.farm.Lactation;
import com.dblue.farm.Livestock;
import com.dblue.farm.MilkingStatus;
import com.dblue.farm.OriginType;
import com.dblue.farm.StateType;
import com.dblue.farm.Statistics;
import com.dblue.farm.application.FarmSession;
import com.dblue.farm.application.pages.validator.UniqueValueValidator;
import com.dblue.farm.exception.FarmRuntimeException;
import com.dblue.farm.exception.NotFoundException;

public class LiveStockNew extends FarmPage {

	private DropDownChoice<OriginType> origin;
	
	private DropDownChoice<BreedType> breed;
	
	private DropDownChoice<BreedType> motherBreed;
	
	private DropDownChoice<StateType> state;
	
	private DropDownChoice<Character> sex;
	private DropDownChoice<Character> stopMilkingStatus;
	private TextField<Date> dryoffDate;
	private DropDownChoice<Character> stopFeedingStatus;
	
	private DropDownChoice<MilkingStatus> milkingStatus;
	
	private TextField<String> rfid;
	
	private TextField<String> code;
	private TextField<String> motherCode;
	
	private TextField<Date> birthDate;
	private TextField<Date> conceiveDate;
	
	private TextField<Integer> age;
	
	private TextField<String> height;
	private TextField<String> weight;
	private TextField<String> length;
	private TextField<String> appearance;
	private TextField<String> fsemen;
	private TextField<String> deliverymode;
	private TextField<String> initialValue;
	private TextArea<String> remarks;
	private DropDownChoice<String> preferredType;
	
	private TextField<Integer> lactationNumber;
	private TextField<Date> startDate;
	
	private TextField<BigDecimal> yeild;
	private TextField<BigDecimal> fat;
	
	private TextField<BigDecimal> purchaseCost;
	private TextField<String> purchaseLocation;
	private TextField<String> transDist;
	private TextField<BigDecimal> transCost;
	private TextField<String> purchaseFarm;
	private TextField<String> purchaseBroker;
	
	private Button saveNext;
	private Button deceasedLiveStock;
		
	
	@Override
	protected void buildPageComponents() {

		Form form = new Form("livestocknew");
		
		final Livestock liveStock;
		final Statistics stats;
		final Health health;
		final Set<Lactation> lactations;
		final Lactation currentLactation;
		
		
		Integer liveStockId = (Integer) ((FarmSession) getSession()).getStoreValue("livestockid");
		if( null == liveStockId){
			liveStock = new Livestock();
			liveStock.setCode(generateLiveStockCode());
			stats = new Statistics();			
			health = new Health();
			health.setFarm(getLoginUserFarm());
			lactations = new HashSet<Lactation>(0);
			currentLactation = new Lactation();
			
		}else{
			try{
			liveStock = objectLoader.load(Livestock.class, liveStockId);
			}catch(NotFoundException ex){
				throw new FarmRuntimeException(ex.getMessage());
			}
			stats = liveStock.getStatisticsByCurrentStatId();
			health = liveStock.getHealth();
			addEditedObjects(liveStock.getId());
			lactations = liveStock.getLactations();
			List<Lactation> listLactations = new ArrayList<Lactation>();
			if(lactations.size()>0){
				listLactations.addAll(lactations);			
				Collections.sort(listLactations, new LactationComparator());
				currentLactation = listLactations.get(listLactations.size()-1);			
			} else {
				currentLactation = new Lactation();
			}
		}
		
		
		this.rfid = new TextField<String>("rfid", new PropertyModel<String>(liveStock, "rfid"));
		rfid.add(new UniqueValueValidator<String>(Livestock.class, "rfid",  "rfid"){

			@Override
			public List<Integer> excludeObjects() {
				// TODO Auto-generated method stub
				return editedObjects;
			}
			
		});
		//this.rfid.setRequired(true);
		this.code = new TextField<String>("code", new PropertyModel<String>(liveStock, "code"));
		this.code.setRequired(true);
		this.code.add(new UniqueValueValidator<String>(Livestock.class, "code",  "code"){
			@Override
			public List<Integer> excludeObjects() {
				return getEditedObjects();
			}			
		});
		this.motherCode = new TextField<String>("mothercode", new PropertyModel<String>(liveStock, "mothercode"));
		this.sex  = new DropDownChoice<Character>("sex", new PropertyModel<Character>(liveStock,"sex"),new ListModel<Character>(Arrays.asList(new Character[]{'M','F'})));		
		this.sex.setRequired(true);
		this.stopMilkingStatus  = new DropDownChoice<Character>("stopMilkingStatus", new PropertyModel<Character>(liveStock,"stopMilkingStatus"),new ListModel<Character>(Arrays.asList(new Character[]{'N','Y'})));
		this.stopMilkingStatus.setRequired(true);
		
		this.dryoffDate = new TextField<Date>("dryoffDate", new PropertyModel<Date>(currentLactation, "endDate")){
			@Override
			public boolean isRequired(){
				String rawValue = stopMilkingStatus.getRawInput();
				return rawValue.equals("1");						
			}
		};
		DatePicker dryOffDatePicker = new DatePicker();
		dryOffDatePicker.setShowOnFieldClick(true);     
		dryoffDate.add(dryOffDatePicker);
		
		
		this.stopFeedingStatus  = new DropDownChoice<Character>("stopFeedingStatus", new PropertyModel<Character>(liveStock,"stopFeedingStatus"),new ListModel<Character>(Arrays.asList(new Character[]{'N','Y'})));
		this.stopMilkingStatus.setRequired(true);
		
		this.birthDate = new TextField<Date>("birthDate", new PropertyModel<Date>(liveStock, "birthDate"));
		this.birthDate.setRequired(true);
		DatePicker datePicker = new DatePicker();
        datePicker.setShowOnFieldClick(true);        
        birthDate.add(datePicker);	
		this.conceiveDate = new TextField<Date>("conceiveDate", new PropertyModel<Date>(liveStock, "conceivedDate"));
		//this.conceiveDate.setRequired(true);
		DatePicker datePicker1 = new DatePicker();
        datePicker1.setShowOnFieldClick(true);     
        conceiveDate.add(datePicker1);
		this.age= new TextField<Integer>("age", new PropertyModel<Integer>(liveStock, "age"));
		this.age.setRequired(true);
		this.height = new TextField<String>("height", new PropertyModel<String>(stats, "height"));
		this.weight = new TextField<String>("weight", new PropertyModel<String>(stats, "weight"));
		this.length = new TextField<String>("length", new PropertyModel<String>(stats, "length"));
		this.appearance = new TextField<String>("appearance", new PropertyModel<String>(stats, "appearance"));
		this.fsemen = new TextField<String>("fsemen", new PropertyModel<String>(liveStock, "fatherSemenNumber"));
		this.deliverymode = new TextField<String>("deliverymode", new PropertyModel<String>(liveStock, "deliveryMode"));
		this.initialValue = new TextField<String>("initialValue", new PropertyModel<String>(liveStock, "initialValue"));
		this.remarks = new TextArea<String>("remarks", new PropertyModel<String>(liveStock, "remarks"));
		this.lactationNumber = new TextField<Integer>("lactationNumber", new PropertyModel<Integer>(currentLactation, "lactationNumber")){
			@Override
			public boolean isRequired(){
				String rawValue = dryoffDate.getRawInput();
				return rawValue != null && !"".equals(rawValue.trim());						
			}
		};
		this.startDate = new TextField<Date>("startDate", new PropertyModel<Date>(currentLactation, "startDate")){
				@Override
				public boolean isRequired(){
					String rawValue = lactationNumber.getRawInput();
					return rawValue != null && !"".equals(rawValue.trim());						
				}
			};
		DatePicker datePicker2 = new DatePicker();
		datePicker2.setShowOnFieldClick(true);     
		startDate.add(datePicker2);
		
		this.preferredType =new DropDownChoice<String>("preferredType", new PropertyModel<String>(liveStock, "preferredType"),new LoadableDetachableModel<List<String>>() {
			@Override
			protected List<String> load() {
				return Arrays.asList(new String[]{"Nurture","Pending"});
			}			
		});	
				
		this.preferredType.setRequired(true);
		this.fat= new TextField<BigDecimal>("fat", new PropertyModel<BigDecimal>(liveStock, "fat"));
		//this.fat.setRequired(true);
		this.yeild= new TextField<BigDecimal>("yeild", new PropertyModel<BigDecimal>(liveStock, "yeild"));
		//this.yeild.setRequired(true);
		this.purchaseBroker=new TextField<String>("purchaseBroker", new PropertyModel<String>(stats, "purchaseBroker"));
		this.purchaseFarm=new TextField<String>("purchaseFarm", new PropertyModel<String>(stats, "purchaseFarm"));
		this.purchaseLocation=new TextField<String>("purchaseLocation", new PropertyModel<String>(stats, "purchaseLocation"));		
		
		this.purchaseCost= new TextField<BigDecimal>("purchaseCost", new PropertyModel<BigDecimal>(stats, "purchasePrice"));
		//this.purchaseCost.setRequired(true);
		this.transCost= new TextField<BigDecimal>("transCost", new PropertyModel<BigDecimal>(stats, "transportationCost"));
		//this.transCost.setRequired(true);
		this.transDist =new TextField<String>("transDist", new PropertyModel<String>(stats, "transportationDist"));
		liveStock.setDeceased('N');
		this.saveNext = new Button("savenext"){

			@Override
			public void onSubmit() {

				farmApplicationDAO.saveLiveStock(stats, health, liveStock);
				currentLactation.setLivestock(liveStock);
				if(currentLactation.getLactationNumber()!=null)
				objectLoader.save(Lactation.class, currentLactation);

				// set session variables
				((FarmSession) getSession()).addToStore("livestockid",
						liveStock.getId());
				setResponsePage(HealthNew.class);
			}
			
			
			@Override
			public boolean isVisible() {
				return licensingService.hasValidLicense();
			}



			@Override
			public boolean isEnabled() {
				return licensingService.hasValidLicense();
			}
			
			
			
		};
		this.deceasedLiveStock = new Button("deceased"){
			@Override
			public void onSubmit() {				
				liveStock.setDeceased('Y');
				liveStock.setDeceasedDate(new Date());
				objectLoader.save(Livestock.class, liveStock);
				setResponsePage(DiscardedList.class);
			}

			@Override
			public boolean isVisible() {
				return null != liveStock.getId();
			}
			
			
		};
		
		deceasedLiveStock.add( new SimpleAttributeModifier("onclick", "return confirm('This action is irreversible, Do you want to Proceed?');"));
		
		form.add(buildOrigin(liveStock));
		form.add(buildMotherBreed(liveStock));
		form.add(this.preferredType);
		form.add(this.code);
		form.add(this.sex);
		form.add(buildStockType(liveStock));
		form.add(buildMilkingStatus(liveStock));
		form.add(this.birthDate);
		form.add(this.age);
		form.add(buildBreed(liveStock));
		form.add(this.stopMilkingStatus);
		form.add(dryoffDate);
		form.add(this.stopFeedingStatus);
		form.add(this.saveNext);
		form.add(this.deceasedLiveStock);
		form.add(this.rfid);
		form.add(this.motherCode);
		form.add(this.height);
		form.add(this.weight);
		form.add(this.length);
		form.add(this.appearance);
		form.add(this.fsemen);
		form.add(this.deliverymode);
		form.add(this.initialValue);
		form.add(this.remarks);
		form.add(this.fat);
		form.add(this.yeild);
		form.add(this.purchaseBroker);
		form.add(this.purchaseFarm);
		form.add(this.purchaseLocation);
		form.add(this.purchaseCost);
		form.add(this.transCost);
		form.add(this.transDist);
		//form.add(this.purchaseCost);
		form.add(this.conceiveDate);
		form.add(this.lactationNumber);
		form.add(this.startDate);
		form.add(new FeedbackPanel("feedback"));
		addAjaxBehaviorForCost(birthDate);
		age.setOutputMarkupId(true);
		this.add(form);
		
	}
	
	
	
private void addAjaxBehaviorForCost(TextField field){
		
		AbstractBehavior calculateCostBehavior = new OnChangeAjaxBehavior() {
			
			@Override
			protected void onUpdate(AjaxRequestTarget target) {
				// update the cost
				
				String birthDateValue = birthDate.getInput();				
				if( null != birthDateValue){
					try{
						Date birthDateDate = sdf.parse(birthDateValue);
						DateMidnight birthdate = new DateMidnight(birthDateDate.getYear()+1900, birthDateDate.getMonth()+1, birthDateDate.getDay()+1);
						DateTime now = new DateTime();
						Years years = Years.yearsBetween(birthdate, now);
						
						PropertyModel<Integer> liveStockModel = (PropertyModel<Integer>)LiveStockNew.this.age.getModel();
						liveStockModel.setObject(years.getYears());
						LiveStockNew.this.age.modelChanged();
					}catch(Exception ex){	
						ex.printStackTrace();
					}
				}
				target.addComponent(LiveStockNew.this.age);
			}
		};
		
		
		field.add(calculateCostBehavior);		
	}

	private FormComponent<OriginType> buildOrigin(Livestock livestock) {		
		this.origin = new DropDownChoice<OriginType>("origin",
				new PropertyModel<OriginType>(livestock, "originType"),
				new LoadableDetachableModel<List<OriginType>>() {
			
					@Override
					protected List<OriginType> load() {
						Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
						return objectLoader.findAll(OriginType.class, criterion);
					}

				});
		this.origin.setRequired(true);
		return origin;
		//add(this.origin);
	}
	
	private FormComponent<BreedType> buildBreed(Livestock livestock){		
		this.breed = new DropDownChoice<BreedType>("breedTypeByBreedType",
				new PropertyModel<BreedType>(livestock, "breedTypeByBreedTypeId"),
				new LoadableDetachableModel<List<BreedType>>() {

					@Override
					protected List<BreedType> load() {
						Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
						return objectLoader.findAll(BreedType.class, criterion);
					}

				});
		this.breed.setRequired(true);
		return breed;
		//add(this.breed);
	}

	private FormComponent<BreedType> buildMotherBreed(Livestock livestock){		
		this.motherBreed= new DropDownChoice<BreedType>("motherBreed",
				new PropertyModel<BreedType>(livestock, "getBreedTypeByMotherBreedId"),
				new LoadableDetachableModel<List<BreedType>>() {

					@Override
					protected List<BreedType> load() {
						Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
						return objectLoader.findAll(BreedType.class, criterion);
					}

				});
		this.motherBreed.setRequired(true);
		return motherBreed;
		//add(this.motherBreed);
	}

	
	private FormComponent<StateType> buildStockType(Livestock livestock){
		this.state=new DropDownChoice<StateType>("stateType",
				new PropertyModel<StateType>(livestock, "stateType"),
				new LoadableDetachableModel<List<StateType>>() {

					@Override
					protected List<StateType> load() {
						Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
						return objectLoader.findAll(StateType.class, criterion);
					}

				});
		this.state.setRequired(true);
		return state;
		//add(this.state);
	}
	
	private FormComponent<MilkingStatus> buildMilkingStatus(Livestock livestock){
		this.milkingStatus=new DropDownChoice<MilkingStatus>("milkingStatus",
				new PropertyModel<MilkingStatus>(livestock, "milkingStatus"),
				new LoadableDetachableModel<List<MilkingStatus>>() {

					@Override
					protected List<MilkingStatus> load() {
						Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
						return objectLoader.findAll(MilkingStatus.class, criterion);
					}

				});
		this.milkingStatus.setRequired(true);
		return milkingStatus;
		//add(this.milkingStatus);
	}
	
	private class LactationComparator implements Comparator<Lactation> {

		public int compare(Lactation o1, Lactation o2) {
			if (o1 == null || o2 == null) {
				throw new IllegalArgumentException(
						"Lactation object cant be null for comparision");
			}

			int o1Order = o1.getLactationNumber();
			int o2Order = o2.getLactationNumber();
			return (o1Order > o2Order ? 1 : (o1Order == o2Order ? 0 : -1));
		}

	}
	
}
