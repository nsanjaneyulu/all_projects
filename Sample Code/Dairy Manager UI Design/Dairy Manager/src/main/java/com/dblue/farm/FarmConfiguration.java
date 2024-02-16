package com.dblue.farm;

public class FarmConfiguration extends FarmObjectImpl {
	
	private Integer id;
	private Farm farm;
	private Integer pagination;
	private Integer summaryPagination;
	private Integer milkProductionPagination;
	private StateType calf;
	private StateType heafer;
	private StateType herd;
	private char autoReProduce;
	private MilkingStatus nonMlikingStatus;
	private String codePrefix;
	private char milkProductionChoice;
	private OriginType inhouseOriginType;
	
	public FarmConfiguration() {
	}
	
	public FarmConfiguration(Integer id, Farm farm, Integer pagination,
			Integer summaryPagination, Integer milkProductionPagination,StateType calf, StateType heafer,
			StateType herd, char autoReProduce, MilkingStatus nonMlikingStatus,
			String codePrefix, char milkProductionChoice,OriginType inhouseOriginType) {
		super();
		this.id = id;
		this.farm = farm;
		this.pagination = pagination;
		this.summaryPagination = summaryPagination;
		this.calf = calf;
		this.heafer = heafer;
		this.herd = herd;
		this.autoReProduce = autoReProduce;
		this.nonMlikingStatus = nonMlikingStatus;
		this.codePrefix = codePrefix;
		this.milkProductionChoice = milkProductionChoice;
		this.milkProductionPagination = milkProductionPagination;
		this.inhouseOriginType = inhouseOriginType;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Farm getFarm() {
		return farm;
	}
	public void setFarm(Farm farm) {
		this.farm = farm;
	}
	public Integer getPagination() {
		return pagination;
	}
	public void setPagination(Integer pagination) {
		this.pagination = pagination;
	}
	public Integer getSummaryPagination() {
		return summaryPagination;
	}
	public void setSummaryPagination(Integer summaryPagination) {
		this.summaryPagination = summaryPagination;
	}
	public StateType getCalf() {
		return calf;
	}
	public void setCalf(StateType calf) {
		this.calf = calf;
	}
	public StateType getHeafer() {
		return heafer;
	}
	public void setHeafer(StateType heafer) {
		this.heafer = heafer;
	}
	public StateType getHerd() {
		return herd;
	}
	public void setHerd(StateType herd) {
		this.herd = herd;
	}
	public char getAutoReProduce() {
		return autoReProduce;
	}
	public void setAutoReProduce(char autoReProduce) {
		this.autoReProduce = autoReProduce;
	}
	public MilkingStatus getNonMlikingStatus() {
		return nonMlikingStatus;
	}
	public void setNonMlikingStatus(MilkingStatus nonMlikingStatus) {
		this.nonMlikingStatus = nonMlikingStatus;
	}
	public String getCodePrefix() {
		return codePrefix;
	}
	public void setCodePrefix(String codePrefix) {
		this.codePrefix = codePrefix;
	}
	public char getMilkProductionChoice() {
		return milkProductionChoice;
	}
	public void setMilkProductionChoice(char milkProductionChoice) {
		this.milkProductionChoice = milkProductionChoice;
	}
	public Integer getMilkProductionPagination() {
		return milkProductionPagination;
	}
	public void setMilkProductionPagination(Integer milkProductionPagination) {
		this.milkProductionPagination = milkProductionPagination;
	}

	public OriginType getInhouseOriginType() {
		return inhouseOriginType;
	}

	public void setInhouseOriginType(OriginType inhouseOriginType) {
		this.inhouseOriginType = inhouseOriginType;
	}
	
	
	

}
