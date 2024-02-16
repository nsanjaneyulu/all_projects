import { Component, OnInit } from '@angular/core';
import { emsLeaveRequestService } from '../../services/leaveService';
import { Router } from "@angular/router";
@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css']
})
export class LeaveListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  getEmsStatusObj:any;
  formatsDateTest: string[] = [
    'dd/MM/yyyy hh:mm:ss'
    ];
  
  dateNow : Date = new Date();
  constructor(private emsLeaveRequestService: emsLeaveRequestService, private routeCtrl:Router) { }

  ngOnInit() {
    this.emsLeaveRequestService.getEmsStatus().subscribe(resp => {
      this.getEmsStatusObj = resp;
      let getEmsStatusObjValue = this.getEmsStatusObj;
      console.log("getEmsStatusObjValue", getEmsStatusObjValue);
      getEmsStatusObjValue.forEach(getStringPassValue=>{
        var convertedFromDate = (getStringPassValue.fromDate.day + "/" +getStringPassValue.fromDate.month + "/" + getStringPassValue.fromDate.year);
        var convertedToDate = (getStringPassValue.toDate.day + "/" +getStringPassValue.toDate.month + "/" + getStringPassValue.toDate.year);

        getStringPassValue.fromDate=convertedFromDate;
        getStringPassValue.toDate=convertedToDate;
      })      
    });
  }
  goEmsLeaveListDetails(emsLeaveList) {
    console.log("goEmsLeaveListDetails", emsLeaveList);
    this.emsLeaveRequestService.emsLeaveInfo=emsLeaveList;
    console.log("goEmsLeaveListDetails Info",this.emsLeaveRequestService.emsLeaveInfo);
    this.routeCtrl.navigate(['emsLeaveInfo']);
  }

}
