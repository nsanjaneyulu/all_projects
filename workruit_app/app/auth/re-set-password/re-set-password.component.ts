import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { authDataInfo } from '../../../environments/textual-changes';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { endpoints, baseUrl } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-re-set-password',
  templateUrl: './re-set-password.component.html',
  styleUrls: ['./re-set-password.component.css']
})
export class ReSetPasswordComponent implements OnInit {
  authDataInfo = authDataInfo;
  resetpwdForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private httpService: HttpService,
    private route: Router,
    private toastr: ToastrService) { 
    this.resetpwdForm = this.formBuilder.group(
      {       
        username: ['', [Validators.required]]    
      }
    );
  }

  ngOnInit(): void {
  }
  get formGet(): { [key: string]: AbstractControl } {
    return this.resetpwdForm.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.resetpwdForm.invalid) {
      return;
    }
    else {
      this.doresetPwd()
    }
    console.log(JSON.stringify(this.resetpwdForm.value, null, 2));
  }
  doresetPwd() {
    console.log("this.loginForm", JSON.stringify(this.resetpwdForm.value));
    console.log(JSON.stringify(this.resetpwdForm.value));
    const _dashboardLogin = baseUrl + endpoints.post.resetPasswordLinkToEmail;
    this.httpService.doPost(_dashboardLogin, this.resetpwdForm.value).subscribe((response: any) => {
      console.log("Data login", response.data);
      // localStorage.setItem('auth_session_id', JSON.session_id)
      if (response.status === 'success') {
        console.log("Success Response");
        this.toastr.success('Mail Sent Successfully', 'Thank You');
        
      }
      else {
        console.log("Failure Response");
        this.toastr.success(response.msg.description);
      }
    }, (err: any) => {
      console.log(err);
    });
  }

}
