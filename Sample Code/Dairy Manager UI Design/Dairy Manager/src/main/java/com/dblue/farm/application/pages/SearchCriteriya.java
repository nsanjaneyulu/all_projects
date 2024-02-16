package com.dblue.farm.application.pages;

import java.util.List;

import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.markup.html.form.AjaxButton;
import org.apache.wicket.markup.html.form.DropDownChoice;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.FormComponent;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.form.validation.AbstractFormValidator;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.Model;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.BreedType;
import com.dblue.farm.Livestock;
import com.dblue.farm.MilkingStatus;
import com.dblue.farm.OriginType;
import com.dblue.farm.StateType;
import com.dblue.farm.application.FarmSession;


public class SearchCriteriya extends FarmPage {
	
	private FeedbackPanel feedbackPanel;
	private DropDownChoice<BreedType> breed;
	private DropDownChoice<OriginType> origin;
	private DropDownChoice<StateType> stateType;
	private DropDownChoice<MilkingStatus> milkingStatus;
	
	
	@Override
	protected void buildPageComponents() {
		add(buildLiveStockSearch());
	}
	
	private Form buildLiveStockSearch()
	{
		

		Form form = new Form("SearchCriteriya");
		final TextField<String> lsRFID = new TextField<String>("lsRFID",
				new Model<String>(""));
		final TextField<String> lsLiveStockCode = new TextField<String>("lsLiveStockCode",
				new Model<String>(""));
		List<BreedType> breedtypes =objectLoader.findAll(BreedType.class);
		List<OriginType> originTypes =objectLoader.findAll(OriginType.class);
		List<StateType> stateTypes =objectLoader.findAll(StateType.class);
		List<MilkingStatus> milkingStatuss =objectLoader.findAll(MilkingStatus.class);
		
		Model<BreedType> breedSearchCriteria = new Model<BreedType>();
		Model<OriginType> originSearchCriteria = new Model<OriginType>();
		Model<MilkingStatus> milkingStatusSearchCriteria = new Model<MilkingStatus>();
		Model<StateType> stateTypeSearchCriteria = new Model<StateType>();
		this.breed = new DropDownChoice<BreedType>("breedType",breedSearchCriteria,breedtypes);
		this.origin = new DropDownChoice<OriginType>("originType",originSearchCriteria,originTypes);
		this.stateType = new DropDownChoice<StateType>("stateType",stateTypeSearchCriteria,stateTypes);
		this.milkingStatus = new DropDownChoice<MilkingStatus>("milkingStatus",milkingStatusSearchCriteria,milkingStatuss);
		
		
		
		

		form.add(lsRFID);
		form.add(lsLiveStockCode);
		form.add(breed);
		form.add(origin);
		form.add(stateType);
		form.add(milkingStatus);
		form.add(buildSearch(lsRFID, lsLiveStockCode,this.breed,this.origin,this.stateType,this.milkingStatus));

		form.add(new AbstractFormValidator() {

			public FormComponent<?>[] getDependentFormComponents() {
				return new TextField<?>[] { lsRFID, lsLiveStockCode };
			}

			public void validate(Form<?> form) {
				String lsRFIDValue = lsRFID.getRawInput();
				String lsLiveStockCodeValue = lsLiveStockCode.getRawInput();
//				if (isNull(lsRFIDValue) && isNull(lsLiveStockCodeValue)) {
//					form.error("Please enter a search criteria");
//				}

			}

		});
		
		this.feedbackPanel = new FeedbackPanel("feedback");
		this.feedbackPanel.setOutputMarkupId(true);
		form.add(feedbackPanel);
		add(form);
		return form;
		

	}
	

	private AjaxButton buildSearch(final TextField<String> lsRFID,
			final TextField<String> lsLiveStockCode, final DropDownChoice<BreedType> breedType, final DropDownChoice<OriginType> originType, final DropDownChoice<StateType> stateType, final DropDownChoice<MilkingStatus> milkingStatus) {
		// add search button
		AjaxButton search = new AjaxButton("search") {
			
		

			@Override
			protected void onSubmit(AjaxRequestTarget target, Form<?> form) {
				Criterion criterion = null;

				String lsRFIDValue = lsRFID.getModelObject();
				String lsLiveStockCodeValue = lsLiveStockCode.getModelObject();
				
				Integer breedId = ((BreedType)breedType.getDefaultModelObject()).getId();
				Integer originId = ((OriginType)originType.getDefaultModelObject()).getId();
				Integer stateTypeId = ((StateType)stateType.getDefaultModelObject()).getId();
				Integer milkingStatusId = ((MilkingStatus)milkingStatus.getDefaultModelObject()).getId();
				if (!isNull(lsRFIDValue) && !isNull(lsLiveStockCodeValue)) {
					// or condition
					Criterion cr1 = Restrictions.eq("lsRFID", lsRFIDValue);
					Criterion cr2 = Restrictions.gt("lsLiveStockCode", lsLiveStockCodeValue);
					

					criterion = Restrictions.or(cr1, cr2);

				} else if (!isNull(lsRFIDValue)) {
					criterion = Restrictions.eq("lsRFID", lsRFIDValue);
				} else if (!isNull(lsLiveStockCodeValue)) {
					criterion = Restrictions.gt("lsLiveStockCode", lsLiveStockCodeValue);
					
				}else if (breedId != 0) {
					criterion = Restrictions.eq("breedTypeByBreedTypeId.id",breedId );
					
				}else if (originId != 0) {
					criterion = Restrictions.eq("originType.id",originId );
					
				}else if (stateTypeId != 0) {
					criterion = Restrictions.eq("stateType.id",originId );
					
				}else if (milkingStatusId != 0) {
					criterion = Restrictions.eq("milkingStatus.id",originId );
					
				}




				List<Livestock> livestocks = objectLoader.findAll(Livestock.class, criterion);
				if( livestocks.size() != 0){
					// get the stock;
					Livestock livestock = livestocks.get(0);
					((FarmSession)getSession()).addToStore("livestockid", livestock.getId());
					setResponsePage(ListLiveStocks.class);
				}else{
					form.error("No results found");
					target.addComponent(form);
					target.addComponent(feedbackPanel);
				}
				
			}

			@Override
			protected void onError(AjaxRequestTarget target, Form<?> form) {
				target.addComponent(form);
				target.addComponent(feedbackPanel);
			}
			
			

		};

		return search;
	}

	private boolean isNull(String object) {
		return (null == object || "".equals(object.trim()));
	}

}
