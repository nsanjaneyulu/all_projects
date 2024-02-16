package com.dblue.farm.application.pages.search;

import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.model.IModel;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;


public class CriterionAwareTextField<T> extends TextField<T> implements CriterionAware<T>{
	
	private String property;
	
	public CriterionAwareTextField(String id,IModel<T> model, String property){
		super(id,model);
		this.property = property;
	}
	
	public Criterion getCriterion(){
		return Restrictions.eq(property, getValue());
	}

	public String getProperty() {		
		return property;
	}	
}