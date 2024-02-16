import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { masterData } from '../../../environments/masterdata/masterdata';
import { LoginInterface } from './../auth-interface';
import { endpoints } from '../../../environments/environment';
import { HttpService } from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  masterData = masterData;
  forgotPasswordForm: FormGroup;
  errors;
  constructor(
    private httpService: HttpService,
    public toastr: ToastrService,
    private route: Router
  ) { }
  ngOnInit() {
    this.forgotPasswordForm = new FormGroup({
      user_email: new FormControl('', [
        Validators.required, Validators.email]),
    });
    console.log(this.masterData);
  }
  forgotPassword(forgotPasswordForm) {
    const payload = forgotPasswordForm;
    console.log(payload);
    if (forgotPasswordForm.user_email) {
      this.httpService.doPost(endpoints.post.login, payload).subscribe((result: any) => {
        console.log('result', result);
        // localStorage.setItem('userData', JSON.stringify(result.data[0]));
      }, err => {
        console.log(err);
      });
    } else if (!forgotPasswordForm.user_email) {
      this.errors = masterData.errorMessages.auth.emailEmpty;
    } else {
      this.errors = masterData.errorMessages.auth.emailEmpty;
    }
  }
}
