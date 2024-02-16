package com.dblue.farm;

// Generated Sep 15, 2012 12:11:16 PM by Hibernate Tools 3.4.0.CR1

import java.math.BigDecimal;
import java.util.Date;

/**
 * Person generated by hbm2java
 */
public class Person extends FarmObjectImpl {

	private Integer id;
	private Images images;
	private Contact contact;
	private Farm farm;
	private String employeeNumber;
	private String name;
	private String deptNumber;
	private String deptName;
	private BigDecimal salary;
	private String hikeDetails;
	private Date hireDate;
	private Date releiveDate;
	private String academicQual;
	private Integer yearPassing;
	private char sex;
	private Date dateOfBirth;
	private char maritalStatus;
	private char jobType;
	private String bloodGroup;
	private String spouseName;

	public Person() {
	}

	public Person(String employeeNumber, String name, BigDecimal salary,
			Date hireDate, char sex, Date dateOfBirth, char maritalStatus,
			char jobType, String bloodGroup) {
		this.employeeNumber = employeeNumber;
		this.name = name;
		this.salary = salary;
		this.hireDate = hireDate;
		this.sex = sex;
		this.dateOfBirth = dateOfBirth;
		this.maritalStatus = maritalStatus;
		this.jobType = jobType;
		this.bloodGroup = bloodGroup;
	}

	public Person(Images images, Contact contact, Farm farm,
			String employeeNumber, String name, String deptNumber,
			String deptName, BigDecimal salary, String hikeDetails,
			Date hireDate, Date releiveDate, String academicQual,
			Integer yearPassing, char sex, Date dateOfBirth,
			char maritalStatus, char jobType, String bloodGroup,
			String spouseName) {
		this.images = images;
		this.contact = contact;
		this.farm = farm;
		this.employeeNumber = employeeNumber;
		this.name = name;
		this.deptNumber = deptNumber;
		this.deptName = deptName;
		this.salary = salary;
		this.hikeDetails = hikeDetails;
		this.hireDate = hireDate;
		this.releiveDate = releiveDate;
		this.academicQual = academicQual;
		this.yearPassing = yearPassing;
		this.sex = sex;
		this.dateOfBirth = dateOfBirth;
		this.maritalStatus = maritalStatus;
		this.jobType = jobType;
		this.bloodGroup = bloodGroup;
		this.spouseName = spouseName;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Images getImages() {
		return this.images;
	}

	public void setImages(Images images) {
		this.images = images;
	}

	public Contact getContact() {
		return this.contact;
	}

	public void setContact(Contact contact) {
		this.contact = contact;
	}

	public Farm getFarm() {
		return this.farm;
	}

	public void setFarm(Farm farm) {
		this.farm = farm;
	}

	public String getEmployeeNumber() {
		return this.employeeNumber;
	}

	public void setEmployeeNumber(String employeeNumber) {
		this.employeeNumber = employeeNumber;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDeptNumber() {
		return this.deptNumber;
	}

	public void setDeptNumber(String deptNumber) {
		this.deptNumber = deptNumber;
	}

	public String getDeptName() {
		return this.deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public BigDecimal getSalary() {
		return this.salary;
	}

	public void setSalary(BigDecimal salary) {
		this.salary = salary;
	}

	public String getHikeDetails() {
		return this.hikeDetails;
	}

	public void setHikeDetails(String hikeDetails) {
		this.hikeDetails = hikeDetails;
	}

	public Date getHireDate() {
		return this.hireDate;
	}

	public void setHireDate(Date hireDate) {
		this.hireDate = hireDate;
	}

	public Date getReleiveDate() {
		return this.releiveDate;
	}

	public void setReleiveDate(Date releiveDate) {
		this.releiveDate = releiveDate;
	}

	public String getAcademicQual() {
		return this.academicQual;
	}

	public void setAcademicQual(String academicQual) {
		this.academicQual = academicQual;
	}

	public Integer getYearPassing() {
		return this.yearPassing;
	}

	public void setYearPassing(Integer yearPassing) {
		this.yearPassing = yearPassing;
	}

	public char getSex() {
		return this.sex;
	}

	public void setSex(char sex) {
		this.sex = sex;
	}

	public Date getDateOfBirth() {
		return this.dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public char getMaritalStatus() {
		return this.maritalStatus;
	}

	public void setMaritalStatus(char maritalStatus) {
		this.maritalStatus = maritalStatus;
	}	

	public char getJobType() {
		return jobType;
	}

	public void setJobType(char jobType) {
		this.jobType = jobType;
	}

	public String getBloodGroup() {
		return this.bloodGroup;
	}

	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}

	public String getSpouseName() {
		return this.spouseName;
	}

	public void setSpouseName(String spouseName) {
		this.spouseName = spouseName;
	}

}