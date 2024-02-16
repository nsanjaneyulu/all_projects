package com.dblue.farm.application.pages.pagination;

import java.util.Iterator;

import org.apache.wicket.extensions.markup.html.repeater.util.SortParam;
import org.apache.wicket.extensions.markup.html.repeater.util.SortableDataProvider;
import org.apache.wicket.injection.web.InjectorHolder;
import org.apache.wicket.model.CompoundPropertyModel;
import org.apache.wicket.model.IModel;
import org.apache.wicket.spring.injection.annot.SpringBean;
import org.hibernate.Query;
import org.hibernate.SessionFactory;

import com.dblue.orm.ObjectLoader;

public abstract class FarmObjectQueryBasedDataProvider<T> extends SortableDataProvider<T>{
	
	
	@SpringBean(name="objectLoader")
	protected ObjectLoader objectLoader;
	
	@SpringBean(name="sessionFactory")
	protected SessionFactory sessionFactory;
	
	
	private String countProperty;
	

	public FarmObjectQueryBasedDataProvider(String countProperty) {
		InjectorHolder.getInjector().inject(this);
		this.countProperty = countProperty;
	}

	// should return rows. cant have order statements
	protected abstract QuerySupport createCountQuery();
	
	protected abstract QuerySupport createDataQuery();
		
	
	public int size() {		 
		
		QuerySupport querySupport = createCountQuery();
		Query query = sessionFactory.getCurrentSession().createQuery(querySupport.getQueryString());
		querySupport.applyQueryParameters(query);
		int size = ((Number)query.uniqueResult()).intValue();		
		return size;
	}

	@SuppressWarnings("unchecked")
	public Iterator<? extends T> iterator(int first, int count) {
		
		SortParam sortParam = getSort();
		QuerySupport querySupport = createDataQuery();
		String queryString = querySupport.getQueryString();
		if( null != sortParam){
			String additionalClause = "order by "+sortParam.getProperty()+" "+(sortParam.isAscending()?"asc":"desc");
			queryString+= additionalClause;
		}
		Query query = sessionFactory.getCurrentSession().createQuery(queryString);		
		querySupport.applyQueryParameters(query);
		query.setFirstResult(first).setMaxResults(count);
		return query.iterate();
	}

	public IModel<T> model(T object) {
		return new CompoundPropertyModel<T>(object);
	}	
}