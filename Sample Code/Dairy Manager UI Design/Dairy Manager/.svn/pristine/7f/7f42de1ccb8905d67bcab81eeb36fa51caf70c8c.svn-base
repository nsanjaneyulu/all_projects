package com.dblue.farm.application;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.wicket.Application;
import org.apache.wicket.Request;
import org.apache.wicket.Session;
import org.apache.wicket.authentication.AuthenticatedWebSession;
import org.apache.wicket.authorization.strategies.role.Roles;
import org.apache.wicket.injection.web.InjectorHolder;
import org.apache.wicket.spring.injection.annot.SpringBean;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import com.dblue.farm.Farm;
import com.dblue.farm.FarmConfiguration;
import com.dblue.farm.application.dao.UserDAO;
import com.dblue.orm.ObjectLoader;

public class FarmSession extends AuthenticatedWebSession {

	@SpringBean(name = "authenticationManager")
	private AuthenticationManager authenticationManager;

	@SpringBean(name = "userDAO")
	private UserDAO userDAO;

	@SpringBean
	private ObjectLoader objectLoader;
	

	@SpringBean(name="farmConfigurationProvider")
	protected FarmConfigurationProvider farmConfigurationProvider;

	private Map<Object, Object> store = new HashMap<Object, Object>();

	public FarmSession(Request request) {
		super(request);
		injectDependencies();
		ensureDependenciesNotNull();
	}

	public static FarmSession getSpringWicketWebSession() {
		return (FarmSession) Session.get();
	}

	public void addToStore(Object key, Object value) {
		store.put(key, value);
	}

	public Object getStoreValue(Object key) {
		return store.get(key);
	}

	public void removeObjectFromStore(Object key) {
		synchronized (store) {
			store.remove(key);
		}
	}

	private void ensureDependenciesNotNull() {
		if (authenticationManager == null) {
			throw new IllegalStateException("Requires an authentication");
		}
	}

	private void injectDependencies() {
		InjectorHolder.getInjector().inject(this);
	}

	@Override
	public boolean authenticate(String username, String password) {
		boolean authenticated = false;
		try {
			Authentication authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(
							username, password));
			Long farmId = (Long) userDAO.getFarmDetails(username);
			FarmAuthentication farmAuthentication = new FarmAuthentication(
					authentication, farmId);
			SecurityContextHolder.getContext().setAuthentication(
					farmAuthentication);
			authenticated = authentication.isAuthenticated();
		} catch (AuthenticationException e) {
			System.err.println("User " + username
					+ " failed to login. Reason: ");
			authenticated = false;
		}
		return authenticated;
	}

	public void signout() {
		setAuthentication(null);
		invalidate();
	}

	private void setAuthentication(Authentication authentication) {
		SecurityContextHolder.getContext().setAuthentication(authentication);
	}

	public void setUserDAO(UserDAO userDAO) {
		this.userDAO = userDAO;
	}

	@Override
	public Roles getRoles() {
		Roles roles = new Roles();
		getRolesIfSignedIn(roles);
		return roles;
	}

	private void getRolesIfSignedIn(Roles roles) {
		if (isSignedIn()) {
			Authentication authentication = SecurityContextHolder.getContext()
					.getAuthentication();
			addRolesFromAuthentication(roles, authentication);
		}
	}

	private void addRolesFromAuthentication(Roles roles,
			Authentication authentication) {
		for (GrantedAuthority authority : authentication.getAuthorities()) {
			roles.add(authority.getAuthority());
		}
	}

	public Farm getFarm() {
		Farm farm = farmConfigurationProvider.getLoginUserFarm();
		return farm;
	}

	public FarmConfiguration getFarmConfiguration(Farm farm) {
		if( null == farm){
			return null;
		}
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

	public FarmConfiguration getFarmConfiguration() {
		Farm farm = getFarm();
		return getFarmConfiguration(farm);

	}
}
