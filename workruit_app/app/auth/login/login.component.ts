import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { authDataInfo } from '../../../environments/textual-changes';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { endpoints, baseUrl } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authDataInfo = authDataInfo;
  // authDataInfo = authDataInfo;
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private route: Router,
    private toastr: ToastrService
  
  ) {
    this.loginForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    );
  }
  ngOnInit(): void {
      this.getMasterdata();
  }
  get formGet(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.doLogin()
    }
  }
  getMasterdata() {
    const getCompanyProfileUrl = baseUrl + endpoints.get.masterData;
    this.httpService.doGet(getCompanyProfileUrl).subscribe((result: any) => {    
      localStorage.setItem('masterData', JSON.stringify(result));
    }, (err: any) => {
      console.log(err);
    });
  }
  doLogin() {
    this.loginForm.value.role= "recruiter"
    this.loginForm.value.regdId= "NA";
    const _dashboardLogin = baseUrl + endpoints.post.dashboardLogin;
    this.httpService.doPost(_dashboardLogin, this.loginForm.value).subscribe((response: any) => {
      // localStorage.setItem('auth_session_id', JSON.session_id)
      if (response.status === 'success') {
        // const userData = {};
        console.log(response);
        const userData = {
          "userData" : {
            firstname : response.data.firstname,
            lastname : response.data.lastname,
            email : response.data.email,
            picture: response.data.company.picture,
            company: response.data.company
        }
      }
        console.log("userData", userData);
        let userId = response.data.userId;
        // this.toastr.success('Login', 'Hello');

        localStorage.setItem("sessionId", response.sessionId);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userData", JSON.stringify(userData));
        this.route.navigateByUrl('/applicant', { state: response.data });          
          if (response.data.status === 2) {
            // this.toastr.success(response.msg.description);
          } else if (Object.keys(response.data.company).length == 0) {
            this.route.navigateByUrl(`/company/${response.data.userId}`);
          } else if (response.data.company.companyIndustriesSet.length == 0) {
            this.route.navigateByUrl(`/company/${response.data.userId}`);
          } else {
            var imagePath = response.data.company.picture;
            localStorage.setItem("companyImage", imagePath);
            localStorage.setItem("userId", response.data.userId);
            this.route.navigate(['/applicant']);
          }
        
      
      }
      else {
        this.toastr.success(response.msg.description);
      }
    }, (err: any) => {
      console.log(err);
    });
  }

}
