import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { UtilitiesService } from '../../services/utilities.service';
import { OrderSummaryService } from '../../services/order-summary.service';
@Component({
  selector: 'app-post-order-summary',
  templateUrl: './post-order-summary.page.html',
  styleUrls: ['./post-order-summary.page.scss'],
})
export class PostOrderSummaryPage implements OnInit {
  postOrderDetails: any;
  postDetailedOrder: any = [];
  imageEndPoint: any;
  postOrderConfirmCode:any;
  showPostOrderSummary: boolean = false;
  constructor(private orderSummaryService:OrderSummaryService,private router: Router, private utilitiesService: UtilitiesService) {
    this.imageEndPoint = this.utilitiesService.imageEndPoint;
  }

  ngOnInit() {
    this.showPostOrderSummary = false;
    this.postOrderDetails = this.utilitiesService.postOrderDetails;
    console.log(this.postOrderDetails);
    this.orderSummaryService.getPostOrderDetails(this.postOrderDetails.id,this.postOrderDetails.mallId,this.postOrderDetails.dinerId).subscribe(postOrderValue=>{
      console.log(postOrderValue);
      this.postOrderConfirmCode = postOrderValue;
    });
    let currentOrderList = [];
    let orderList;
    for (var i = 0; i < this.postOrderDetails.orders.length; i++) {
      for (var j = 0; j < this.postOrderDetails.orders[i].orderlets.length; j++) {
        orderList = Array.from(new Set(this.postOrderDetails.orders[i].orderlets.map(a => a.itemId))).map(id => {
          return this.postOrderDetails.orders[i].orderlets.find(a => a.itemId === id)
        })
      }
      currentOrderList.push(orderList)
    }
    
    for (var i = 0; i < this.postOrderDetails.orders.length; i++) {
      this.postDetailedOrder = [];
      for (var k = 0; k < currentOrderList.length; k++) {
        for (var l = 0; l < currentOrderList[k].length; l++) {
          var count = 0;
          for (var j = 0; j < this.postOrderDetails.orders[i].orderlets.length; j++) {
            if (currentOrderList[k][l].itemId == this.postOrderDetails.orders[i].orderlets[j].itemId) {
              if (count == 0) {
                this.postDetailedOrder.push(this.postOrderDetails.orders[i].orderlets[j])
                count++;
              }
            }
          }
        }
      }
      this.postOrderDetails.orders[i].orderDetails = this.postDetailedOrder;

    }
    this.postOrderDetails.packagingCharge = parseFloat(this.postOrderDetails.packagingCharge);
    this.postOrderDetails.amount = parseFloat(this.postOrderDetails.amount);
    this.postOrderDetails.cgst = parseFloat(this.postOrderDetails.cgst);
    this.postOrderDetails.convenience = parseFloat(this.postOrderDetails.convenience);
    this.postOrderDetails.sgst = parseFloat(this.postOrderDetails.sgst);
    this.postOrderDetails.supplierDeliveryCharge = parseFloat(this.postOrderDetails.supplierDeliveryCharge);
    this.postOrderDetails.supplierDiscount = parseFloat(this.postOrderDetails.supplierDiscount);
    this.postOrderDetails.tafelDeliveryCharge = parseFloat(this.postOrderDetails.tafelDeliveryCharge);
    this.postOrderDetails.tafelDiscount = parseFloat(this.postOrderDetails.tafelDiscount);
    for (var i = 0; i < this.postOrderDetails.orders.length; i++) {
      for (var k = 0; k < this.postOrderDetails.orders[i].orderDetails.length; k++) {
        var count = 0;
        for (var j = 0; j < this.postOrderDetails.orders[i].orderlets.length; j++) {
          if (this.postOrderDetails.orders[i].orderDetails[k].itemId == this.postOrderDetails.orders[i].orderlets[j].itemId) {
            if (count == 0) {
              this.postOrderDetails.orders[i].orderDetails[k].quantityValues = 1
              count++;
            } else {
              this.postOrderDetails.orders[i].orderDetails[k].quantityValues += 1
            }
          }
        }
      }
    }

    console.log(this.postOrderDetails)
    this.showPostOrderSummary = true;
  }
  goToMyOrders() {
    this.router.navigate(['myorders'])
  }

}
