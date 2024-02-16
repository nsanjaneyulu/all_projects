import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jobsProfile from '../../../assets/jobsProfile.json';
import { HttpService } from '../../services/http.service';
import { endpoints, baseUrl } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { authDataInfo } from '../../../environments/textual-changes';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit {
  keyword = 'title';
  authDataInfo = authDataInfo;
  public getProfileData: any;
  public jobProfilesData: any;
  public stateGet: any;
  public userId: any;
  public jobsData: any;
  public limit: any;
  public limitDescription: any;
  public limitTitle: any;
  public slider: any;
  viewPostedJobsLength: any;
  public minValue = 50;
  public maxValue = 200;
  public options = {
    floor: 0,
    ceil: 250
  };
  countries = JSON.parse(localStorage.getItem('masterData') || '')['locations'];
  constructor(
    private httpService: HttpService, private router:Router,private toastr: ToastrService
  ) {
    this.slider = {
      min: 0,
      max: 30,
      options: {
        floor: 0,
        ceil: 30,
        step: 1,
        precision: 1,
        enforceStep: true,
      }
    };
    // this.jobProfilesData = jobsProfile.jobsProfile[0];
    this.stateGet = this.router.getCurrentNavigation()?.extras.state;
    console.log("stateGet", this.stateGet);
    this.userId = localStorage.getItem('userId');
    this.viewPostedJobs();
  }
  
  viewPostedJobs() {
    const jobPostId = 5615;
    const getCompanyProfileUrl = baseUrl + endpoints.get.user + this.userId + endpoints.get.viewPostedJobs;
    this.httpService.doGet(getCompanyProfileUrl).subscribe((result: any) => {
      this.viewPostedJobsLength = result.data.length;
      console.log("result", result.data.length);
      this.jobsData = [];
      if(result.data.length !== 0)
      {
      result.data.map((e: any, i: any) => {
            this.jobsData.push({
              jobPostId: e.jobPostId,
              title: e.title,
            });
          });
          this.jobTypeChange(this.jobsData[0].jobPostId);
        }
        }, (err: any) => {
          console.log(err);
    });
  }
  jobTypeChange(eve: any) {
    const getCompanyProfileUrl = baseUrl + endpoints.get.job + eve + endpoints.get.profiles;
    this.httpService.doGet(getCompanyProfileUrl).subscribe((result: any) => {
      this.limit = result.limit;
      this.limitTitle = result.title;
      this.limitDescription = result.msg;
      this.jobProfilesData = [];
      result.data.map((e: any, i: any) => {
        this.jobProfilesData.push({
          firstname: e.firstname,
          userJobTitle: e.userJobTitle,
          jobFunctions: e.jobFunctions,
          location: e.location,
          totalExperienceText: e.totalExperienceText,
          minSalaryExp: e.minSalaryExp,
          maxSalaryExp: e.maxSalaryExp,
          coverLetter: e.coverLetter,
          userExperienceSet: e.userExperienceSet,
          userEducationSet: e.userEducationSet,
          userAcademic: e.userAcademic,
          userSkillsSet: e.userSkillsSet
        })
      });
    }, (err: any) => {
      console.log(err);
    });
  }
  selectEvent(item: any) {

  }
  onChangeSearch(search: string) {
  }

  onFocused(e: any) {
    // do something
  }
  ngOnInit(): void {
  }

}
