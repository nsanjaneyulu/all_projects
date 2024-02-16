package com.dblue.farm;

// Generated Jul 24, 2012 10:23:26 PM by Hibernate Tools 3.4.0.CR1

import java.util.HashSet;
import java.util.Set;

/**
 * ReceiptType generated by hbm2java
 */
public class ReceiptType extends FarmObjectImpl {

	private Integer id;
	private String receipt;
	private String description;
	private Farm farm;
	private Set purchaseses = new HashSet(0);

	public ReceiptType() {
	}

	public ReceiptType(String receipt, Farm farm) {
		this.receipt = receipt;
	}

	public ReceiptType(String receipt, String description, Farm farm, Set purchaseses) {
		this.receipt = receipt;
		this.description = description;
		this.farm = farm;
		this.purchaseses = purchaseses;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getReceipt() {
		return this.receipt;
	}

	public void setReceipt(String receipt) {
		this.receipt = receipt;
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

	public Set getPurchaseses() {
		return this.purchaseses;
	}

	public void setPurchaseses(Set purchaseses) {
		this.purchaseses = purchaseses;
	}

	@Override
	public String toString() {
		return receipt;
	}
	
	

}