import { Component, OnInit } from '@angular/core';
import { emsService } from '../../services/emsService';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Options } from 'ng5-slider';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
@Component({
  selector: 'app-ems-add',
  templateUrl: './ems-add.component.html',
  styleUrls: ['./ems-add.component.css']
})
export class EmsAddComponent implements OnInit {
  minValue: number = 10;
  maxValue: number = 90;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 10,
    showTicks: true
  };
  bloodGroup: Array<any> = [];
  categories = [
    { bloodGroup: "AB +ve", id: 1 },
    { bloodGroup: "O +ve", id: 3 },
    { bloodGroup: "B +ve", id: 4 }
  ];
  sex: Array<any> = [];
  sexCat = [
    { sex: "Male", id: 1 },
    { sex: "Female", id: 3 }
  ];
  emsAdd: FormGroup;
  submitted = false;
  response: any;
  userName: any;
  password: any;
  retypePassword: any;
  fullName: any;
  nationality: any;
  martialStatus: any;
  dob: any;
  joiningDate: any;
  contactNumber: any;
  designation: any;
  personalEmail: any;
  address: any;
  city: any;
  pinCode: any;
  policyElgible: boolean;
  constructor(private calendar: NgbCalendar, private emsservice: emsService, private formBuilder: FormBuilder, private routeCtrl: Router) {
    this.emsAdd = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      retypePassword: ['', Validators.required],
      fullName: ['', Validators.required],
      sex: ['', Validators.required],
      dob: ['', Validators.required],
      joiningDate: ['', Validators.required],
      nationality: ['', Validators.required],
      martialStatus: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      contactNumber: ['', Validators.required],
      personalEmail: ['', Validators.required],
      designation: ['', Validators.required],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      pinCode: ['', [Validators.required]],
    });
  }
  sexChange(type: string, event) {
    console.log(type, event);
    const eventValue = event.target.value;
    const control = this.emsAdd.get(type);
    let values = control.value || [];
    let index = values.indexOf( eventValue );
    if(index !== -1 ) {
      values.splice(index, 1);
    } else {
      values.push(eventValue);
    }
    control.setValue(values);
    console.log(control, control.value);
    // if (isChecked) {
    //   this.bloodGroup.push(bloodGroup);
    // } else {
    //   let index = this.bloodGroup.indexOf(bloodGroup);
    //   this.bloodGroup.splice(index, 1);
    // }
  }
  bloodGroupChange(type: string, event) {
    console.log(type, event);
    const eventValue = event.target.value;
    const control = this.emsAdd.get(type);
    let values = control.value || [];
    let index = values.indexOf( eventValue );
    if(index !== -1 ) {
      values.splice(index, 1);
    } else {
      values.push(eventValue);
    }
    control.setValue(values);
    console.log(control, control.value);
  }
  goEmsEdit() {
    console.log("goEmsEdit", this.emsAdd.invalid, this.emsAdd);
    if (this.emsAdd.invalid) {
      return;
    }
    console.log('SUCCESS!! :-)');

    let emsAddDataSend = {
      ...this.emsAdd.value,
      "policy": this.policyElgible,
      slider: {
        min: this.minValue,
        max: this.maxValue
      },
    }

    this.emsservice.emsAdd(emsAddDataSend)
      .subscribe(data => {
        this.response = data;
        console.log("this.response", this.response);
        this.emsservice.emsInfo = emsAddDataSend;
        console.log("Ems Data Add", this.emsservice.emsInfo);
        this.routeCtrl.navigate(['empInfo']);
      },
        error => console.log(error));
  }
  ngOnInit() {

  }
  get f() { return this.emsAdd.controls; }
  get joiningDateFun() { return this.emsAdd.controls; }
  emsAddFunction() {
    this.submitted = true;
  }
}
