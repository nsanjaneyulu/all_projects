package com.dblue.farm.application.pages.summary;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;

import org.apache.wicket.Application;
import org.apache.wicket.injection.web.InjectorHolder;
import org.apache.wicket.spring.injection.annot.SpringBean;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;

import com.dblue.farm.Farm;
import com.dblue.farm.FarmConfiguration;
import com.dblue.farm.application.FarmApplication;
import com.dblue.farm.application.FarmConfigurationProvider;
import com.dblue.orm.ObjectLoader;

	
public class BaseSummary implements Serializable{
	protected SimpleDateFormat sdf = new SimpleDateFormat("dd-MMM-yyyy");
	
	@SpringBean(name="objectLoader")
	protected ObjectLoader objectLoader;
		
	@SpringBean(name="sessionFactory")
	protected SessionFactory sessionFactory;
	
	@SpringBean(name="farmConfigurationProvider")
	protected FarmConfigurationProvider farmConfigurationProvider;
	
	
	protected Integer countObjects(Class clazz){
		return (Integer)sessionFactory.getCurrentSession().createCriteria(clazz).setProjection(Projections.rowCount()).uniqueResult();
	}

	
	protected Calendar getYearEndDate() {
		Calendar endDate = Calendar.getInstance();
		endDate.set(Calendar.DAY_OF_YEAR, 365);
		endDate.set(Calendar.HOUR_OF_DAY,23);
		endDate.set(Calendar.MINUTE,59);
		endDate.set(Calendar.SECOND,59);
		return endDate;
	}

	protected Calendar getYearStartDate() {
		Calendar startDate = Calendar.getInstance();
		startDate.set(Calendar.DAY_OF_YEAR, 1);
		startDate.set(Calendar.HOUR_OF_DAY,0);
		startDate.set(Calendar.MINUTE,0);
		startDate.set(Calendar.SECOND,0);
		return startDate;
	}
	
	protected String getDisplayMonth(int month){
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.MONTH, (month > 0 ? (month-1):month));
		return calendar.getDisplayName(Calendar.MONTH, Calendar.SHORT, Locale.getDefault());
	}
	
	public Number getTotalExpense(){
		Query query = sessionFactory.getCurrentSession().createQuery("select sum(e.amount) from Expenses e where e.farm=:farm and e.saleDate >= :startDate and e.saleDate <= :endDate");
		Calendar startDate = getYearStartDate();
		Calendar endDate = getYearEndDate();
		query.setInteger("farm", getLoginUserFarm().getId());
		query.setDate("startDate", startDate.getTime());
		query.setDate("endDate", endDate.getTime());
		
		// get result		
		Number totalExpense = (Number)query.uniqueResult();
		if(null==totalExpense){
			totalExpense=0;
		}
		return totalExpense;
	}

	
	public List<Object[]> getPurchases(Calendar startDate, Calendar endDate) {
		Query individualPurchases = sessionFactory
				.getCurrentSession()
				.createQuery(
						"select month(e.saleDate), sum(e.amount) from Purchases e where e.farm=:farm and e.saleDate >= :startDate and e.saleDate <= :endDate group by month(e.saleDate)");
		individualPurchases.setInteger("farm", getLoginUserFarm().getId());
		individualPurchases.setDate("startDate", startDate.getTime());
		individualPurchases.setDate("endDate", endDate.getTime());

		List<Object[]> results = individualPurchases.list();
		return results;
	}
	
	public List<Object[]> getExpenses(Calendar startDate, Calendar endDate) {
		Query individualExpsne = sessionFactory.getCurrentSession()
				.createQuery("select month(e.saleDate), sum(e.amount) from Expenses e where e.farm=:farm and e.saleDate >= :startDate and e.saleDate <= :endDate group by month(e.saleDate)");
		individualExpsne.setInteger("farm", getLoginUserFarm().getId());
		individualExpsne.setDate("startDate", startDate.getTime());
		individualExpsne.setDate("endDate", endDate.getTime());
		
		List<Object[]> results = individualExpsne.list();
		return results;
	}

	
	public Number getTotalPurchases(){
		
		Query query = sessionFactory.getCurrentSession().createQuery("select sum(e.amount) from Purchases e where e.farm=:farm and e.saleDate >= :startDate and e.saleDate <= :endDate");
		Calendar startDate = getYearStartDate();
		Calendar endDate = getYearEndDate();
		query.setInteger("farm", getLoginUserFarm().getId());
		query.setDate("startDate", startDate.getTime());
		query.setDate("endDate", endDate.getTime());
		
		// get result
		Number totalExpense = (Number)query.uniqueResult();
		if(null==totalExpense){
			totalExpense=0;
		}
		return totalExpense;
	}

	
	public BaseSummary(){
		InjectorHolder.getInjector().inject(this);
	}
	
	protected Integer getPaginationSize(){
		FarmConfiguration farmConfiguration = farmConfigurationProvider.getFarmConfiguration();
		return farmConfiguration.getSummaryPagination();
	}
	
	protected Farm getLoginUserFarm() {
		Farm farm = farmConfigurationProvider.getLoginUserFarm();
		return farm;
	}
	
	protected FarmConfiguration getFarmConfiguration(){
		return farmConfigurationProvider.getFarmConfiguration();
	}
	
	
}
