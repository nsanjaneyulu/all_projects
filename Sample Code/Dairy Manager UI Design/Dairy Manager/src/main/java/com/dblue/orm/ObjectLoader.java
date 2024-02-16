package com.dblue.orm;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.criterion.Criterion;

import com.dblue.farm.exception.NotFoundException;

public interface ObjectLoader{
	
	<T extends FarmObject> T load(Class objectType, Serializable objectID) throws NotFoundException;
    
	//<T extends FarmObject> T load(Class objectType, String objectID) throws NotFoundException;

	<T extends FarmObject> List<T> loadObjects(Class objectType, List<Serializable> objectIds);

	<T extends FarmObject> void save(Class objectType,T FarmObject);
	
	void delete(Class objectType,Serializable id);
	
	<T extends FarmObject> void delete(Class objectType,T FarmObject);		
	
	<T extends FarmObject> List<T> findAll(Class objectType);
	
	<T extends FarmObject> List<T> findAll(Class objectType,Criterion criterion);
	
	<T extends FarmObject> List<T> findAll(Class objectType,Criteria criteria);
	
	Integer countAll(Class objectType,Criterion criterion);

	Integer countAll(Class objectType,Criteria criteria);

	
	<T extends FarmObject> void addObjectFactory(Class objectType, ObjectFactory<T> factory);
	
	<T extends FarmObject> void setObjectFactories(Map<Class,ObjectFactory<T>> factories);

    void removeObjectFactory(Class objectType);
}
