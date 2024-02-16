package com.dblue.orm;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.classic.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Projections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


public class ObjectFactoryImpl <T extends FarmObject> implements ObjectFactory<T>{	
	
	@Autowired
	private SessionFactory sessionFactory;
	
	private Class<T> clazz;
	
	public void setSessionFactory(SessionFactory sessionFactory){
		this.sessionFactory = sessionFactory;
	}
	
	protected Session getSession(){
		return sessionFactory.getCurrentSession();
	}
	
	public ObjectFactoryImpl(Class<T> clazz){
		this.clazz = clazz;
	}
	
	@Transactional(propagation=Propagation.REQUIRED)
	public T load(Serializable id) {		
		return (T)getSession().load(clazz, id);
	}	
	
	@Transactional(propagation=Propagation.REQUIRED)
	public void save(T domainObject) {
		getSession().saveOrUpdate(domainObject);
		
	}
	
	@Transactional(propagation=Propagation.REQUIRED)
	public void delete(Serializable id) {	
		T Object = load(id);
		delete(Object);
	}
	
	@Transactional(propagation=Propagation.REQUIRED)
	public void delete(T domainObject) {	
		getSession().delete(domainObject);
		
	}
	
	@Transactional(propagation=Propagation.REQUIRED)
	public List<T> getObjects(List<Serializable> objectIds) {
		List<T> objects = new ArrayList<T>(objectIds.size());
		for( Serializable objectId:objectIds){
			objects.add(load(objectId));			
		}
		return objects;
	}
	
	@Transactional(propagation=Propagation.REQUIRED)
	public List<T> findAll() {
		// TODO need to add proxy implementation		
		Query query = getSession().createQuery("from " + clazz.getName());
		return (List<T>)query.list();
	}

	@Transactional(propagation=Propagation.REQUIRED)
	public List<T> findAll(Criterion criterion) {
		Criteria criteria = getSession().createCriteria(clazz);
		criteria.add(criterion);
		return criteria.list();
	}
	
	@Transactional(propagation=Propagation.REQUIRED)
	public List<T> findAll(Criteria criteria) {		
		return criteria.list();
	}

	@Transactional(propagation=Propagation.REQUIRED)
	public Integer countAll(Criterion criterion) {
		Criteria criteria = getSession().createCriteria(clazz);
		criteria.add(criterion);
		return (Integer)criteria.setProjection(Projections.rowCount()).uniqueResult();
	}
	
	@Transactional(propagation=Propagation.REQUIRED)
	public Integer countAll(Criteria criteria) {
		return (Integer)criteria.setProjection(Projections.rowCount()).uniqueResult();
	}
	
	
	
}

