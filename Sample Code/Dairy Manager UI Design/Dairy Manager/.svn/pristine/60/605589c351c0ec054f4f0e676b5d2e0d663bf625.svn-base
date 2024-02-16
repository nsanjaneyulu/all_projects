package com.dblue.farm.application.pages.pagination;

import java.util.Iterator;

import org.apache.wicket.markup.repeater.data.IDataProvider;
import org.apache.wicket.model.IModel;

import com.dblue.farm.application.pages.FarmPage;
import com.dblue.orm.FarmObject;

public class DynamicDataProviderWrapper<T extends FarmPage> implements IDataProvider<FarmObject>{
	
	private T page;
	
	public DynamicDataProviderWrapper(T page){
		this.page=page;
	}

	public void detach() {
		// TODO Auto-generated method stub
		
	}

	public Iterator<? extends FarmObject> iterator(int first, int count) {
		return (Iterator<? extends FarmObject>)page.getDataProvider().iterator(first, count);
	}

	public int size() {
		return page.getDataProvider().size();
	}

	public IModel<FarmObject> model(FarmObject object) {
		return (IModel<FarmObject>)page.getDataProvider().model(object);
	}
}