package com.dblue.farm.application.pages;

import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.markup.html.form.AjaxButton;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.form.CheckBox;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.Model;

public class TestPage extends WebPage{
	
	
	public TestPage(){
	
		Form form = new Form("testform");
		
		final WebMarkupContainer container = new WebMarkupContainer("container");
		container.setOutputMarkupId(true);
		final FeedbackPanel errorPanel = new FeedbackPanel("feedback");
		errorPanel.setOutputMarkupId(true);
		
		final TextField<String> username = new TextField<String>( "username", new Model<String>());
		final CheckBox cBox = new CheckBox("check");
		form.add(cBox);
		username.setRequired(true);
		
		Label label = new Label("userlabel","username");		
		form.add(username);
		form.add(label);
/*		form.add( new Button("submit"){
			
			@Override
			public void onSubmit() {			
				System.out.println("Submitting application");
			}

		});
*/		//form.add( container);
		
		AjaxButton submitButton = new AjaxButton("submit"){
			@Override
			protected void onSubmit(AjaxRequestTarget target, Form<?> form) {
				System.out.println("Submitting application");
				System.out.println("User name "+username.getDefaultModelObjectAsString());
				String rawValue = username.getValue();
				System.out.println("User name raw value"+rawValue);
				
				System.out.println("Check box value ="+ cBox.getValue());
				
				target.addComponent(container);
				
			}

			@Override
			protected void onError(AjaxRequestTarget target, Form<?> form) {
				// TODO Auto-generated method stub
				super.onError(target, form);
				target.addComponent(errorPanel);
			}
			
			
			
		};
		submitButton.setDefaultFormProcessing(false);
		
		form.add( submitButton);
		
		//this.add(form);
		container.add(form);
		
		
		container.add( errorPanel);
		this.add(container);
		
	}
	

}
