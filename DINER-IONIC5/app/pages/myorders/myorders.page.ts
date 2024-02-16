import { Component, OnInit } from '@angular/core';
import { MyordersService } from '../../services/myorders.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.page.html',
  styleUrls: ['./myorders.page.scss'],
})
export class MyordersPage implements OnInit {
  ordersData: any;
  orderType: number;
  orderFilterData: any;
  showOrderHistoryPage: boolean = false;
  imageEndPoint: any;
  pageArray = ['active', 'history'];
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  constructor(private utilitiesService: UtilitiesService, private myordersService: MyordersService, private router: Router, private storage: Storage) {
    this.imageEndPoint = this.utilitiesService.imageEndPoint;
  }

  ngOnInit() {
  }

  goToProfile() {
    this.router.navigate(['profile'])
  }

  ionViewDidEnter() {
    this.showOrderHistoryPage = false;

    this.segmentChanged('active');
  }

  segmentChanged(status) {
    console.log(status);

    this.showOrderHistoryPage = false;
    this.storage.get("DINNERID").then(dinerId => {
      this.myordersService.getAllOrderDetails(dinerId).subscribe(orderDetails => {
        this.ordersData = [];
        this.orderFilterData = [];
        this.ordersData = orderDetails;
        if (status == 'active') {
          this.orderType = 0;
          this.orderFilterData = this.ordersData.filter(orderDataValue => {
            var d = new Date(orderDataValue.createdDate);
            var dateValue = d.getDate();
            var yearValue = d.getFullYear();
            var hourValue = d.getHours();
            var minuteValue = d.getMinutes();
            var suffix = "AM";
            if (hourValue >= 12) {
              suffix = "PM";
              hourValue = hourValue - 12;
            }
            if (hourValue == 0) {
              hourValue = 12;
            }
            orderDataValue.dateValue = ("0" + dateValue).slice(-2) + ' ' + this.monthNames[d.getMonth()] + ' ' + yearValue + ',' + hourValue + ':' + ("0" + minuteValue).slice(-2) + ' ' + suffix;

            return (orderDataValue.status == 'RECEIVED' || orderDataValue.status == 'INPROGRESS' || orderDataValue.status == 'READY')
          })
        }
        if (status == 'history') {
          this.orderType = 1;
          this.orderFilterData = this.ordersData.filter(orderDataValue => {
            var d = new Date(orderDataValue.createdDate);
            var dateValue = d.getDate();
            var yearValue = d.getFullYear();
            var hourValue = d.getHours();
            var minuteValue = d.getMinutes();
            var suffix = "AM";
            if (hourValue >= 12) {
              suffix = "PM";
              hourValue = hourValue - 12;
            }
            if (hourValue == 0) {
              hourValue = 12;
            }
            orderDataValue.dateValue = ("0" + dateValue).slice(-2) + ' ' + this.monthNames[d.getMonth()] + ' ' + yearValue + ' ' + hourValue + ':' + minuteValue + ' ' + suffix;
            return (orderDataValue.status == 'COMPLETED' || orderDataValue.status == 'REJECTED' || orderDataValue.status == 'EXPIRED')
          })
        }
        console.log(this.orderFilterData);
        console.log(this.ordersData);
        this.showOrderHistoryPage = true;
      })
    });
  }

  postOrderSummary(currentOrder){
    this.utilitiesService.setPostOrderDetails(currentOrder);
    this.orderFilterData=[];
    this.router.navigate(['post-order-summary']);
  }

}
