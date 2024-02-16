import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewOrderComponent } from '../../components/view-order/view-order.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  toggleChildElement: boolean = true;
  myTextVal: string;
  valueFromChild: string;
  mallDataResp: any = [];
  mallId: string;
  all={mallId:"all", mallName:"All", allPermitted:"Yes"};
  outletDetailsResp:any =  {} || [];
  allPermitted: string;
  outletId: any;
  orderDetailsResp: any = [];
  mallOutletId: string;
  orderStatus: string;
  orderDetailsTableShow:boolean = false;
  loader: boolean;
  constructor(public dashboardService : DashboardService,private matDialog: MatDialog) { }

  ngOnInit() {
    this.mallDetails();
  }
  viewOrderDetails(orderDetails) {
    const dialogRef = this.matDialog.open(ViewOrderComponent, {
      width: '60%',
      data: orderDetails
    });
    dialogRef.afterClosed().subscribe(result => {     
    });
  }
  mallDetails() 
  {
    let mallDetailsURL ="";
    mallDetailsURL= '/userid/' + "00ae9fbf-e7f8-469e-81da-3ce16cb4c126" + '/getMalls';
    this.dashboardService.getMallDetails(mallDetailsURL).subscribe(data => {
        this.mallDataResp = data;
        if(this.mallDataResp.length>1){
          this.mallDataResp.unshift(this.all)
        } 
        this.mallId = this.mallDataResp[0].mallId;
        if(this.mallId == 'all')
        {
         
        }
        else{         
          this.outletId = this.mallDataResp[0]['outletIds'][0]['id'];
        }
        if(this.allPermitted == 'No'){        
          let getOutletDetailsURL = 'mall/' + this.mallId + '/getOutletByMallID';
          this.dashboardService.outletDetailsService(getOutletDetailsURL)
          .subscribe(data => {
          this.outletDetailsResp = data;
          this.outletDetailsResp['jmoutlet'].unshift({id:"all", name:"All"})
          this.mallOutletId=this.outletDetailsResp['jmoutlet'][0].id;
          this.outletId= this.mallOutletId;   
          });
        }
        else{        
          this.outletId= "all"        
        }
        this.orderDetailsOnMallChange('all');
    });
  }
  mallNameChange(mallID) {     
    this.mallDataResp.forEach(element => {
      if (element.mallId == mallID){
        this.allPermitted = element.allPermitted;
        if(this.allPermitted=='No'){
          let getOutletDetailsURL = 'mall/' + mallID + '/getOutletByMallID';
          this.dashboardService.outletDetailsService(getOutletDetailsURL)
          .subscribe(data => {
            this.outletDetailsResp = data;          
            this.outletDetailsResp['jmoutlet'].unshift({id:"all", name:"All"})
            this.outletId= this.outletDetailsResp['jmoutlet'][0].id;
            this.orderDetailsOnMallChange('all');         
          });
        } 
        else{
          this.outletId="all";
          this.orderDetailsOnMallChange('all');
        }       
      }
    });  
}
outletNameChange(mallOutletId) {  
  this.outletId = mallOutletId;
  this.orderDetailsOnMallChange('all');
}
orderDetailsOnMallChange(orderStatus) { 
  let status = orderStatus;    
  let orderDetailsURL=""
  if(status=="rejected" || status=="completed" || status=="Rejected" || status=="Completed")
    {
      orderDetailsURL = 'mall/' + this.mallId + '/outletid/' + this.outletId + '/status/' + status + '/get_rejected_completed_order';
    }
    else {
      orderDetailsURL = 'mall/' + this.mallId + '/outletid/' + this.outletId + '/status/' + status + '/get_pending_accept_ready_Order';
     }
     this.loader =true;
  this.dashboardService.orderDetailsService(orderDetailsURL)
  .subscribe(data => {
    this.loader = !true;
     this.orderDetailsResp = data;
     if(this.orderDetailsResp.length > 0) {
      this.orderDetailsTableShow = true;        
    }
    else {
      this.orderDetailsTableShow = false;
    }
  },
    error => console.log(error));     
}
orderDetailsTable(status) {
  this.orderStatus = status; 
  this.orderDetailsOnMallChange(this.orderStatus);   
}
//this function will send the user entered value to AppService
sendTextValue(){
  this.dashboardService.passValue(this.myTextVal);
}

//reading events emitted by app-child component
readOutputValueEmitted(val){
  this.valueFromChild = val;
}

toggleChildElementHandler(){
  this.toggleChildElement = !this.toggleChildElement;
}
}
