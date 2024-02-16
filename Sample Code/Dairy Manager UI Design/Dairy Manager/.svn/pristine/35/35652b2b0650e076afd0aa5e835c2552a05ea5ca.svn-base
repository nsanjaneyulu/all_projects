package com.dblue.farm.application.pages.summary;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.wicket.extensions.markup.html.repeater.data.sort.OrderByBorder;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.navigation.paging.PagingNavigator;
import org.apache.wicket.markup.repeater.Item;
import org.apache.wicket.markup.repeater.data.DataView;
import org.apache.wicket.model.PropertyModel;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.FarmConfiguration;
import com.dblue.farm.Livestock;
import com.dblue.farm.StateType;
import com.dblue.farm.application.FarmApplication;
import com.dblue.farm.application.FarmSession;
import com.dblue.farm.application.pages.FarmPage;
import com.dblue.farm.application.pages.LiveStockNew;
import com.dblue.farm.application.pages.pagination.FarmObjectCriteriaBasedDataProvider;

public class LiveStockStopFeedingSummary extends BaseSummary{
	
	private int bracket = 75;
	private int offset = 7;
	
	
	public LiveStockStopFeedingSummary(final FarmPage page){
		FarmObjectCriteriaBasedDataProvider<Livestock> liveStockDataProvider = new FarmObjectCriteriaBasedDataProvider<Livestock>() {

			@Override
			protected Criteria createCriteria() {
				
				
				
				int netBracket = bracket-offset;
				
				Calendar calendar = Calendar.getInstance();
				//todo make it a configuration
				calendar.add(calendar.DAY_OF_YEAR,(-1*netBracket));		
				Date maxModDate = calendar.getTime();	
				maxModDate.setHours(0);
				maxModDate.setMinutes(0);
				maxModDate.setSeconds(0);
				
				
				FarmConfiguration farmConfiguration = getFarmConfiguration();
				String calf = farmConfiguration.getCalf().getStateType();
				StateType stateType = getStateType(calf);
				
				
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Livestock.class);
				criteria.add(Restrictions.eq("farm", getLoginUserFarm()));
				criteria.add(Restrictions.le("birthDate", maxModDate));
				criteria.add(Restrictions.eq("stopFeedingStatus", 'N'));
				criteria.add(Restrictions.eq("stateType",stateType));
				criteria.add(Restrictions.eq("deceased",'N'));
				return criteria;
			}
		};
		
		// get Pagination size
		Integer paginationSize = getPaginationSize();

		
		
		DataView<Livestock> dataView = new DataView<Livestock>(
				"stopfeeding_rows", liveStockDataProvider, paginationSize) {
			protected void populateItem(final Item<Livestock> item) {
				Link editLink = new Link<Livestock>("livestock_edit",
						item.getModel()) {
					public void onClick() {
						Integer livestockId = item.getModelObject().getId();
						((FarmSession) getSession()).addToStore("livestockid",
								livestockId);
						setResponsePage(LiveStockNew.class);
					}
				};
				Livestock ls = item.getModelObject();
				editLink.add(new Label("lsLiveStockCode",
						new PropertyModel<String>(item.getModel(), "code")));
				
				// calculate the stop feeding date
				Calendar calendar = Calendar.getInstance();
				calendar.setTime(ls.getBirthDate());
				calendar.add(Calendar.DAY_OF_YEAR, bracket);
				
				item.add(new Label("birthDate", null == ls.getConceivedDate() ? "":sdf.format(ls.getBirthDate())));
				item.add(new Label("stopFeedingDate", sdf.format(calendar.getTime())));
				item.add(editLink);

			}
		};

		page.add(dataView);
		page.add(new PagingNavigator("stop_feeding_navigator", dataView));
		page.add(new OrderByBorder("stop_feeding_orderbycode", "code", liveStockDataProvider));
	}
	
	protected StateType getStateType(String state) {
		Session session = sessionFactory.getCurrentSession();
		Criteria criteria = session.createCriteria(StateType.class);
		criteria.add(Restrictions.eq("farm", getLoginUserFarm()));
		criteria.add(Restrictions.eq("stateType", state));
		List<StateType> allStateTypes = objectLoader.findAll(StateType.class,
				criteria);
		return allStateTypes.size() > 0 ? allStateTypes.get(0) : null;
	}
	
}
