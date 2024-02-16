package com.dblue.farm.application.pages.pagination;

import java.util.Iterator;

import org.apache.wicket.extensions.markup.html.repeater.util.SortParam;
import org.apache.wicket.extensions.markup.html.repeater.util.SortableDataProvider;
import org.apache.wicket.model.CompoundPropertyModel;
import org.apache.wicket.model.IModel;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;

public abstract class FarmObjectCriteriaBasedDataProvider<T> extends SortableDataProvider<T> {

	private String countProperty;

	public FarmObjectCriteriaBasedDataProvider() {
		this("id");
	}

	public FarmObjectCriteriaBasedDataProvider(String countProperty) {
		this.countProperty = countProperty;
	}

	protected abstract Criteria createCriteria();

	public int size() {
		Criteria criteria = createCriteria();
		criteria.setProjection(Projections.count(countProperty));
		return ((Number) criteria.uniqueResult()).intValue();
	}

	@SuppressWarnings("unchecked")
	public Iterator<? extends T> iterator(int first, int count) {
		Criteria criteria = createCriteria();
		addOrders(criteria);
		criteria.setFirstResult(first).setMaxResults(count);
		return criteria.list().iterator();
	}

	protected void addOrders(Criteria criteria) {
		if (getSort() != null)
			criteria.addOrder(orderBy(getSort()));
	}

	public IModel<T> model(T object) {
		return new CompoundPropertyModel<T>(object);
	}
	
	protected Order orderBy(SortParam sortParam){	
		return sortParam.isAscending()? Order.asc(sortParam.getProperty()): Order.desc(sortParam.getProperty());
	}

}
