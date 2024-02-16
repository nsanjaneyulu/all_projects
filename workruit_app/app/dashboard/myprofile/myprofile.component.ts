import { Component, OnInit } from '@angular/core';
import { authDataInfo } from '../../../environments/textual-changes';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { endpoints, baseUrl } from '../../../environments/environment';
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  authDataInfo = authDataInfo;
  myProfileForm: FormGroup;
  changePwdForm: FormGroup;
  submitted = false;
  isShow = false;
  saveChanges = false;
  changepwd = true;
  savePwd = false;
  public userId: any;
  myProfileData: any;
  jobRoles = JSON.parse(localStorage.getItem('masterData') || '')['jobRoles'];
  companyGet = JSON.parse(localStorage.getItem('userData') || '')['userData']['company']
  constructor(private formBuilder: FormBuilder, private httpService: HttpService) { 
    this.myProfileForm = this.formBuilder.group(
      {       
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        recruiterCompanyName: ['', [Validators.required]],
        email: ['', [Validators.required]],
        telephone: ['', [Validators.required]],
        jobRoleId: ['', [Validators.required]],

      }
    );
    this.changePwdForm = this.formBuilder.group(
      {       
        oldPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required]],
        reenterNewPassword: ['', [Validators.required]],
      }
    );
  }
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.myProfile();
  }
  recruiterSettings: any;
  myProfile() {
    const getCompanyProfileUrl = baseUrl + endpoints.get.user + this.userId + endpoints.get.getRecruiterProfile;
    this.httpService.doGet(getCompanyProfileUrl).subscribe((result: any) => {
      this.myProfileData = result.data;
      console.log("this.myProfileData", this.myProfileData);
      this.jobRoles.map((e: any, i: any) => {
          if(this.myProfileData.recruiterRole == e.jobRoleId)
          {
            this.myProfileData.jobRoleName = e.jobRoleName;
            this.myProfileData.jobRoleId = e.jobRoleId;
          }
      });
      this.myProfileData.telephone = result.data.phoneNumber;
      this.myProfileData.recruiterCompanyName = result.data.companyName;
      this.recruiterSettings = this.myProfileData.recruiterCompanyName.recruiterSettings;  
    }, (err: any) => {
      console.log(err);
    });
  }
  get formGet(): { [key: string]: AbstractControl } {
    return this.myProfileForm.controls;
  }
  get formGetPwd(): { [key: string]: AbstractControl } {
    return this.changePwdForm.controls;
  }
  onSubmit(changePwd: any): any {
    console.log("changePwdForm", changePwd);
    if(changePwd == 'myProfile')
    {
      this.submitted = true;
      if (this.myProfileForm.invalid) {
        return;
      } else {
        this.doMyprofile()
      }
    }
    else if(changePwd == 'changePwd') {
      this.submitted = true;
      if (this.changePwdForm.invalid) {
        return;
      } else {
        this.doPwdChange()
      }
    }
    else {

    }
  
  }
  showPassword() {
    this.saveChanges = true;
  }
  myProfileChange() {
    this.isShow = true;
    this.changepwd = false;
    this.savePwd = true;
  }
  changepwdFun() {
    this.isShow = true;
    this.savePwd = true;
    this.changepwd = false;
  }
  doMyprofile() {
    this.myProfileForm.value.company = this.companyGet;
    this.myProfileForm.value.userId = this.userId;
    this.myProfileForm.value.deviceType = "Android";
    this.myProfileForm.value.regdId = "NA";
    this.myProfileForm.value.recruiterSettings = this.myProfileData.recruiterSettings;
    let establishedDate = this.myProfileForm.value.company.establishedDate;
    let companySocialMediaLinks = this.myProfileForm.value.company.companySocialMediaLinks;
    companySocialMediaLinks.map((e: any, i: any) => {
      let item = companySocialMediaLinks[i];
      if (item["socialMediaName"] == "Facebook") {
        this.myProfileForm.value.company.facebook = item["socialMediaValue"];
      } else if (item["socialMediaName"] == "LinkedIn") {
        this.myProfileForm.value.company.linkedIn = item["socialMediaValue"];
      } else if (item["socialMediaName"] == "Twitter") {
        this.myProfileForm.value.company.twitter = item["socialMediaValue"];
      } else {

      }
    });
    if (establishedDate != null && establishedDate.length > 0) {
        let array = establishedDate.split(' ');
        if (array != null && array.length > 0) {
            this.myProfileForm.value.company.establishedMon = array[0];
        }
        if (array != null && array.length > 1) {
          this.myProfileForm.value.company.establishedYear = establishedDate.substr(establishedDate.indexOf(' ') + 1);
        }
     }
     let industriesAuto = JSON.parse(JSON.stringify(this.myProfileForm.value.company.companyIndustriesSet));
     console.log("industriesAuto",industriesAuto);
     this.myProfileForm.value.company.companyIndustriesSet = [];
    //  this.myProfileForm.value.company.editCompanyIndustriesSet = [];
     industriesAuto.map((e: any, i: any) => {
        this.myProfileForm.value.company.companyIndustriesSet.push({
          industry: {
            "industry": {
            industryId: e.industry.industryId,
            industryName: e.industry.industryName
            } 
          }
        });
        // this.myProfileForm.value.company.editCompanyIndustriesSet.push({
        //   industry: {
        //     industryId: e.industry.industryId,
        //     industryName: e.industry.industryName
        //   }
        // });
    });
    // this.myProfileForm.value.company.editCompanySocialMediaLinks = [...this.myProfileForm.value.company.companySocialMediaLinks];
    this.myProfileForm.value.company.companyIndustriesSet = [...this.myProfileForm.value.company.companyIndustriesSet];
    // this.myProfileForm.value.company.editCompanyIndustriesSet = [...this.myProfileForm.value.company.editCompanyIndustriesSet];
    this.myProfileForm.value.company.recruiterCompanyName = this.myProfileForm.value.company.companyName;
    console.log(JSON.parse(JSON.stringify(this.myProfileForm.value)));
    const getMyProfileUrl = baseUrl + endpoints.get.user + this.userId + endpoints.post.updateRecruiterProfile;
    this.httpService.doPost(getMyProfileUrl, JSON.parse(JSON.stringify(this.myProfileForm.value))).subscribe((response: any) => {
      if (response.status === 'success') {
          console.log("::: Success :::");
      }
      });
  }
  doPwdChange() {
    console.log(JSON.parse(JSON.stringify(this.changePwdForm.value)));
    const getMyProfileUrl = baseUrl + endpoints.get.user + this.userId + endpoints.post.updateUserPassword;
    this.httpService.doPost(getMyProfileUrl, JSON.parse(JSON.stringify(this.changePwdForm.value))).subscribe((response: any) => {
      if (response.status === 'success') {
          console.log("::: Success :::");
      }
      });
  }
}
