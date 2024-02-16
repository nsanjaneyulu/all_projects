package com.dblue.orm;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.hibernate.Criteria;
import org.hibernate.criterion.Criterion;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.dblue.farm.exception.FarmPersistenceException;
import com.dblue.farm.exception.FarmRuntimeException;
import com.dblue.farm.exception.NotFoundException;

public class  ObjectLoaderImpl implements ObjectLoader{
	
	private Map<Class, ObjectFactory<? extends FarmObject>> objectFactories = new ConcurrentHashMap<Class, ObjectFactory<? extends FarmObject>>();
	
	protected <T extends FarmObject> ObjectFactory<T> lookup(Class Class) throws NotFoundException{
		ObjectFactory<T> factgoryInstance = (ObjectFactory<T>)objectFactories.get(Class);
		if( factgoryInstance == null){
			throw new NotFoundException("Object factory for type "+ Class.toString() +"  is not available");			
		}
		return factgoryInstance;
	}
	
	protected <T extends FarmObject> ObjectFactory<T> lookupRuntime(Class Class) throws FarmPersistenceException{
		try{
			return lookup(Class);
		}catch(NotFoundException ex){
			throw new FarmRuntimeException(ex);
		}
	}
	
	@Transactional(propagation=Propagation.REQUIRED)
	public <T extends FarmObject> T load(Class Class, Serializable objectID)
			throws NotFoundException {		
		return (T)lookup(Class).load(objectID);		
	}

	
	@Transactional(propagation=Propagation.REQUIRED)
	public <T extends FarmObject> List<T> loadObjects(Class Class,
			List<Serializable> objectIds) {
		List<T> list = new ArrayList<T>(objectIds.size());
		for(Serializable objectId:objectIds){
			try{
				list.add((T)load(Class,objectId));
			}catch(NotFoundException ex){
				// ignore.
				// add logger statement
			}
		}
		return list;
	}
	
	@Transactional(propagation=Propagation.REQUIRED)
	public <T extends FarmObject> void save(Class Class,
			T FarmObject) {
		lookupRuntime(Class).save(FarmObject);
		
	}

	@Transactional(propagation=Propagation.REQUIRED)
	public void delete(Class Class, Serializable id) {
		try{
			lookupRuntime(Class).delete(load(Class, id));
		}catch(NotFoundException ex){
			throw new FarmPersistenceException(ex);
		}
		
	}

	@Transactional(propagation=Propagation.REQUIRED)
	public <T extends FarmObject> void delete(Class Class,
			T FarmObject) {
		lookupRuntime(Class).delete(FarmObject);
		
	}

	@Transactional(propagation=Propagation.REQUIRED)
	public <T extends FarmObject> List<T> findAll(Class Class) {
		return (List<T>)lookupRuntime(Class).findAll();
	}

	public <T extends FarmObject> void addObjectFactory(
			Class Class, ObjectFactory<T> factory) {
		synchronized (objectFactories) {
			objectFactories.put(Class, factory);
		}				
	}
	
	

	public <T extends FarmObject> void setObjectFactories(Map<Class, ObjectFactory<T>> factories) {
		synchronized (factories) {		
			objectFactories.putAll(factories);
		}		
	}

	public void removeObjectFactory(Class Class) {
		synchronized (objectFactories) {
			objectFactories.remove(Class);
		}		
	}
	
	@Transactional(propagation=Propagation.REQUIRED)
	public <T extends FarmObject> List<T> findAll(Class clazz,
			Criterion criterion) {
		return (List<T>)lookupRuntime(clazz).findAll(criterion);		
	}

	@Transactional(propagation=Propagation.REQUIRED)
	public <T extends FarmObject> List<T> findAll(Class objectType,
			Criteria criteria) {
		return (List<T>)lookupRuntime(objectType).findAll(criteria);
	}
	
	@Transactional(propagation=Propagation.REQUIRED)
	public Integer countAll(Class objectType, Criterion criterion) {
		return lookupRuntime(objectType).countAll(criterion);
	}
	
	@Transactional(propagation=Propagation.REQUIRED)
	public Integer countAll(Class objectType, Criteria criteria) {
		return lookupRuntime(objectType).countAll(criteria);
	}
	
	
}
