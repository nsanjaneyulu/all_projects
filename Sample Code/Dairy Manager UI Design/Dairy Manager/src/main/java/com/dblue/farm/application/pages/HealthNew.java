package com.dblue.farm.application.pages;

import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.markup.html.form.AjaxButton;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.Model;

import com.dblue.farm.Livestock;
import com.dblue.farm.application.FarmSession;
import com.dblue.farm.application.forms.DeceaseForm;
import com.dblue.farm.application.forms.DewormForm;
import com.dblue.farm.application.forms.VaccinationForm;
import com.dblue.farm.exception.FarmRuntimeException;
import com.dblue.farm.exception.NotFoundException;

public class HealthNew extends FarmPage {

	@Override
	protected void buildPageComponents() {
		//((FarmSession) getSession()).addToStore("livestockid",new Integer(1));
		int liveStockId= (Integer) ((FarmSession) getSession()).getStoreValue("livestockid");
		try{
			Livestock ls  = (Livestock)objectLoader.load(Livestock.class, liveStockId);
			add(new Label("code",new Model<String>(ls.getCode())));
		}catch(NotFoundException ex){
			throw new FarmRuntimeException("Invalid session while editing LiveStock health");
		}
		
		add(buildWrapperForm());

	}

	private Form buildWrapperForm() {
		final Form wrapper = new Form("wrapper");
		wrapper.add(buildVaccinationForm());
		wrapper.add(buildDeceaseForm());
		wrapper.add(buildDevermitizationForm());
		wrapper.add( new FeedbackPanel("feedback"));
		// add wrapper buttons
		AjaxButton prev = new AjaxButton("back") {
			
			@Override
			protected void onSubmit(AjaxRequestTarget target, Form<?> form) {
				setResponsePage(LiveStockNew.class);				
			}
		};
		
		AjaxButton save = new AjaxButton("save") {
			
			@Override
			protected void onSubmit(AjaxRequestTarget target, Form<?> form) {
				getSession().info("Health Details have been Saved or Updated");
				target.addComponent(form);						
			}

			@Override
			protected void onError(AjaxRequestTarget target, Form<?> form) {
				target.addComponent(form);		
			}
			
			
		};
		
		AjaxButton next  = new AjaxButton("next") {
			
			@Override
			protected void onSubmit(AjaxRequestTarget target, Form<?> form) {				
				target.addComponent(form);
				setResponsePage(ReproductionNew.class);
			}
			
			@Override
			protected void onError(AjaxRequestTarget target, Form<?> form) {
				target.addComponent(form);		
			}
		};
		
		wrapper.add(prev);
		wrapper.add(save);
		wrapper.add(next);
		return wrapper;
	}

	private Form buildVaccinationForm() {
		return new VaccinationForm();
	}

	private Form buildDeceaseForm() {
		return new DeceaseForm();
	}

	private Form buildDevermitizationForm() {
		return new DewormForm();
	}

}
