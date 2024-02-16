import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  myTextVal: string;
  valueFromChild: string;
  constructor(public dashboardService : DashboardService) { }
  sendTextValue(){
  
    this.dashboardService.passValue(this.myTextVal);
  }
  readOutputValueEmitted(val){
    this.valueFromChild = val;
  }
  ngOnInit() {
  }

}
