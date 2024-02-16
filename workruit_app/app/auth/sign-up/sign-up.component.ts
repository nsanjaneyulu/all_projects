import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { authDataInfo } from '../../../environments/textual-changes';
import { HttpService } from '../../services/http.service';
import { endpoints, baseUrl } from '../../../environments/environment';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  authDataInfo = authDataInfo;
  signUpForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private httpService: HttpService,
    private route: Router,) {
    this.signUpForm = this.formBuilder.group(
      {
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        telephone: ['', [Validators.required]],
        recruiterCompanyName: ['', [Validators.required]],
        jobRoleId: ['', [Validators.required]]
      }
    );
  }

  ngOnInit(): void {
  }
  get formGet(): { [key: string]: AbstractControl } {
    return this.signUpForm.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    } else {
      this.doSignUp()
    }
    
  }
  doSignUp() {
    this.signUpForm.value.deviceType = "NA";
    this.signUpForm.value.regdId = "NA";
    const _recruiterSignup = baseUrl + endpoints.post.recruiterSignup;
    console.log("_recruiterSignup",JSON.stringify(this.signUpForm.value));
    this.httpService.doPost(_recruiterSignup, this.signUpForm.value).subscribe((response: any) => {
      console.log("SignUp response :::", response.data);
      if (response.status === 'success') {
        localStorage.setItem("sessionId", response.data.sessionId);
        const userIdGet = response.data.userId;
        const _getRecruiterProfile = baseUrl + endpoints.get.user + userIdGet + endpoints.get.getRecruiterProfile;
        this.httpService.doGet(_getRecruiterProfile).subscribe((result: any) => {
          console.log("rec profile", result);
          if (result.status === 'success') {
          this.route.navigate(['/verifyemail']);
          }
        });
      }
      else {
      }
    }, (err: any) => {
      console.log(err);
    });
  }

}
