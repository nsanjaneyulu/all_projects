package com.dblue.farm.application.pages.summary;

import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;

import org.apache.wicket.extensions.markup.html.repeater.data.sort.OrderByBorder;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.navigation.paging.PagingNavigator;
import org.apache.wicket.markup.repeater.Item;
import org.apache.wicket.markup.repeater.data.DataView;
import org.apache.wicket.model.Model;
import org.apache.wicket.model.PropertyModel;

import com.dblue.farm.Devermitization;
import com.dblue.farm.Health;
import com.dblue.farm.Livestock;
import com.dblue.farm.application.FarmApplication;
import com.dblue.farm.application.FarmSession;
import com.dblue.farm.application.pages.FarmPage;
import com.dblue.farm.application.pages.LiveStockNew;
import com.dblue.farm.application.pages.pagination.FarmObjectQueryBasedDataProvider;
import com.dblue.farm.application.pages.pagination.QuerySupport;

public class LiveStockDueWormingSummary extends BaseSummary{
	
	public LiveStockDueWormingSummary(FarmPage page){
		FarmObjectQueryBasedDataProvider<Livestock> liveStockDataProvider = new FarmObjectQueryBasedDataProvider<Livestock>(
				"id") {

			protected Date getQueryParams() {
				Calendar calendar = Calendar.getInstance();
				calendar.add(calendar.DAY_OF_YEAR, 7);
				Date maxModDate = calendar.getTime();
				maxModDate.setHours(0);
				maxModDate.setMinutes(0);
				maxModDate.setSeconds(0);
				return maxModDate;
			}

			@Override
			protected QuerySupport createCountQuery() {
				String queryString = "select count(distinct l) from Livestock l, Health h, Devermitization v,DeVermitizationType dt where l.farm="+getLoginUserFarm().getId()+ " and l.deceased='N' and l.health.id=h.id and h.id=v.health.id and v.deVermitizationType.id=dt.id and dt.intervalPeriod > 0 and v.id in (select max(sv.id) from Devermitization sv  where sv.farm="+getLoginUserFarm().getId()+ " group by sv.health,sv.deVermitizationType )  and v.nextVermitizationDate < ? order by v.nextVermitizationDate desc";
				QuerySupport querySupport = new QuerySupport(queryString, Arrays.asList(new Object[]{getQueryParams()}));
				return querySupport;
			}

			@Override
			protected QuerySupport createDataQuery() {
				String queryString = "select distinct l from Livestock l, Health h, Devermitization v,DeVermitizationType dt where l.farm="+getLoginUserFarm().getId()+ " and l.deceased='N' and l.health.id=h.id and h.id=v.health.id and v.deVermitizationType.id=dt.id and dt.intervalPeriod > 0 and v.id in (select max(sv.id) from Devermitization sv  where sv.farm="+getLoginUserFarm().getId()+ " group by sv.health,sv.deVermitizationType )  and v.nextVermitizationDate < ? order by v.nextVermitizationDate desc";
				//String queryString = "select distinct l from Livestock l, Health h, Devermitization v where l.health.id=h.id and h.id=v.health.id and v.nextVermitizationDate < ?";
				QuerySupport querySupport = new QuerySupport(queryString, Arrays.asList(new Object[]{getQueryParams()}));
				return querySupport;
			}			
		};

		// get Pagination size
		Integer paginationSize = getPaginationSize();

		DataView<Livestock> dataView = new DataView<Livestock>(
				"deworm_due_rows", liveStockDataProvider, paginationSize) {
			
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
				editLink.add(new Label("lsLiveStockCode",
						new PropertyModel<String>(item.getModel(), "code")));

				String nextVermDate="";
				String lastVermDate="";
				
				Livestock stock =(Livestock)item.getModelObject();
				Health h = stock.getHealth();
				if( null != h ){
					Iterator<Devermitization> devermIt  =  h.getDevermitizations().iterator();
					if( devermIt.hasNext()){
						Devermitization deverm = devermIt.next();
						if( null != deverm && null != deverm.getLastVermitizationDate()){
							lastVermDate = sdf.format(deverm.getLastVermitizationDate());
						}
						if( null != deverm && null != deverm.getNextVermitizationDate()){
							nextVermDate = sdf.format(deverm.getNextVermitizationDate());
						}
					}
				}
				item.add(new Label("nextVermDate", new Model<String>(nextVermDate)));
				item.add(new Label("lastVermDate", new Model<String>(lastVermDate)));
				item.add(editLink);

			}
		};

		page.add(dataView);
		page.add(new PagingNavigator("deworm_navigator", dataView));
		page.add(new OrderByBorder("deworm_orderbycode", "code", liveStockDataProvider));

	}

}
