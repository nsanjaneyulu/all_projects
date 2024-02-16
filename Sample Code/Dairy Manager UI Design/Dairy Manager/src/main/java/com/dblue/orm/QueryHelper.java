package com.dblue.orm;

import java.util.Iterator;


import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

@Repository
public class QueryHelper {
	
	private SessionFactory sessionFactory;
	
	public void setSessionFactory(SessionFactory sessionFactory){
		this.sessionFactory = sessionFactory;
	}
	
	protected Session getSession(){
		return sessionFactory.getCurrentSession();
	}
	
	public Iterator runQuery(String queryString){
		Session session= getSession();
		Query query = session.createQuery(queryString);
		return query.iterate();
	}
	
}
