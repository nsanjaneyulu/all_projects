import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UUID } from 'angular2-uuid';

import { CategoryItem } from '../category-item';
import { OrderItemService } from '../order-item.service';
import { OnlineOfflineService } from '../online-offline.service';
import { MessageService } from '../message.service';

import Dexie from 'dexie';

@Component({
  selector: 'tafelposapp-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  @Input() orderItem: CategoryItem;
  selectedItems: any = [];
  totalItems: number = 0;
  totalAmount: number = 0;
  taxAmount: number = 0;
  discountValue: number = 0;
  discountAmount: number = 0;
  allTotalAmount: number = 0;
  paymentMode: string;
  isCheckout: boolean = false;
  isPaymentModeSelected: boolean = false;
  isCardPayment: boolean = false;
  orderForm: FormGroup;
  orderDetails: any = {};
  private ordersDb: any;
  isOnline: boolean = true;
  orderTypes: any = ["POS-Dinein", "POS-TakeAway"];
  orders: any = [
    {
      "outletId": localStorage.getItem('outletIds'),
      "orderlets": []
    }
  ];

  constructor(private orderItemService: OrderItemService, fb: FormBuilder, private readonly onlineOfflineService: OnlineOfflineService, private messageService: MessageService) {
    this.orderForm = fb.group({
      "orderType": [this.orderTypes[0], Validators.required],
      "phoneNumber": "",
      "emailId": "",
      "discountType": "",
      "discountValue": "",
      "cardType": "",
      "bankName": "",
      "transRefNo": ""
    });

    this.createDatabase();
    this.registerToEvents(onlineOfflineService);
  }

  createFullOrder(): void {
    this.orderDetails.invoiceId = UUID.UUID();
    this.orderDetails.ssId = localStorage.getItem('ssId');
    this.orderDetails.mallId = localStorage.getItem('mallId');
    this.orderDetails.dinerId = localStorage.getItem('dinerId');
    this.orderDetails.status = "INPROGRESS"
    this.orderDetails.orders = this.orders;
    this.orderDetails.orderType = this.orderForm.value.orderType;
    this.orderDetails.phoneNumber = this.orderForm.value.phoneNumber;
    this.orderDetails.emailId = this.orderForm.value.emailId;
    this.orderDetails.discountType = this.orderForm.value.discountType;
    this.orderDetails.discountValue = this.orderForm.value.discountValue;
    this.orderDetails.paymentMode = this.paymentMode;
    this.orderDetails.cardType = this.orderForm.value.cardType;
    this.orderDetails.bankName = this.orderForm.value.bankName;

    if (!this.isOnline) {
      this.addToIndexedDb(this.orderDetails);
    } else {
      this.orderItemService.createFullOrder(this.orderDetails).subscribe((res) => {
        if (res) {
          console.log("#" + this.orderDetails.invoiceId + " Order created");
        } else {
          this.addToIndexedDb(this.orderDetails);
        }
      });
    }

    //window.print();
    this.messageService.setMessage("Order Created");
    this.orderForm.reset();
    this.orderItemService.setClearOrderStatus(true);
    this.paymentMode = "";
    this.isPaymentModeSelected = false;

  }

  validateCardSelection(): void {
    if (this.isCardPayment && this.orderForm.value.cardType !== "" && this.orderForm.value.bankName !== "" && this.orderForm.value.transRefNo !== "") {
      this.isPaymentModeSelected = true;
    } else {
      this.isPaymentModeSelected = false;
    }
  }

  selectPaymentMode(value): void {
    this.paymentMode = value;
    if (value === "cc" || value === "dc") {
      this.isPaymentModeSelected = false;
      this.orderForm.controls["cardType"].setValue("");
      this.orderForm.controls["bankName"].setValue("");
      this.orderForm.controls["transRefNo"].setValue("");
      this.isCardPayment = true;
    } else {
      this.isPaymentModeSelected = true;
      this.isCardPayment = false;
      this.orderForm.controls["cardType"].setValue("");
      this.orderForm.controls["bankName"].setValue("");
      this.orderForm.controls["transRefNo"].setValue("");
    }
  }

  getOrderItem(): void {
    this.orderItemService.getOrderItem()
      .subscribe(selectedItem => {
        if (this.selectedItems.length) {
          let isNewItem = true;
          this.selectedItems.forEach((item, index, arr) => {
            if (item.id === selectedItem.id) {
              this.selectedItems[index].itemCount = this.selectedItems[index].itemCount + 1;
              selectedItem.amount = item.price * this.selectedItems[index].itemCount;
              isNewItem = false;
            }
          });

          if (isNewItem) {
            selectedItem.itemCount = 1;
            selectedItem.amount = selectedItem.price;
            this.selectedItems.push(selectedItem);
          }

        } else {
          selectedItem.itemCount = 1;
          selectedItem.amount = selectedItem.price;
          this.selectedItems.push(selectedItem);
        }

        if (this.selectedItems.length) {
          let orderlets = [];
          this.selectedItems.forEach((item) => {
            let itemDetails = { itemId: "", name: "", price: "", quantity: "", discountPrice: 0 };
            itemDetails.itemId = item.id;
            itemDetails.name = item.name;
            itemDetails.price = item.price;
            itemDetails.quantity = item.itemCount;
            orderlets.push(itemDetails);
          });
          this.orders[0].orderlets = orderlets;
          this.isCheckout = true;
        }

        this.grandTotal(this.selectedItems, "amount");
        this.totalItems = this.selectedItems.length;
      });
  }

  incCount(selectedItemIndex): void {
    this.selectedItems[selectedItemIndex].itemCount = this.selectedItems[selectedItemIndex].itemCount + 1;
    this.selectedItems[selectedItemIndex].amount = this.selectedItems[selectedItemIndex].amount + this.selectedItems[selectedItemIndex].price;
    this.grandTotal(this.selectedItems, "amount");
  }

  decCount(selectedItemIndex): void {
    if (this.selectedItems[selectedItemIndex].itemCount > 0) {
      this.selectedItems[selectedItemIndex].itemCount = this.selectedItems[selectedItemIndex].itemCount - 1;
      this.selectedItems[selectedItemIndex].amount = this.selectedItems[selectedItemIndex].amount - this.selectedItems[selectedItemIndex].price;
      this.grandTotal(this.selectedItems, "amount");
    }
  }

  deleteItem(selectedItem: CategoryItem): void {
    let index = this.selectedItems.indexOf(selectedItem);
    if (index !== -1) {
      this.selectedItems.splice(index, 1);
      this.grandTotal(this.selectedItems, "amount");
      this.totalItems = this.selectedItems.reduce((a, b) => a + (b["itemCount"] || 0), 0);

      if(this.totalItems === 0) {
        this.isCheckout = false;
      }
    }
  }

  grandTotal(selectedItems: CategoryItem[], key: string): void {
    this.totalAmount = selectedItems.reduce((a, b) => a + (b[key] || 0), 0);
    this.taxAmount = 5 * this.totalAmount / 100;
    this.allTotalAmount = this.totalAmount + this.taxAmount;
    this.totalItems = this.selectedItems.reduce((a, b) => a + (b["itemCount"] || 0), 0);
    this.orderItemService.setSelectedItems(this.selectedItems);
  }

  applyDiscount(value): void {
    this.discountValue = value;
    this.discountAmount = this.discountValue * this.totalAmount / 100;
    this.allTotalAmount = this.allTotalAmount - this.discountAmount;
  }

  getClearOrderStatus(): void {
    this.orderItemService.getClearOrderStatus()
      .subscribe(status => {
        if (status) {
          this.selectedItems = [];
          this.grandTotal(this.selectedItems, "amount");
          this.isCheckout = false;
          this.isCardPayment = false;
          this.orderForm.reset({orderType: this.orderTypes[0]});
        }
      })
  }

  private createDatabase() {
    this.ordersDb = new Dexie('TafelPOSOrdersDatabase');
    this.ordersDb.version(1).stores({
      orders: 'invoiceId, ssId, mallId, dinerId, status, orders, orderType, phoneNumber, emailId, discountType, discountValue, paymentMode, cardType, bankName'
    });
  }

  private addToIndexedDb(order) {
    console.log("No internet connection detected. Data will be stored in local DB");
    this.ordersDb.orders
      .add(order)
      .then(async () => {
        const allOrders = await this.ordersDb.orders.toArray();
        console.log('saved in DB, DB is now', allOrders);
      })
      .catch(e => {
        alert('Error: ' + (e.stack || e));
      });
  }

  private async sendOrdersFromIndexedDb() {
    const allOrders = await this.ordersDb.orders.toArray();
    if (allOrders.length) {
      allOrders.forEach((order) => {
        this.orderItemService.createFullOrder(order).subscribe((res) => {
          if (res) {
            this.ordersDb.orders.delete(order.invoiceId).then(() => {
              console.log("Internet connection was restored. Local DB will be sync with online DB");
              console.log(`item ${order.invoiceId} sent and deleted from local DB`);
            });
          }
        });
      });
    }
  }

  private registerToEvents(onlineOfflineService: OnlineOfflineService) {
    onlineOfflineService.getOnlineStatus().subscribe(onlineStatus => {
      if (onlineStatus) {
        this.isOnline = true;
        this.sendOrdersFromIndexedDb();
      } else {
        this.isOnline = false;
      }
    });
  }

  ngOnInit() {
    this.getOrderItem();
    this.getClearOrderStatus();
    // let obj = { "status": "RECEIVED", "rejectReason": "", "quantity": 0, "fullOrderId": "92666b17-7a5f-476a-a1fe-8a1796267e3f" }
    // this.orderItemService.changeFullOrderStatus("92666b17-7a5f-476a-a1fe-8a1796267e3f", obj)
    //   .subscribe(res => {
    //   });
  }

}
