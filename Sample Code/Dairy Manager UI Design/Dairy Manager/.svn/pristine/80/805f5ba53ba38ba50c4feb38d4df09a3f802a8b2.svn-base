package com.dblue.farm.application.pages;

import org.apache.wicket.markup.html.CSSPackageResource;
import org.apache.wicket.markup.html.JavascriptPackageResource;
import org.apache.wicket.markup.html.WebPage;

import com.dblue.farm.application.FarmSession;

public abstract class BasePage extends WebPage implements FarmComponentBuilder{
	
	protected FarmSession session;
	
	public BasePage(){
		super();
		this.session = (FarmSession)getSession();
		addCommonJavascripts();
		applyStyles();
	}
	
	public FarmSession getFarmSession(){
		return session;
	}
	
	public void addCommonJavascripts() {
        add(JavascriptPackageResource.getHeaderContribution("js/datetimepicker.js"));
        add(JavascriptPackageResource.getHeaderContribution("js/jquery-1.2.6.min.js"));
  }

  public void applyStyles() {
        add(CSSPackageResource.getHeaderContribution("styles/style.css"));        
  }

}
