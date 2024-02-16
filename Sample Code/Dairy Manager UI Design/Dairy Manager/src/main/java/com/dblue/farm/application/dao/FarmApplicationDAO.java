package com.dblue.farm.application.dao;

import java.util.List;

import com.dblue.farm.Address;
import com.dblue.farm.Contact;
import com.dblue.farm.Health;
import com.dblue.farm.IngredientOptions;
import com.dblue.farm.Livestock;
import com.dblue.farm.Person;
import com.dblue.farm.PromotionHistory;
import com.dblue.farm.Statistics;
import com.dblue.farm.Vendor;
import com.dblue.orm.FarmObject;

public interface FarmApplicationDAO {
	
	void handleDropDownUpdates(Class clazz,List<? extends FarmObject> removedObjects, List<? extends FarmObject> savedObjects);
	
	void handleIngredientOptionsList(Class clazz,List<List<IngredientOptions>> removedObjects, List<List<IngredientOptions>> savedObjects);
	
	void saveLiveStock(Statistics stats, Health health, Livestock liveStock);
	
	void saveHealth( Health health, Class type, List<? extends FarmObject> removedObjects, List<? extends FarmObject> addedObjects);
	
	void saveReproduction( Livestock livestock,  List<? extends FarmObject> removedObjects, List<? extends FarmObject> addedObjects);

	void saveAllObjects(Class type, List<FarmObject> allObjects);
	
	void savePerson(Contact contact,Address currentAddress,Address permanentAddress,Person person);
	
	void saveVendor(Contact contact,Address currentAddress,Vendor vendor);
	
	void promoteLiveStock(Class liveStockClass,Livestock livestock, Class promotionHistoryClass,PromotionHistory promotionHistory);
}