package com.dblue.farm.application.pages;


import java.util.Arrays;
import java.util.List;

import org.apache.wicket.Application;
import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.markup.html.form.AjaxButton;
import org.apache.wicket.markup.html.form.DropDownChoice;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.model.util.ListModel;
import org.apache.wicket.spring.injection.annot.SpringBean;
import org.apache.wicket.validation.validator.StringValidator.ExactLengthValidator;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.Farm;
import com.dblue.farm.FarmConfiguration;
import com.dblue.farm.MilkingStatus;
import com.dblue.farm.OriginType;
import com.dblue.farm.StateType;
import com.dblue.farm.application.FarmApplication;
import com.dblue.farm.exception.NotFoundException;
import com.dblue.orm.ObjectLoader;

public class FarmConfigurationPage extends FarmPage {

	@SpringBean
	ObjectLoader objectLoader;
	
	private TextField<Integer> pagination;
	
	private TextField<Integer> summaryPagination;
	
	private TextField<Integer> milkProductionPagination;
	
	private DropDownChoice<StateType> calf;
	
	private DropDownChoice<StateType> heafer;
	
	private DropDownChoice<StateType> herd;
	
	private DropDownChoice<Character> autoReProduce;
	
	private DropDownChoice<MilkingStatus> milkingStatus;
	
	private DropDownChoice<OriginType> inhouseOriginType;
	
	private TextField<String> codePrefix;
	
	private DropDownChoice<Character> milkProductionChoice;
	
	

	@Override
	protected void buildPageComponents() {
		
		final FarmConfiguration  farmConfiguration = getExistingConfiguration();
		
		Farm farm = getFarm();
		
		List<StateType> stateTypes = getStateTypes(farm);
		List<MilkingStatus> milkingStatuses = getMilkingStatuses(farm);
		List<OriginType> originTypes = getOriginTypes(farm);
		
		//TODO: add range validators
		
		this.pagination = new TextField<Integer>("pagination", new PropertyModel<Integer>(farmConfiguration, "pagination"));		
		this.summaryPagination = new TextField<Integer>("summaryPagination", new PropertyModel<Integer>(farmConfiguration, "summaryPagination"));
		this.milkProductionPagination = new TextField<Integer>("milkProductionPagination", new PropertyModel<Integer>(farmConfiguration, "milkProductionPagination"));
		this.calf = new DropDownChoice<StateType>("calf", new PropertyModel<StateType>(farmConfiguration, "calf"),stateTypes);
		this.heafer = new DropDownChoice<StateType>("heafer", new PropertyModel<StateType>(farmConfiguration, "heafer"),stateTypes);
		this.herd = new DropDownChoice<StateType>("herd", new PropertyModel<StateType>(farmConfiguration, "herd"),stateTypes);
		
		this.autoReProduce  = new DropDownChoice<Character>("autoReProduce", new PropertyModel<Character>(farmConfiguration,"autoReProduce"),new ListModel<Character>(Arrays.asList(new Character[]{'N','Y'})));
		this.milkingStatus = new DropDownChoice<MilkingStatus>("nonMlikingStatus", new PropertyModel<MilkingStatus>(farmConfiguration, "nonMlikingStatus"),milkingStatuses);
		this.inhouseOriginType = new DropDownChoice<OriginType>("inhouseOriginType", new PropertyModel<OriginType>(farmConfiguration, "inhouseOriginType"),originTypes);
		this.codePrefix = new TextField<String>("codePrefix", new PropertyModel<String>(farmConfiguration, "codePrefix"));
		codePrefix.add( ExactLengthValidator.exactLength(2));
		this.milkProductionChoice  = new DropDownChoice<Character>("milkProductionChoice", new PropertyModel<Character>(farmConfiguration,"milkProductionChoice"),new ListModel<Character>(Arrays.asList(new Character[]{'N','Y'})));
		
		final FeedbackPanel feedBack = new FeedbackPanel("feedback");
		feedBack.setOutputMarkupId(true);
		
		AjaxButton save = new AjaxButton("save") {
			
			@Override
			protected void onSubmit(AjaxRequestTarget target, Form<?> form) {
				objectLoader.save(FarmConfiguration.class, farmConfiguration);
				getSession().info("Farm Configuration is saved succesfully");
				target.addComponent(feedBack);				
			}

			@Override
			protected void onError(AjaxRequestTarget target, Form<?> form) {
				target.addComponent(feedBack);	
			}
			
			
		};
		
		Form form  = new Form("farmconfiguration");
		
		pagination.setRequired(true);
		summaryPagination.setRequired(true);
		calf.setRequired(true);
		heafer.setRequired(true);
		herd.setRequired(true);
		autoReProduce.setRequired(true);
		milkingStatus.setRequired(true);
		codePrefix.setRequired(true);
		milkProductionChoice.setRequired(true);	
		inhouseOriginType.setRequired(true);
		
		form.add(pagination);
		form.add(summaryPagination);
		form.add(milkProductionPagination);
		form.add(calf);
		form.add(heafer);
		form.add(herd);
		form.add(autoReProduce);
		form.add(milkingStatus);
		form.add(inhouseOriginType);
		form.add(codePrefix);
		form.add(milkProductionChoice);		
		form.add(save);
		//form.add(feedBack);
		
		add(form);
		add(feedBack);
		
		
		

	}
	
	private List<StateType> getStateTypes(Farm farm){
		Criterion criterion = Restrictions.eq("farm",farm );
		return objectLoader.findAll(StateType.class,criterion);
	}
	
	private List<MilkingStatus> getMilkingStatuses(Farm farm){
		Criterion criterion = Restrictions.eq("farm",farm );
		return objectLoader.findAll(MilkingStatus.class,criterion);
	}
	
	private List<OriginType> getOriginTypes(Farm farm){
		Criterion criterion = Restrictions.eq("farm",farm );
		return objectLoader.findAll(OriginType.class,criterion);
	}
	
	private Farm getFarm(){
		Farm farm = farmConfigurationProvider.getLoginUserFarm();
		return farm;
	}

	private FarmConfiguration getExistingConfiguration() {
		
		Farm farm = getFarm();
		Criterion condition = Restrictions.eq("farm", farm);
		FarmConfiguration farmConfiguration = null;
		List<FarmConfiguration> allConfigurations = objectLoader.findAll(FarmConfiguration.class, condition);
		farmConfiguration =  ( allConfigurations.size() > 0 ? allConfigurations.get(0):null);
				
		if( null == farmConfiguration){
			farmConfiguration = new FarmConfiguration();
			farmConfiguration.setFarm(farm);
		}
		return farmConfiguration;

	}

}
