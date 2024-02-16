package com.dblue.farm.application.dao;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Set;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.dblue.farm.Address;
import com.dblue.farm.Contact;
import com.dblue.farm.Farm;
import com.dblue.farm.FarmConfiguration;
import com.dblue.farm.Health;
import com.dblue.farm.IngredientOptions;
import com.dblue.farm.Lactation;
import com.dblue.farm.Livestock;
import com.dblue.farm.MilkingStatus;
import com.dblue.farm.Person;
import com.dblue.farm.PromotionHistory;
import com.dblue.farm.Reproduction;
import com.dblue.farm.StateType;
import com.dblue.farm.Statistics;
import com.dblue.farm.Vendor;
import com.dblue.farm.application.FarmApplication;
import com.dblue.farm.application.FarmAuthentication;
import com.dblue.farm.application.FarmConfigurationProvider;
import com.dblue.farm.exception.DropDownCantBeDeletedException;
import com.dblue.farm.exception.NotFoundException;
import com.dblue.orm.FarmObject;
import com.dblue.orm.ObjectLoader;

public class FarmApplicationDAOImpl implements FarmApplicationDAO {

	private ObjectLoader objectLoader;

	private SessionFactory sessionFactory;
	
	protected FarmConfigurationProvider farmConfigurationProvider;

	public void setObjectLoader(ObjectLoader objectLoader) {
		this.objectLoader = objectLoader;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	public void setFarmConfigurationProvider(
			FarmConfigurationProvider farmConfigurationProvider) {
		this.farmConfigurationProvider = farmConfigurationProvider;
	}
	
	@Transactional(propagation = Propagation.REQUIRED)
	public void handleDropDownUpdates(Class clazz,
			List<? extends FarmObject> removedObjects,
			List<? extends FarmObject> savedObjects) {
		// remove all and then save all
		for (FarmObject forFarmObject : removedObjects) {
			try{
			objectLoader.delete(clazz, forFarmObject);
			}catch(DataIntegrityViolationException ex){
				// assuming that a referred value is being delete
				throw new DropDownCantBeDeletedException(ex);
			}
		}

		// now save all
		for (FarmObject forFarmObject : savedObjects) {
			objectLoader.save(clazz, forFarmObject);
		}

	}

	@Transactional(propagation = Propagation.REQUIRED)
	public void saveLiveStock(Statistics stats, Health health,
			Livestock liveStock) {

		List<Farm> allFarms = objectLoader.findAll(Farm.class);
		objectLoader.save(Statistics.class, stats);
		objectLoader.save(Health.class, health);
		liveStock.setStatisticsByCurrentStatId(stats);
		liveStock.setHealth(health);
		
		// getting log-in user farm id
		liveStock.setFarm(getLoginUserFarm());

		if (null != liveStock.getConceivedDate()) {
			Date stopMilkingDate = new Date(liveStock.getConceivedDate()
					.getTime());
			int date = liveStock.getConceivedDate().getDate();
			date = date + 200;
			stopMilkingDate.setDate(date);
			liveStock.setStopMilkingDate(stopMilkingDate);
		}

		objectLoader.save(Livestock.class, liveStock);

	}

	@Transactional(propagation = Propagation.REQUIRED)
	public void saveHealth(Health health, Class type,
			List<? extends FarmObject> removedObjects,
			List<? extends FarmObject> addedObjects) {
		objectLoader.save(Health.class, health);
		for (FarmObject removedVaccination : removedObjects) {
			objectLoader.delete(type, removedVaccination);
		}

		for (FarmObject addedVaccination : addedObjects) {
			objectLoader.save(type, addedVaccination);
		}

	}

	@Transactional(propagation = Propagation.REQUIRED)
	public void saveReproduction(Livestock livestock,
			List<? extends FarmObject> removedObjects,
			List<? extends FarmObject> addedObjects) {

		objectLoader.save(Livestock.class, livestock);

		for (FarmObject removedReproduction : removedObjects) {
			objectLoader.delete(Reproduction.class, removedReproduction);
		}

		for (FarmObject addedReproduction : addedObjects) {

			Reproduction reproduction = (Reproduction) addedReproduction;
			boolean createCalf = false;
			// if its new reproduction and delivery date available create one
			if (reproduction.getId() == null
					&& reproduction.getDeliveryDate() != null) {
				createCalf = true;
			}
			// if its an existing reproduction being updated with delivery info
			// create one

			if (reproduction.getId() != null
					&& reproduction.getDeliveryDate() != null) {
				
					Criterion objectCriterion = Restrictions.eq("id", reproduction.getId());
					Criterion dateCriterion = Restrictions.not(Restrictions.isNull("deliveryDate"));
					Criterion overalCriterion = Restrictions.and(objectCriterion, dateCriterion);
					
					int size = objectLoader.countAll(Reproduction.class, overalCriterion);
					
					// check reprod date
					if (size == 0) {
						createCalf = true;
					}				
			}

			if (createCalf) {

				objectLoader.save(Reproduction.class, reproduction);
				
				Set<Lactation> lactations = livestock.getLactations();
				List<Lactation> listLactations = new ArrayList<Lactation>();
				int lactationNumber = 1;
				if(lactations.size()>0){
					listLactations.addAll(lactations);			
					Collections.sort(listLactations, new LactationComparator());
					lactationNumber = listLactations.get(listLactations.size()-1).getLactationNumber()+1;			
				}
				Lactation lactation = new Lactation();
				lactation.setLivestock(livestock);
				lactation.setLactationNumber(lactationNumber);
				lactation.setStartDate(reproduction.getDeliveryDate());
				livestock.setConceivedDate(null);
				livestock.setStopMilkingStatus('N');				
				objectLoader.save(Livestock.class, livestock);
				objectLoader.save(Lactation.class, lactation);
				for (int i = 0; i < reproduction.getNumberOfCalfs(); i++) {
					createLiveStock(reproduction);
				}

			} else {
				objectLoader.save(Reproduction.class, addedReproduction);
			}
		}

		// spawn a new livestock if its a new entry
	}

	@Transactional(propagation = Propagation.REQUIRED)
	protected void createLiveStock(Reproduction reproduction) {
		FarmConfiguration farmConfiguration = farmConfigurationProvider.getFarmConfiguration();
		
		boolean autoReproduce = "Y".equals(farmConfiguration.getAutoReProduce());
				
		if (!autoReproduce && reproduction.getDeliveryDate() == null) {
			return;
		}

		StateType calf = farmConfiguration.getCalf();
		MilkingStatus nonMilking = farmConfiguration.getNonMlikingStatus();

		Livestock mother = reproduction.getLivestock();

		Livestock newBorn = new Livestock();
		newBorn.setFarm(getLoginUserFarm());
		newBorn.setOriginType(farmConfiguration.getInhouseOriginType());
		newBorn.setBreedTypeByMotherBreedId(mother.getBreedTypeByBreedTypeId());
		newBorn.setBreedTypeByBreedTypeId(mother.getBreedTypeByBreedTypeId());
		newBorn.setMothercode(mother.getCode());
		newBorn.setFatherSemenNumber(reproduction.getSemenNumber());
		newBorn.setPreferredType(mother.getPreferredType());
		newBorn.setCode(generateLiveStockCode());
		newBorn.setSex(reproduction.getCalfsSex().toCharArray()[0]);
		newBorn.setStateType(calf);
		newBorn.setMilkingStatus(nonMilking);
		newBorn.setBirthDate(reproduction.getDeliveryDate());
		newBorn.setAge(0);
		newBorn.setRemarks("In House Created Automatically");
		newBorn.setStopFeedingStatus('N');
		newBorn.setDeceased('N');
		newBorn.setStopMilkingStatus('N');
		newBorn.setStopFeedingStatus('N');

		Statistics stats = new Statistics();
		stats.setPurchasePrice(new BigDecimal(0));
		stats.setTransportationCost(new BigDecimal(0));
		Health health = new Health();
		health.setFarm(getLoginUserFarm());
		saveLiveStock(stats, health, newBorn);
	}

	protected StateType getStateType(String state) {
		Criterion stateType = Restrictions.eq("stateType", state);
		List<StateType> allStateTypes = objectLoader.findAll(StateType.class,
				stateType);
		return allStateTypes.size() > 0 ? allStateTypes.get(0) : null;
	}

	protected MilkingStatus getMilkingStatus(String status) {
		Criterion stateType = Restrictions.eq("status", status);
		List<MilkingStatus> allMilkingStatus = objectLoader.findAll(
				MilkingStatus.class, stateType);
		return allMilkingStatus.size() > 0 ? allMilkingStatus.get(0) : null;
	}
	
	protected String generateLiveStockCode(){
		FarmApplication application = (FarmApplication)FarmApplication.get();
		FarmConfiguration farmConfiguration = farmConfigurationProvider.getFarmConfiguration();
		String preFix = farmConfiguration.getCodePrefix();
		Query query  = sessionFactory.getCurrentSession().createQuery("select max(l.id) from Livestock l");
		Number seq = (Number)query.uniqueResult();
		if(null==seq){
			seq=0;
		}
		// this is weak logic. Needs to be changed to sequence; Also add a prefix if required
		return preFix+(seq.intValue() +1);
	}

	@Transactional(propagation = Propagation.REQUIRED)
	public void saveAllObjects(Class type, List<FarmObject> allObjects) {

		for (FarmObject farmObject : allObjects) {
			objectLoader.save(type, farmObject);
		}

	}

	@Transactional(propagation = Propagation.REQUIRED)
	public void handleIngredientOptionsList(Class clazz,
			List<List<IngredientOptions>> removedObjects,
			List<List<IngredientOptions>> savedObjects) {
		for (int i = 0; i < removedObjects.size(); i++) {
			handleDropDownUpdates(clazz, removedObjects.get(i),
					savedObjects.get(i));
		}

	}

	@Transactional(propagation = Propagation.REQUIRED)
	public void savePerson(Contact contact, Address currentAddress,
			Address permanentAddress, Person person) {
		objectLoader.save(Contact.class, contact);
		objectLoader.save(Address.class, currentAddress);
		objectLoader.save(Address.class, permanentAddress);
		objectLoader.save(Person.class, person);
	}

	@Transactional(propagation = Propagation.REQUIRED)
	public void saveVendor(Contact contact, Address currentAddress,
			Vendor vendor) {
		objectLoader.save(Contact.class, contact);
		objectLoader.save(Address.class, currentAddress);
		objectLoader.save(Vendor.class, vendor);
	}

	@Transactional(propagation = Propagation.REQUIRED)
	public void promoteLiveStock(Class liveStockClass, Livestock livestock,
			Class promotionHistoryClass, PromotionHistory promotionHistory) {
		objectLoader.save(promotionHistoryClass, promotionHistory);
		objectLoader.save(liveStockClass, livestock);
	}
	
	private Farm getLoginUserFarm() {
		FarmAuthentication farmAuthentication = (FarmAuthentication)SecurityContextHolder.getContext().getAuthentication();
		int farmId = ((Long)farmAuthentication.getFarmid()).intValue();
		Farm farm=null;
		try {
			farm = objectLoader.load(Farm.class, farmId);
		} catch (NotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return farm;
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
