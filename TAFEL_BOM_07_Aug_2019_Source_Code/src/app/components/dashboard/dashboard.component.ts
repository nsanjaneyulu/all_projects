import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DashboardService } from '../../services/dashboard.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { all } from 'q';
import { ViewOrderDetailsComponent } from '../view-order-details/view-order-details.component';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  outletId = "all";
  allPermitted = "Yes";
  orderStatusCompleted = true;
  showLoader: boolean;
  dineraddress: any;
  orderDetailsModal = false;
  fullOrder5DigitID: any;
  viewDetails:any;
  orderDetailsTableShow = false;
  loginStorage: any;
  mallDataResp: any;
  mallDetailsDropdown: any;
  mallDetailsMallName: any;
  mallDetailsMallId: any;
  orderDetailsResp: any;
  orderStatus: any;
  fullOrderId: any;
  status: any;
  getUserID: any;
  allCount:any;
  pendingCount:any;
  acceptCount:any;
  readyCount:any;
  rejectedCount:any;
  completedCount:any;
  rejectedAmount:any;
  completedAmount:any;
  sh: any;
  all={mallId:"all", mallName:"All", allPermitted:"Yes"};
  mallOutletId:any;
  getAllCountsResp = {} || [];
  outletDetailsResp={} || [];
  constructor(private dialog:MatDialog,private toastrManager:ToastrManager,private routeCtrl: Router, private dashboardService: DashboardService) {
        this.getUserID = localStorage.getItem('USERID');
   }
   
  ngOnInit() {

   
    this.mallDetails();
 
   
    
   
  }
 
  orderDetailsTable(status) {

    this.orderStatus = status;
    this.orderDetailsTableShow = !this.orderDetailsTableShow;
    this.orderDetailsTableShow = true;
    this.orderDetails(this.orderStatus);
   
  }
  mallDetails() {
    let mallDetailsURL ="";
    mallDetailsURL= 'userid/' + this.getUserID + '/getMalls'
    this.dashboardService.mallDetailsServices(mallDetailsURL)
    .subscribe(data => {
      this.mallDataResp = data;
      this.mallDataResp.unshift(this.all)
     
      this.mallDetailsDropdown = this.mallDataResp[0].mallId;
      this.mallDetailsMallId = this.mallDataResp[0].mallId;
      this.allPermitted = this.mallDataResp[0].allPermitted;
      if(this.allPermitted == 'No'){
        let getOutletDetailsURL = 'mall/' + this.mallDetailsMallId + '/getOutletByMallID';
        this.dashboardService.outletDetailsService(getOutletDetailsURL)
        .subscribe(data => {
          this.outletDetailsResp = data;
          this.outletDetailsResp['jmoutlet'].unshift({id:"all", name:"All"})
          this.mallOutletId=this.outletDetailsResp['jmoutlet'][0].id;
          this.outletId= this.mallOutletId
         
        });
      }else{
        this.outletId= "all"
      }
   
      if(this.mallDetailsMallId){
        this.getAllCounts(this.mallDetailsMallId);
      }
      
     
       this.orderDetailsOnMallChange('all');
     
    },
      error => console.log(error));
  }
  getAllCounts(mallID) {
   
    let getAllCountsURL ="";
    let page ="dashboard";
    getAllCountsURL= 'mall/' + mallID + '/outletid/' + this.outletId + '/page/' + page + '/getAllOrderStatusCount';
    this.dashboardService.getAllCountsService(getAllCountsURL)
    .subscribe(data => {
      this.getAllCountsResp = data;
    
      
    },
      error => console.log(error));
  }
  orderDetails(orderStatus) {  
    this.status = orderStatus; 
   
    let orderDetailsURL=""
    if(this.status=="Rejected" || this.status=="Completed")
    {
     
      orderDetailsURL = 'mall/' + this.mallDetailsMallId + '/outletid/' + this.outletId + '/status/' + this.status + '/get_rejected_completed_order';
     
    }
    else {
      orderDetailsURL = 'mall/' + this.mallDetailsMallId + '/outletid/' + this.outletId + '/status/' + this.status + '/get_pending_accept_ready_Order';
     
    }
    this.showLoader = true;
    this.dashboardService.orderDetailsService(orderDetailsURL)
    .subscribe(data => {
      this.orderDetailsResp = data;
      this.showLoader = !true;
      this.orderDetailsResp.forEach(element => {
        if(element.status == "RECEIVED")
        {
          element.status = "Pending";   
        }
        else if(element.status == "INPROGRESS")
        {
          element.status = "Accept";
        }
        else if(element.status == "READY")
        {
          element.status = "Ready";  
        }
        else {
         
        }
      });
      if(this.orderDetailsResp.length > 0) {
        this.orderDetailsTableShow = true;
        
      }
      else {
        this.orderDetailsTableShow = false;
      }
      this.status = orderStatus;  
   
        
      this.mallDetailsMallName = this.mallDataResp[0].mallName;    
    },
      error => console.log(error));
  }
  orderDetailsFunction(orderDetails) {
    const dialogRef = this.dialog.open(ViewOrderDetailsComponent, {
      width: '60%',
      data: orderDetails
    });

    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
  refreshOrderDetails() {
    this.orderDetails(this.status);
    this.getAllCounts(this.mallDetailsMallId);
  
  }
  mallNameChange(mallID) {
    this.orderStatus="all"
    this.mallDetailsMallId=mallID;
    this.mallDataResp.forEach(element => {
      if (element.mallId == mallID){
        this.allPermitted = element.allPermitted;
        if(this.allPermitted=='No'){
          let getOutletDetailsURL = 'mall/' + mallID + '/getOutletByMallID';
          this.dashboardService.outletDetailsService(getOutletDetailsURL)
          .subscribe(data => {
            this.outletDetailsResp = data;
            this.outletDetailsResp['jmoutlet'].unshift({id:"all", name:"All"})
            this.mallOutletId= this.outletDetailsResp['jmoutlet'][0].id;;
            this.outletId=this.mallOutletId;
            this.orderDetailsOnMallChange('all');
            this.getAllCounts(mallID);
            
          });
        }else{
          this.outletId="all";
          this.orderDetailsOnMallChange('all');
          this.getAllCounts(mallID);
        }
        
          
          
       
      }
    });
   
    
  
   
    
  }
  outletNameChange(mallOutletId) {
   
    this.outletId = mallOutletId;
    this.orderDetailsOnMallChange('all');
    this.getAllCounts(this.mallDetailsMallId);
  }
  orderDetailsOnMallChange(orderStatus) { 
    this.status = orderStatus; 
    
    let orderDetailsURL=""
    if(this.status=="rejected" || this.status=="completed")
    {
      orderDetailsURL = 'mall/' + this.mallDetailsMallId + '/outletid/' + this.outletId + '/status/' + this.status + '/get_rejected_completed_order';
     

    }
    else {
      orderDetailsURL = 'mall/' + this.mallDetailsMallId + '/outletid/' + this.outletId + '/status/' + this.status + '/get_pending_accept_ready_Order';
     
    }
    this.showLoader =true;
  
    this.dashboardService.orderDetailsService(orderDetailsURL)
    .subscribe(data => {
      
      this.orderDetailsResp = data;
     
      this.showLoader = !true;
      this.orderDetailsResp.forEach(element => {
        if(element.status == "RECEIVED")
        {
          element.status = "Pending";           
        }
        else if(element.status == "INPROGRESS")
        {
          element.status = "Accept"; 
        }
        else if(element.status == "READY")
        {
          element.status = "Ready";   
        }
        else {

        }
      });
      if(this.orderDetailsResp.length > 0) {
        this.orderDetailsTableShow = true;
        
      }
      else {
        this.orderDetailsTableShow = false;
      }
      this.status = orderStatus;  
   
        
      this.mallDetailsMallName = this.mallDataResp[0].mallName;    
    },
      error => console.log(error));
      
     
  }

  
 
}
