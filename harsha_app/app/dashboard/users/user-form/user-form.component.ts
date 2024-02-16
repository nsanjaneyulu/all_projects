import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormArray, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { masterData } from '../../../../environments/masterdata/masterdata';
import { endpoints } from '../../../../environments/environment';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm;
  serviceMasterData = JSON.parse(localStorage.getItem('masterData'));
  companiesInfo = [];
  pageTitle = 'New User';
  countries;
  user = {
    country_country_id: null,
    user_company_id: null,
    user_email: null,
    user_first_name: null,
    user_last_name: null,
    user_role: null,
    user_phone: null,
    user_image: null,
    user_created_by: null
  };
  image: string | ArrayBuffer;
  constructor(private formBuilder: FormBuilder,
    private httpService: HttpService,
    public toastr: ToastrService,
    private route: Router,
  ) { }

  ngOnInit() {

    this.userForm = this.formBuilder.group({
      country_country_id: new FormControl(this.user.country_country_id),
      user_company_id: new FormControl(this.user.user_company_id),
      user_email: new FormControl(this.user.user_email),
      user_first_name: new FormControl(this.user.user_first_name),
      user_last_name: new FormControl(this.user.user_last_name),
      user_role: new FormControl(this.user.user_role),
      user_phone: new FormControl(this.user.user_phone),
      user_image: new FormControl(this.user.user_image),
    });
  }
  createUser(userForm) {
    // const values = Object.keys(userForm).filter(key => {
    //   if (key !== 'user_image') {
    //     return !userForm[key];
    //   }
    // });
    console.log(userForm);
    // if (!values.length) {

    userForm.user_image = this.image;
    userForm.user_created_by = JSON.parse(localStorage.getItem('userData')).user_id;
    userForm.user_image = this.user.user_image;
    console.log(userForm);
    // const userFormArray = [userForm];
    this.httpService.doUpload(endpoints.post.createUser,
      userForm).subscribe((result: any) => {
        console.log('result', result);
        if (result.status == "success") {
          this.toastr.success(masterData.toastMessages.userSuccess);
          this.route.navigate(['/dashboard/user/list']);
        }
      }, err => {
        this.toastr.error(masterData.toastMessages.requestFail);
        console.log(err);
      });
    // } else {
    //   this.toastr.error('all fields are mandatory');
    // }
  }

  getCompaniesInfo(user_company_id) {
    this.companiesInfo = [];
    this.serviceMasterData.companiesInfo.filter((item) => {
      return JSON.parse(user_company_id) === item.company_country_id ? this.companiesInfo.push(item) : [];
    });
  }

  changeListener($event): void {
    console.log($event);
    this.user.user_image = $event.target.files[0];
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    // if (file.size < 1024) {
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      console.log(this.image);
    }
    myReader.readAsDataURL(file);
    console.log(myReader.result);
    // } else {
    //   this.toastr.error('File size is too large');
    // }
  }
}
