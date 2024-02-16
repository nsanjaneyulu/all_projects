package com.dblue.farm;

import java.util.Date;

public class Lactation extends FarmObjectImpl {
	
	private Integer id;
	private Integer lactationNumber;
	private Date startDate;
	private Date endDate;
	private Livestock livestock;
	
	public Lactation(){
		
	}
	
	public Lactation (Livestock livestock){
		this.livestock = livestock;
	}
	
	public Lactation(Integer lactationNumber, Date startDate, Date endDate, Livestock livestock){
		this.lactationNumber = lactationNumber;
		this.startDate = startDate;
		this.endDate = endDate;		
		this.livestock = livestock;
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	public Integer getLactationNumber() {
		return lactationNumber;
	}

	public void setLactationNumber(Integer lactationNumber) {
		this.lactationNumber = lactationNumber;
	}

	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public Livestock getLivestock() {
		return livestock;
	}

	public void setLivestock(Livestock livestock) {
		this.livestock = livestock;
	}

}
