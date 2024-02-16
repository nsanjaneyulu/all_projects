import { Component, OnInit } from '@angular/core';
import { emsService } from 'src/services/emsService';
import { Router } from "@angular/router";
@Component({
  selector: 'app-ems-info',
  templateUrl: './ems-info.component.html',
  styleUrls: ['./ems-info.component.css']
})
export class EmsInfoComponent implements OnInit {
  emsAddGetData = [];
  minValue: number = 10;
  maxValue: number = 90;
  policyElgible: boolean;
  constructor(
    private emsService: emsService, private routeCtrl: Router) {
    this.emsAddGetData.push(this.emsService.emsInfo);
  }
  ngOnInit() {
    console.log("Ems Data Info", this.emsAddGetData);
    this.minValue = this.emsAddGetData[0]['slider'].min;
    this.maxValue = this.emsAddGetData[0]['slider'].max;
    this.policyElgible = this.emsAddGetData[0].policy;  
    let getEmsInfoObjValue = this.emsAddGetData;
    console.log("Ems Data Info values", getEmsInfoObjValue);
    getEmsInfoObjValue.forEach(getEmsInfoPassValue=>{
      console.log("getEmsInfoPassValue", getEmsInfoPassValue);
        var dobString = (getEmsInfoPassValue.dob.day + "/" +getEmsInfoPassValue.dob.month + "/" + getEmsInfoPassValue.dob.year);
        var joiningDateString = (getEmsInfoPassValue.joiningDate.day + "/" +getEmsInfoPassValue.joiningDate.month + "/" + getEmsInfoPassValue.joiningDate.year);
        getEmsInfoPassValue.dob=dobString;
        getEmsInfoPassValue.joiningDate=joiningDateString;
      })
  }
  goEmsUpdate() {
    this.emsService.emsUpdate = this.emsAddGetData;
    this.routeCtrl.navigate(['empUpdate']);
  }
}
