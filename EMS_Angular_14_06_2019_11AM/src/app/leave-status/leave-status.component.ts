import { Component, OnInit } from '@angular/core';
import { emsLeaveRequestService } from '../../services/leaveService';
import { Router } from "@angular/router";
@Component({
  selector: 'app-leave-status',
  templateUrl: './leave-status.component.html',
  styleUrls: ['./leave-status.component.css']
})
export class LeaveStatusComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  getEmsStatusObj:any;
  formatsDateTest: string[] = [
    'dd/MM/yyyy hh:mm:ss'
    ];
  
  dateNow : Date = new Date();
  constructor(private routeCtrl: Router, private emsLeaveRequestService: emsLeaveRequestService) {
      console.log("leave status");
   }

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
      
      // console.log("this.getEmsListObj",this.getEmsStatusObj);
      // for (var i=0; i<=getEmsStatusObjValue.length; i++)
      // {
      //   console.log("this.getEmsListObj",getEmsStatusObjValue.fromDate);

      // }
      
    });
  }
  
}
