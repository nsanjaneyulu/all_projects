package com.dblue.farm.application.pages;

import java.util.Calendar;
import java.util.UUID;

import org.apache.log4j.Logger;
import org.apache.wicket.Page;
import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.panel.FeedbackPanel;

public class GlobalErrorPage extends WebPage{
	
	private static final Logger logger = Logger.getLogger(GlobalErrorPage.class.getName());
	
	public GlobalErrorPage(Page casue, Exception e){
		// just add appropriate information
		// Generate a Guid
		String uuid = UUID.randomUUID().toString();
		String pageInfo = (null !=casue?casue.getClass().getName():"");
		String dateTime = Calendar.getInstance().getTime().toString();
		
		// 
		getSession().error("Application Error Occurred , please report the error to support. Incident Id:"+uuid);
		
		logger.error("Application Error Occurred , unique Identifier "+ uuid );
		logger.error(uuid + ": Application error is caused by page "+ pageInfo);
		logger.error(uuid + ": Application error is caused at "+ dateTime);
		logger.error(uuid + ": Detailed error as follows", e);
		
		add(new FeedbackPanel("feedback"));
		
	}
	
}