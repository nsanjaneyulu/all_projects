package com.dblue.farm.application.pages;

import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.panel.FeedbackPanel;

public class FarmPageExpiredErrorPage extends WebPage{

	public FarmPageExpiredErrorPage(){
		// add home page link
		getSession().error("Your session has expired due to inactivity, please re-login using the following link" );
		add(homePageLink("homePageLink"));
		add( new FeedbackPanel("feedback"));
	}
}
