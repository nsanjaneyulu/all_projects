package com.dblue.farm.application.pages.pagination;


public abstract class SearchDataProvider<T> extends FarmObjectQueryBasedDataProvider<T>{
	private String queryString;
	private String countQueryString;
	public SearchDataProvider(String id, String queryString, String countQueryString){
		super(id);
		this.queryString=queryString;
		this.countQueryString=countQueryString;
	}
	public String getQueryString() {
		return queryString;
	}
	public String getCountQueryString() {
		return countQueryString;
	}
	
	
}