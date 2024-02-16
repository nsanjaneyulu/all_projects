package com.dblue.farm.application;

import org.apache.wicket.Page;
import org.apache.wicket.Response;
import org.apache.wicket.authorization.UnauthorizedInstantiationException;
import org.apache.wicket.protocol.http.PageExpiredException;
import org.apache.wicket.protocol.http.WebApplication;
import org.apache.wicket.protocol.http.WebRequest;
import org.apache.wicket.protocol.http.WebRequestCycle;
import org.apache.wicket.request.RequestParameters;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;

import com.dblue.farm.application.pages.ConfigureDropdown;
import com.dblue.farm.application.pages.GlobalErrorPage;
import com.dblue.farm.application.pages.HomePage;
import com.dblue.farm.application.pages.LicenseExpiredPage;
import com.dblue.farm.application.pages.UnauthorizedAccessPage;
import com.esw.components.licensing.exception.LicensingException;


public class FarmRequestCycle extends WebRequestCycle {

	/**
	 * MyRequestCycle constructor
	 *
	 * @param application the web application
	 * @param request the web request
	 * @param response the web response
	 */
	public FarmRequestCycle(final WebApplication application, final WebRequest request, final Response response) {
		super(application, request, response);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public final Page onRuntimeException(final Page cause, final RuntimeException e) {
		//return super.onRuntimeException(cause, e);
		if(e instanceof DataIntegrityViolationException && ((DataIntegrityViolationException)e).getCause() instanceof ConstraintViolationException && cause instanceof ConfigureDropdown){
			getSession().info("Unable to process request as one or more deleted values are being used by the application");
			return new ConfigureDropdown();
		}
		
		if(e instanceof LicensingException){			
			return new LicenseExpiredPage();
		}
		
		if(e instanceof UnauthorizedInstantiationException){
			getSession().info("User doesnt have permissions to use this functionality");
			return new UnauthorizedAccessPage();
			
		}
		
		if(! (e instanceof PageExpiredException)){
			return new GlobalErrorPage(cause,e);
		}else{
			return super.onRuntimeException(cause, e);
		}
	}
}