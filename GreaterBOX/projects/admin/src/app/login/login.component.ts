import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import Swal from "sweetalert2";
import { ANIMATION_TYPES } from "ng2-loading-spinner";
import { INg2LoadingSpinnerConfig } from "ng2-loading-spinner";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  show = false;
  loadingConfig: INg2LoadingSpinnerConfig = {
    animationType: ANIMATION_TYPES.chasingDots,
    spinnerPosition: "center",
    backdropBorderRadius: "25px",
    spinnerSize: "lg",
    spinnerFontSize: "2rem",
    spinnerColor: "white",
    //backdropBorderRadius:
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: UserService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }
  get f() {
    return this.loginForm.controls;
  }

  onLoginSubmit() {
    this.show = true;
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const loginPayload = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
    };
    console.log("login", loginPayload);
    this.apiService.login(loginPayload).subscribe(
      (data) => {
        console.log("data", data);
      },
      (err) => {
        //Just Because the responce is not in Json so that I have to do this to make it consistant.
        console.log("err", err);
        if (err.status === 200) {
          window.localStorage.setItem("userToken", err.error.text);
          this.show = false;
          this.router.navigate(["orders"]);
        } else {
          this.show = false;
          Swal.fire("Oops...", "Wrong email address or password", "error");
        }
      }
    );
  }
}
