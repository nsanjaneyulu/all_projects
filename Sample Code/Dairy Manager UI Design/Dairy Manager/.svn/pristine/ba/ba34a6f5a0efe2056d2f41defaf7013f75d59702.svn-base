package com.dblue.farm.application.pages;

import org.apache.wicket.Session;
import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.form.Button;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.PasswordTextField;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.Model;

import com.dblue.farm.application.FarmSession;

public class LoginPage extends WebPage{
	
	private TextField<String> userName;
	private PasswordTextField password;
	private Button submitButton;

	public LoginPage() {
		super();
		buildPageComponents();
	}
	
	
	public void buildPageComponents(){
		add( new FeedbackPanel("feedback"));
		Form loginForm = new Form("loginform");
		
		userName = new TextField<String>("username", new Model<String>());
		userName.setRequired(true);
		password = new PasswordTextField("password", new Model<String>());
		password.setRequired(true);
		submitButton = new Button("submit"){

			@Override
			public void onSubmit() {
				FarmSession session = (FarmSession)Session.get();
				if(session.signIn(userName.getModelObject(), password.getModelObject())){
					setResponsePage(HomePage.class);
				}else{
					error("Invalid credentials");
				}
			}
			
		};
		
		loginForm.add(userName);
		loginForm.add(password);
		loginForm.add(submitButton);
		
		add(loginForm);
	}

	
	
	
}
 