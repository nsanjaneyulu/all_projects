package com.dblue.farm;

// Generated Sep 15, 2012 11:08:28 AM by Hibernate Tools 3.4.0.CR1

import java.math.BigDecimal;
import java.util.Date;

/**
 * ProductionFarm generated by hbm2java
 */
public class ProductionFarm extends FarmObjectImpl {

	private Integer id;
	private Farm farm;
	private ProductionConfig productionConfig;
	private Date date;
	private BigDecimal yield;
	private BigDecimal fatPercentile;
	private Integer month;
	private BigDecimal snf;
	private BigDecimal clr;
	private BigDecimal rejection;
	private BigDecimal deduction;

	public ProductionFarm() {
	}

	public ProductionFarm(Farm farm, Date date) {
		this.farm = farm;
		this.date = date;
	}

	public ProductionFarm(Farm farm, ProductionConfig productionConfig,
			Date date, BigDecimal yield, BigDecimal fatPercentile,
			Integer month, BigDecimal snf, BigDecimal clr,
			BigDecimal rejection, BigDecimal deduction) {
		this.farm = farm;
		this.productionConfig = productionConfig;
		this.date = date;
		this.yield = yield;
		this.fatPercentile = fatPercentile;
		this.month = month;
		this.snf = snf;
		this.clr = clr;
		this.rejection = rejection;
		this.deduction = deduction;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Farm getFarm() {
		return this.farm;
	}

	public void setFarm(Farm farm) {
		this.farm = farm;
	}

	public ProductionConfig getProductionConfig() {
		return this.productionConfig;
	}

	public void setProductionConfig(ProductionConfig productionConfig) {
		this.productionConfig = productionConfig;
	}

	public Date getDate() {
		return this.date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public BigDecimal getYield() {
		return this.yield;
	}

	public void setYield(BigDecimal yield) {
		this.yield = yield;
	}

	public BigDecimal getFatPercentile() {
		return this.fatPercentile;
	}

	public void setFatPercentile(BigDecimal fatPercentile) {
		this.fatPercentile = fatPercentile;
	}

	public Integer getMonth() {
		return this.month;
	}

	public void setMonth(Integer month) {
		this.month = month;
	}

	public BigDecimal getSnf() {
		return this.snf;
	}

	public void setSnf(BigDecimal snf) {
		this.snf = snf;
	}

	public BigDecimal getClr() {
		return this.clr;
	}

	public void setClr(BigDecimal clr) {
		this.clr = clr;
	}

	public BigDecimal getRejection() {
		return this.rejection;
	}

	public void setRejection(BigDecimal rejection) {
		this.rejection = rejection;
	}

	public BigDecimal getDeduction() {
		return this.deduction;
	}

	public void setDeduction(BigDecimal deduction) {
		this.deduction = deduction;
	}

}
