package com.dblue.farm.application.pages;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Set;

import org.apache.wicket.extensions.markup.html.repeater.data.sort.OrderByBorder;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.navigation.paging.PagingNavigator;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.markup.repeater.Item;
import org.apache.wicket.markup.repeater.data.DataView;
import org.apache.wicket.model.Model;
import org.apache.wicket.model.PropertyModel;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.FarmConfiguration;
import com.dblue.farm.Lactation;
import com.dblue.farm.Livestock;
import com.dblue.farm.application.FarmSession;
import com.dblue.farm.application.pages.pagination.FarmObjectCriteriaBasedDataProvider;

public class ListLiveStocks extends FarmPage {

	@Override
	protected void buildPageComponents() {

		// data provider
		FarmObjectCriteriaBasedDataProvider<Livestock> liveStockDataProvider = new FarmObjectCriteriaBasedDataProvider<Livestock>() {

			@Override
			protected Criteria createCriteria() {
				Criteria criteria =  sessionFactory.getCurrentSession().createCriteria(
						Livestock.class);
				criteria.add(Restrictions.eq("farm",getLoginUserFarm()));
				criteria.add(Restrictions.eq("deceased", "N"));
				return criteria;
			}
		};
		
		// get Pagination size
		FarmConfiguration farmConfiguration =farmConfigurationProvider.getFarmConfiguration();
		
		Integer paginationSize = farmConfiguration.getPagination();

		DataView<Livestock> dataView = new DataView<Livestock>("rows",liveStockDataProvider, paginationSize) {
			protected void populateItem(final Item<Livestock> item) {
				
				item.add(new Label("lsRfid", new PropertyModel<String>(
						item.getModel(), "rfid")));				
				Link editLink=new Link<Livestock>("livestock_edit", item.getModel()) {
					public void onClick() {
						Integer livestockId = item.getModelObject().getId();
						((FarmSession) getSession()).addToStore("livestockid",
								livestockId);
						setResponsePage(LiveStockNew.class);
					}
				};				
				editLink.add(new Label("lsLiveStockCode",
								new PropertyModel<String>(item.getModel(),
										"code")));				
				item.add(editLink);				
				item.add(new Label("birthDate", new PropertyModel<String>(
						item.getModel(), "birthDate")));
//				item.add(new Label("sex", new PropertyModel<String>(
//						item.getModel(), "sex")));				
				Link motherlscode = new Link<Livestock>("motherlscode",
						item.getModel()) {
					public void onClick() {
						String motherCode = item.getModelObject()
								.getMothercode();
						if (null != motherCode) {
							Criterion motherCodeRestriction = Restrictions.eq(
									"code", motherCode);
							List<Livestock> allMothers = objectLoader.findAll(
									Livestock.class, motherCodeRestriction);
							if (allMothers.size() > 0) {
								Livestock mother = allMothers.get(0);
								((FarmSession) getSession()).addToStore(
										"livestockid", mother.getId());
								setResponsePage(LiveStockNew.class);
							}
						}
					}
				};
				
				motherlscode.add(new Label("lsmotherlbl",item.getModelObject()
								.getMothercode()));				
				item.add(motherlscode);				
				item.add(new Label("lsStateType",
						new PropertyModel<String>(item.getModel(),
								"StateType.stateType")));								
				item.add(new Label("lsBreedType",
						new PropertyModel<String>(item.getModel(),
								"breedTypeByBreedTypeId.breedType")));
				item.add(new Label("milkingStatus",
						new PropertyModel<String>(item.getModel(),
								"milkingStatus.status")));
				item.add(new Label("originType", new PropertyModel<String>(
						item.getModel(), "OriginType.originType")));	
				Set<Lactation> lactations = item.getModelObject().getLactations();
				List<Lactation> listLactations = new ArrayList<Lactation>();
				Lactation currentLactation = new Lactation();
				if(lactations.size()>0){
					listLactations.addAll(lactations);			
					Collections.sort(listLactations, new LactationComparator());
					currentLactation = listLactations.get(listLactations.size()-1);			
				}
				item.add(new Label("lactationNumber", new PropertyModel<String>(
						currentLactation, "lactationNumber")));
				item.add(new Label("lactationDays", new PropertyModel<String>(
						currentLactation, "startDate")));
				item.add(new Label("dryoffDate", new PropertyModel<String>(
						currentLactation, "endDate")));
				item.add(new Label("milkYield", new Model<Number>(getMilkYeild(item.getModelObject()))));
//				item.add(new Label("yieldingDays", new PropertyModel<String>(
//						item.getModel(), "yieldingDays")));
//				item.add(new Label("dryDays", new PropertyModel<String>(
//						item.getModel(), "dryDays")));
//				item.add(new Label("lactationPeriod", new PropertyModel<String>(
//						item.getModel(), "lactationPeriod")));
			}
		};

		add(dataView);
		add(new PagingNavigator("navigator", dataView));
		add(new OrderByBorder("orderbycode", "code", liveStockDataProvider));
		add(new FeedbackPanel("feedback"));
	}

	private Number getMilkYeild(Livestock liveStock) {
		Number yield = 0;
		Set<Lactation> lactations = liveStock.getLactations();
		List<Lactation> listLactations = new ArrayList<Lactation>();
		if (lactations.size() > 0) {
			listLactations.addAll(lactations);
			Collections.sort(listLactations, new LactationComparator());
			Lactation lactation = listLactations.get(listLactations.size()-1);

			Date startDate = lactation.getStartDate();
			if (startDate != null) {
				Date endDate = lactation.getEndDate();
				if(null==endDate){
					endDate = new Date();
				}

				Query milkYeild = sessionFactory
						.getCurrentSession()
						.createQuery(
								"select sum(yield) from Production p where p.livestock=:livestock and p.date >= :startDate and p.date <= :endDate group by month(p.date))");
				milkYeild.setInteger("livestock", liveStock.getId());
				milkYeild.setDate("startDate", startDate);
				milkYeild.setDate("endDate", endDate);
				yield = (Number) milkYeild.uniqueResult();

			}
		}

		return yield;

	}
	
	private class LactationComparator implements Comparator<Lactation> {

		public int compare(Lactation o1, Lactation o2) {
			if (o1 == null || o2 == null) {
				throw new IllegalArgumentException(
						"Lactation object cant be null for comparision");
			}

			int o1Order = o1.getLactationNumber();
			int o2Order = o2.getLactationNumber();
			return (o1Order > o2Order ? 1 : (o1Order == o2Order ? 0 : -1));
		}

	}
	
}
