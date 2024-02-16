package com.dblue.farm.application;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.apache.wicket.Application;
import org.apache.wicket.IConverterLocator;
import org.apache.wicket.Page;
import org.apache.wicket.Request;
import org.apache.wicket.RequestCycle;
import org.apache.wicket.Response;
import org.apache.wicket.authentication.AuthenticatedWebApplication;
import org.apache.wicket.authentication.AuthenticatedWebSession;
import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.protocol.http.WebRequest;
import org.apache.wicket.protocol.http.WebResponse;
import org.apache.wicket.spring.injection.annot.SpringComponentInjector;
import org.apache.wicket.util.convert.ConverterLocator;
import org.apache.wicket.util.convert.converters.DateConverter;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.security.core.context.SecurityContextHolder;

import com.dblue.farm.Farm;
import com.dblue.farm.FarmConfiguration;
import com.dblue.farm.application.pages.FarmPageExpiredErrorPage;
import com.dblue.farm.application.pages.LoginPage;
import com.dblue.farm.application.services.LicensingService;
import com.dblue.farm.exception.NotFoundException;
import com.dblue.orm.ObjectLoader;
import com.esw.components.licensing.exception.LicensingException;

public final class FarmApplication extends AuthenticatedWebApplication  implements ApplicationContextAware{

	boolean isInitialized = false;
	
	private ApplicationContext ctx;

    public void setApplicationContext(ApplicationContext applicationContext)
        throws BeansException {
        this.ctx = applicationContext;
    }


	/**
	 * Constructor
	 */
	public FarmApplication() {

	}

	/**
	 * Init the application
	 */
	@Override
	protected void init() {
		if (!isInitialized) {
			super.init();
			addComponentInstantiationListener(new SpringComponentInjector(this));
			getMarkupSettings().setStripWicketTags(true);
			initializeBookmarks();
			getApplicationSettings().setPageExpiredErrorPage(FarmPageExpiredErrorPage.class);
			getResourceSettings().setUseDefaultOnMissingResource(true);
		}
	}

	/**
	 * @see org.apache.wicket.Application#getHomePage()
	 */
	@Override
	public Class<? extends Page> getHomePage() {		
		return LoginPage.class;
	

	}

	/**
	 * Initializes the bookmarkable pages
	 */
	protected void initializeBookmarks() {
		this.mountBookmarkablePage("/farm", LoginPage.class);
	}

	/*
	 * @Override public Session newSession(Request request, Response response) {
	 * return new FarmSession(request); }
	 */

	@Override
	protected IConverterLocator newConverterLocator() {
		ConverterLocator converterLocator = new ConverterLocator();

		DateConverter dc = new DateConverter() {

			@Override
			public DateFormat getDateFormat(Locale ignore) {
				SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
				sdf.setLenient(false);
				return sdf;
			}

		};

		converterLocator.set(Date.class, dc);
		converterLocator.set(Calendar.class, dc);
		converterLocator.set(java.sql.Date.class, dc);
		converterLocator.set(java.sql.Time.class, dc);
		converterLocator.set(java.sql.Timestamp.class, dc);

		return converterLocator;

	}

	@Override
	public RequestCycle newRequestCycle(Request request, Response response) {
		// TODO Auto-generated method stub
		return new FarmRequestCycle(this, (WebRequest) request,
				(WebResponse) response);
		// return super.newRequestCycle(request, response);
	}

	@Override
	protected Class<? extends AuthenticatedWebSession> getWebSessionClass() {
		return FarmSession.class;
	}

	@Override
	protected Class<? extends WebPage> getSignInPageClass() {
		return LoginPage.class;
	}
	
	public boolean hasValidLicense(){
		LicensingService licensingService = (LicensingService)ctx.getBean("licensingService");
		return licensingService.hasValidLicense();
	}
	
	private Farm getLoginUserFarm(){
		FarmAuthentication farmAuthentication = (FarmAuthentication)SecurityContextHolder.getContext().getAuthentication();
		if( null == farmAuthentication){
			return null;
		}
		int farmId = ((Long)farmAuthentication.getFarmid()).intValue();
		ObjectLoader objectLoader = (ObjectLoader)ctx.getBean("objectLoader");
		Farm farm=null;
		try {
			farm = objectLoader.load(Farm.class, farmId);
		} catch (NotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return farm;
	}
	
	
	private Farm getFarm() {
		Farm farm = ((FarmApplication) Application.get()).getLoginUserFarm();
		return farm;
	}

	private FarmConfiguration getFarmConfiguration(Farm farm) {
		if( null == farm ){
			return null;
		}
		ObjectLoader objectLoader = (ObjectLoader)ctx.getBean("objectLoader");
		Criterion condition = Restrictions.eq("farm", farm);
		FarmConfiguration farmConfiguration = null;
		List<FarmConfiguration> allConfigurations = objectLoader.findAll(
				FarmConfiguration.class, condition);
		farmConfiguration = (allConfigurations.size() > 0 ? allConfigurations
				.get(0) : null);

		if (null == farmConfiguration) {
			farmConfiguration = new FarmConfiguration();
			farmConfiguration.setFarm(farm);
		}
		return farmConfiguration;
	}

	private FarmConfiguration getFarmConfiguration() {
		Farm farm = getFarm();
		return getFarmConfiguration(farm);

	}
	
}
