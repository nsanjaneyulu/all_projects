import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jobsProfile from '../../../assets/jobsProfile.json';
import { HttpService } from '../../services/http.service';
import { endpoints, baseUrl } from '../../../environments/environment';

@Component({
  selector: 'app-savedstatus',
  templateUrl: './savedstatus.component.html',
  styleUrls: ['./savedstatus.component.css']
})
export class SavedstatusComponent implements OnInit {

  public getProfileData: any;
  public jobProfilesData: any;
  public stateGet: any;
  constructor(private httpService: HttpService, private router:Router) { 
    this.stateGet = this.router.getCurrentNavigation()?.extras.state;
    console.log("stateGet", this.stateGet);
  }

  ngOnInit(): void {
    this.getJobProfile();
  }
  getJobProfile() {
    
      this.jobProfilesData = [];
    
        this.jobProfilesData.push({
          firstname: this.stateGet.firstname,
          userJobTitle: this.stateGet.userJobTitle,
          jobFunctions: this.stateGet.jobFunctions,
          location: this.stateGet.location,
          totalExperienceText: this.stateGet.totalExperienceText,
          minSalaryExp: this.stateGet.minSalaryExp,
          maxSalaryExp: this.stateGet.maxSalaryExp,
          coverLetter: this.stateGet.coverLetter,
          userExperienceSet: this.stateGet.userExperienceSet,
          userEducationSet: this.stateGet.userEducationSet,
          userAcademic: this.stateGet.userAcademic,
          userSkillsSet: this.stateGet.userSkillsSet
        })
      }

}
