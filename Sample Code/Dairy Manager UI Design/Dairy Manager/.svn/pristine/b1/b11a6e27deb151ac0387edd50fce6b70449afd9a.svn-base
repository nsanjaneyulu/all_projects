package com.dblue.farm.application.pages;

import java.awt.Color;
import java.awt.Font;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.apache.wicket.spring.injection.annot.SpringBean;
import org.hibernate.criterion.Restrictions;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.axis.CategoryAxis;
import org.jfree.chart.axis.CategoryLabelPositions;
import org.jfree.chart.labels.StandardPieSectionLabelGenerator;
import org.jfree.chart.plot.CategoryPlot;
import org.jfree.chart.plot.PiePlot;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.data.category.DefaultCategoryDataset;
import org.jfree.data.general.DefaultPieDataset;

import com.dblue.farm.StateType;
import com.dblue.farm.application.reports.JFreeChartImage;
import com.dblue.orm.QueryHelper;

public class ReportPage extends FarmPage{
	
	@SpringBean(name="queryHelper")
	private QueryHelper queryHelper;

	@Override
	protected void buildPageComponents() {
		// add a report for live stock seggregation
		add(createLiveStockPieChart());
		add(createMilProductionHistogram());
		
	}
	
	
	private JFreeChartImage createLiveStockPieChart(){
		// get all live stock types and corresponding counts.
		
		DefaultPieDataset d = new DefaultPieDataset();
		
		List<StateType> allStates = objectLoader.findAll(StateType.class);
		
		for( StateType state:allStates){			
			//count the live stock.
			Integer subTotal = objectLoader.countAll(StateType.class, Restrictions.eq("stateType", state.getStateType()));			
			d.setValue(state.getStateType(), subTotal);
		}
		
		JFreeChart chart = ChartFactory.createPieChart("Live Stock Status Chart", d,
                true,		// Show legend  
                true,		// Show tooltips
                false);
		
		// styles
		PiePlot plot = (PiePlot) chart.getPlot();
        plot.setLabelFont(new Font("SansSerif", Font.PLAIN, 12));
        plot.setNoDataMessage("No data available");
        plot.setCircular(false);
        plot.setLabelGap(0.02);
        plot.setLegendLabelGenerator(
        	    new StandardPieSectionLabelGenerator("{0} ({1}, {2})"));

        
		
		return new JFreeChartImage("statuspie", chart, 400, 400);
		
	}
	
	private JFreeChartImage createMilProductionHistogram(){
		
		// bad practice : move to dao
		String queryString = "select sum(p.yield),p.date from Production p group by p.date";
		Iterator it = queryHelper.runQuery(queryString);
		
		DefaultCategoryDataset dataset = new DefaultCategoryDataset();
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");		
		while (it.hasNext()) {
			Object[] row = (Object[]) it.next();
			BigDecimal yield = (BigDecimal)row[0];
			Date yieldDate = (Date)row[1];
			dataset.addValue(yield, "Milk Production", sdf.format(yieldDate));
		}		
		
		JFreeChart chart = ChartFactory.createLineChart(
                "Milk Production History",
                "Date",
                "Production",
                dataset,
                PlotOrientation.VERTICAL,
                false,
                false,
                false);
		

        CategoryPlot plot = (CategoryPlot) chart.getPlot();
        plot.setBackgroundPaint(Color.white);
        plot.setRangeGridlinePaint(Color.black);
        CategoryAxis xAxis = (CategoryAxis)plot.getDomainAxis();
        xAxis.setCategoryLabelPositions(CategoryLabelPositions.UP_90);
		
		return new JFreeChartImage("production", chart, 400, 400);
	}

}
