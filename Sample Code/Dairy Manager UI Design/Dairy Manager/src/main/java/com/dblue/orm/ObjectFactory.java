package com.dblue.orm;

import java.io.Serializable;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Criterion;

import com.dblue.farm.exception.NotFoundException;

public interface ObjectFactory <T extends FarmObject>{
	
	T load(Serializable id) throws NotFoundException;
	
	//T load(String id) throws NotFoundException;
	
	void save(T domainObject);
	
	void delete(Serializable id);
	
	void delete(T domainObject);	
	
	List<T> getObjects(List<Serializable> objectIds);	
	
	List<T> findAll();
	
	List<T> findAll(Criterion criterion);

	List<T> findAll(Criteria criteria);
	
	Integer countAll(Criterion criterion);

	Integer countAll(Criteria criteria);

	
}
