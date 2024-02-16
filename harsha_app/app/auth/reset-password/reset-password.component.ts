import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { masterData } from '../../../environments/masterdata/masterdata';
import { LoginInterface } from './../auth-interface';
import { endpoints } from '../../../environments/environment';
import { HttpService } from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  masterData = masterData;
  resetPasswordForm: FormGroup;
  errors;
  randomString: any;
  constructor(
    private httpService: HttpService,
    public toastr: ToastrService,
    private ActivatedRoute: ActivatedRoute,
    private route: Router
  ) { }
  ngOnInit() {
    this.ActivatedRoute.params.subscribe((parmas) => { this.randomString = parmas['randomString'] });
    if (!this.randomString) {
      this.route.navigate(['/']);
    }
    this.resetPasswordForm = new FormGroup({
      new_password: new FormControl('', [
        Validators.required, Validators.email]),
    });
    console.log(this.masterData);
  }
  forgotPassword(resetPasswordForm) {
    const payload = {
      "randomString": this.randomString,
      "user_password": resetPasswordForm.new_password,
    };
    console.log(payload);
    if (resetPasswordForm.new_password) {
      this.httpService.doPost(endpoints.post.setPassword, payload).subscribe((result: any) => {
        console.log('result', result);
        if (result.status === "success") {
          this.toastr.success(masterData.toastMessages.setPasswordSuccess);
        }
        // localStorage.setItem('userData', JSON.stringify(result.data[0]));
      }, err => {
        console.log(err);
      });
    } else {
      this.errors = masterData.errorMessages.auth.passwordEmpty;
    }
  }
}
