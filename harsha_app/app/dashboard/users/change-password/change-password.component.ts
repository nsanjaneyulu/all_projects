import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { endpoints } from '../../../../environments/environment';
import { masterData } from "../../../../environments/masterdata/masterdata";
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public masterData = masterData;
  public pagetitle = 'Update Password';
  user_id = JSON.parse(localStorage.getItem('userData')).user_id;
  cstImageUrl = 'https://res.cloudinary.com/dl9ns0hby/image/upload/v1572075582/plusmax-tracker/icons/plus-max-user.jpg';
  userData;
  errors;
  updatePasswordForm;
  updatePasswordFormFields = {
    user_email: null,
    user_old_password: null,
    user_password: null,
  };
  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private route: Router,
    public toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.updatePasswordForm = this.formBuilder.group({
      user_email: new FormControl(this.updatePasswordFormFields.user_email),
      user_old_password: new FormControl(this.updatePasswordFormFields.user_old_password),
      user_password: new FormControl(this.updatePasswordFormFields.user_password),
    });
  }
  updatePassword(userPasswordForm) {
    userPasswordForm.user_id = this.user_id;
    console.log(userPasswordForm);
    this.httpService.doPost(endpoints.post.updatePasswordByUser,
      userPasswordForm).subscribe((result: any) => {
        console.log('result', result);
        if (result.status == "success") {
          this.toastr.success(masterData.toastMessages.updateSuccess);
          this.route.navigate(['/dashboard/profile/view']);
        }
      }, err => {
        this.toastr.error(masterData.toastMessages.requestFail);
        console.log(err);
      });
  }
  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    // if (file.size < 1024) {
    myReader.onloadend = (e) => {
      this.userData.user_image = myReader.result;
      console.log(this.userData.user_image);
    }
    myReader.readAsDataURL(file);
    console.log(myReader.result);
    // } else {
    //   this.toastr.error('File size is too large');
    // }
  }
}
