import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Columns } from '../../helper/columns';
import { Tabsdata } from '../../helper/tabsdata';
import { endpoints, baseUrl } from '../../../environments/environment';
import { authDataInfo } from '../../../environments/textual-changes';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  authDataInfo = authDataInfo;
  jobsTabs: Array<any> = authDataInfo.tabs.jobs;
  masterDatajobFunctions = JSON.parse(localStorage.getItem('masterData') || '')['jobFunctions'];
  // tableColumns: Array<Columns> = authDataInfo.tableColumns.intrestedProfile;
  activeTab = {
    name: 'Active',
    active: true,
    link: '/editpost',
  }
  tableColumns: Array<any> = [
    {
      header: 'Job',
      headrekey: 'title'
    },
    {
      header: 'Function',
      headrekey: 'jobFunction',
      isLink: true,
      isLinkActions: {
        link: '/editpost'
      }
    },
    {
      header: 'Posted',
      headrekey: 'createdDate',
    },
    {
      header: 'Expires',
      headrekey: 'expireDate'
    },
    {
      header: 'Share',
      headrekey: ''
    }
  ];
  closedCloumns: Array<any> = [
    {
      header: 'Job',
      headrekey: 'jobTitle'
    },
    {
      header: 'Function',
      headrekey: 'jobFunction',
      isLink: true,
      isLinkActions: {
        link: '/editpost'
      }
    },
    {
      header: 'Posted',
      headrekey: 'createdDate',
    },
    {
      header: 'Expires',
      headrekey: 'expireDate'
    },
    {
      header: 'Repost',
      headrekey: '',
      isLink: true,
      isLinkActions: {
        title: 'Repost',
        link: '/editpost'
      }
    }
  ];
  public tableData = [];
  public userId: any;
  public jobsData: any;
  public jobsDataGet: any;
  public jobsDataObjGet: any;
  constructor(private httpService: HttpService) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.jobs();
  }
  tabClick(eve: any) {
    this.jobsTabs.map(item => {
      if (item.name === eve.name) {
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
  activeJobs: any;
  closedJobs: any;
  pendingJobs: any;
  jobs() {
    const jobPostId = 8196108;
    const getCompanyProfileUrl = baseUrl + endpoints.get.user + this.userId + endpoints.get.viewPostedJobs;
    this.httpService.doGet(getCompanyProfileUrl).subscribe((result: any) => {
      this.activeJobs = [];
      this.closedJobs = [];
      this.closedJobs = [];
      console.log("result.data", result.data);
      if (result.data.length !== 0) {
        result.data.map((e: any, i: any) => {
          let responseJobFun = e.jobFunction;
          let jobFunction = "";
          this.masterDatajobFunctions.map((masterDataJob: any, i: any) => {
            if (masterDataJob.jobFunctionId === responseJobFun[0]) {
              jobFunction = masterDataJob.jobFunctionName;
            }
          });
          if (e.status == 2) {
            this.activeJobs.push({
              title: e.title,
              jobFunction: jobFunction,
              createdDate: e.createdDate,
              expireDate: e.expireDate,
              location: e.location,
              description: e.description,
              skills: e.skills,
              jobType: e.jobType,
              salaryMax: e.salaryMax,
              salaryMin: e.salaryMin,
              experienceMax: e.experienceMax,
              experienceMin: e.experienceMin,
              noticePeriod: e.noticePeriod,
              degree: e.degree,
              status: e.status
            });
          }
          if (e.status == 1 || e.status == 4) {
            this.pendingJobs.push({
              title: e.title,
              jobFunction: jobFunction,
              createdDate: e.createdDate,
              expireDate: e.expireDate,
              location: e.location,
              description: e.description,
              skills: e.skills,
              jobType: e.jobType,
              salaryMax: e.salaryMax,
              salaryMin: e.salaryMin,
              experienceMax: e.experienceMax,
              experienceMin: e.experienceMin,
              noticePeriod: e.noticePeriod,
              degree: e.degree,
              status: e.status
            });
          }
          if (e.status == 3) {
            this.closedJobs.push({
              title: e.title,
              jobFunction: jobFunction,
              createdDate: e.createdDate,
              expireDate: e.expireDate,
              location: e.location,
              description: e.description,
              skills: e.skills,
              jobType: e.jobType,
              salaryMax: e.salaryMax,
              salaryMin: e.salaryMin,
              experienceMax: e.experienceMax,
              experienceMin: e.experienceMin,
              noticePeriod: e.noticePeriod,
              degree: e.degree,
              status: e.status
            });
          }
        });
        this.closedJobs = this.closedJobs;
        this.activeJobs = this.activeJobs;
        this.pendingJobs = this.pendingJobs;
      }
      else {
        this.closedJobs = 0;
        this.activeJobs = 0;
        this.pendingJobs = 0;
      }
      console.log("jobs", this.activeJobs, this.closedJobs, this.pendingJobs)
      this.jobsTabs.map((e: any, i: any) => {
        if (e.name == "Active") {
          e.count = this.activeJobs.length || 0;
        }
        else if (e.name == "Closed") {
          e.count = this.closedJobs.length || 0;
        }
        else if (e.name == "Pending") {
          e.count = this.pendingJobs?.length || 0;
        }
        else {

        }
      });
    }, (err: any) => {
      console.log(err);
    });

  }

}
