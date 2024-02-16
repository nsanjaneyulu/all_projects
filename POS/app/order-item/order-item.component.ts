import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { CategoryItem } from '../category-item';
import { OrderItemService } from '../order-item.service';
import { OnlineOfflineService } from '../online-offline.service';
import { MessageService } from '../message.service';
import Dexie from 'dexie';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'tafelposapp-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  // @Input() public fixedHeaders;
  @Input()  public orderItem;
  @Input() public billDetails;
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
  outletName: any;
  mallDetails: any;
  itemNameGet: any;
  selectedItemNames: any;
  dynamicselectedItemNames: any;
  totalAmountGet: any;
  taxAmountGet: any;
  discountAmountGet: any;
  allTotalAmountGet: any;
  mallName: any;
  mallArea: any;
  mallCity: any;
  datasinking: any;
  fullOrder5DigitId: any;
  orderType: any;
  orders: any = [
    {
      "outletId": localStorage.getItem('outletIds'),
      "orderlets": []
    }
  ];

  constructor(private http: HttpClient, public orderItemService: OrderItemService, fb: FormBuilder, private readonly onlineOfflineService: OnlineOfflineService, private messageService: MessageService) { debugger
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
console.log("")
    this.createDatabase();
    this.registerToEvents(onlineOfflineService);
    this.outletName = sessionStorage.getItem('outletName');
    this.mallDetails = sessionStorage.getItem('mallDetails');
    this.mallName = sessionStorage.getItem('mallName');
    this.mallArea = sessionStorage.getItem('mallArea');
    this.mallCity = sessionStorage.getItem('mallCity');
    this.selectedItems=this.orderItemService.itemsSelected;
    this.billDetails=this.orderItemService.billDetails;
    if(this.selectedItems.length){ 
      this.grandTotal(this.selectedItems, "amount");

    }
  }
  onClearOrder(): void {
    this.orderItemService.setClearOrderStatus(true);
  }
  createFullOrder(): void {
   
    let invoiceIdGet = UUID.UUID();
    let invoiceId6Letters = invoiceIdGet.substring(0, 6);
   
    let posConcat = "pos";
    let posOrderID = posConcat.concat(invoiceId6Letters);
   
    this.orderDetails.posOrderID = posOrderID;
    this.orderDetails.invoiceId = UUID.UUID();
    this.orderDetails.ssId = localStorage.getItem('ssId');
    this.orderDetails.mallId = localStorage.getItem('mallId');
    this.orderDetails.dinerId = localStorage.getItem('dinerId');
    this.orderDetails.status = "COMPLETED"
    this.orderDetails.orders = this.orders;
    this.orderDetails.orderType = this.orderForm.value.orderType;
    this.orderDetails.phoneNumber = this.orderForm.value.phoneNumber;
    this.orderDetails.emailId = this.orderForm.value.emailId;
    this.orderDetails.discountType = this.orderForm.value.discountType;
    this.orderDetails.discountValue = this.orderForm.value.discountValue;
    this.orderDetails.paymentMode = this.paymentMode;
    this.orderDetails.cardType = this.orderForm.value.cardType;
    this.orderDetails.bankName = this.orderForm.value.bankName;    
    this.dynamicselectedItemNames = "";
    let orderletsDetails = this.orders[0].orderlets;
    console.log("orderletsDetails",orderletsDetails,this.totalAmount);
    orderletsDetails.forEach((selectedItemNames) => {
      let selecteditemName = selectedItemNames.name;
      let selecteditemCount = (selectedItemNames.quantity).toString();
      let selectedItemPriceGet = (selectedItemNames.price).toString();
      let selectedItemPrice = parseFloat(selectedItemPriceGet).toFixed(2) + '';
      let selectedItemAmountGet = (selectedItemNames.quantity * selectedItemNames.price).toString();
      let selectedItemAmount = parseFloat(selectedItemAmountGet).toFixed(2) + '';
      this.dynamicselectedItemNames = this.dynamicselectedItemNames + '<text>' + selecteditemName.substring(21, 0).padEnd(21, ' ') + ' ' + selecteditemCount.padEnd(2, ' ') + ' ' + selectedItemPrice.padStart(9, ' ') + ' ' + selectedItemAmount.padStart(11, ' ') + '&#10;</text>\n';
     
    });
    if (!this.isOnline) {
     
      this.addToIndexedDb(this.orderDetails);
    } else {
    
      this.orderItemService.createFullOrder(this.orderDetails).subscribe((res) => {
        console.log("res", res);

        if (res) {
          console.log("#" + this.orderDetails.invoiceId + " Order created");
          this.fullOrder5DigitId = res.fullOrder5DigitId;
          this.orderType = res.orderType;
          this.totalAmountGet = res.amount;
          let cgst = res.cgst;
          let sgst = res.sgst;
          this.taxAmountGet = cgst + sgst;
          this.allTotalAmountGet = this.totalAmountGet + this.taxAmountGet;
          console.log("cgst sgst totalAmountGet", typeof(cgst),cgst,typeof(sgst), sgst, typeof(this.totalAmountGet),this.totalAmountGet)
          this.printGo();
          Swal.fire({
            title: `Order No:  ${res.fullOrder5DigitId}`,
            text: 'Your Order has confirmed',
            type: 'success',
            confirmButtonText: 'Continue',
            confirmButtonColor: '#5c0632',
          })

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

  
  incCount(selectedItemIndex,selectedItem): void {
    this.orderItemService.itemsSelected.forEach((values,i)=>{
      if(values.id==selectedItem.id){
        if( values.itemCount >= 50){
          alert("Max Item qunatity Reached")
        }else{
          values.itemCount = values.itemCount +1;
      }
        
      }
    })
  }

  decCount(selectedItemIndex, selectedItem): void {

    this.orderItemService.itemsSelected.forEach((values,i)=>{
      if(values.id==selectedItem.id){
        if(values.itemCount == 1){
          this.orderItemService.itemsSelected.splice(i,1);
        }else{
          values.itemCount = values.itemCount -1;
        }
      }
    })
    this.grandTotal(this.orderItemService.itemsSelected, "amount");
  }

  deleteItem(selectedItem: CategoryItem, selectedItemIndex): void {
    this.orderItemService.itemsSelected.forEach((values,i)=>{
      if(values.id==selectedItem.id){
          this.orderItemService.itemsSelected.splice(i,1);
      }
    })
  }

  grandTotal(selectedItems, key): void {  debugger 
    this.billDetails.totalAmount=0;
    selectedItems.forEach(data=> {  debugger
      this.billDetails.totalAmount = this.billDetails.totalAmount==undefined?0: this.billDetails.totalAmount+ data.price*data.itemCount;
    })
    this.billDetails.taxAmount = 5 * this.billDetails.totalAmount / 100;
    this.billDetails.allTotalAmount = this.billDetails.totalAmount + this.billDetails.taxAmount;
    this.billDetails.totalItems = selectedItems.reduce((a, b) => a + (b["itemCount"] || 0), 0);
    let totalAmountValue = (this.billDetails.totalAmount).toString();
    this.billDetails.totalAmountGet = parseFloat(totalAmountValue).toFixed(2).padStart(10, ' ') + '';
    let allTotalAmountValue = (this.billDetails.allTotalAmount).toString();
    this.billDetails.allTotalAmountGet = parseFloat(allTotalAmountValue).toFixed(2).padStart(10, ' ') + '';
    let taxAmountValue = (this.billDetails.taxAmount).toString();
    this.billDetails.taxAmountGet = parseFloat(taxAmountValue).toFixed(2).padStart(10, ' ') + '';
    this.orderItemService.billDetails=this.billDetails
  }
  applyDiscount(value): void {
    this.discountValue = value;
    this.discountAmount = this.discountValue * this.totalAmount / 100;
    if (this.discountAmount) {
      let discountAmountGet = (this.discountAmount).toString();
      this.discountAmountGet = parseFloat(discountAmountGet).toFixed(2) + '';
    }
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
          this.orderForm.reset({ orderType: this.orderTypes[0] });
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
              this.datasinking = "Internet Connected | Data Sinking";
              this.messageService.setMessage(this.datasinking);
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
   
    this.getClearOrderStatus();
  }
  printGo() {
   
    var data =
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">\n' +
      '<s:Body>\n' +
      '<epos-print xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print">\n' +
      '<feed unit="30"/>\n' +
      '<text>           ' + this.mallName + '&#10;</text>\n' +
      '<text>           ' + this.outletName + '&#10;</text>\n' +
      '<text>           ' + this.mallArea + ' , ' + this.mallCity + '&#10;</text>\n' +
      '<text>           GSTIN : 36AAGCB4303A1ZE    &#10;</text>\n' +
      '<text>           Date :' + new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ' &#10;</text>\n' +
      '<text>----------------------------------------------- &#10;</text>\n' +
      '<text>Order No:' + this.fullOrder5DigitId + '      Order Type:' + this.orderType + ' &#10;</text>\n' +
      '<text>----------------------------------------------- &#10;</text>\n' +
      '<text>Item Name             Qty   Price        Total&#10;</text>\n' +
      '<text>----------------------------------------------- &#10;</text>\n' + this.dynamicselectedItemNames + '\n' +
      '<text>----------------------------------------------- &#10;</text>\n' +
      '<text>                         Item Total:' + this.totalAmountGet.toFixed(2).padStart(10, ' ') + '' + '&#10;</text>\n' +
      '<text>                              Taxes:' + this.taxAmountGet.toFixed(2).padStart(10, ' ') + '' + '&#10;</text>\n' +
      // '<text>                          Discounts:' + this.discountAmountGet + '&#10;</text>\n' +
      '<text>                      To Pay Amount:' + this.allTotalAmountGet.toFixed(2).padStart(10, ' ') + '' + '&#10;</text>\n' +
      '<text>===============================================&#10;</text>\n' +
      '<text>             Thank you Order Again! &#10;</text>\n' +
      '<text>               Powered By TAFEL! &#10;</text>\n' +
      '<text>          Reach us at contact@tafel.in &#10;</text>\n' +
      '<text>                      ---------------- &#10;</text>\n' +
      '<feed line="3"/>\n' +
      '<cut type="feed"/>\n' +
      '</epos-print>\n' +
      '</s:Body>\n' +
      '</s:Envelope>\n'
    var urldata = 'http://192.168.1.203/cgi-bin/epos/service.cgi?devid=local_printer';
    console.log("data",data);
    let localData = this.http.post(urldata, data, {
    }).subscribe(data => {
    });
    return localData;
  }
}
