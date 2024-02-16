package com.dblue.farm.application.pages.summary;

import java.util.Arrays;
import java.util.List;

import org.apache.wicket.Application;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.model.Model;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.BreedType;
import com.dblue.farm.Farm;
import com.dblue.farm.IngredientOptions;
import com.dblue.farm.Livestock;
import com.dblue.farm.StateType;
import com.dblue.farm.application.FarmApplication;
import com.dblue.farm.application.pages.FarmPage;

public class LiveStockSummary extends BaseSummary{
	
	public void buildLiveStockSummaryByState(FarmPage page){
		List<StateType> allStates = getAllStates();
		Integer totalLiveStockCount = getTotalLiveStockCount();
		page.add( new Label("totalCount_bystate", new Model<Integer>(totalLiveStockCount)));
		
		ListView<StateType> listview = new ListView<StateType>("ls_rows", allStates) {
			@Override
			protected void populateItem(final ListItem<StateType> rowItem) {
				// for each available fodders count the sum.
				
				Query query = sessionFactory.getCurrentSession().createQuery("select count(l) from Livestock l where l.farm=:farm and l.stateType.stateType=:stateType and l.deceased='N'");
				query.setInteger("farm", getLoginUserFarm().getId());
				query.setString("stateType", rowItem.getModelObject().getStateType());
				Number liveStockCount = (Number)query.uniqueResult();
								
				
				rowItem.add(new Label("state", new Model<String>(rowItem.getModelObject().getStateType())));
				rowItem.add(new Label("count", new Model<Integer>(liveStockCount.intValue())));
				
			}
		};
		listview.setOutputMarkupId(true);
		page.add( listview);

	}
	
	public void buildLiveStockSummaryBySex(FarmPage page){
		Integer totalLiveStockCount = getTotalLiveStockCount();
		page.add( new Label("totalCount_bysex", new Model<Integer>(totalLiveStockCount)));
		
		
		ListView<Character> listview = new ListView<Character>("lss_rows", Arrays.asList(new Character[]{'M','F'})) {
			@Override
			protected void populateItem(final ListItem<Character> rowItem) {
				// for each available fodders count the sum.
				

				Query query = sessionFactory.getCurrentSession().createQuery("select count(l) from Livestock l where l.farm=:farm and l.sex=:sex and l.deceased='N'");
				query.setInteger("farm", getLoginUserFarm().getId());
				query.setCharacter("sex", rowItem.getModelObject());
				Number liveStockCount = (Number)query.uniqueResult();
				
			
				
				rowItem.add(new Label("sex", new Model<Character>(rowItem.getModelObject())));
				rowItem.add(new Label("count", new Model<Integer>(liveStockCount.intValue())));
				
			}
		};
		listview.setOutputMarkupId(true);
		page.add( listview);

	}
	
	public void buildLiveStockSummaryByBreed(FarmPage page){
		Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
		List<BreedType> allBreeds = objectLoader.findAll(BreedType.class, criterion);
		Integer totalLiveStockCount = getTotalLiveStockCount();
		page.add( new Label("totalCount_breedtype", new Model<Integer>(totalLiveStockCount)));
		
		ListView<BreedType> listview = new ListView<BreedType>("bt_rows", allBreeds) {
			@Override
			protected void populateItem(final ListItem<BreedType> rowItem) {
				// for each available fodders count the sum.
				
				Query query = sessionFactory.getCurrentSession().createQuery("select count(l) from Livestock l where l.farm=:farm and l.breedTypeByBreedTypeId.breedType=:breedType and l.deceased='N'");
				query.setInteger("farm", getLoginUserFarm().getId());
				query.setString("breedType", rowItem.getModelObject().getBreedType());
				Number liveStockCount = (Number)query.uniqueResult();
				
				
				
				rowItem.add(new Label("state", new Model<String>(rowItem.getModelObject().getBreedType())));
				rowItem.add(new Label("count", new Model<Integer>(liveStockCount.intValue())));
				
			}
		};
		listview.setOutputMarkupId(true);
		page.add( listview);

	}
	
	private Integer getTotalLiveStockCount() {
		Session session = sessionFactory.getCurrentSession();
		Criteria criteria = session.createCriteria(Livestock.class);
		criteria.add(Restrictions.eq("farm",getLoginUserFarm()));		
		criteria.add(Restrictions.eq("deceased", "N"));
		return objectLoader.countAll(Livestock.class, criteria);
	}

	private List<StateType> getAllStates() {
		return objectLoader.findAll(StateType.class,Restrictions.eq("farm",getLoginUserFarm()));
	}
	
}
