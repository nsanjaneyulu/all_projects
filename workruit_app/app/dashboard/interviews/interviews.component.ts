import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Columns } from '../../helper/columns';
import { Tabsdata } from '../../helper/tabsdata';
import { endpoints, baseUrl } from '../../../environments/environment';
import { authDataInfo } from '../../../environments/textual-changes';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.css']
})
export class InterviewsComponent implements OnInit {
  authDataInfo = authDataInfo;
  interviewsTabs: Array<any> = authDataInfo.tabs.interviews;
  // tableColumns: Array<Columns> = authDataInfo.tableColumns.intrestedProfile;
  activeTab = {
      name: 'Scheduled',
      active: true,
      link: '/applicantsInterestedProfile',
    }
    tableColumns: Array<any> = [
    // {
    //   header: '',
    //   headerkey: 'userimg'
    // },
    {
      header: 'Name',
      headrekey: 'firstname',
      isLink: true,
    },
    {
      header: 'Email',
      headrekey: 'email'
    },
    {
      header: 'Job',
      headrekey: 'title'
    },
    {
      header: 'When',
      headrekey: 'recruiterActionDate'
    },
    {
      header: 'Status',
      headrekey: 'status'
    }
  ];
  hiredColumns: Array<any> = [
    // {
    //   header: '',
    //   headerkey: 'userimg'
    // },
    {
      header: 'Name',
      headrekey: 'firstname',
      isLink: true,
    },
    {
      header: 'Email',
      headrekey: 'email'
    },
    {
      header: 'Job',
      headrekey: 'title'
    },
    {
      header: 'Date',
      headrekey: 'recruiterActionDate'
    }
  ];
  rejectedColumns: Array<any> = [
    // {
    //   header: '',
    //   headerkey: 'userimg'
    // },
    {
      header: 'Name',
      headrekey: 'firstname',
      isLink: true,
    },
    {
      header: 'Email',
      headrekey: 'email'
    },
    {
      header: 'Job',
      headrekey: 'title'
    },
    {
      header: 'Date',
      headrekey: 'recruiterActionDate'
    }
  ];
  public tableData = [];
  public scheduledObjGet = [];
  public hiredObjGet = [];
  public rejectedbjGet = [];
  public matchedData: any;
  public userId: any;
  public scheduledObj: any;
  public hiredObj: any;
  public rejectedObj: any;
  constructor(private httpService: HttpService) { 
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.matchedProfile();
  }
  tabClick(eve: any) {
    this.interviewsTabs.map(item => {
      if(item.name === eve.name) {
        item.active = true;
        this.activeTab = item;
      }
      else {
        item.active = false;
      }
      return item;
    })
    console.log("tab", this.activeTab);
  }
  
  matchedProfile() {
    const jobPostId = 8196108;
    const getCompanyProfileUrl = baseUrl + endpoints.get.user + this.userId + endpoints.get.getRecInterviewsList;
    this.httpService.doGet(getCompanyProfileUrl).subscribe((result: any) => {
      console.log("response",result.data);
      this.scheduledObj = [];
      this.hiredObj = [];
      this.rejectedObj = [];
      let status : string;
      result.data.map((e: any, i: any) => {
        let candidateStatus = "";
        if (e.recruiter_status == 0) {
          if (e.candidate_status === 0) {
            candidateStatus = "Pending";
          }  
          else if (e.candidate_status === 1) {
            candidateStatus = "Confirmed";
          } 
          else if (e.candidate_status === 2) {
            candidateStatus = "Declined";
          } 
          else {

          }      
          this.scheduledObj.push({
            firstname: e.user.firstname,
            userJobTitle: e.user.userJobTitle,
            jobFunctions: e.user.jobFunctions,
            location: e.user.location,
            totalExperienceText: e.user.totalExperienceText,
            minSalaryExp: e.user.minSalaryExp,
            maxSalaryExp: e.user.maxSalaryExp,
            coverLetter: e.user.coverLetter,
            userExperienceSet: e.user.userExperienceSet,
            userEducationSet: e.user.userEducationSet,
            userAcademic: e.user.userAcademic,
            userSkillsSet: e.user.userSkillsSet,
            title: e.jobInfo.title,
            candidateJobActionDate: e.jobInfo.candidateJobActionDate,
            email: e.user.email,
            recruiterActionDate: e.recruiterActionDate,
            status: candidateStatus
          })    
        } else if (e.recruiter_status == 1) {
          
          this.hiredObj.push({
            firstname: e.user.firstname,
            userJobTitle: e.user.userJobTitle,
            jobFunctions: e.user.jobFunctions,
            location: e.user.location,
            totalExperienceText: e.user.totalExperienceText,
            minSalaryExp: e.user.minSalaryExp,
            maxSalaryExp: e.user.maxSalaryExp,
            coverLetter: e.user.coverLetter,
            userExperienceSet: e.user.userExperienceSet,
            userEducationSet: e.user.userEducationSet,
            userAcademic: e.user.userAcademic,
            userSkillsSet: e.user.userSkillsSet,
            title: e.jobInfo.title,
            candidateJobActionDate: e.jobInfo.candidateJobActionDate,
            email: e.user.email,
            recruiterActionDate: e.recruiterActionDate
          })  
        } else if (e.recruiter_status == 2) {
          
          this.rejectedObj.push({
            firstname: e.user.firstname,
            userJobTitle: e.user.userJobTitle,
            jobFunctions: e.user.jobFunctions,
            location: e.user.location,
            totalExperienceText: e.user.totalExperienceText,
            minSalaryExp: e.user.minSalaryExp,
            maxSalaryExp: e.user.maxSalaryExp,
            coverLetter: e.user.coverLetter,
            userExperienceSet: e.user.userExperienceSet,
            userEducationSet: e.user.userEducationSet,
            userAcademic: e.user.userAcademic,
            userSkillsSet: e.user.userSkillsSet,
            title: e.jobInfo.title,
            candidateJobActionDate: e.jobInfo.candidateJobActionDate,
            email: e.user.email,
            recruiterActionDate: e.recruiterActionDate
          });
        } 
        
      });
      this.scheduledObjGet = this.scheduledObj;
      this.hiredObjGet = this.hiredObj;
      this.rejectedbjGet = this.rejectedObj;
    }, (err: any) => {
      console.log(err);
    });
  }
}
