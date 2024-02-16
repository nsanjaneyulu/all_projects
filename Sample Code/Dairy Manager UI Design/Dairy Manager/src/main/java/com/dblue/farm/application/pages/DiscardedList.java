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

public class DiscardedList extends FarmPage {

	private Integer year = new Date().getYear() + 1900;

	private WebMarkupContainer markupContainer;

	private WebMarkupContainer yearSelection;

	@Override
	protected void buildPageComponents() {

		this.markupContainer = new WebMarkupContainer("reportpanel");

		PropertyModel<List<Livestock>> model = new PropertyModel<List<Livestock>>(
				this, "allDiscarded");

		final ListView<Livestock> promotionHistoryListView = new ListView<Livestock>(
				"rows", model) {

			protected void populateItem(final ListItem listItem) {
				
				listItem.add(new Label("rfid",
						new PropertyModel<String>(listItem.getModel(),
								"rfid")));
				
				listItem.add(new Label("code",
						new PropertyModel<String>(listItem.getModel(),
								"code")));
				
				listItem.add(new Label("mothercode",
						new PropertyModel<String>(listItem.getModel(),
								"mothercode")));
				
				listItem.add(new Label("lsStateType",
						new PropertyModel<String>(listItem.getModel(),
								"StateType.stateType")));
				
				listItem.add(new Label("lsBreedType",
						new PropertyModel<String>(listItem.getModel(),
								"breedTypeByBreedTypeId.breedType")));
						
				listItem.add(new Label("sex",
						new PropertyModel<String>(listItem.getModel(),
								"sex")));
				
				listItem.add(new Label("originType",
						new PropertyModel<String>(listItem.getModel(),
								"OriginType.originType")));
				
				listItem.add(new Label("discardedDate",
						new PropertyModel<String>(listItem.getModel(),
								"deceasedDate")));
				
				listItem.add(new Label("remarks",
						new PropertyModel<String>(listItem.getModel(),
								"remarks")));				

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
						DiscardedList.this.year = (Integer) selectedYear
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

	public List<Livestock> getAllDiscarded() {
		Session session = sessionFactory.getCurrentSession();
		Criteria criteria = session.createCriteria(Livestock.class);	
		criteria.add(Restrictions.eq("farm",getLoginUserFarm()));
		criteria.add(Restrictions.sqlRestriction("YEAR(deceased_date)="+year));
		List<Livestock> discardedListList = objectLoader
				.findAll(Livestock.class,criteria);
		return discardedListList;
	}

}
