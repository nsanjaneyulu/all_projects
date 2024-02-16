package com.dblue.farm.application.pages.pagination;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;

public class QuerySupport implements Serializable{

	private String queryString;
	
	private List queryParameters;
	
	public QuerySupport(String queryString,List queryParameters){
		this.queryString=queryString;
		this.queryParameters = queryParameters;
	}

	public String getQueryString() {
		return queryString;
	}

	public List getQueryParameters() {
		return queryParameters;
	}
	
	public void applyQueryParameters(Query query){
		int index=0;
		for(Object obj : queryParameters){
			if( obj instanceof String){
				query.setString(index, (String)obj);
			}else if (obj instanceof Date){
				query.setDate(index, (Date)obj);
			}else if (obj instanceof Integer){
				query.setInteger(index, (Integer)obj);
			}else if( obj instanceof Double){
				query.setDouble(index, (Double)obj);
			}else if( obj instanceof BigDecimal){
				query.setBigDecimal(index, (BigDecimal)obj);
			}else{
				throw new UnsupportedOperationException("Method not supported for type "+ obj.getClass().getName());
			}
			index++;
		}
	}
	
}