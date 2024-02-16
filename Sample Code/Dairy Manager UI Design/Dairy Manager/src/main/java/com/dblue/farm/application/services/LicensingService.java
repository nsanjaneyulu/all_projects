package com.dblue.farm.application.services;

public interface LicensingService {
	
	boolean hasValidLicense();
	
	boolean hasValidLicense(int requiredSeats);
	
}
