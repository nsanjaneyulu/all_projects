package com.dblue.farm.application.components;

import org.apache.wicket.model.IModel;

import com.dblue.orm.FarmObject;

public class CheckBox extends org.apache.wicket.markup.html.form.CheckBox implements StateAware{
	
	private transient FarmObject farmObject;
	
	public CheckBox(String id,FarmObject state) {
		super(id);
		this.farmObject=state;
	}
	
	public CheckBox(String id, IModel model,FarmObject state){
		super(id,model);
		this.farmObject=state;
	}

	public FarmObject getState() {
	return this.farmObject;
	}

}
