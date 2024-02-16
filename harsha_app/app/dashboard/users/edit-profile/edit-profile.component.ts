import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { endpoints } from '../../../../environments/environment';
import { masterData } from "../../../../environments/masterdata/masterdata";
import { HttpService } from '../../../services/http.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  public masterData = masterData;
  pageTitle = 'Edit user Info';
  user_id = JSON.parse(localStorage.getItem('userData')).user_id;
  cstImageUrl = 'https://res.cloudinary.com/dl9ns0hby/image/upload/v1572075582/plusmax-tracker/icons/plus-max-user.jpg';
  userData;
  userForm;
  userFormFields = {
    user_email: null,
    user_first_name: null,
    user_last_name: null,
    user_phone: null,
    user_address: null,
    user_image: null
  };
  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private route: Router,
    public toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.loadUserProfile();
  }
  loadUserProfile() {
    this.httpService.doGet(endpoints.get.getUserProfile + this.user_id).subscribe((result: any) => {
      this.userData = result.data[0];
      console.log('result', result.data[0]);
      this.userForm = this.formBuilder.group({
        user_email: new FormControl(this.userData.user_email),
        user_first_name: new FormControl(this.userData.user_first_name),
        user_last_name: new FormControl(this.userData.user_last_name),
        user_phone: new FormControl(this.userData.user_phone),
        user_address: new FormControl(this.userData.user_address),
        user_image: new FormControl(this.userData.user_image)
      });
    }, err => {
      console.log(err);
    });
  }
  updateProfile(userForm) {
    console.log(userForm);
    userForm.user_id = this.user_id;
    userForm.user_image =
      this.httpService.doUpload(endpoints.post.updateUserProfile,
        userForm).subscribe((result: any) => {
          console.log('result', result);
          if (result.status == "success") {
            this.toastr.success(masterData.toastMessages.requestSuccess);
            // this.route.navigate(['/dashboard/user/view',]);
          }
        }, err => {
          this.toastr.error(masterData.toastMessages.requestFail);
          console.log(err);
        });
  }
  changeListener($event): void {
    this.userForm.user_image = $event.target.files[0]
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
