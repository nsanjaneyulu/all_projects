import { Component, OnInit } from '@angular/core';
import { emsService } from '../../services/emsService';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-ems-update',
  templateUrl: './ems-update.component.html',
  styleUrls: ['./ems-update.component.css']
})
export class EmsUpdateComponent implements OnInit {
  minValue: number = 10;
  maxValue: number = 90;
  policyElgible: boolean;
  bloodGroup: Array<any> = [];
  categories = [
    { bloodGroup: "AB +ve", id: 1, checked:false },
    { bloodGroup: "O +ve", id: 3, checked:false },
    { bloodGroup: "B +ve", id: 4,checked:false }
  ];
  sex: Array<any> = [];
  sexCat = [
    { sex: "Male", id: 1, checked:false },
    { sex: "Female", id: 3, checked:false }
  ];
  response: any;
  emsInfoGetData: any;
  emsAdd: FormGroup;
  address: any;
  city: any;
  contactNumber: any;
  designation: any;
  dob: any;
  fullName: any;
  nationality: any;
  password: any;
  personalEmail: any;
  pinCode: any;
  retypePassword: any;
  userName: any;
  martialStatus:any;
  constructor(private calendar: NgbCalendar,private emsService: emsService, private formBuilder: FormBuilder, private routeCtrl: Router) {
    this.emsInfoGetData = this.emsService.emsUpdate;
    this.emsAdd = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      retypePassword: ['', Validators.required],
      fullName: ['', Validators.required],
      dob: ['', Validators.required],
      nationality: ['', Validators.required],
      contactNumber: ['', Validators.required],
      personalEmail: ['', Validators.required],
      designation: ['', Validators.required],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      martialStatus: ['', [Validators.required]],
      pinCode: ['', [Validators.required]]
    });
  }
  ngOnInit() {
    console.log("Ems Data Update", this.emsInfoGetData);
    this.emsInfoGetData[0].bloodGroup.forEach(element => {
      this.categories.forEach(value=>{
        if(value.bloodGroup==element){
          value.checked=true;
        }
      })
    });
    if (typeof(this.emsInfoGetData[0].sex) == 'object')
    {
      this.emsInfoGetData[0].sex.forEach(element => {
        this.sexCat.forEach(value=>{
          if(value.sex==element){
            value.checked=true;
          }
        })
      });
    }
    else if(typeof(this.emsInfoGetData[0].sex) == 'string') {
      this.sexCat.forEach(value=>{ 
          if(this.emsInfoGetData[0].sex == value.sex){
            value.checked=true;
            console.log("value", this.emsInfoGetData[0].sex);
          }
      })
    }
    this.userName = this.emsInfoGetData[0].userName;
    this.password = this.emsInfoGetData[0].password;
    this.address = this.emsInfoGetData[0].address;
    this.city = this.emsInfoGetData[0].city;
    this.contactNumber = this.emsInfoGetData[0].contactNumber;
    this.designation = this.emsInfoGetData[0].designation;
    this.dob = this.emsInfoGetData[0].dob;
    this.fullName = this.emsInfoGetData[0].fullName;
    this.nationality = this.emsInfoGetData[0].nationality;
    this.personalEmail = this.emsInfoGetData[0].personalEmail;
    this.pinCode = this.emsInfoGetData[0].pinCode;
    this.retypePassword = this.emsInfoGetData[0].retypePassword;
    this.sex = this.emsInfoGetData[0].sex;
    this.martialStatus = this.emsInfoGetData[0].martialStatus;
    this.bloodGroup = this.emsInfoGetData[0].bloodGroup;
    this.minValue = this.emsInfoGetData[0]['slider'].min;
    this.maxValue = this.emsInfoGetData[0]['slider'].max;
    this.policyElgible = this.emsInfoGetData[0].policy;  
  

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
 
  goEmsUpdate() {
    console.log("goEmsEdit");
    if (this.emsAdd.invalid) {
      return;
    }
    console.log('SUCCESS!! :-)')
    this.emsService.emsAddDataUpdate(this.emsInfoGetData[0]._id, this.userName, this.password, this.retypePassword, this.fullName, this.sex, this.nationality, this.dob, this.contactNumber, this.personalEmail, this.designation, this.address, this.city, this.pinCode)
      .subscribe(data => {
        this.response = data;
        console.log("this.response", this.response);
      },
        error => console.log(error));
  }
  get f() { return this.emsAdd.controls; }
}
