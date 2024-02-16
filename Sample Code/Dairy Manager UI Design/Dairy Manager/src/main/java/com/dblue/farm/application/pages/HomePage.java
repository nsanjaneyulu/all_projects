package com.dblue.farm.application.pages;

import java.util.List;

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.model.Model;
import org.springframework.security.core.context.SecurityContextHolder;

import com.dblue.farm.Farm;
import com.dblue.farm.application.FarmAuthentication;

public class HomePage extends FarmPage{		

	@Override
	protected void buildPageComponents() {
		List<Farm> allFarms = objectLoader.findAll(Farm.class);
		if( allFarms.size() > 0){
			Farm farm = allFarms.get(0);
			add( new Label("farm", new Model(farm.getName())));
			FarmAuthentication farmAuthentication = (FarmAuthentication)SecurityContextHolder.getContext().getAuthentication();
			System.out.println("Farm id ="+farmAuthentication.getFarmid());
		}
		
	}
}
