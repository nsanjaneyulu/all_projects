package com.dblue.farm.application.pages.search;

import java.util.List;

import org.apache.wicket.markup.html.form.DropDownChoice;
import org.apache.wicket.model.IModel;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;


public class CriteionAwareDropDownChoice<T> extends DropDownChoice<T> implements CriterionAware{
	
	private String property;
	
	public CriteionAwareDropDownChoice(String id, IModel<T> model, IModel<? extends List<? extends T>> choices, String property){
		super(id,model,choices);
		this.property=property;
	}
	
	public Criterion getCriterion(){
		return Restrictions.eq(property, getValue());
	}

	public String getProperty() {
		return property;
	}		
}