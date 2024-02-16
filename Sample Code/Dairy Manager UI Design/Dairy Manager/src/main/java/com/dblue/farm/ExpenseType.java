package com.dblue.farm;

// Generated Jul 25, 2012 11:55:35 PM by Hibernate Tools 3.4.0.CR1

import java.util.HashSet;
import java.util.Set;

/**
 * ExpenseType generated by hbm2java
 */
public class ExpenseType extends FarmObjectImpl {

	private Integer id;
	private String expense;
	private String description;
	private Farm farm;
	private Set expenseses = new HashSet(0);

	public ExpenseType() {
	}

	public ExpenseType(String expense, Farm farm) {
		this.expense = expense;
		this.farm = farm;
	}

	public ExpenseType(String expense, String description, Farm farm, Set expenseses) {
		this.expense = expense;
		this.description = description;
		this.farm = farm;
		this.expenseses = expenseses;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getExpense() {
		return this.expense;
	}

	public void setExpense(String expense) {
		this.expense = expense;
	}

	public String getDescription() {
		return this.description;
	}

	public Farm getFarm() {
		return farm;
	}

	public void setFarm(Farm farm) {
		this.farm = farm;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Set getExpenseses() {
		return this.expenseses;
	}

	public void setExpenseses(Set expenseses) {
		this.expenseses = expenseses;
	}

	@Override
	public String toString() {
		return expense;
	}
	
	

}
