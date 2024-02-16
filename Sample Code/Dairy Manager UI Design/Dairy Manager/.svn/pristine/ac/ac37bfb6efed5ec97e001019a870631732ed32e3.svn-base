package com.dblue.farm.application.pages.validator;

import java.util.ArrayList;
import java.util.List;

import org.apache.wicket.injection.web.InjectorHolder;
import org.apache.wicket.spring.injection.annot.SpringBean;
import org.apache.wicket.validation.IValidatable;
import org.apache.wicket.validation.ValidationError;
import org.apache.wicket.validation.validator.AbstractValidator;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Expression;
import org.hibernate.criterion.Restrictions;

import com.dblue.orm.ObjectLoader;

public abstract class UniqueValueValidator<T> extends AbstractValidator<T>{

	@SpringBean(name="objectLoader")
	protected ObjectLoader objectLoader;
	
	@SpringBean(name="sessionFactory")
	protected SessionFactory sessionFactory;
	
	
	private Class clazz;
	
	private String property;
	
	private String uiFieldName;
	
	public UniqueValueValidator(Class clazz, String property,String uiFieldName){
		InjectorHolder.getInjector().inject(this);
		this.property = property;		
		this.clazz = clazz;
		this.uiFieldName=uiFieldName;
	}
	
	public  List<Integer> excludeObjects(){
		return new ArrayList<Integer>();
	}
	
	@Override
	protected void onValidate(IValidatable<T> validatable) {
		// TODO Auto-generated method stub
		String propertyValue = (String)validatable.getValue();
		Criteria criteria =  sessionFactory.getCurrentSession().createCriteria(clazz);		
		Criterion criterion = Restrictions.eq(property, propertyValue);
		
		if( null != excludeObjects() && excludeObjects().size() > 0){
			Criterion criterion2 = Expression.not(Expression.in("id", excludeObjects()));		
			criteria.add(Restrictions.and(criterion, criterion2));
		}else{
			criteria.add(criterion);
		}
		
		int size = objectLoader.countAll(clazz, criteria);
		
		if( size > 0 ){
			//we got validation error
			ValidationError error = new ValidationError();
			error.addMessageKey("UniqueValueValidator");
			error.setVariable("fieldName", uiFieldName);	
			error.setVariable("fieldValue", validatable.getValue());
			validatable.error(error);
		}
	}

}
