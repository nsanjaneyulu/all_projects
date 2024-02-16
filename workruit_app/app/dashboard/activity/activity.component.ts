import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Columns } from '../../helper/columns';
import { Tabsdata } from '../../helper/tabsdata';
import { endpoints, baseUrl } from '../../../environments/environment';
import { authDataInfo } from '../../../environments/textual-changes';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  authDataInfo = authDataInfo;
  activityTabs: Array<any> = authDataInfo.tabs.activity;
  // tableColumns: Array<Columns> = authDataInfo.tableColumns.intrestedProfile;
  activeTab = {
    name: 'Intrested',
    active: true,
    link: '/applicantsInterestedProfile',
    isCount: true
  }
  tableColumns: Array<any> = [
    {
      isImg: true,
    },
    {
      header: 'Name',
      headrekey: 'firstname',
      isLink: true,
      isLinkActions:{
        link:'/applicantsInterestedProfile'
      }
    },
    {
      header: 'Job',
      headrekey: 'title',
      isLink: true,
      isLinkActions:{
        link:'/editpost'
      }
    },
    {
      header: 'Date',
      headrekey: 'candidateJobActionDate'
    }
  ];
  matchedColumns: Array<Columns> = [
    {
      header: 'Name',
      headrekey: 'firstname',
      isLink: true,
      isLinkActions:{
        link:'/matched'
      }
    },
    {
      header: 'Job',
      headrekey: 'title',
      isLink: true,
      isLinkActions:{
        link:'/editpost'
      }
    },
    {
      header: 'Date',
      headrekey: 'conversationMatchDate',
    },
    {
      header: 'Messages',
      headrekey: 'conversationMatchMessage',
      isLink: true,
      isLinkActions:{
        title:'Send Messages',
        link:'/editpost'
      }
    }, {
      header: 'Interview',
      headrekey: 'conversationMatchInterview',
      isLink: true,
      isLinkActions:{
        title:'Schedule Interview',
        link:'/postjob'
      }
    }
  ];
  savedColumns: Array<Columns> = [
    {
      header: 'Name',
      headrekey: 'firstname',
      isLink: true,
      isLinkActions:{
        link:'/savedstatus'
      }
    },
    {
      header: 'Jobs',
      headrekey: 'title',
      isLink: true,
      isLinkActions:{
        link:'/editpost'
      }
    },
    {
      header: 'Expired in',
      headrekey: 'expireDays'
    },
    {
      header: 'Date',
      headrekey: 'candidateJobActionDate'
    }
  ];
  public tableData = [];
  public matchedDataGet = [];
  public savedDataGet = [];
  public intrestedData: any;
  public matchedData: any;
  public savedData: any;
  public userId: any;
  constructor(private httpService: HttpService, ) {
    this.userId = localStorage.getItem('userId');
  }
  ngOnInit(): void {
    console.log("activityTabs",this.activityTabs);
    this.intrestedProfile();
    this.matchedProfile();
    this.savedProfile();
    
  }
  ngDoCheck():  void {
    this.countProfile();
  }
  tabClick(eve: any) {
    this.activityTabs.map(item => {
      if (item.name === eve.name) {
        item.active = true;
        this.activeTab = item;
      }
      else {
        item.active = false;
      }
      return item;
    })
    
  }
  intrestedProfileLength: any;
  matchedProfileLength: any;
  savedProfileLength: any;
  intrestedProfile() {
    const jobPostId = 8196108;
    const getCompanyProfileUrl = baseUrl + endpoints.get.user + this.userId + endpoints.get.recruiterInterestedProfiles;
    this.httpService.doGet(getCompanyProfileUrl).subscribe((result: any) => {
      this.intrestedData = [];
      this.intrestedProfileLength = result.data.length;
      console.log("this.intrestedProfileLength", this.intrestedProfileLength);
      const userInfo = `<h2>test</h2>`;
      result.data.map((e: any, i: any) => {
        this.intrestedData.push({
          firstname: e.userId.firstname,
          userJobTitle: e.userId.userJobTitle,
          jobFunctions: e.userId.jobFunctions,
          location: e.userId.location,
          totalExperienceText: e.userId.totalExperienceText,
          minSalaryExp: e.userId.minSalaryExp,
          maxSalaryExp: e.userId.maxSalaryExp,
          coverLetter: e.userId.coverLetter,
          userExperienceSet: e.userId.userExperienceSet,
          userEducationSet: e.userId.userEducationSet,
          userAcademic: e.userId.userAcademic,
          userSkillsSet: e.userId.userSkillsSet,
          title: e.jobPostId.title,
          candidateJobActionDate: e.jobPostId.candidateJobActionDate,
          description: e.jobPostId.description,
          degree: e.jobPostId.degree,
          experienceMax: e.jobPostId.experienceMax,
          experienceMin: e.jobPostId.experienceMin,
          jobFunction: e.jobPostId.jobFunction,
          jobType: e.jobPostId.jobType,
          noticePeriod: e.jobPostId.noticePeriod,
          salaryMax: e.jobPostId.salaryMax,
          salaryMin: e.jobPostId.salaryMin,
          joining_info_title: e.jobPostId.joining_info_title,
          skills: e.jobPostId.skills
        })
      });
      this.tableData = this.intrestedData;
    }, (err: any) => {
      console.log(err);
    });
  }
  matchedProfile() {
    const jobPostId = 8196108;
    const getCompanyProfileUrl = baseUrl + endpoints.get.user + this.userId + endpoints.get.recruiterApplicantMatches;
    this.httpService.doGet(getCompanyProfileUrl).subscribe((result: any) => {
      console.log("result",result.data);
      this.matchedData = [];
      this.matchedProfileLength = result.data.length;
      result.data.map((e: any, i: any) => {
        this.matchedData.push({
          firstname: e.userId.firstname,
          userJobTitle: e.userId.userJobTitle,
          jobFunctions: e.userId.jobFunctions,
          location: e.userId.location,
          totalExperienceText: e.userId.totalExperienceText,
          minSalaryExp: e.userId.minSalaryExp,
          maxSalaryExp: e.userId.maxSalaryExp,
          coverLetter: e.userId.coverLetter,
          userExperienceSet: e.userId.userExperienceSet,
          userEducationSet: e.userId.userEducationSet,
          userAcademic: e.userId.userAcademic,
          userSkillsSet: e.userId.userSkillsSet,
          title: e.jobPostId.title,
          conversationMatchDate: e.jobPostId.conversationMatchDate,
          description: e.jobPostId.description,
          degree: e.jobPostId.degree,
          experienceMax: e.jobPostId.experienceMax,
          experienceMin: e.jobPostId.experienceMin,
          jobFunction: e.jobPostId.jobFunction,
          jobType: e.jobPostId.jobType,
          noticePeriod: e.jobPostId.noticePeriod,
          salaryMax: e.jobPostId.salaryMax,
          salaryMin: e.jobPostId.salaryMin,
          joining_info_title: e.jobPostId.joining_info_title,
          skills: e.jobPostId.skills
        })
      });
      this.matchedDataGet = this.matchedData;
      console.log("this.matchedDataGet",this.matchedDataGet);
    }, (err: any) => {
      console.log(err);
    });
  }
  savedProfile() {
    const jobPostId = 8196108;
    const getCompanyProfileUrl = baseUrl + endpoints.get.user + this.userId + endpoints.get.recruiterSavedProfiles;
    this.httpService.doGet(getCompanyProfileUrl).subscribe((result: any) => {
      this.savedData = [];
      this.savedProfileLength = result.data.length;     
      result.data.map((e: any, i: any) => {
        let expireDays = "";
        if(e.jobPostId.expireDays !== 0 && e.jobPostId.expireDays !== 1)
        {
          expireDays = e.jobPostId.expireDays + " Days ";
        }
        else if (e.jobPostId.expireDays === 1) {
          expireDays = e.jobPostId.expireDays + " Day ";
        }
        else if (e.jobPostId.expireDays !== 0 && e.jobPostId.expireDays !== 1) {
          expireDays =  " Today ";
        }
        else {

        }
        this.savedData.push({
          firstname: e.userId.firstname,
          userJobTitle: e.userId.userJobTitle,
          jobFunctions: e.userId.jobFunctions,
          location: e.userId.location,
          totalExperienceText: e.userId.totalExperienceText,
          minSalaryExp: e.userId.minSalaryExp,
          maxSalaryExp: e.userId.maxSalaryExp,
          coverLetter: e.userId.coverLetter,
          userExperienceSet: e.userId.userExperienceSet,
          userEducationSet: e.userId.userEducationSet,
          userAcademic: e.userId.userAcademic,
          userSkillsSet: e.userId.userSkillsSet,
          title: e.jobPostId.title,
          candidateJobActionDate: e.jobPostId.candidateJobActionDate,
          description: e.jobPostId.description,
          degree: e.jobPostId.degree,
          experienceMax: e.jobPostId.experienceMax,
          experienceMin: e.jobPostId.experienceMin,
          jobFunction: e.jobPostId.jobFunction,
          jobType: e.jobPostId.jobType,
          noticePeriod: e.jobPostId.noticePeriod,
          salaryMax: e.jobPostId.salaryMax,
          salaryMin: e.jobPostId.salaryMin,
          joining_info_title: e.jobPostId.joining_info_title,
          skills: e.jobPostId.skills,
          expireDays: expireDays
        })
      });
      this.savedDataGet = this.savedData;
      
    }, (err: any) => {
      console.log(err);
    });
  }
  countProfile() {
  this.activityTabs.map((e: any, i: any) => {
    if (e.name == "Intrested"){
      e.count = this.intrestedProfileLength;
    }
    if (e.name == "Saved"){
      e.count = this.matchedProfileLength;
    }
    if (e.name == "Matched"){
      e.count = this.savedProfileLength;
    }
  });
  }
}
