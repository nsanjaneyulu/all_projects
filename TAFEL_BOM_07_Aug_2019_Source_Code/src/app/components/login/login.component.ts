import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData: FormGroup;
  username: any;
  password: any;
  loginDataResp:any;
  submitted = false;
  loginStorage:any;
  userID: any;
  userId: any;
  loadingSpinner:any=true;
  constructor(private toastrModule:ToastrManager,private loginService: LoginService, private formBuilder: FormBuilder,private routeCtrl: Router) { 
    this.loginData = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }
  ngOnInit() {
    if (localStorage.getItem('LOGIN') == "YES") {
      this.routeCtrl.navigate(['dashboard']);
    }
    else {
      this.routeCtrl.navigate(['login']);
    }
  }
  submitLogin() {
    this.loginStorage = 'LOGIN';
    this.loadingSpinner = false;
    this.userID = 'USERID';
    let loginDatasend = {
      ...this.loginData.value,
    }
    this.loginService.loginSubmit(loginDatasend)
      .subscribe(data => {
        this.loginDataResp = data;
        this.userId = this.loginDataResp.userId;
      
        localStorage.setItem("NAME",this.loginDataResp.name);
        localStorage.setItem(this.loginStorage, 'YES');
        localStorage.setItem(this.userID, this.userId);
       
        this.toastrModule.successToastr('Successfully logged in.', 'Success!');
        this.loadingSpinner=true;
        this.routeCtrl.navigate(['dashboard']);
        
      },error =>{
        var errorMessage = error.error.message.split('.');
        this.toastrModule.errorToastr(errorMessage[0]+".", 'Failure!');
        this.loadingSpinner = true;
        console.log(error);
      });
  }
}
