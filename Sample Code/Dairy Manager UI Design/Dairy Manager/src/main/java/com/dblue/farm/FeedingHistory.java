package com.dblue.farm;

// Generated 4 Nov, 2012 11:27:41 AM by Hibernate Tools 3.4.0.CR1

import java.math.BigDecimal;
import java.util.Date;

/**
 * FeedingHistory generated by hbm2java
 */
public class FeedingHistory extends FarmObjectImpl {

	private Integer id;
	private String feedType;
	private BigDecimal quantity;
	private Date feedDate;
	private String stateType;
	private int livestockTotal;
	private Farm farm;

	public FeedingHistory() {
	}

	public FeedingHistory(String feedType, BigDecimal quantity, Date feedDate,
			String stateType, int livestockTotal, Farm farm) {
		this.feedType = feedType;
		this.quantity = quantity;
		this.feedDate = feedDate;
		this.stateType = stateType;
		this.livestockTotal = livestockTotal;
		this.farm = farm;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFeedType() {
		return this.feedType;
	}

	public void setFeedType(String feedType) {
		this.feedType = feedType;
	}

	public BigDecimal getQuantity() {
		return this.quantity;
	}

	public void setQuantity(BigDecimal quantity) {
		this.quantity = quantity;
	}

	public Date getFeedDate() {
		return this.feedDate;
	}

	public void setFeedDate(Date feedDate) {
		this.feedDate = feedDate;
	}

	public String getStateType() {
		return this.stateType;
	}

	public void setStateType(String stateType) {
		this.stateType = stateType;
	}

	public int getLivestockTotal() {
		return this.livestockTotal;
	}

	public void setLivestockTotal(int livestockTotal) {
		this.livestockTotal = livestockTotal;
	}

	public Farm getFarm() {
		return farm;
	}

	public void setFarm(Farm farm) {
		this.farm = farm;
	}

}
