import { Component, OnInit } from '@angular/core';
import { emsAttendanceService } from '../../services/attendance';
import { Router } from "@angular/router";
@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit {
  getAttendanceListObj: any;
  constructor(private emsAttendance:emsAttendanceService, private routeCtrl:Router) { }

  ngOnInit() {
    this.emsAttendance.geAttendanceList().subscribe(resp => {
      this.getAttendanceListObj = resp;
      console.log("this.getAttendanceListObj",this.getAttendanceListObj); 
    });
  }

}
