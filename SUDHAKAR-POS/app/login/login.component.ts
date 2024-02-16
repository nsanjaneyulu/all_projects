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
  loginForm: FormGroup;

  constructor(public authService: AuthService, public router: Router, fb: FormBuilder) {
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
        if (result.refreshToken) {
          this.goTo('sale');
        }
      });
  }

}
