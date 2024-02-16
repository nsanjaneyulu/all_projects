package com.dblue.farm.application.pages.search;

import org.hibernate.criterion.Criterion;

public interface CriterionAware<T>{
	public Criterion getCriterion();
	
	public String getProperty();
}