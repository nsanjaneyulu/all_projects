import { Component, OnInit } from '@angular/core';
import { emsLeaveRequestService } from '../../services/leaveService';
import { Router } from "@angular/router";
@Component({
  selector: 'app-leave-info',
  templateUrl: './leave-info.component.html',
  styleUrls: ['./leave-info.component.css']
})
export class LeaveInfoComponent implements OnInit {
  emsLeaveListGetData = [];
  constructor(private routeCtrl: Router,private emsLeaveRequestService: emsLeaveRequestService) { 

this.emsLeaveListGetData.push(this.emsLeaveRequestService.emsLeaveInfo);
  }

  ngOnInit() {
    console.log("emsLeaveListGetData...", this.emsLeaveListGetData);
  }
  goLeaveRequestUpdate() {
    this.emsLeaveRequestService.emsLeaveUpdate = this.emsLeaveListGetData;
    this.routeCtrl.navigate(['emsLeaveUpdate']);
  }
}
