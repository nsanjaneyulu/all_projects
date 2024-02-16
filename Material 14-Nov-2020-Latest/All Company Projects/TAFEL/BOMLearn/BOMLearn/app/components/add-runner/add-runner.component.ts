import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {  FormGroup, FormBuilder,Validators,FormControl } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { Observable, Subject } from 'rxjs';
@Component({
  selector: 'app-add-runner',
  templateUrl: './add-runner.component.html',
  styleUrls: ['./add-runner.component.css']
})
export class AddRunnerComponent implements OnInit {
  suppliers = {};
  firstName="";
  lastName="";
  phoneNumber="";
  allpermited="";
  outLets:any;
  outletResp: any =[];
  mallDataResp: any;
  outletNames: any = [];
  isChecked:false;
  getLocations: any;
  outletNamesYes: any;
  mallNameMallId: string;
  title: string;
  buttonName: string;
  submitDetails: any;
  password: '';
  constructor(public dashboardService : DashboardService,public dialogRef: MatDialogRef<AddRunnerComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any) { 
      
      this.suppliers=data['supplier'];
      this.outletNames = data['supplier']['outlet'];
      this.buttonName=data['buttonShow'];
      this.title=data['title'];
     
      
    }

  ngOnInit() {
    this.getMallDetails();
    this.getLocation();
    this.getOutLets();
  }
 
 getMallDetails() {


    const mallDetailsURL = '/userid/' + "00ae9fbf-e7f8-469e-81da-3ce16cb4c126" + '/getMalls';
    this.dashboardService.getMallDetails(mallDetailsURL)
      .subscribe(data => {       
        this.mallDataResp = data;
        this.mallDataResp.forEach(value =>{
          value['isChecked']=false;
        })
       
      })
  }
  getLocation(){
    let getLocationsURL = "/allServiceStations";
    this.dashboardService.getAllServiceStations(getLocationsURL).subscribe(data =>{
      this.getLocations = data;

      this.getLocations.forEach(value=>{
        value['isChecked']=false;
      })

      })
  }
  selectLocation(ssId,supplier){

    
    let mall = [];
    this.mallDataResp.forEach(res=>{
      if(ssId == res.mall.serviceStationId){
        mall.push(res)
      }
    })
    supplier['mall'] = mall;
  
   
    
  }
  mallNameChange(mallid){
    this.mallNameMallId = mallid;
    this.outLets.forEach(res =>{
      if(mallid == res.mallId){
        const getOutletDetailsURL = 'mall/' + this.mallNameMallId + '/getOutletByMallID';
        this.dashboardService.outletDetailsService(getOutletDetailsURL)
        .subscribe(data => {
        
          this.outletResp = data;
         
         
        
        });
      }
    })
   
   
  
  }

  

  getOutLets(){
    const getOutletsURL = '/allOutlets';
    this.dashboardService.getOutLets(getOutletsURL).subscribe(data =>{
      this.outLets = data;
      this.outLets.forEach(value =>{
        value['isChecked']=false;
      })
  })
  }
  saveDetails(){ 
    let outletIds=[];
   
    if(this.suppliers['allpermited']=='Yes'){
      this.outletResp['jmoutlet'].forEach(data=>{
        if(data.isChecked){
         
          outletIds.push(data.id)
        }
      })
    }else{
      outletIds.push(this.suppliers['outletIds'])

    }   
 
    this.submitDetails={
      "firstName":this.suppliers['firstName'],
      "lastName": this.suppliers['lastName'],
      "phoneNumber":"+91"+this.suppliers['phoneNumber'],
      "allpermited":this.suppliers['allpermited'],
      "ssId":this.suppliers['ssId'],
      "mallId":this.suppliers['mallId'],
      "deviceId": "1111-2222-5555",
      "type": "SUPPLIER",
      "password":this.password,
      "outletIds":outletIds,

    },
    console.log("Create Supplier",this.submitDetails);

    const createSupplierURL = '/suppliers';
            this.dashboardService.createSupplier(this.submitDetails, createSupplierURL).subscribe(createSupplierResp =>{
              console.log("createSupplierResp",createSupplierResp);
            })
        
         
        
  }
  updateSupplier(){
   
    this.submitDetails={
      "id":this.suppliers['id'],
      "firstName":this.suppliers['firstName'],
      "lastName": this.suppliers['lastName'],
      "phoneNumber":this.suppliers['phoneNumber'],
      "allpermited":this.suppliers['allpermited'],
      "ssId":this.suppliers['ssId'],
      "mallId":this.suppliers['mallId'],
      "deviceId": "1111-2222-5555",
	    "password": "SUPPLIER",
      "type": "SUPPLIER",
      "outletIds":this.suppliers['outletIds']

    }
    const updateSupplierURL = '/updatesuppliers';
    console.log("Update Supplier",this.submitDetails);
    this.dashboardService.updateSupplier(this.submitDetails, updateSupplierURL).subscribe(updateSupplierResp =>{
      console.log("updateSupplierResp",updateSupplierResp);
    })
  }
  addOrRemoveOutlet(sectedOutlet){
   
    this.outletResp['jmoutlet'].forEach(data=>{
    
      if(data.id==sectedOutlet.id){
       
          data.isChecked= sectedOutlet.isChecked;
       
      }
    }) 
  }
}
