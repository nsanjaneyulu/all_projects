import { Component, OnInit } from '@angular/core';
import { emsLeaveRequestService } from '../../services/leaveService';
import { Router } from "@angular/router";
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-leave-update',
  templateUrl: './leave-update.component.html',
  styleUrls: ['./leave-update.component.css']
})
export class LeaveUpdateComponent implements OnInit {
  emsLeaveListGetData = [];
  response: any;
  emsLeaveInfoGetData: any;
  emsLeaveRequestUpdate: FormGroup;
  userName: any;
  leaveType: any;
  leaveReason: any;
  noOfDays: any;
  fromDate: any;
  toDate: any;
  leaveStatus: any;
  constructor(private formBuilder: FormBuilder,private routeCtrl: Router,private emsLeaveRequestService: emsLeaveRequestService) {
    this.emsLeaveListGetData.push(this.emsLeaveRequestService.emsLeaveInfo);
    this.emsLeaveInfoGetData = this.emsLeaveRequestService.emsLeaveUpdate;
    this.emsLeaveRequestUpdate = this.formBuilder.group({

      userName: ['', Validators.required],
      leaveType: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      noOfDays: ['', Validators.required],
      leaveReason: ['', Validators.required],
      leaveStatus: ['', Validators.required]
     
    });
   }

  ngOnInit() {
    console.log("emsLeaveInfoGetData...", this.emsLeaveInfoGetData);
    this.userName = this.emsLeaveInfoGetData[0].userName;
    this.leaveType = this.emsLeaveInfoGetData[0].leaveType;
    this.fromDate = this.emsLeaveInfoGetData[0].fromDate;
    this.toDate = this.emsLeaveInfoGetData[0].toDate;
    this.noOfDays = this.emsLeaveInfoGetData[0].noOfDays;
    this.leaveReason = this.emsLeaveInfoGetData[0].leaveReason;
    this.leaveStatus = this.emsLeaveInfoGetData[0].leaveStatus;
  }
  goEmsLeaveUpdate() {
    console.log("goEmsLeaveUpdate");
    if (this.emsLeaveRequestUpdate.invalid) {
      return;
    }
    console.log('SUCCESS!! :-)')
    this.emsLeaveRequestService.emsLeaveRequestDataUpdate(this.emsLeaveInfoGetData[0]._id, this.userName, this.leaveType, this.leaveReason, this.leaveStatus, this.noOfDays, this.fromDate, this.toDate)
      .subscribe(data => {
        this.response = data;
        console.log("this.response", this.response);
      },
        error => console.log(error));
  }
}
