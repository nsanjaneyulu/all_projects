package com.dblue.farm.application.pages;

import java.math.BigDecimal;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.model.Model;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import com.dblue.farm.Ingredient;
import com.dblue.farm.IngredientOptions;

public class IngredientFormulaCost extends FarmPage {

	@Override
	protected void buildPageComponents() {
		// get all unique formulas
		final List<String> uniqueFormulas = getAllFormulas();
		final ListView<String> uniqueFormulasView = new ListView<String>(
				"rows", uniqueFormulas) {
			protected void populateItem(final ListItem<String> listItem) {

				String formulaName = listItem.getModelObject();

				listItem.add(new Label("formulaName", new Model<String>(formulaName)));
				double formulaCost = 0;
				// get all ingredients associated with formula

				List<IngredientOptions> allIngredientOptions = getIngredientOptions(formulaName);
				for (IngredientOptions ingredientOption : allIngredientOptions) {
					
					Set ingredientTypes = ingredientOption.getIngredientType().getIngredients();
					Iterator<Ingredient> ingredientIterator = ingredientTypes.iterator();
					while(ingredientIterator.hasNext()){
						Ingredient ingredient = ingredientIterator.next();
						BigDecimal ingredientQuantity = new BigDecimal(1);
						if(null!=ingredientOption.getValue()){
							ingredientQuantity =ingredientOption.getValue();
						}
						BigDecimal ingredientCost = new BigDecimal(1);
						if(null!=ingredient.getRate()){
							ingredientCost = ingredient.getRate();
						}					
						formulaCost = formulaCost
								+ (ingredientQuantity.doubleValue() * ingredientCost
										.doubleValue());
					}
					
//					Ingredient ingredient = (Ingredient) ingredientOption
//							.getIngredientType().getIngredients().iterator()
//							.next();
				}
				listItem.add(new Label("formulaCost", new Model<Double>(formulaCost)));
			}

		};
		add(uniqueFormulasView);

	}

	private List<String> getAllFormulas() {
		Query query = sessionFactory.getCurrentSession().createQuery(
				"select distinct iop.label from IngredientOptions iop where iop.farm ="+getLoginUserFarm().getId());
		List<String> labels = query.list();
		return labels;
	}

	protected List<IngredientOptions> getIngredientOptions(String formula) {
		Session session = sessionFactory.getCurrentSession();
		Criteria criteria = session.createCriteria(IngredientOptions.class);
		criteria.add(Restrictions.eq("farm",getLoginUserFarm()));		
		criteria.add( Restrictions.eq("label", formula));
		return objectLoader.findAll(IngredientOptions.class, criteria);
	}

}
