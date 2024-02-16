import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-hirerejectprofile',
  templateUrl: './hirerejectprofile.component.html',
  styleUrls: ['./hirerejectprofile.component.css']
})
export class HirerejectprofileComponent implements OnInit {

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
