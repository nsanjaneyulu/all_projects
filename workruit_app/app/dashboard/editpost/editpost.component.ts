import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { authDataInfo } from '../../../environments/textual-changes';
import { HttpService } from '../../services/http.service';
import { endpoints, baseUrl } from '../../../environments/environment';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { masterDatainfo } from '../../../environments/getMasterData';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  years = [];
  min_experience: any;
  max_experience: any;
  min_salary: any;
  max_salary: any;
  keyword = 'title';
  authDataInfo = authDataInfo;
  masterDatainfo = masterDatainfo;
  items: Array<any> = [];
  editPostJobForm: FormGroup;
  submitted = false;
  jobTypeGet: any;
  public stateGet: any;
  masterDataIndustries = JSON.parse(localStorage.getItem('masterData') || '')['industries'];
  masterDataSizes = JSON.parse(localStorage.getItem('masterData') || '')['companySizes'];
  countries = JSON.parse(localStorage.getItem('masterData') || '')['locations'];
  degrees = JSON.parse(localStorage.getItem('masterData') || '')['degrees'];
  jobTypes = JSON.parse(localStorage.getItem('masterData') || '')['jobTypes'];
  joiningInfo = JSON.parse(localStorage.getItem('masterData') || '')['joiningInfo'];
  contractJoingInfo = JSON.parse(localStorage.getItem('masterData') || '')['contractJoingInfo'];
  jobFunctions = JSON.parse(localStorage.getItem('masterData') || '')['jobFunctions'];
  public userId: any;
  constructor(private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router:Router,
    private toastr: ToastrService) {
    this.stateGet = this.router.getCurrentNavigation()?.extras.state;
    this.min_experience = this.makeArray(0, 29);
    this.max_experience = this.makeArray(1, 30);
    this.min_salary = this.makeArray(0, 49);
    this.max_salary = this.makeArray(1, 50);
    this.editPostJobForm = this.formBuilder.group(
      {
        title: ['', [Validators.required]],
        jobFunction: ['', [Validators.required]],
        location: ['', [Validators.required]],
        description: ['', [Validators.required]],
        jobType: ['', [Validators.required]],
        salaryMin: ['', [Validators.required]],
        salaryMax: ['', [Validators.required]],
        experienceMin: ['', [Validators.required]],
        experienceMax: ['', [Validators.required]],
        noticePeriod: ['', [Validators.required]],
        degree: ['', [Validators.required]],
        contractNotice: ['',],
        skills: ['',],
      }
    );
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.jobTypeGet = JSON.parse(JSON.stringify((this.stateGet.jobType.jobTypeTitle)));
    this.jobFunctions.map((e: any, i: any) => {
      if(e.jobFunctionId == this.stateGet.jobFunction[0])
      {
        this.stateGet.jobFunction = e.jobFunctionName
      }
      
    });
    this.masterDataIndustries.map((e: any, i: any) => {
      this.items.push({
        value:  e.industryId,
        display : e.industryName
      });
    });
  }
  get formGet(): { [key: string]: AbstractControl } {
    return this.editPostJobForm.controls;
  }
  makeArray(min: any, max: any) {
    var array = [];
    var index = 0;
    for (var i = min; i <= max; i++) {
      array[index] = i;
      index++;
    }
    return array;
  }
  onSubmit(): void {
    debugger;
    this.submitted = true;
    if (this.editPostJobForm.invalid) {
      return;
    } else {
      this.doEditJob()
    }
  }
  doEditJob() {
    this.editPostJobForm.value.oldLocation = {
      locationId: this.editPostJobForm.value.location.locationId,
    };
    this.editPostJobForm.value.oldLocation = this.editPostJobForm.value.oldLocation;
    console.log("editPostJobForm", this.editPostJobForm.value);
    const _postjobUrl = baseUrl + endpoints.get.user + this.userId + endpoints.post.postjob;
    this.httpService.doPost(_postjobUrl, this.editPostJobForm.value).subscribe((response: any) => {
      if (response.status === 'success') { 
        localStorage.setItem("userId", this.userId);
        this.toastr.success(response.msg.description);
        this.router.navigateByUrl('/welcome', { state: response.data });
      }
      else {
      }
    }, (err: any) => {
      console.log(err);
    });
  }
  selectEvent(item: any) {

  }
  onSelect(item: any) {

  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something
  }
  sizeChange(eve: any) {
  }
  loadTags = function (query: any) {
    let industriesList = masterDatainfo.masterData.industries;
    var industrylist = [];

    industriesList.map((e: any, i: any) => {
      industrylist.push({
        industryId: e.industryId,
        industryName: e.industryName,
      });
      return industriesList.filter(function (industry) {
      });
    });
   
  };

}
