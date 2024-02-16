import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  mallDataResp: any = [];
  mallDetailsDropdown: string;
  outletDetailsResp: any;
  enableDisable: string;
  mallName: string;
  hadDelivery: string;
  mallIdGet: string;
  constructor(public dashboardService : DashboardService,) { }

  ngOnInit() {
    this.mallDetails();
  }
  mallDetails() {
    let mallDetailsURL ="";
    mallDetailsURL= '/userid/' + "00ae9fbf-e7f8-469e-81da-3ce16cb4c126" + '/getMalls';
    this.dashboardService.getMallDetails(mallDetailsURL)
      .subscribe(data => {
        this.mallDataResp = data;   
        this.mallDetailsDropdown = "All"; 
      });
  }
  mallNameChange(mallID) {
    let getOutletDetailsURL = 'mall/' + mallID + '/getOutletByMallID';
    this.dashboardService.outletDetailsService(getOutletDetailsURL)
      .subscribe(data => {
        this.outletDetailsResp = data;
        
      });
  }
  deliveryStatusChange(mallTable) { 
  

    this.mallIdGet = mallTable.mallId;
    this.mallName = mallTable.mallName;
    this.hadDelivery= mallTable['mall']['hadDelivery'];

    
    this.mallName = mallTable.mallName;
    this.enableDisable = '';
    if(mallTable['mall']['hadDelivery'] === 'Yes')
    {
      this.enableDisable = 'Disabled';
    }
    else {
      this.enableDisable = 'Enabled';
    }
   
  }
  deliveryStatusConfirm() {
    let deliveryStatusURL = "";
    if (this.hadDelivery === "Yes") {
      deliveryStatusURL = '/malls/' + this.mallIdGet + '/delivery/No',
      this.dashboardService.deliveryStatusService(deliveryStatusURL)
        .subscribe(data => {
          this.mallDetails();
          // this.toastrModule.successToastr('Successfully Delivery Option Disabled', this.mallName);  
        });
    }
    else {
      deliveryStatusURL = '/malls/' + this.mallIdGet + '/delivery/Yes',      
      this.dashboardService.deliveryStatusService(deliveryStatusURL)
        .subscribe(data => {
          this.mallDetails();
          // this.toastrModule.successToastr('Successfully Delivery Option Enabled', this.mallName); 
        });
    }
  }
  dialogClose() {
    this.mallDetails();  
  }
  get mallsList() {
    const isAll = this.mallDetailsDropdown === "All";
    if(isAll) {
      return this.mallDataResp || [];
    }
    const mallId = this.mallDetailsDropdown;
    return ( this.mallDataResp || []).filter(mall => 
      (mall || {}).mallId === mallId);
      
  }

}
