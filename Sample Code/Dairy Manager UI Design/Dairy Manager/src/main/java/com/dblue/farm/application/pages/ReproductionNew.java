package com.dblue.farm.application.pages;

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.model.Model;

import com.dblue.farm.Livestock;
import com.dblue.farm.application.FarmSession;
import com.dblue.farm.application.forms.ReproductionForm;
import com.dblue.farm.exception.FarmRuntimeException;
import com.dblue.farm.exception.NotFoundException;

public class ReproductionNew extends FarmPage {
	
	
	@Override
	protected void buildPageComponents() {
		
		int liveStockId= (Integer) ((FarmSession) getSession()).getStoreValue("livestockid");
		try{
			Livestock ls  = (Livestock)objectLoader.load(Livestock.class, liveStockId);
			add(new Label("code",new Model<String>(ls.getCode())));
		}catch(NotFoundException ex){
			throw new FarmRuntimeException("Invalid session while editing LiveStock health");
		}
		add( new ReproductionForm());
		
		
	}
	
	

}
