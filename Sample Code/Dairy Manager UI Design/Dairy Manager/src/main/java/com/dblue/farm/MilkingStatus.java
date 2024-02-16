package com.dblue.farm;

// Generated 15 Jul, 2012 7:41:55 PM by Hibernate Tools 3.4.0.CR1

import java.util.HashSet;
import java.util.Set;

/**
 * MilkingStatus generated by hbm2java
 */
public class MilkingStatus extends FarmObjectImpl {

	private Integer id;
	private String status;
	private String description;
	private Farm farm;
	private Set livestocks = new HashSet(0);

	public MilkingStatus() {
	}

	public MilkingStatus(String status, Farm farm) {
		this.status = status;
		this.farm = farm;
	}

	public MilkingStatus(String status, String description, Farm farm, Set livestocks) {
		this.status = status;
		this.description = description;
		this.farm = farm;
		this.livestocks = livestocks;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Farm getFarm() {
		return farm;
	}

	public void setFarm(Farm farm) {
		this.farm = farm;
	}

	public Set getLivestocks() {
		return this.livestocks;
	}

	public void setLivestocks(Set livestocks) {
		this.livestocks = livestocks;
	}
	
	@Override
	public String toString() {
		return status;
	}

}
