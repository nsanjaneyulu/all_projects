import { Component, OnInit } from '@angular/core';
import { authDataInfo } from '../../../environments/textual-changes';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { endpoints, baseUrl } from '../../../environments/environment';
import { masterDatainfo } from '../../../environments/getMasterData';
import { ToastrService } from 'ngx-toastr';
import { TagInputModule } from 'ngx-chips';

@Component({
  selector: 'app-companyprofile',
  templateUrl: './companyprofile.component.html',
  styleUrls: ['./companyprofile.component.css']
})
export class CompanyprofileComponent implements OnInit {

  keyword = 'title';
  authDataInfo = authDataInfo;
  masterDatainfo = masterDatainfo;
  items: Array<any> = [];
  companyInfoForm: FormGroup;
  submitted = false;
  public stateGet: any;
  masterDataIndustries = JSON.parse(localStorage.getItem('masterData') || '')['industries'];
  masterDataSizes = JSON.parse(localStorage.getItem('masterData') || '')['companySizes'];
  countries = JSON.parse(localStorage.getItem('masterData') || '')['locations'];
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  public userId: any;
  years: any;
  companyProfileData: any;
  companyIndustriesSet: any;
  location: any;
  constructor(private formBuilder: FormBuilder,
    
    private httpService: HttpService,
    private router:Router,
    private toastr: ToastrService) {
      this.stateGet = this.router.getCurrentNavigation()?.extras.state;
    console.log("stateGet", this.stateGet);
    this.companyInfoForm = this.formBuilder.group(
      {
        companyName: ['', [Validators.required]],
        website: ['', [Validators.required]],
        location: ['', [Validators.required]],
        companyIndustriesSet: ['', [Validators.required]],
        size: ['', [Validators.required]],
        about: ['', [Validators.required]],
        establishedMon: ['', [Validators.required]],
        establishedYear: ['', [Validators.required]],
        facebook: [''],
        linkedIn: ['',],
        twitter: ['',],
      }
    );
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {

    this.years = [];
    let year = new Date().getFullYear();
    this.years.push(year.toString());
      for (var i = 1; i < (year - 1899); i++) {
        this.years.push((year - i).toString());
      }
    this.companyProfile();
    this.masterDataIndustries.map((e: any, i: any) => {
      this.items.push({
        value:  e.industryId,
        display : e.industryName
      });
    });
  }
  get formGet(): { [key: string]: AbstractControl } {
    return this.companyInfoForm.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.companyInfoForm.invalid) {
      return;
    } else {
      this.doCompanyInfo()
    }
  }
  companyProfile() {
    const getCompanyProfileUrl = baseUrl + endpoints.get.user + this.userId + endpoints.get.getRecruiterProfile;
    this.httpService.doGet(getCompanyProfileUrl).subscribe((result: any) => {
      // this.companyProfileData = result;
      // console.log("result", result);
      const getCompanyProfileUrl1 = baseUrl + "1225" + endpoints.get.getCompanyProfile;
      this.httpService.doGet(getCompanyProfileUrl1).subscribe((getCompanyProfile: any) => {
        this.companyProfileData = getCompanyProfile.data;
        this.companyIndustriesSet = this.companyProfileData['companyIndustriesSet'][0].industry.industryName;
        let establishedDate =  this.companyProfileData.establishedDate;
            if (establishedDate != null && establishedDate.length > 0) {
              var array = establishedDate.split(' ');
              if (array != null && array.length > 0) {
                this.companyProfileData.establishedMon = array[0];
              }
              if (array != null && array.length > 1) {
                this.companyProfileData.establishedYear = establishedDate.substr(establishedDate.indexOf(' ') + 1);
              }
            }
        this.companyProfileData.companySocialMediaLinks.map((e: any, i: any) => {
          if (e["socialMediaName"] == "Facebook") {
            this.companyProfileData.companySocialMediaLinks.facebook = e["socialMediaValue"];
          } else if (e["socialMediaName"] == "LinkedIn") {
            this.companyProfileData.companySocialMediaLinks.linkedIn = e["socialMediaValue"];
          } else if (e["socialMediaName"] == "Twitter") {
            this.companyProfileData.companySocialMediaLinks.twitter = e["socialMediaValue"];
          }
          });
        console.log("getCompanyProfile", this.companyProfileData);
      }, (err: any) => {
        console.log(err);
      });
    }, (err: any) => {
      console.log(err);
    });
  }
  selectEvent(item: any) {
    this.companyInfoForm.value.location = item;
    console.log("location", this.companyInfoForm.value.location);
  }
  doCompanyInfo() {
    this.companyInfoForm.value.companySocialMediaLinks = [{
      "socialMediaName": "Facebook",
      "socialMediaValue": this.companyInfoForm.value.facebook ? this.companyInfoForm.value.facebook : ""
    },
    {
      "socialMediaName": "LinkedIn",
      "socialMediaValue": this.companyInfoForm.value.linkedIn ? this.companyInfoForm.value.linkedIn : ""
    },
    {
      "socialMediaName": "Twitter",
      "socialMediaValue": this.companyInfoForm.value.twitter ? this.companyInfoForm.value.twitter : ""
    }
  ];

    this.companyInfoForm.value.picture = "";
    this.companyInfoForm.value.companyId = 1225;
    this.companyInfoForm.value.companyName = this.companyInfoForm.value.companyName;
    this.companyInfoForm.value.establishedDate = this.companyInfoForm.value.establishedMon + " " + this.companyInfoForm.value.establishedYear;
    this.companyInfoForm.value.recruiterCompanyName = this.companyInfoForm.value.companyName;
    let industriesAuto = JSON.parse(JSON.stringify(this.companyInfoForm.value.companyIndustriesSet));
    this.companyInfoForm.value.companyIndustriesSet =  [];
    industriesAuto.map((e: any, i: any) => {
      this.companyInfoForm.value.companyIndustriesSet.push({
        industry: {
        industryId: e.value,
        industryName: e.display
        }
      });
    });
    this.companyInfoForm.value.editCompanyIndustriesSet = this.companyInfoForm.value.companyIndustriesSet;
    this.companyInfoForm.value.editCompanySocialMediaLinks = this.companyInfoForm.value.companySocialMediaLinks;
    let _sizeObj = this.masterDataSizes.filter((e: any, i: any) => {
      if (this.companyInfoForm.value.size == e.csId) {
        return {
          "csId": e.csId,
          "csTitle": e.csTitle
        }
      }
    })
    this.companyInfoForm.value.size = _sizeObj[0];
    this.companyInfoForm.value.location = this.companyInfoForm.value.location;
    const _saveCompanyUrl = baseUrl + endpoints.post.saveCompany;
    console.log("this.companyInfoForm.value",this.companyInfoForm.value);
    this.httpService.doPost(_saveCompanyUrl, this.companyInfoForm.value).subscribe((response: any) => {
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
  onSelect(item: any) {
    
  }

  onChangeSearch(search: string) {
    console.log("search", search);
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
