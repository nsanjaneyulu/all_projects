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
import org.hibernate.Query;

import com.dblue.farm.Health;
import com.dblue.farm.Livestock;
import com.dblue.farm.Vaccination;
import com.dblue.farm.application.FarmApplication;
import com.dblue.farm.application.FarmSession;
import com.dblue.farm.application.pages.FarmPage;
import com.dblue.farm.application.pages.LiveStockNew;
import com.dblue.farm.application.pages.pagination.FarmObjectQueryBasedDataProvider;
import com.dblue.farm.application.pages.pagination.QuerySupport;

public class LiveStockDueVaccinationSummary extends BaseSummary {

	public LiveStockDueVaccinationSummary(FarmPage page) {
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
				String queryString = "select count(distinct l) from Livestock l, Health h, Vaccination v,VaccineType vt where l.farm="+getLoginUserFarm().getId()+ " and l.deceased='N' and l.health.id=h.id and h.id=v.health.id and v.vaccineType.id=vt.id and vt.intervalPeriod > 0 and v.id in (select max(sv.id) from Vaccination sv  where sv.farm="+getLoginUserFarm().getId()+ " group by sv.health,sv.vaccineType ) and v.nextVaccinationDate < ? order by v.nextVaccinationDate desc";
				Query query = sessionFactory.getCurrentSession().createQuery(
						queryString);				
				System.out.println("\n\nusing query parameter "+ getQueryParams());
				QuerySupport querySupport = new QuerySupport(queryString, Arrays.asList(new Object[]{getQueryParams()}));
				return querySupport;
			}

			@Override
			protected QuerySupport createDataQuery() {				
				String queryString = "select distinct l from Livestock l, Health h, Vaccination v,VaccineType vt where l.farm="+getLoginUserFarm().getId()+ " and l.deceased='N' and l.health.id=h.id and h.id=v.health.id and v.vaccineType.id=vt.id and vt.intervalPeriod > 0 and v.id in (select max(sv.id) from Vaccination sv  where sv.farm="+getLoginUserFarm().getId()+ " group by sv.health,sv.vaccineType ) and v.nextVaccinationDate < ? order by v.nextVaccinationDate desc";
				QuerySupport querySupport = new QuerySupport(queryString, Arrays.asList(new Object[]{getQueryParams()}));
				return querySupport;
			}
		};

		// get Pagination size
		Integer paginationSize = getPaginationSize();

		DataView<Livestock> dataView = new DataView<Livestock>(
				"vaccination_due_rows", liveStockDataProvider, paginationSize) {
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

				String nextVaccinationDate = "";
				String lastVaccinationDate = "";

				Livestock stock = (Livestock) item.getModelObject();
				Health h = stock.getHealth();
				if (null != h) {
					Iterator<Vaccination> vaccineIt = h.getVaccinations()
							.iterator();
					if (vaccineIt.hasNext()) {
						Vaccination vaccination = vaccineIt.next();
						if (null != vaccination
								&& null != vaccination.getNextVaccinationDate()) {
							nextVaccinationDate = sdf.format(vaccination
									.getNextVaccinationDate());
						}
						if (null != vaccination
								&& null != vaccination.getLastVaccinationDate()) {
							lastVaccinationDate = sdf.format(vaccination
									.getLastVaccinationDate());
						}
					}
				}
				item.add(new Label("lastVaccinationDate", new Model<String>(
						lastVaccinationDate)));				
				item.add(new Label("nextVaccinationDate", new Model<String>(
						nextVaccinationDate)));
				item.add(editLink);

			}
		};

		page.add(dataView);
		page.add(new PagingNavigator("vacci_navigator", dataView));
		page.add(new OrderByBorder("vaccine_orderbycode", "code", liveStockDataProvider));

	}

}
