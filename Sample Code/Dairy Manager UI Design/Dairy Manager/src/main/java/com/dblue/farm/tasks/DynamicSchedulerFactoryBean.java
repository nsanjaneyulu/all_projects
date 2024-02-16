package com.dblue.farm.tasks;

import java.util.List;

import org.quartz.CronTrigger;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;

import com.dblue.farm.Farm;
import com.dblue.orm.ObjectLoader;

public class DynamicSchedulerFactoryBean implements ApplicationContextAware,InitializingBean {

	private ObjectLoader objectLoader;

	private ApplicationContext context;

	private Scheduler scheduler;

	// inject object loader for dynamic farm loading
	public void setObjectLoader(ObjectLoader objectLoader) {
		this.objectLoader = objectLoader;
	}

	public void setScheduler(Scheduler scheduler) {
		this.scheduler = scheduler;
	}

	public void setApplicationContext(ApplicationContext applicationContext) {
		// TODO Auto-generated method stub
		// super.setApplicationContext(applicationContext);
		this.context = applicationContext;
	}

	public void afterPropertiesSet() throws Exception {
		// let the default configuration take place
		// super.afterPropertiesSet();

		List<Farm> allFarms = objectLoader.findAll(Farm.class);
		
		removeAllJobsAndTriggers(scheduler);
		
		
		JobDetail promoteCalfToHeaferJobDetails = (JobDetail)context.getBean("promoteCalfToHeaferJob");
		JobDetail promoteheiferToHerdJobDetails = (JobDetail)context.getBean("promoteHeaferToHerdJob");
		
		scheduler.addJob(promoteCalfToHeaferJobDetails, true);
		scheduler.addJob(promoteheiferToHerdJobDetails, true);
				
		for (Farm farm : allFarms) {
			// add new triggers			
			
			CronTrigger calfToHeiferTrigger = (CronTrigger) context
					.getBean("promoteCalfToHeaferTrigger");
			calfToHeiferTrigger.setName(farm.getName() + "CALFTOHEIFER");
			//calfToHeiferTrigger.setGroup(farm.getName() + "CALFTOHEIFER");			
			calfToHeiferTrigger.getJobDataMap().put("FARM_ID",
					farm.getId().toString());

			//scheduler.scheduleJob(promoteCalfToHeaferJobDetails,calfToHeiferTrigger);
			scheduler.scheduleJob(calfToHeiferTrigger);
			
			
			CronTrigger heiferToHerdTrigger = (CronTrigger) context
					.getBean("promoteHeaferToHerdTrigger");
			heiferToHerdTrigger.setName(farm.getName() + "HEIFERTOHERD");
			//heiferToHerdTrigger.setGroup(farm.getName() + "HEIFERTOHERD");
			//promoteheiferToHerdJobDetails.setGroup(farm.getName() + "HEIFERTOHERD");
			heiferToHerdTrigger.getJobDataMap().put("FARM_ID",
					farm.getId().toString());
			//scheduler.scheduleJob(promoteheiferToHerdJobDetails,heiferToHerdTrigger);
			scheduler.scheduleJob(heiferToHerdTrigger);
		}
		if(!scheduler.isStarted()){
			scheduler.start();
		}
	}
	
	private void removeAllJobsAndTriggers(Scheduler scheduler)
			throws SchedulerException {

		String[] jobGroups;
		String[] jobs;

		jobGroups = scheduler.getJobGroupNames();
		for (int i = 0; i < jobGroups.length; i++) {
			jobs = scheduler.getJobNames(jobGroups[i]);
			for (int j = 0; j < jobs.length; j++) {				
				scheduler.deleteJob(jobs[j], jobGroups[i]);
			}
		}

	}

	
	private void removeAllTriggers(Scheduler scheduler)
			throws SchedulerException {

		String[] triggerGroups;
		String[] triggers;

		triggerGroups = scheduler.getTriggerGroupNames();
		for (int i = 0; i < triggerGroups.length; i++) {
			triggers = scheduler.getTriggerNames(triggerGroups[i]);
			for (int j = 0; j < triggers.length; j++) {
				Trigger tg = scheduler
						.getTrigger(triggers[j], triggerGroups[i]);
				scheduler.unscheduleJob(tg.getName(), tg.getGroup());
			}
		}

	}

}
