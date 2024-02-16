package com.dblue.farm.application.pages.summary;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.model.Model;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.ProductionConfig;
import com.dblue.farm.application.pages.FarmPage;

public class MilkProductionSummary extends BaseSummary {

	public MilkProductionSummary(FarmPage page) {
		final Map<Integer, MilkProductionHolder> reportData = getAllProductions();
		Criterion criterion = Restrictions.eq("farm", getLoginUserFarm());
		final List<ProductionConfig> allProductionConfigs = objectLoader
				.findAll(ProductionConfig.class, criterion);

		final ListView<Integer> productionListView = new ListView<Integer>(
				"milk_rows", Arrays.asList(reportData.keySet().toArray(
						new Integer[0]))) {

			protected void populateItem(final ListItem<Integer> listItem) {

				Integer pId = listItem.getModelObject();
				final MilkProductionHolder productionHolder = reportData
						.get(pId);
				// get the data

				listItem.add(new Label("month", new Model(
						getDisplayMonth(productionHolder.month))));

				double totalValue = 0;

				for (Number number : productionHolder.slotValues.values()) {
					if(null!=number)
					totalValue += number.doubleValue();
				}

				ListView<ProductionConfig> slottedYields = new ListView<ProductionConfig>(
						"slotYield", allProductionConfigs) {

					@Override
					protected void populateItem(ListItem<ProductionConfig> item) {
						// TODO Auto-generated method stub
						String slotName = item.getModelObject()
								.getYeildSlotName();
						Number slotValue = productionHolder.slotValues
								.get(slotName);
						if (null == slotValue) {
							item.add(new Label("slotYield", new Model(0)));
						} else {
							item.add(new Label("slotYield",
									new Model(slotValue)));
						}
					}
				};
				listItem.add(new Label("yield", new Model(totalValue)));
				listItem.add(slottedYields);

			}
		};

		double ytdMilkYield = 0;

		for (MilkProductionHolder milkProductionHolder : reportData.values()) {
			for (Number number : milkProductionHolder.slotValues.values()) {
				if(null!=number)
				ytdMilkYield += number.doubleValue();
			}
		}

		page.add(productionListView);
		page.add(buildMilkProductionReportHeader());
		page.add(new Label("ytdYield", new Model(ytdMilkYield)));

	}

	private Map<Integer, MilkProductionHolder> getAllProductions() {

		Session session = sessionFactory.getCurrentSession();
		int year = Calendar.getInstance().get(Calendar.YEAR);
		Query query = session
				.createQuery("select  p.id, sum(p.yield),p.month,p.productionConfig from ProductionFarm p where p.farm=:farm and year(p.date)=:currentyear group by p.month,p.productionConfig order by p.month,p.productionConfig.order ");
		query.setInteger("farm", getLoginUserFarm().getId());
		query.setInteger("currentyear", year);

		List results = query.list();

		Map<Integer, MilkProductionHolder> reportData = new LinkedHashMap<Integer, MilkProductionHolder>();

		Iterator iterator = results.iterator();
		while (iterator.hasNext()) {
			Object[] obj = (Object[]) iterator.next();

			Integer month = (Integer) obj[2];

			MilkProductionHolder productionHolder = reportData.get(month);
			if (null == productionHolder) {
				productionHolder = new MilkProductionHolder();
				productionHolder.month = month+1;
			}
			String slotName = ((ProductionConfig) obj[3]).getYeildSlotName();
			productionHolder.slotValues.put(slotName, ((BigDecimal) obj[1]));
			reportData.put(month, productionHolder);
		}

		return reportData;
	}

	protected ListView<ProductionConfig> buildMilkProductionReportHeader() {

		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(ProductionConfig.class).add(Restrictions.eq("farm", getLoginUserFarm()))
				.addOrder(Order.asc("order"));
		List<ProductionConfig> productionConfigs = objectLoader.findAll(
				ProductionConfig.class, criteria);

		ListView<ProductionConfig> headerView = new ListView<ProductionConfig>(
				"milk_header", productionConfigs) {

			@Override
			protected void populateItem(ListItem<ProductionConfig> item) {
				// add items here
				item.add(new Label("milk_headr_id", new Model(item
						.getModelObject().getYeildSlotName())));

			}
		};
		return headerView;
	}

}

class MilkProductionHolder implements Serializable {

	Integer month;
	Map<String, Number> slotValues = new LinkedHashMap<String, Number>();

}
