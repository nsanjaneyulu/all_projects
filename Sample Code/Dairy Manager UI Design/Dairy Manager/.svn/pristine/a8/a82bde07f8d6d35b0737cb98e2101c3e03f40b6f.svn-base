package com.dblue.farm.application.pages;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.markup.html.AjaxLink;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.PropertyModel;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.Livestock;
import com.dblue.farm.PromotionHistory;

public class PromotionHistoryList extends FarmPage {

	private Integer year = new Date().getYear() + 1900;

	private WebMarkupContainer markupContainer;

	private WebMarkupContainer yearSelection;

	@Override
	protected void buildPageComponents() {

		this.markupContainer = new WebMarkupContainer("reportpanel");

		PropertyModel<List<PromotionHistory>> model = new PropertyModel<List<PromotionHistory>>(
				this, "allProductions");

		final ListView<PromotionHistory> promotionHistoryListView = new ListView<PromotionHistory>(
				"rows", model) {

			protected void populateItem(final ListItem listItem) {
				
				listItem.add(new Label("liveStockCode",
						new PropertyModel<String>(listItem.getModel(),
								"livestock.code")));

				listItem.add(new Label("oldState", new PropertyModel<String>(
						listItem.getModel(),
						"stateTypeByInitialStateType.stateType")));

				listItem.add(new Label("newState", new PropertyModel<String>(
						listItem.getModel(),
						"stateTypeByFinalStateType.stateType")));

				listItem.add(new Label("promotionDate",
						new PropertyModel<String>(listItem.getModel(),
								"promotionDate")));

				

			}
		};

		this.markupContainer.add(promotionHistoryListView);
		markupContainer.setOutputMarkupId(true);
		buildYearSelection();
		add(markupContainer);
		add(new FeedbackPanel("feedback"));

	}

	private void buildYearSelection() {
		yearSelection = new WebMarkupContainer("yearselection");

		Calendar calendar = Calendar.getInstance();
		List<Integer> allyears = new ArrayList<Integer>();
		for (int i = 0; i < 5; i++) {
			allyears.add(calendar.get(Calendar.YEAR));
			calendar.add(Calendar.YEAR, -1);
		}

		ListView<Integer> yearRenderer = new ListView<Integer>("yearrepeater",
				allyears) {

			@Override
			protected void populateItem(final ListItem<Integer> selectedYear) {
				AjaxLink link = new AjaxLink("year") {

					@Override
					public void onClick(AjaxRequestTarget target) {
						PromotionHistoryList.this.year = (Integer) selectedYear
								.getDefaultModelObject();
						if (null != target) {
							target.addComponent(markupContainer);
						}
					}
				};

				link.setOutputMarkupId(true);
				Label label = new Label("yerlabel",
						selectedYear.getDefaultModelObjectAsString());
				label.setOutputMarkupId(true);
				link.add(label);
				selectedYear.add(link);

			}
		};

		yearSelection.add(yearRenderer);
		add(yearSelection);

	}

	public List<PromotionHistory> getAllProductions() {
		Session session = sessionFactory.getCurrentSession();
		Criteria criteria = session.createCriteria(PromotionHistory.class);	
		criteria.add(Restrictions.eq("farm",getLoginUserFarm()));		
		criteria.add(Restrictions.sqlRestriction("YEAR(promotion_date)="+year));
		List<PromotionHistory> promotionHistoryList = objectLoader
				.findAll(PromotionHistory.class,criteria);
		return promotionHistoryList;
	}

}
