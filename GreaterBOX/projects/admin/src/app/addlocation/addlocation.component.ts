import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { PickupLocationService } from "../services/pickup-location.service";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-addlocation",
  templateUrl: "./addlocation.component.html",
  styleUrls: ["./addlocation.component.scss"],
})
export class AddlocationComponent implements OnInit, OnDestroy {
  addProductForm: FormGroup;
  submitted = false;
  subscriptions: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: PickupLocationService
  ) {}

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.addProductForm = this.formBuilder.group({
      location: ["", [Validators.required]],
      pickUpTimeStart: ["", Validators.required],
      pickUpTimeEnd: ["", Validators.required],
    });

    const endTimeSubscription = this.getPickupStartTime.valueChanges
      .pipe(
        map((value) => {
          if (value) {
            this.getPickupEndTime.setValidators([
              Validators.required,
              this.validateTime.bind(null, value),
            ]);
          } else {
            this.getPickupEndTime.setValidators([Validators.required]);
          }
          this.getPickupEndTime.updateValueAndValidity();
        })
      )
      .subscribe();
    this.subscriptions.add(endTimeSubscription);
  }

  validateTime(value: string, control: AbstractControl) {
    const inputValue = control.value;
    if (!inputValue) {
      return { required: true };
    }
    if (typeof inputValue === "string") {
      return inputValue.localeCompare(value) > 0
        ? null
        : { shouldbeGreater: true };
    }
  }

  get getPickupEndTime() {
    return this.addProductForm.get("pickUpTimeEnd") as FormControl;
  }

  get getPickupStartTime() {
    return this.addProductForm.get("pickUpTimeStart") as FormControl;
  }

  get f() {
    return this.addProductForm.controls;
  }

  onAddSubmit() {
    this.submitted = true;
    if (this.addProductForm.invalid) {
      return;
    }

    const startTimeValue = this.addProductForm.controls.pickUpTimeStart.value;
    const endTimeValue = this.addProductForm.controls.pickUpTimeEnd.value;
    const pickupTimeS = this.apiService.getFormatTime(startTimeValue);
    const pickupTimeE = this.apiService.getFormatTime(endTimeValue);

    const loginPayload = {
      location: this.addProductForm.controls.location.value,
      pickUpTimeStart: pickupTimeS,
      pickUpTimeEnd: pickupTimeE,
      isActive: true,
    };
    var authorisation = "Bearer " + window.localStorage.getItem("userToken");
    this.apiService.addLocation(authorisation, loginPayload).subscribe(
      (data) => {
        var data1 = JSON.stringify(data);
        var data2 = JSON.parse(data1);
        //this.order=data2;
        console.log("Order", data2);
        if (data2 === true) {
          this.router.navigate(["pickup-location"]);
        }
      },
      (err) => {
        console.log("err", err);
      }
    );
  }

  reset() {
    this.router.navigate(["pickup-location"]);
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
