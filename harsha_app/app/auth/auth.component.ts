import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { masterData } from '../../environments/masterdata/masterdata';
import { LoginInterface } from './auth-interface';
import { endpoints } from '../../environments/environment';
import { HttpService } from '../services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  masterData = masterData;
  loginForm: FormGroup;
  errors;
  constructor(
    private httpService: HttpService,
    public toastr: ToastrService,
    private route: Router
  ) { }
  ngOnInit() {
    this.loginForm = new FormGroup({
      user_email: new FormControl('', [
        Validators.required, Validators.email]),
      user_password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
    });
    console.log(this.masterData);
  }
  doLogin(loginForm) {
    const payload = loginForm;
    if (loginForm.user_email && loginForm.user_password) {
      this.httpService.doPost(endpoints.post.login, payload).subscribe((result: any) => {
        console.log('result', result);
        if (result.statusCode === "1") {
          this.toastr.success(masterData.toastMessages.loginSuccess);
          this.route.navigate(['/dashboard/home']);
        } else {
          this.errors = masterData.errorMessages.auth.empty;
        }
        localStorage.setItem('userData', JSON.stringify(result.data[0]));
      }, err => {
        console.log(err);
      });
    } else if (!loginForm.user_email && loginForm.user_password) {
      this.errors = masterData.errorMessages.auth.emailEmpty;
    } else if (loginForm.user_email && !loginForm.user_password) {
      this.errors = masterData.errorMessages.auth.passwordEmpty;
    } else {
      this.errors = masterData.errorMessages.auth.empty;
    }
  }
}
