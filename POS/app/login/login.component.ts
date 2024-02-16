import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'tafelposapp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  password: any;
  userId: any;
  show: boolean;
  constructor(public authService: AuthService, public router: Router, fb: FormBuilder) {
    this.show = false;
    this.loginForm = fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  get f() { return this.loginForm.controls; }

  goTo(path): void {
    this.router.navigateByUrl(path);
  }

  login(): void {
    this.authService.login(this.loginForm.value)
      .subscribe(result => {
       
          this.goTo('sale');
          this.fullScreen();
        
      });
  }
  showPassword() {
    this.show = !this.show;
  }
  fullScreen() {
    // this.showFullsreen=false;
    let elem = document.documentElement;
    let methodToBeInvoked = elem.requestFullscreen ||
      elem['webkitRequestFullScreen'] || elem['mozRequestFullscreen']
      ||
      elem['msRequestFullscreen'];
    if (methodToBeInvoked) methodToBeInvoked.call(elem);
}
}
