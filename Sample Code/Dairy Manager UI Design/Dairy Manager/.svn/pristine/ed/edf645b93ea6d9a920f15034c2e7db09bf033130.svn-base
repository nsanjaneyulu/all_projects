package com.dblue.farm.tasks;

import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.SchedulerContext;
import org.quartz.SchedulerException;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.GrantedAuthorityImpl;
import org.springframework.security.core.context.SecurityContextHolder;

import com.dblue.farm.application.FarmAuthentication;

public class PromoteCalfToHeaferJob extends QuartzJobBean {
	
	
	private GrantedAuthority[] getAuthorities(){
		GrantedAuthority[] auths = new GrantedAuthority[2];
		auths[0] = new GrantedAuthorityImpl("ROLE_ADMIN");
		auths[1] = new GrantedAuthorityImpl("ROLE_USER");
		return auths;
	}
	
	@Override
	protected void executeInternal(JobExecutionContext context)
			throws JobExecutionException {
		// set authentication
		
		try{
			SchedulerContext schedContext = context.getScheduler().getContext();
			JobDataMap dataMap = context.getMergedJobDataMap();
			String farmIdString = (String)dataMap.get("FARM_ID");
			Long farmId = Long.valueOf(farmIdString);
			Authentication authentication = new UsernamePasswordAuthenticationToken("scheduler", null, getAuthorities());
			FarmAuthentication farmAuthentication = new FarmAuthentication(
					authentication, farmId);
			SecurityContextHolder.getContext().setAuthentication(farmAuthentication);
			executeAsAuthenticated(context);
		}catch(JobExecutionException jex){
			throw jex;
		}catch(Exception ex){
			throw new JobExecutionException(ex);
		}finally{
			SecurityContextHolder.getContext().setAuthentication(null);
		}
	}
	
	protected void executeAsAuthenticated(JobExecutionContext context)throws JobExecutionException {
		try {			
			SchedulerContext schedContext = context.getScheduler().getContext();
			JobDataMap dataMap = context.getJobDetail().getJobDataMap();
			LiveStockPromotionStock liveStockPromotionStock = (LiveStockPromotionStock) schedContext
					.get("liveStockPromotionStockProxy");
			liveStockPromotionStock.promoteCalfToHeafer();

		} catch (SchedulerException e) {
			throw new JobExecutionException(e);
		}
	}

}
