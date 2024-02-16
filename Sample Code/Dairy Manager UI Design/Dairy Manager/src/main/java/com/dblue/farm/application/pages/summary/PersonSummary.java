package com.dblue.farm.application.pages.summary;

import java.util.List;

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.model.Model;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.Livestock;
import com.dblue.farm.Person;
import com.dblue.farm.application.pages.FarmPage;

public class PersonSummary extends BaseSummary{
	
	public PersonSummary(FarmPage page){
		List<String>  allJobTypes = getUniqueJobTypes(); 
		
		Integer totalPersonCount = getTotalPersonCount();
		page.add( new Label("totalCount_person", new Model<Integer>(totalPersonCount)));
		
		ListView<String> listview = new ListView<String>("person_rows", allJobTypes) {
			@Override
			protected void populateItem(final ListItem<String> rowItem) {
				// for each available fodders count the sum.
				
				
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Person.class);	
				criteria.add(Restrictions.eq("farm", getLoginUserFarm()));
				criteria.add(Restrictions.eq("jobType", rowItem.getModelObject()));
				
				Integer personCount = objectLoader.countAll(Person.class, criteria);
				
				rowItem.add(new Label("state", new Model<String>(rowItem.getModelObject())));
				rowItem.add(new Label("count", new Model<Integer>(personCount)));
				
			}
		};
		listview.setOutputMarkupId(true);
		page.add( listview);

	}
	
	private List<String> getUniqueJobTypes(){
		
		String queryString = "select distinct p.jobType from Person p";
		Query query= sessionFactory.getCurrentSession().createQuery(queryString);
		List<String> allObjectTypes = query.list();
		return allObjectTypes;
	}
	
	private Integer getTotalPersonCount() {
		Session session = sessionFactory.getCurrentSession();
		Criteria criteria = session.createCriteria(Person.class);
		criteria.add(Restrictions.eq("farm",getLoginUserFarm()));		
		return objectLoader.countAll(Person.class, criteria);
	}

}
