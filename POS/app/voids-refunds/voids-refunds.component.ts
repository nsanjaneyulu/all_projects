import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccordionModule } from 'primeng/accordion';

import { OrderItemService } from '../order-item.service';
import { UniqueFilterPipe } from '../unique-filter.pipe';
import { BillingDetailsDialog } from '../billing-details-dialog';
import { MessageService } from '../message.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';

import * as $ from 'jquery';

@Component({
  selector: 'tafelposapp-voids-refunds',
  templateUrl: './voids-refunds.component.html',
  styleUrls: ['./voids-refunds.component.scss']
})
export class VoidsRefundsComponent implements OnInit {
  cols: any[] = [];
  data: any[] = [];
  invoiceNo: string = "";
  disableUpdateBtn: boolean = true;
  discount: any = 0;
  message: string;
  showLoader: boolean;
  printItemName: any;
  dynamicselectedItemNames: any;
  itemTotalPrint: any;
  taxesPrint: any;
  discountPrint: any;
  noDataFound="";
  packagingChargePrint: any;
  deliveryChargesPrint: any;
  grandTotalPrint: any;
  dynamicText: any;
  mallName: any;
  mallArea: any;
  mallCity: any;
  outletName: any;
  mallDetails: any;
  ordersList: any = {};
  dinerId: any;
  refundAmount: any;
  refundAmountGet: any;
  allpermited='';
  outletDetails:any=[];
  outeltId=""
  constructor(private http: HttpClient,public dialog: MatDialog, private orderItemService: OrderItemService, private uniqueFilterPipe: UniqueFilterPipe, private messageService: MessageService) { 
    this.outletName = sessionStorage.getItem('outletName');
    this.mallDetails = sessionStorage.getItem('mallDetails');
    this.mallName = sessionStorage.getItem('mallName');
    this.mallArea = sessionStorage.getItem('mallArea');
    this.mallCity = sessionStorage.getItem('mallCity');
    this.dinerId = localStorage.getItem('dinerId');
    this.allpermited = localStorage.getItem('allpermited')
    this.outletDetails = JSON.parse(localStorage.getItem('outletDetails'))
    console.log("outletDetails",this.outletDetails)
    this.outeltId= this.outletDetails[0].id
    this.mallName = localStorage.getItem('mallName')
  }
  selectoutLet(outletId){
    this.outeltId=outletId;
    this.getAllCompletedFullOrders();
  }
  getAllCompletedFullOrders(): void {
    $('.refresh').addClass('rotate');
    this.orderItemService.getAllCompletedFullOrders(this.outeltId)
      .subscribe(orders => {
        $('.refresh').removeClass('rotate');
        this.sortOrdersResponse(orders, "all");
        
      })
  }
  get allOrdersList() {
    return Object.keys(this.ordersList || {}).reduce((allOrders, key) => {
      allOrders = [...allOrders, ...(this.ordersList[key] || [])]
      return allOrders
    }, [])
  }
  customizationNames="";
  customizationNames2="";
  sortOrdersResponse(orders = [], type) {
    this.data=[];
    this.noDataFound="";
    if (!orders || orders.length === 0) {
      return;
    }
    console.log(orders,"orders")
    this.ordersList[type] = orders;
    orders.forEach((item, index) => {
            if (item.orderType.includes("POS-" )) {
              if(item.status=="REJECTED"){
                let jmOrderLet = item.jmOrderLet;
                let uniqueJmOrderLet = item.jmOrderLet;
                orders[index].orders = JSON.parse(JSON.stringify(uniqueJmOrderLet));
                let itemsNames=[]
                item.orders.forEach(elements=>{  
                  var itemPresent=false;
                   if(itemsNames.length > 0){
                    itemsNames.forEach(itemDetails=>{
                      if(itemDetails.itemName==elements.itemName){
                        // itemPresent=true;
                        // if(elements.status=='REJECTED'){
                        //   itemDetails['rejectedQunatity']=itemDetails['rejectedQunatity']+1;
                        // }else{
                        //   itemDetails['handedOverQuantity']=itemDetails['handedOverQuantity']+1;
                        // }
                        // itemDetails.quantity=itemDetails.quantity+1;elements['ordeletIds']=[]
                        // itemDetails['ordeletIds'].push(elements.id)
                        // itemDetails['tempQuantity']=itemDetails.quantity;
                        // return;
                        if(itemDetails.itemCustomization!=null && itemDetails.itemCustomization.length!=0){
                          itemDetails.itemCustomization.forEach(custItem=>{
                            this.customizationNames=''
                            custItem.customization.forEach(data=>{
                              this.customizationNames = this.customizationNames + data.name;
                            })
                          })
                          elements.itemCustomization.forEach(custItem=>{
                            this.customizationNames2=''
                            custItem.customization.forEach(data=>{
                              this.customizationNames2 = this.customizationNames2 + data.name;
                            })
                          })
                          if(this.customizationNames==this.customizationNames2){
                            itemPresent=true;
                          if(elements.status=='REJECTED'){
                            itemDetails['rejectedQunatity']=itemDetails['rejectedQunatity']+1;
                          }else{
                            itemDetails['handedOverQuantity']=itemDetails['handedOverQuantity']+1;
                          }
                          itemDetails.quantity=itemDetails.quantity+1;elements['ordeletIds']=[]
                          itemDetails['ordeletIds'].push(elements.id)
                          itemDetails['tempQuantity']=itemDetails.quantity;
                          return;
                          }
                        }else{
                          itemPresent=true;
                          if(elements.status=='REJECTED'){
                            itemDetails['rejectedQunatity']=itemDetails['rejectedQunatity']+1;
                          }else{
                            itemDetails['handedOverQuantity']=itemDetails['handedOverQuantity']+1;
                          }
                          itemDetails.quantity=itemDetails.quantity+1;elements['ordeletIds']=[]
                          itemDetails['ordeletIds'].push(elements.id)
                          itemDetails['tempQuantity']=itemDetails.quantity;
                          return;
                        }
                      }
                    })
                    if(!itemPresent){
                      if(elements.status=="REJECTED"){
                        elements['rejectedQunatity']=1;
                        elements['handedOverQuantity']=0;
                       }else{
                        elements['rejectedQunatity']=0;
                        elements['handedOverQuantity']=1;
                       }
                       elements['tempQuantity']=elements.quantity;
                       elements['ordeletIds']=[]
                       elements['ordeletIds'].push(elements.id)
                       itemsNames.push(elements)
                    }
  
                   }else{
                     if(elements.status=="REJECTED"){
                      elements['rejectedQunatity']=1;
                      elements['handedOverQuantity']=0;
                     }else{
                      elements['rejectedQunatity']=0;
                      elements['handedOverQuantity']=1;
                     }
                     elements['tempQuantity']=elements.quantity;
                     elements['ordeletIds']=[]
                     elements['ordeletIds'].push(elements.id)
                     itemsNames.push(elements)
                   }
                })
                // const items = uniqueJmOrderLet.reduce((prev, curr) => {
                //   const key = `${curr.itemName}`
                //   prev[key] = [...(prev[key] || []), curr];
                //   return prev;
                // }, {});
                // uniqueJmOrderLet = Object.keys(items).reduce((prev, curr) => {
                //   const total = items[curr].reduce((a, b) => [a[0] + b.quantity, a[1] + b.itemPrice * b.quantity], [0, 0]);
                //   const item = items[curr][0];
                //   item.quantity = total[0];
                //   item.totalQuantity = total[0];
                //   item.amount = total[1];
                //   prev.push(item);
                //   return prev;
                // }, []);
                let supplierDiscount=0;
                let tafelDiscount=0;
                itemsNames.forEach(data=>{
                  supplierDiscount= supplierDiscount+data.itemSupplierDiscount*data.quantity;
                  tafelDiscount= tafelDiscount+data.itemTafelDiscount *data.quantity;
  
                })
                orders[index].supplierDiscount=supplierDiscount;
                orders[index].tafelDiscount=tafelDiscount;
                itemsNames.forEach(element=>{
                  element['disableRejectButton']=false;
                })
                orders[index].jmOrderLet = itemsNames;
                console.log("itemsNames",itemsNames)
                this.data[this.data.length] = {
                  id: item.id,
                  invoiceNo: item.fullOrder5DigitId,
                  dateNTime:item.createdDate,
                  // dateNTime:new Date(item.createdDate).getFullYear() + "-"+new Date(item.createdDate).getMonth()+1+ "-" + new Date(item.createdDate).getDate() + "; " + new Date(item.createdDate).toLocaleTimeString() ,
                  date: new Date(item.modifiedDate).toLocaleDateString(),
                  time: new Date(item.modifiedDate).toLocaleTimeString(),
                  itemTotal: (item.amount+ item.supplierDiscount + item.tafelDiscount).toFixed(2),
                  orderType:item.orderType,
                  packagingCharge: item.packagingCharge.toFixed(2),
                  deliveryCharges: (item.supplierDeliveryCharge + item.tafelDeliveryCharge).toFixed(2),
                  suppplierDiscount: (item.supplierDiscount).toFixed(2),
                  tafelDiscount: (item.tafelDiscount).toFixed(2),
                  taxes: (item.cgst + item.sgst).toFixed(2),
                  grandTotal: (item.amount +(item.cgst + item.sgst)).toFixed(2),
                  itemsCount: item.jmOrderLet.length,
                  status: item.status,
                  refundAmountGet: (this.refundAmount),
                  mallId: item.mallId,
                  jmOrderLet: item.jmOrderLet
                };
            }
          }
          });
          this.noDataFound=this.data.length?"":"No Data Foound"
      
      
  }
 
  filterByInvoiceNo(dt): void {
    dt.filter(this.invoiceNo, 'invoiceNo');
  }
  refund(data){
let refundUrl = "/print/mall/" + data.jmOrderLet[0].mallId + "/order/" + data.jmOrderLet[0].orderId;
             
              this.orderItemService.getAllRefundDetails(refundUrl).subscribe(resp => {
              
              this.refundAmountGet = parseFloat(resp.rejectedConvienceCharges) + parseFloat(resp.rejectedamount) + parseFloat(resp.rejectedcgst) + parseFloat(resp.rejectedsgst);
              let refungCheck = [...this.refundAmountGet];
              this.refundAmount = refungCheck[0].toFixed(2);
  });
  }

  
  incCount(rowIndex, selectedItemIndex) {
   
    let qty = this.data[rowIndex].jmOrderLet[selectedItemIndex].quantity;
    let totalQuantity = this.data[rowIndex].jmOrderLet[selectedItemIndex].totalQuantity;
    let price = this.data[rowIndex].jmOrderLet[selectedItemIndex].itemPrice;
    let amount = this.data[rowIndex].jmOrderLet[selectedItemIndex].amount;
    let grandTotal = this.data[rowIndex].grandTotal;
    let itemsCount = this.data[rowIndex].itemsCount;
   
    if (totalQuantity <= qty) {
      return false;
    } else {
      this.data[rowIndex].jmOrderLet[selectedItemIndex].quantity = qty + 1;
      this.data[rowIndex].jmOrderLet[selectedItemIndex].amount = amount + price;
      this.data[rowIndex].grandTotal = grandTotal + price;
      this.data[rowIndex].rowUpdate = true;
    }
  }
  decCount(rowIndex, selectedItemIndex): void {
    let qty = this.data[rowIndex].jmOrderLet[selectedItemIndex].quantity;
    let price = this.data[rowIndex].jmOrderLet[selectedItemIndex].itemPrice;
    let amount = this.data[rowIndex].jmOrderLet[selectedItemIndex].amount;
    let grandTotal = this.data[rowIndex].grandTotal;
    let itemsCount = this.data[rowIndex].itemsCount;
    if (qty > 1) {
      this.data[rowIndex].jmOrderLet[selectedItemIndex].quantity = qty - 1;
      this.data[rowIndex].jmOrderLet[selectedItemIndex].amount = amount - price;
      this.data[rowIndex].grandTotal = grandTotal - price;
      if (this.data[rowIndex].jmOrderLet[selectedItemIndex].quantity === 0) {
        this.data[rowIndex].itemsCount = itemsCount - 1;
      }
      this.data[rowIndex].rowUpdate = true;
    }
  }
  changeOrderletStatus(fullOrderId, orderletsStatus, rowIndex): void {
   
    // this.showLoader = true;
    // this.orderItemService.changeOrderletStatus(fullOrderId, orderletsStatus,rowData)
    //   .subscribe(res => {
    //     this.showLoader= !this.showLoader;
     
    //       // this.data.splice(rowIndex, 1);
    //       const order = this.data[rowIndex];
    //       order.status = res.returnValue;
        
    //   });
  }
  // voidaOrderletStatus(fullOrderId, orderletsStatus, rowIndex,orderlets): void {
  //   console.log("orderletsStatus test",orderletsStatus);
    
      
      
  //         // this.data.splice(rowIndex, 1);
  //         const order = this.data[rowIndex];
  //         order.status = "REJECTED";
  //         console.log("res@@@@@@@@@@@@@@@@@@@@@@@@@@@", order.status);
        
      
  // }
  updateOrder(fullOrderId, rowIndex, item): void {
    const fullOrderId5didgit = item.fullOrderId5didgit;
    const updatedOrderLets = this.data[rowIndex].jmOrderLet;
    const mainOrder = (this.allOrdersList || []).filter(order => order.fullOrder5DigitId === fullOrderId5didgit)[0] || {};
    const mainOrderList = (mainOrder.orders || []).filter(order => order.itemName === item.itemName)
    
    let orderletsStatus = [];
  
    const quantity = item.quantity; // 3
    mainOrderList.forEach((item, index) => {
      
      const isRejected = index < quantity;
      let orderletObj = { "id": item.id, "quantity": 0, "status":  isRejected ? "REJECTED" : "HANDEDOVER", "rejectionReason": "" };
      orderletsStatus.push(orderletObj);
    });

    this.changeOrderletStatus(fullOrderId, orderletsStatus, rowIndex);
  }
  openBillDialog(rowIndex): void {

    const dialogRef = this.dialog.open(BillingDetailsDialog, {
      width: '230px',
      data: {
        itemTotal: this.data[rowIndex].itemTotal,
        taxes: this.data[rowIndex].taxes,
        discount: this.data[rowIndex].discount,
        grandTotal: this.data[rowIndex].grandTotal
      }
    });

  }
  reprint(rowData) {
    this.dynamicselectedItemNames = "";

    rowData.jmOrderLet.forEach(printDetails => {
      let itemNamePrint = printDetails.itemName;
      let itemPricePrint = printDetails.amount;
      let itemNameQty = printDetails.quantity;
      this.appendPrint(itemNamePrint, itemPricePrint, itemNameQty);
     
    });
    this.itemTotalPrint = (rowData.itemTotal + "").padStart(10, ' ');
    this.taxesPrint = (rowData.taxes + "").padStart(10, ' ');
    this.deliveryChargesPrint = (rowData.deliveryCharges + "").padStart(10, ' ');
    this.discountPrint = (rowData.discount + "").padStart(10, ' ');
    this.packagingChargePrint = (rowData.packagingCharge +"").padStart(10, ' ');
    this.grandTotalPrint = (rowData.itemTotal + (rowData.taxes) - (rowData.discount) + "").padStart(10, ' ');
    
   var data = 
   '<?xml version="1.0" encoding="UTF-8"?>\n' +
     '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">\n' +
     '<s:Body>\n' +
   '<epos-print xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print">\n' +
       '<feed unit="30"/>\n' +
       '<text>           ' + this.mallName + '-' + this.outletName + '&#10;</text>\n' +
       '<text>           ' + this.mallArea + ' , ' + this.mallCity + '&#10;</text>\n' +
       '<text>           GSTIN : 36AAGCB4303A1ZE    &#10;</text>\n' +
       '<text>           Date :' + new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ' &#10;</text>\n' +
       '<text>----------------------------------------------- &#10;</text>\n' +
       '<text>Item Name             Qty   Price        Total&#10;</text>\n' +
       '<text>----------------------------------------------- &#10;</text>\n' + this.dynamicselectedItemNames + '\n' +
       '<text>----------------------------------------------- &#10;</text>\n' +
       '<text>                         Item Total:' + this.itemTotalPrint + '&#10;</text>\n' +
       '<text>                              Taxes:' + this.taxesPrint + '&#10;</text>\n' +
       '<text>                          Discounts:' + this.discountPrint + '&#10;</text>\n' +
       '<text>                  Packaging Charges:' + this.packagingChargePrint + '&#10;</text>\n' +
       '<text>                   Delivery Charges:' + this.deliveryChargesPrint + '&#10;</text>\n' +
       '<text>                      To Pay Amount:' + this.grandTotalPrint + '&#10;</text>\n' +  
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
   var urldata = 'http://192.168.0.162/cgi-bin/epos/service.cgi?devid=local_printer';
   console.log("data", data);
   let localData = this.http.post(urldata,data, {
   }).subscribe(data => {                   
   });
   return localData;

  }
  appendPrint(name, qty, price) {
    qty = qty + "";
    price = price + "";
    this.dynamicselectedItemNames = this.dynamicselectedItemNames + '<text>'+ name.padEnd(15, ' ') + ' ' + qty.padEnd(2, ' ') + ' ' + price.padStart(9, ' ') + ' '  + '&#10;</text>\n';
  }
  ngOnInit() {
    this.getAllCompletedFullOrders();
    this.getMessage();
    this.cols = [
      { active: true, field: 'invoiceNo', header: 'Invoice No' },
      { active: true, field: 'dateNTime', header: 'Date' },
      // { active: true, field: 'time', header: 'Time' },
      { active: true, field: 'grandTotal', header: 'Grand Total' },
      { active: true, field: 'orderType', header: 'Order Type' },
      { active: true, field: 'status', header: 'Status' }
      // { active: true, field: 'reprint', header: 'Reprint' }

    ];

    $(document).on('click', '.filter__dropdown .dropdown-item', function (e) {
      e.stopPropagation();
      $(".filter__dropdown, .filter__dropdown-menu").addClass("show");
    });
  }

  toggleFilterSelectAll($event) {
    this.cols = this.cols.map(field => ({ ...field, active: $event.target.checked }));
    this.cols.forEach( field => {
      if(field.field === 'invoiceNo') {
        field.active = true;
      }
     


    })
  }
  toggleFilterClearAll($event) {
    this.cols = this.cols.map(field => ({ ...field, active: $event.target.checked }));
    this.cols.forEach( field => {
      if(field.field === 'invoiceNo') {
        field.active = true;
      }
     


    })
  }

  get filterCols() {
    return (this.cols || []).filter(field => field.active)
  }
  posOrdersRefresh() {
    $(document).on('click', '.rotate', function () {
      $('.refresh').toggleClass('spinEffect');
      $('.refresh').toggleClass('spinEffect2');
    });
    this.data =[];
    this.getAllCompletedFullOrders();
  }
  toggleFilterMenu(field) {
    field.active = !field.active;
   
  }

  getMessage(): void {
    this.messageService.getMessage().subscribe(message => {
      if (message) {
        this.message = message;
      }
      else {
        this.message = "Internet Connected";
      }

      setTimeout(() => {
        this.message = message;
      }, 1000);
    });
  }
  printGo() {
    
  }
  // voidaOrderletStatus(fullOrderId, orderletsStatus, rowIndex,orderlets): void {
  //   console.log("orderlets, orderlets", orderlets);
  //   var deleteUrl = "/malls/" + orderlets[0].mallId + "/order/" + orderlets[0].orderId + "/orderletstatuschange";
  //   this.orderItemService.voidsOrderletStatus(deleteUrl, orderlets, "REJECTED", 0, " due to Unavailablity")
  //     .subscribe(res => {
  //       console.log("res", res);
       
  //         // this.data.splice(rowIndex, 1);
  //         const order = this.data[rowIndex];
  //         order.status = res.returnValue;
        
  //     });
  // }
  changeFullOrderStatus(fullOrderId, status, rowIndex, rowData): void {
    let orderlets = rowData.jmOrderLet
    let obj = { "status": status, "rejectReason": "", "quantity": 0, "fullOrderId": fullOrderId };
    this.showLoader = true;
    this.orderItemService.changeFullOrderStatus(fullOrderId, obj)
      .subscribe(res => {
        this.showLoader= !this.showLoader;
        if (status == 'REJECTED') {
          var refundurl = "/getrefundamountFullOrder/malls/" + rowData.mallId + "/fullorder/" + fullOrderId;
          this.orderItemService.callRefundAmountServiceFullOrder(refundurl).subscribe(resp => {
            var amount = resp.amount;
            var fullOrderAmount = rowData.amount + rowData.taxes + rowData.deliveryCharges + rowData.packagingCharge + rowData.convenience;
            if (amount > fullOrderAmount) {
              amount = fullOrderAmount;
            }
            this.orderItemService.callRefundServicFullOrdereManager(this.dinerId, amount, rowData.invoiceNo, rowData.id, rowData.id, rowData.mallId).subscribe(resp => {
            });
          });
        }

        if (res.returnValue === "UpdateFullOrder") {
          const order = this.data[rowIndex];
          this.data=[];
          this.getAllCompletedFullOrders();
         
          // this.data.splice(rowIndex, 1);
        
          // this.voidaOrderletStatus(fullOrderId, status, rowIndex, orderlets);
         
        }
       
        // setTimeout(function() {
        //   location.reload();
        //   }, 3000);
      });
  }

}
