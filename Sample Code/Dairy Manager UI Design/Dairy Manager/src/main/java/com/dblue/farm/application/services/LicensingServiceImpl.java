package com.dblue.farm.application.services;

import org.hibernate.criterion.Restrictions;

import com.dblue.farm.Livestock;
import com.dblue.orm.ObjectLoader;
import com.esw.components.licensing.LicenseProvider;
import com.esw.components.licensing.aspect.LicenseVerifier;
import com.esw.components.licensing.exception.LicensingException;

public class LicensingServiceImpl implements LicensingService {

	private LicenseProvider licenseProvider;

	private LicenseVerifier licenseVerifier;

	private ObjectLoader objectLoader;

	public void setLicenseProvider(LicenseProvider licenseProvider) {
		this.licenseProvider = licenseProvider;
	}

	public void setLicenseVerifier(LicenseVerifier licenseVerifier) {
		this.licenseVerifier = licenseVerifier;
	}

	public void setObjectLoader(ObjectLoader objectLoader){
		this.objectLoader = objectLoader;
	}

	public boolean hasValidLicense(int seatRequired){
		//int liveStockCount = objectLoader.countAll(Livestock.class,Restrictions.eq("deceased", "N"));
		//return getSeats() >= (liveStockCount+seatRequired);
		return true;
	}

	public boolean hasValidLicense(){
		//int liveStockCount = objectLoader.countAll(Livestock.class,Restrictions.gt("deceased", "N"));
		//return getSeats() >= liveStockCount;
		return true;
	}
	private int getSeats() {
		try{
			licenseVerifier.verifyLicense();
		}catch(LicensingException ex){
			return 0;
		}
		return licenseProvider.getLicense().getConsumerAmount();
	}

}
