package com.dblue.farm.application.pages;

import com.dblue.farm.application.forms.IngredientOptionsListForm;

public class IngredientOptionsList extends FarmPage{

	@Override
	protected void buildPageComponents() {
		add( new IngredientOptionsListForm(""));
		
	}
}
