package com.dblue.farm.application.forms;

import org.apache.wicket.injection.web.InjectorHolder;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.model.IModel;
import org.apache.wicket.spring.injection.annot.SpringBean;
import org.hibernate.SessionFactory;

import com.dblue.farm.Farm;
import com.dblue.farm.application.FarmSession;
import com.dblue.farm.application.dao.FarmApplicationDAO;
import com.dblue.farm.application.services.LicensingService;
import com.dblue.orm.ObjectLoader;

public abstract class AbstractWebForm extends Form {
	
	@SpringBean(name="objectLoader")
	protected ObjectLoader objectLoader;
	
	@SpringBean(name="sessionFactory")
	protected SessionFactory sessionFactory;
	
	@SpringBean
	LicensingService licensingService;

	@SpringBean
	FarmApplicationDAO farmApplicationDAO;
	
	public AbstractWebForm(String id) {
		super(id);
		InjectorHolder.getInjector().inject(this);
	}

	public AbstractWebForm(String id, IModel model) {
		super(id, model);
		InjectorHolder.getInjector().inject(this);
	}
	
	protected Farm getLoginUserFarm(){
		FarmSession farmSession = (FarmSession)getSession();
		return farmSession.getFarm();
	}
	

}

