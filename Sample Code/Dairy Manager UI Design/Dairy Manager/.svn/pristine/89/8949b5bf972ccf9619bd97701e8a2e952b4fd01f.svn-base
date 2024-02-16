package com.dblue.farm.application;

import java.io.Serializable;
import java.util.Collection;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

public class FarmAuthentication implements Authentication{
	
	private Authentication authentication;
	
	private Serializable farmid;
	
	public FarmAuthentication(Authentication authentication, Serializable farmId){
		this.authentication=authentication;
		this.farmid = farmId;
	}

	public String getName() {
		return authentication.getName();
	}

	public Collection<GrantedAuthority> getAuthorities() {
		return authentication.getAuthorities();
	}

	public Object getCredentials() {
		return authentication.getCredentials();
	}

	public Object getDetails() {
		return authentication.getDetails();
	}

	public Object getPrincipal() {
		return authentication.getPrincipal();
	}

	public boolean isAuthenticated() {
		return authentication.isAuthenticated();
	}

	public void setAuthenticated(boolean isAuthenticated)
			throws IllegalArgumentException {
		authentication.setAuthenticated(isAuthenticated);
	}

	public Serializable getFarmid() {
		return farmid;
	}
	
	

}
