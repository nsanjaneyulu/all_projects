package com.dblue.farm;

// Generated Sep 22, 2012 6:00:43 PM by Hibernate Tools 3.4.0.CR1

import java.util.HashSet;
import java.util.Set;

/**
 * DeVermitizationType generated by hbm2java
 */
public class DeVermitizationType extends FarmObjectImpl {

	private Integer id;
	private String deVermitizationType;
	private String description;
	private Farm farm;
	private Integer intervalPeriod;
	private Set devermitizations = new HashSet(0);

	public DeVermitizationType() {
	}

	public DeVermitizationType(String deVermitizationType, Farm farm) {
		this.deVermitizationType = deVermitizationType;
		this.farm = farm;
	}

	public DeVermitizationType(String deVermitizationType, String description,
			Farm farm, Integer intervalPeriod, Set devermitizations) {
		this.deVermitizationType = deVermitizationType;
		this.description = description;
		this.farm = farm;
		this.intervalPeriod = intervalPeriod;
		this.devermitizations = devermitizations;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDeVermitizationType() {
		return this.deVermitizationType;
	}

	public void setDeVermitizationType(String deVermitizationType) {
		this.deVermitizationType = deVermitizationType;
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

	public Integer getIntervalPeriod() {
		return this.intervalPeriod;
	}

	public void setIntervalPeriod(Integer intervalPeriod) {
		this.intervalPeriod = intervalPeriod;
	}

	public Set getDevermitizations() {
		return this.devermitizations;
	}

	public void setDevermitizations(Set devermitizations) {
		this.devermitizations = devermitizations;
	}
	
	@Override
	public String toString() {
		return deVermitizationType;
	}

}