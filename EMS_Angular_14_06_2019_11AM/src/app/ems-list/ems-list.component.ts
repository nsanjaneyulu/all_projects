import { Component, OnInit } from '@angular/core';
import { emsService } from '../../services/emsService';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
@Component({
  selector: 'app-ems-list',
  templateUrl: './ems-list.component.html',
  styleUrls: ['./ems-list.component.css']
})
export class EmsListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  getEmsListObj:any;
  sliderMin: any;
  constructor(private emsservice:emsService, private routeCtrl:Router) { 
    
  }
  goEmsListDetails(emsList) {
    console.log("emsList", emsList);
    this.emsservice.emsInfo=emsList;
    console.log("Ems Data Add",this.emsservice.emsInfo);
    this.routeCtrl.navigate(['empInfo']);
  }
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.emsservice.getEmsList().subscribe(resp => {
      this.getEmsListObj = resp;
      console.log("this.getEmsListObj",this.getEmsListObj); 
    });
  }
  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }
}
