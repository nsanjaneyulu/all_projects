import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { authDataInfo } from '../../../environments/textual-changes';
import { HttpService } from '../../services/http.service';
import { endpoints, baseUrl } from '../../../environments/environment';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { masterDatainfo } from '../../../environments/getMasterData';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-postjob',
  templateUrl: './postjob.component.html',
  styleUrls: ['./postjob.component.css']
})
export class PostjobComponent implements OnInit {
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
  public stateGet: any;
  masterDataIndustries = JSON.parse(localStorage.getItem('masterData') || '')['industries'];
  masterDataSizes = JSON.parse(localStorage.getItem('masterData') || '')['companySizes'];
  countries = JSON.parse(localStorage.getItem('masterData') || '')['locations'];
  degrees = JSON.parse(localStorage.getItem('masterData') || '')['degrees'];
  jobTypes = JSON.parse(localStorage.getItem('masterData') || '')['jobTypes'];
  joiningInfo = JSON.parse(localStorage.getItem('masterData') || '')['joiningInfo'];
  categoryArray = JSON.parse(localStorage.getItem('masterData') || '')['categoryArray'];
  public jobFunctionsArr: any = [];
  public jobFunctionOptions: any = [];
  public userId: any;
  constructor(private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private toastr: ToastrService) {
    this.stateGet = this.router.getCurrentNavigation()?.extras.state;
    console.log("stateGet", this.stateGet);
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
        salaryMin: ['',],
        salaryMax: [''],
        experienceMin: ['',],
        experienceMax: ['',],
        noticePeriod: ['',],
        degree: ['',],
        skills: ['',]
      }
    );
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    let _jobFunctionsArr: any = [];
    let _jobFunctionOptions: any = [];
    this.categoryArray.forEach(function (value: any, key: any) {
      if (value.categoryValues.length > 0) {
        _jobFunctionsArr.push(value);
      } else {
        // this.jobFunctionOptions.push(value);
        _jobFunctionOptions.push(value);
      }
    });
    this.jobFunctionOptions = _jobFunctionOptions;
    this.jobFunctionsArr = _jobFunctionsArr;
    console.log("def", { _jobFunctionsArr, _jobFunctionOptions });
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
    console.log("this.editPostJobForm.value", this.editPostJobForm.value);
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
    console.log("search", search);
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  onChangeSkillsSearch(search: any) {
    console.log("search", search);
    this.items = [];
    this.httpService.doGet(baseUrl + 'skills?page=0&size=30&skillName=' + search.key).subscribe((response: any) => { 
      this.items = response.content
      console.log(response) });
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  onFocused(e: any) {
    console.log("search", e);
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
