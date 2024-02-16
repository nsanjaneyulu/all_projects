package com.dblue.farm.application.pages;

import com.dblue.farm.application.forms.SuggestedFeedingForm;

public class SuggestedFeeding extends FarmPage{

	@Override
	protected void buildPageComponents() {
		String effectiveDateString = (String)getWebRequestCycle().getPageParameters().getString("effectiveDate");	
		add( new SuggestedFeedingForm(effectiveDateString));
		
	}

}
