import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { authDataInfo } from '../../../environments/textual-changes';
import { HttpService } from '../../services/http.service';
import { endpoints, baseUrl } from '../../../environments/environment';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { masterDatainfo } from '../../../environments/getMasterData';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-companyinfo',
  templateUrl: './companyinfo.component.html',
  styleUrls: ['./companyinfo.component.css']
})
export class CompanyinfoComponent implements OnInit {
  keyword = 'title';
  authDataInfo = authDataInfo;
  masterDatainfo = masterDatainfo;
  items: Array<any> = [];
  companyInfoForm: FormGroup;
  submitted = false;
  companyProfileData = { companyName: '', location: '', establishedMon: 'establishedMon', establishedYear: 'establishedYear' };
  masterDataIndustries = JSON.parse(localStorage.getItem('masterData') || '')['industries'];
  masterDataSizes = JSON.parse(localStorage.getItem('masterData') || '')['companySizes'];
  countries = JSON.parse(localStorage.getItem('masterData') || '')['locations'];
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  public userId: any;
  years: any;
  constructor(private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
    this.companyInfoForm = this.formBuilder.group(
      {
        companyName: ['', [Validators.required]],
        website: ['', [Validators.required]],
        location: ['', [Validators.required]],
        companyIndustriesSet: ['', [Validators.required]],
        size: ['', [Validators.required]],
        about: ['', [Validators.required]],
        establishedMon: [''],
        establishedYear: ['',],
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
    console.log("this.years", this.years);
    this.masterDataIndustries.map((e: any, i: any) => {
      this.items.push({
        value: e.industryId,
        display: e.industryName
      });
    });
    const _getCompanyProfile = baseUrl + '/user/' + this.route.snapshot.paramMap.get('userId') + endpoints.get.getRecruiterProfile;
    this.httpService.doGet(_getCompanyProfile).subscribe((response: any) => {
      this.companyProfileData = response.data;
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
  doCompanyInfo() {
    this.companyInfoForm.value.companySocialMediaLinks = [{
      "socialMediaName": "Facebook",
      "socialMediaValue": this.companyInfoForm.value.facebook ? 'https://www.facebook.com/' + this.companyInfoForm.value.facebook : ""
    },
    {
      "socialMediaName": "LinkedIn",
      "socialMediaValue": this.companyInfoForm.value.linkedIn ? 'https://www.linkedin.com/' + this.companyInfoForm.value.linkedIn : ""
    },
    {
      "socialMediaName": "Twitter",
      "socialMediaValue": this.companyInfoForm.value.twitter ? 'https://www.twitter.com/' + this.companyInfoForm.value.twitter : ""
    }
    ];

    this.companyInfoForm.value.userId = localStorage.getItem('userId');;
    this.companyInfoForm.value.picture = "";
    this.companyInfoForm.value.establishedDate = this.companyInfoForm.value.establishedMon + " " + this.companyInfoForm.value.establishedYear;
    let industriesAuto = JSON.parse(JSON.stringify(this.companyInfoForm.value.companyIndustriesSet));
    this.companyInfoForm.value.companyIndustriesSet = [];
    let _sizeObj = this.masterDataSizes.filter((e: any, i: any) => {
      if (this.companyInfoForm.value.size == e.csId) {
        return {
          "csId": e.csId,
          "csTitle": e.csTitle
        }
      }
    })
    this.companyInfoForm.value.size = _sizeObj[0];
    industriesAuto.map((e: any, i: any) => {
      this.companyInfoForm.value.companyIndustriesSet.push({
        industry: {
          industryId: e.value,
          industryName: e.display,
        }
      });
    });
    this.companyInfoForm.value.editCompanyIndustriesSet = [...this.companyInfoForm.value.companyIndustriesSet];

    const _saveCompanyUrl = baseUrl + endpoints.post.saveCompany;
    console.log("companyProfileData", _sizeObj, this.companyInfoForm.value);
    // return;
    this.httpService.doPost(_saveCompanyUrl, this.companyInfoForm.value).subscribe((response: any) => {
      if (response.status === 'success') {
        localStorage.setItem("userId", this.userId);
        this.toastr.success(response.msg.description);
        this.router.navigateByUrl('/welcome', { state: response.data });
      }
      else {
        console.log(response);
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

  onFocused(e: any) {
    // do something
  }
  compsize: any;
  sizeChange(compsize: any) {
    console.log("eve", compsize);
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
