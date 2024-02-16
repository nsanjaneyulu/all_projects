package com.dblue.farm.application.pages.summary;

import java.util.Calendar;
import java.util.Date;

import org.apache.wicket.extensions.markup.html.repeater.data.sort.OrderByBorder;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.navigation.paging.PagingNavigator;
import org.apache.wicket.markup.repeater.Item;
import org.apache.wicket.markup.repeater.data.DataView;
import org.apache.wicket.model.PropertyModel;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.Livestock;
import com.dblue.farm.application.FarmApplication;
import com.dblue.farm.application.FarmSession;
import com.dblue.farm.application.pages.FarmPage;
import com.dblue.farm.application.pages.LiveStockNew;
import com.dblue.farm.application.pages.pagination.FarmObjectCriteriaBasedDataProvider;

public class LiveStockStopMilkingSummary extends BaseSummary{
	
	public LiveStockStopMilkingSummary(FarmPage page){
		FarmObjectCriteriaBasedDataProvider<Livestock> liveStockDataProvider = new FarmObjectCriteriaBasedDataProvider<Livestock>() {

			@Override
			protected Criteria createCriteria() {
				Calendar calendar = Calendar.getInstance();
				calendar.add(calendar.DAY_OF_YEAR,7);		
				Date maxModDate = calendar.getTime();	
				maxModDate.setHours(0);
				maxModDate.setMinutes(0);
				maxModDate.setSeconds(0);
					
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Livestock.class);
				criteria.add(Restrictions.eq("farm", getLoginUserFarm()));
				criteria.add(Restrictions.le("stopMilkingDate", maxModDate));
				criteria.add(Restrictions.eq("stopMilkingStatus", 'N'));
				criteria.add(Restrictions.eq("deceased",'N'));
				return criteria;
			}
		};
		
		// get Pagination size
		Integer paginationSize = getPaginationSize();

		
		
		DataView<Livestock> dataView = new DataView<Livestock>(
				"stopmilking_rows", liveStockDataProvider, paginationSize) {
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

				item.add(new Label("conceivedDate", null == ls.getConceivedDate() ? "":sdf.format(ls.getConceivedDate())));
				item.add(new Label("stopMilkingDate", null == ls.getStopMilkingDate() ? "" : sdf.format(ls.getStopMilkingDate())));
				item.add(editLink);

			}
		};

		page.add(dataView);
		page.add(new PagingNavigator("stop_milking_navigator", dataView));
		page.add(new OrderByBorder("stop_milk_orderbycode", "code", liveStockDataProvider));

		
		
	}

}
