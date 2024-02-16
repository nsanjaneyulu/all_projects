import { Component, OnInit } from '@angular/core';
import { emsLeaveRequestService } from '../../services/leaveService';
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons';
import { Router } from "@angular/router";
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
// import swal from 'sweetalert';
@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {
  userName: any;
  leaveType: any;
  fromDate: any;
  toDate: any;
  noOfDays: any;
  leaveReason: any;
  leaveRequest: FormGroup;
  submitted = false;
  leaveRequestservice:any;
  response: any;
  constructor(private formBuilder: FormBuilder, private routeCtrl: Router, private emsLeaveRequestService: emsLeaveRequestService,) { 
    this.leaveRequest = this.formBuilder.group({
      userName: ['', Validators.required],
      leaveType: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      noOfDays: ['', Validators.required],
      leaveReason: ['', Validators.required]
    });
  }
  goLeaveRequest() {
    console.log("goEmsEdit", this.leaveRequest.invalid, this.leaveRequest);
    if (this.leaveRequest.invalid) {
      return;
    }
    console.log('SUCCESS!! :-)');
    let leaveStatus = "Received"
    let leaveRequestDataSend = {
      ...this.leaveRequest.value,leaveStatus
      }
      this.emsLeaveRequestService.emsLeaveRequest(leaveRequestDataSend)
      .subscribe(data => {
        this.response = data;
        console.log("this.response", this.response);
      },
        error => console.log(error));
    }

  ngOnInit() {
  }
  get f() { return this.leaveRequest.controls; }
  leaveRequestFunction() {
    this.submitted = true;
  }

}
