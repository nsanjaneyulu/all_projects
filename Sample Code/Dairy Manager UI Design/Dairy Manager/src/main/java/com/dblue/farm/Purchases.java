package com.dblue.farm;

// Generated Jul 24, 2012 10:23:26 PM by Hibernate Tools 3.4.0.CR1

import java.math.BigDecimal;
import java.util.Date;

/**
 * Purchases generated by hbm2java
 */
public class Purchases extends FarmObjectImpl {

	private Integer id;
	private Vendor vendor;
	private Livestock livestock;
	private Farm farm;
	private ReceiptType receiptType;
	private String receiptNumber;
	private Date saleDate;
	private String remarks;
	private BigDecimal amount;
	private BigDecimal unitPrice;
	private BigDecimal quantity;

	public Purchases() {
	}

	public Purchases(ReceiptType receiptType, String receiptNumber,
			Date saleDate, BigDecimal amount,BigDecimal unitPrice,BigDecimal quantity) {
		this.receiptType = receiptType;
		this.receiptNumber = receiptNumber;
		this.saleDate = saleDate;
		this.amount = amount;
		this.unitPrice = unitPrice;
		this.quantity=quantity;
	}

	public Purchases(Vendor vendor, Livestock livestock, Farm farm,
			ReceiptType receiptType, String receiptNumber, Date saleDate,
			String remarks, BigDecimal amount,BigDecimal unitPrice,BigDecimal quantity) {
		this.vendor = vendor;
		this.livestock = livestock;
		this.farm = farm;
		this.receiptType = receiptType;
		this.receiptNumber = receiptNumber;
		this.saleDate = saleDate;
		this.remarks = remarks;
		this.amount = amount;
		this.unitPrice = unitPrice;
		this.quantity=quantity;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Vendor getVendor() {
		return this.vendor;
	}

	public void setVendor(Vendor vendor) {
		this.vendor = vendor;
	}

	public Livestock getLivestock() {
		return this.livestock;
	}

	public void setLivestock(Livestock livestock) {
		this.livestock = livestock;
	}

	public Farm getFarm() {
		return this.farm;
	}

	public void setFarm(Farm farm) {
		this.farm = farm;
	}

	public ReceiptType getReceiptType() {
		return this.receiptType;
	}

	public void setReceiptType(ReceiptType receiptType) {
		this.receiptType = receiptType;
	}

	public String getReceiptNumber() {
		return this.receiptNumber;
	}

	public void setReceiptNumber(String receiptNumber) {
		this.receiptNumber = receiptNumber;
	}

	public Date getSaleDate() {
		return this.saleDate;
	}

	public void setSaleDate(Date saleDate) {
		this.saleDate = saleDate;
	}

	public String getRemarks() {
		return this.remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public BigDecimal getAmount() {
		return this.amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public BigDecimal getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(BigDecimal unitPrice) {
		this.unitPrice = unitPrice;
	}

	public BigDecimal getQuantity() {
		return quantity;
	}

	public void setQuantity(BigDecimal quantity) {
		this.quantity = quantity;
	}
	
	

}
