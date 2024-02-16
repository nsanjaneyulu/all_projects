package com.dblue.farm.application.pages.pagination;

import java.util.Collections;
import java.util.Iterator;

import org.apache.wicket.model.IModel;


public class EmptyFarmObjectQueryBasedDataProvider<T> extends FarmObjectQueryBasedDataProvider<T>{
	
	public EmptyFarmObjectQueryBasedDataProvider(){
		super("id");
	}

	@Override
	protected QuerySupport createCountQuery() {		
		return new QuerySupport(null, null);
	}

	@Override
	protected QuerySupport createDataQuery() {
		return new QuerySupport(null, null);
	}

	@Override
	public int size() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Iterator<? extends T> iterator(int first, int count) {
		return (Iterator<? extends T>)Collections.emptyList().iterator();
	}

	@Override
	public IModel<T> model(T object) {
		// TODO Auto-generated method stub
		return null;
	}
	
	
}