import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { emsAttendanceService } from '../../services/attendance';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  submitted = false;
  empId: any;
  userName: any;
  empName: any;
  designation: any;
  attendance: any;
  attendanceDate: any;
  emsAttendance: FormGroup;
  response: any;
  constructor(private formBuilder: FormBuilder, private routeCtrl: Router, private emsAttendanceService: emsAttendanceService) { 
    this.emsAttendance = this.formBuilder.group({
      empId: ['', Validators.required],
      userName: ['', Validators.required],
      empName: ['', Validators.required],
      designation: ['', Validators.required],
      attendance: ['', Validators.required],
      attendanceDate: ['', Validators.required],
    });
  }
  goEmsAttendance() {
    console.log("goEmsAttendance", this.emsAttendance.invalid, this.emsAttendance);
    if (this.emsAttendance.invalid) {
      return;
    }
    console.log('SUCCESS!! :-)');

    let emsAttendanceAddDataSend = {
      ...this.emsAttendance.value
    }

    this.emsAttendanceService.emsattendanceservice(emsAttendanceAddDataSend)
      .subscribe(data => {
        this.response = data;
        console.log("this.response", this.response);
        
      },
        error => console.log(error));
  }
  ngOnInit() {
  }
  get f() { return this.emsAttendance.controls; }
  get joiningDateFun() { return this.emsAttendance.controls; }
  emsAttendanceNewFunction() {
    this.submitted = true;
  }
}
