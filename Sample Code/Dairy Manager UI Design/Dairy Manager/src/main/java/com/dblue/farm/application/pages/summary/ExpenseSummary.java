package com.dblue.farm.application.pages.summary;

import java.util.List;

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.model.Model;

import com.dblue.farm.application.pages.FarmPage;

public class ExpenseSummary extends BaseSummary{
	
	public ExpenseSummary(FarmPage page){
		page.add( new Label("expense_count", new Model<Number>(getTotalExpense())));		
		// get the group items.		
		List<Object[]> results = getExpenses(getYearStartDate(), getYearEndDate());
		
		ListView<Object[]> expenseListView = new ListView<Object[]>("expense_rows", results) {

			@Override
			protected void populateItem(ListItem<Object[]> item) {
				Object[] resultElements= item.getModelObject();
				item.add(new Label("state", new Model<String>(getDisplayMonth((Integer)resultElements[0]))));
				item.add(new Label("count", new Model<Number>((Number)resultElements[1])));
				
			}
		};
		
		page.add( expenseListView);
	}

}
