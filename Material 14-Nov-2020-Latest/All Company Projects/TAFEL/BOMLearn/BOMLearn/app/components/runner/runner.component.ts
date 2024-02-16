import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { AddRunnerComponent } from '../../components/add-runner/add-runner.component';
import { Observable, Subject } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-runner',
  templateUrl: './runner.component.html',
  styleUrls: ['./runner.component.css']
})
export class RunnerComponent implements OnInit {
  getSupplier: any;
  mallDataResp: any = [];
  mallName: any;
  constructor(public dashboardService : DashboardService, private dialog:MatDialog) { }

  ngOnInit() {
    this.getMallsData();
  }
  getMallsData() {
    this.getSuppliers().subscribe(supplierValues => {
      this.getMallDetails().subscribe(mallsValues => {
        this.initializeSuppers()
      })
    })
  }
  initializeSuppers() { 
    this.getSupplier.forEach(supplierMallIds => {  
      supplierMallIds['mall'] = [];    
      supplierMallIds['outlet'] = [];      
        this.mallDataResp.forEach(getMallMallIds => {
          if(supplierMallIds.mallId==getMallMallIds.mallId){           
            supplierMallIds['mall'].push(getMallMallIds);
          } 
          getMallMallIds['outletIds'].forEach(outletName => {
             
            if(supplierMallIds.mallId==outletName.mallId){           
              supplierMallIds['outlet'].push(outletName);
            } 
           
          });    
      });
    
    });
   
  }
  public getSuppliers(): Observable<any> {

    const subject$ = new Subject();
    const getSuppliersUrl = '/allSuppliers';
    this.dashboardService.getSupplierList(getSuppliersUrl)
      .subscribe(data => {
      
        this.getSupplier = data;
        subject$.next(this.getSupplier);
      
      })
    return subject$;

  }
  public getMallDetails(): Observable<any> {

    const subject$ = new Subject();
    const mallDetailsURL = '/userid/' + "00ae9fbf-e7f8-469e-81da-3ce16cb4c126" + '/getMalls';
    this.dashboardService.getMallDetails(mallDetailsURL)
      .subscribe(data => {
       
        this.mallDataResp = data;
        subject$.next(this.mallDataResp);
       
      })
    return subject$;
  }
  updateSupplier(supplier){
    let updateRunner={
      "supplier":supplier,
      "buttonShow":"Update",
      "title":"Update"
    }
    const dialogRef = this.dialog.open(AddRunnerComponent, {
      width: '70%',
      data:updateRunner
    });
    dialogRef.afterClosed().subscribe(result => {     
    });
    
  }
  createSupplier(){
    let data1={
      "supplier":{},
      "buttonShow":"Create",
      "title":"Create"
    }
    const dialogRef = this.dialog.open(AddRunnerComponent, {
      width: '70%',
      data:data1
    });
    dialogRef.afterClosed().subscribe(result => {     
    });
  }
}
