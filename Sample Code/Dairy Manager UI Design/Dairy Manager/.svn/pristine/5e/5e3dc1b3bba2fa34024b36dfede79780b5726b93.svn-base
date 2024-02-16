package com.dblue.farm.application;

import java.util.List;

import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.security.core.context.SecurityContextHolder;

import com.dblue.farm.Farm;
import com.dblue.farm.FarmConfiguration;
import com.dblue.farm.exception.NotFoundException;
import com.dblue.orm.ObjectLoader;

public class FarmConfigurationProvider implements ApplicationContextAware {

	private ApplicationContext ctx;

	private ObjectLoader objectLoader;

	public void setApplicationContext(ApplicationContext ctx)
			throws BeansException {
		this.ctx = ctx;

	}

	public void setObjectLoader(ObjectLoader objectLoader) {
		this.objectLoader = objectLoader;
	}

	public Farm getLoginUserFarm() {
		FarmAuthentication farmAuthentication = (FarmAuthentication) SecurityContextHolder
				.getContext().getAuthentication();
		if (null == farmAuthentication) {
			return null;
		}
		int farmId = ((Long) farmAuthentication.getFarmid()).intValue();		
		Farm farm = null;
		try {
			farm = objectLoader.load(Farm.class, farmId);
		} catch (NotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return farm;
	}
	
	
	public FarmConfiguration getFarmConfiguration() {
		Farm farm = getLoginUserFarm();
		if( null == farm ){
			return null;
		}		
		Criterion condition = Restrictions.eq("farm", farm);
		FarmConfiguration farmConfiguration = null;
		List<FarmConfiguration> allConfigurations = objectLoader.findAll(
				FarmConfiguration.class, condition);
		farmConfiguration = (allConfigurations.size() > 0 ? allConfigurations
				.get(0) : null);

		if (null == farmConfiguration) {
			farmConfiguration = new FarmConfiguration();
			farmConfiguration.setFarm(farm);
		}
		return farmConfiguration;
	}

}
