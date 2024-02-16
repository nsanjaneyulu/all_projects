import { Component, OnInit, ViewChild,NO_ERRORS_SCHEMA } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccordionModule } from 'primeng/accordion';
import {QrScannerComponent,} from 'angular2-qrscanner';

import { OrderItemService } from '../../order-item.service';
import { UniqueFilterPipe } from '../../unique-filter.pipe';
import { BillingDetailsDialog } from '../../billing-details-dialog';
import { ActivatedRoute } from '@angular/router';
import { HandedOverOtpDialog } from '../handed-over-otp-dialog';
import { Table } from 'primeng/table';
import * as $ from 'jquery';

@Component({
  selector: 'tafelposapp-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss']
})

export class PendingOrdersComponent implements OnInit {
  @ViewChild(QrScannerComponent, {static: false}) qrScannerComponent: QrScannerComponent ;

  cols: any[] = [];
  data: any[] = [];
  invoiceNo: string = "";
  disableUpdateBtn: boolean = true;
  otp: string;
  allPermitted: any;
  refundAmount: any;
  refundAmountGet: any;
  noDataFound="";
  typeOfDining="";
  ordersList: any = {};
  showLoader: boolean;
  allpermited='';
  outletDetails:any=[];
  outeltId="";
  mallName=""
  staticDevices=[{"deviceId":"default","kind":"audioinput","label":"","groupId":"7595af7d97dd05d084b0ae764e6212e5615f5c31c516b45b35a13b4f42378918"},{"deviceId":"communications","kind":"audioinput","label":"","groupId":"7595af7d97dd05d084b0ae764e6212e5615f5c31c516b45b35a13b4f42378918"},{"deviceId":"a4326850d76b940eda5966ef14bc8d362ef60249ef3fe28dec9d292674be68ee","kind":"audioinput","label":"","groupId":"7595af7d97dd05d084b0ae764e6212e5615f5c31c516b45b35a13b4f42378918"},{"deviceId":"2ee8e533d552f7401723506f3d8f857915aadfcf7721aa6e6d893b4844a3690b","kind":"videoinput","label":"Integrated Webcam (0c45:6a08)","groupId":"cac8bb8b32474f5408b8a1db0ada4ec4776a3a4bc3811c78215c4ffd4bdff166"},{"deviceId":"default","kind":"audiooutput","label":"","groupId":"7595af7d97dd05d084b0ae764e6212e5615f5c31c516b45b35a13b4f42378918"},{"deviceId":"communications","kind":"audiooutput","label":"","groupId":"7595af7d97dd05d084b0ae764e6212e5615f5c31c516b45b35a13b4f42378918"},{"deviceId":"497182356d66b596669e8dde98a4b088ccbcb50650be801abbfafdf1b523fd12","kind":"audiooutput","label":"","groupId":"7595af7d97dd05d084b0ae764e6212e5615f5c31c516b45b35a13b4f42378918"}]

  constructor(
    public dialog: MatDialog,
    private orderItemService: OrderItemService,
    private uniqueFilterPipe: UniqueFilterPipe,
    private activeRouter: ActivatedRoute
  ) {
    this.typeOfDining=localStorage.getItem('typeOfDining')
    this.allpermited = localStorage.getItem('allpermited')
    this.outletDetails = JSON.parse(localStorage.getItem('outletDetails'))
    console.log("outletDetails",this.outletDetails)
    this.outeltId= this.outletDetails[0].id
    this.mallName = localStorage.getItem('mallName')
   }
   selectoutLet(outletId){ 
    this.outeltId=outletId;
    this.getAllOrders();

  }
  getAllReceivedFullOrders(): void {
    $('.refresh').addClass('rotate');
    let url=""
    if(localStorage.getItem('allpermited')=='Yes'){
     url= "/mall/" + localStorage.getItem('mallId') + "/outlet/" + "all" + "/getAllReceivedFullOrders"
    }else{
      url= "/mall/" + localStorage.getItem('mallId') + "/outlet/" + this.outeltId+ "/getAllReceivedOrders"
    }
    this.orderItemService.getAllReceivedFullOrders(url)
      .subscribe(orders => {
        $('.refresh').removeClass('rotate');
        this.sortOrdersResponse(orders, 'received');
       
      })
  }

  getAllPendingFullOrders(): void {
    $('.refresh').addClass('rotate');
    let url=""
    if(localStorage.getItem('allpermited')=='Yes'){
     url= "/mall/" + localStorage.getItem('mallId') + "/outlet/" + "all" + "/getAllPendingFullOrders"
    }else{
      url= "/mall/" + localStorage.getItem('mallId') + "/outlet/" + this.outeltId + "/getAllPendingOrders"
    }
    this.orderItemService.getAllPendingFullOrders(url)
      .subscribe(orders => {
        $('.refresh').removeClass('rotate');
        this.sortOrdersResponse(orders, 'pending');
      })
  }
  getAllReadyFullOrders(): void {
    $('.refresh').addClass('rotate');
    let url=""
    if(localStorage.getItem('allpermited')=='Yes'){
     url= "/mall/" + localStorage.getItem('mallId') + "/outlet/" + "all" + "/getAllReadyFullOrders"
    }else{
      url= "/mall/" + localStorage.getItem('mallId') + "/outlet/" + this.outeltId + "/getAllReadyOrders"
    }
    this.orderItemService.getAllReadyFullOrders(url)
      .subscribe(orders => {
        $('.refresh').removeClass('rotate');
        this.sortOrdersResponse(orders, 'ready');
      })
  }

  get allOrdersList() {
    return Object.keys(this.ordersList || {}).reduce((allOrders, key) => {
      allOrders = [...allOrders, ...(this.ordersList[key] || [])]
      return allOrders
    }, [])
  }

  refundurl(data){
    let refundUrl = "/print/mall/" + data.jmOrderLet[0].mallId + "/order/" + data.jmOrderLet[0].orderId;
        this.orderItemService.getAllRefundDetails(refundUrl).subscribe(resp => {
          this.refundAmountGet = parseFloat(resp.rejectedConvienceCharges) + parseFloat(resp.rejectedamount) + parseFloat(resp.rejectedcgst) + parseFloat(resp.rejectedsgst);
          let refungCheck = [...this.refundAmountGet];
          this.refundAmount = refungCheck[0].toFixed(2);
  });
  }
  customizationNames="";
  customizationNames2="";
  sortOrdersResponse(orders = [], type) {
    this.noDataFound="";
    if (!orders || orders.length === 0) {
      return;
    }
    this.ordersList[type] = orders;
    orders.forEach((item, index) => {
      if (!item.orderType.includes("POS-")) {
          let jmOrderLet = item.jmOrderLet;
          let uniqueJmOrderLet = item.jmOrderLet;
          orders[index].orders = JSON.parse(JSON.stringify(uniqueJmOrderLet));
          let itemsNames=[]
          item.orders.forEach(elements=>{   
            var itemPresent=false;
             if(itemsNames.length > 0){
              itemsNames.forEach(itemDetails=>{
                if(itemDetails.itemName==elements.itemName){
                  if( itemDetails.itemCustomization!=null && itemDetails.itemCustomization.length!=0 ){
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
          orders[index]['name']="";
          orders[index]['a1Address']="";
          orders[index]['a2Address']="";
          orders[index]['a3Address']="";
          if(itemsNames[0].dinnerVehicleNumber!=null){
            orders[index]['name']=itemsNames[0].dinnerVehicleNumber.split(',')[0];
            orders[index]['a1Address']=itemsNames[0].dinnerVehicleNumber.split(',')[1];
            orders[index]['a2Address']=itemsNames[0].dinnerVehicleNumber.split(',')[2];
            orders[index]['a3Address']=itemsNames[0].dinnerVehicleNumber.split(',')[3];
          } 
          orders[index]['deliveryAddress']=itemsNames[0].dinnerVehicleNumber!=null?itemsNames[0].dinnerVehicleNumber:"";
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
            jmOrderLet: item.jmOrderLet,
            name:item.name,
            a1Address:item.a1Address,
            a2Address:item.a2Address,
            a3Address:item.a3Address
          };
        }
        
      
    });
    this.data = [...this.data];
    this.noDataFound=this.data.length?"":"No Data Found";
    
  }
 

  filterByInvoiceNo(dt): void {
    dt.filter(this.invoiceNo, 'invoiceNo');
  }
  get filterCols() {
    return (this.cols || []).filter(field => field.active)
  }
  id="";
  index="";
  item={}
  rowData={}
  message1=""
  open(id,index,item,rowData){ 
    console.log("id",id);
    console.log("index",index);
    console.log("item",item);
    console.log("rowData",rowData);
    this.id=id;
    this.index=index;
    this.item=item;
    this.rowData=rowData;
    this.message1="Are you Sure want to delete this item?"
  }
  incCount(rowIndex, selectedItemIndex) { 
   
    let qty = this.data[rowIndex].jmOrderLet[selectedItemIndex].quantity;
    let totalQuantity = this.data[rowIndex].jmOrderLet[selectedItemIndex].tempQuantity;
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
  deleteItem(rowIndex, selectedItemIndex): void {
    let amount = this.data[rowIndex].jmOrderLet[selectedItemIndex].amount;
    let grandTotal = this.data[rowIndex].grandTotal;
    let itemsCount = this.data[rowIndex].itemsCount;
    this.data[rowIndex].jmOrderLet.splice(selectedItemIndex, 1);
    this.data[rowIndex].grandTotal = grandTotal - amount;
    if (this.data[rowIndex].itemsCount !== 0) {
      this.data[rowIndex].itemsCount = itemsCount - 1;
    }
    this.data[rowIndex].rowUpdate = true;
  }
  getAllOrders() {
    this.data = [];
    this.ordersList = {};
    this.getAllPendingFullOrders();
    this.getAllReadyFullOrders();
    this.getAllReceivedFullOrders();
  }
  rejectFullOrder(): void {
    let fullOrderId = this.fullOrderId;
    let status = this.fullOrderStatus;
    let rowIndex = this.fullOrderRowIndex; 
    let rowData = this.fullOrderRowData;
    let obj = { "status": status, "rejectReason": "", "quantity": 0, "fullOrderId": fullOrderId };
    this.showLoader = true;
    this.orderItemService.changeFullOrderStatusforOnlineOrders(fullOrderId, obj,rowData)
      .subscribe(res => {
        this.showLoader= !this.showLoader;
        if (status == 'REJECTED') {
          var refundurl = "/getrefundamountFullOrder/malls/" + rowData['mallId'] + "/fullorder/" + fullOrderId;
          this.orderItemService.callRefundAmountServiceFullOrder(refundurl).subscribe(resp => {
            var amount = resp.amount;
            var fullOrderAmount = rowData['amount'] + rowData['taxes'] + rowData['deliveryCharges'] + rowData['packagingCharge'] + rowData['convenience'];
            if (amount > fullOrderAmount) {
              amount = fullOrderAmount;
            }
            this.orderItemService.callRefundServicFullOrdereManager(rowData['dinerId'], amount, rowData['fullOrder5DigitId'], rowData['id'], rowData['orderId'], rowData['mallId']).subscribe(resp => {
            });
          });
        }
        
        if (res.returnValue === "UpdateFullOrder") {
          const order = this.data[rowIndex];
          order.status = res.returnValue;
        }
        this.getAllOrders();
      });
  }
  changeFullOrderStatus(fullOrderId, status, rowIndex, rowData): void {
    let obj = { "status": status, "rejectReason": "", "quantity": 0, "fullOrderId": fullOrderId };
    this.showLoader = true;
    this.orderItemService.changeFullOrderStatusforOnlineOrders(fullOrderId, obj,rowData)
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
            this.orderItemService.callRefundServicFullOrdereManager(rowData.dinerId, amount, rowData.fullOrder5DigitId, rowData.id, rowData.orderId, rowData.mallId).subscribe(resp => {
            });
          });
        }
        
        if (res.returnValue === "UpdateFullOrder") {
          const order = this.data[rowIndex];
          order.status = res.returnValue;
        }
        this.getAllOrders();
      });
  }
  changeOrderletStatus(fullOrderId, orderletsStatus, rowIndex,rowData,fullOrderRejectOrderletIds): void {
    this.showLoader = true;
    this.orderItemService.changeOrderletStatus(fullOrderId, orderletsStatus,rowData)
      .subscribe(res => {
        this.showLoader= !this.showLoader;
        const order = this.data[rowIndex];
        order.status = res.returnValue;
        this.getAllOrders();
        var fullOrderStatusUrl = "/mall/" + localStorage.getItem('mallId') + "/fullOrder/" + fullOrderId;
        this.orderItemService.getFullOrderStatus(fullOrderStatusUrl).subscribe(resp2 => {
          // if(resp2.status!="RECEIVED")
          if (resp2.status == "READY" || resp2.status == "COMPLETED" || resp2.status == "REJECTED") {
            // var refundurl = "/getOrderRefundAmountForRejectOrders/malls/" + this.mallID + "/fullorder/" + fullorderData.id;
            var refundurl = "/getrefundamountFullOrder/malls/" + localStorage.getItem('mallId') + "/fullorder/" + fullOrderId;
            this.orderItemService.callRefundAmountServiceFullOrder(refundurl).subscribe(resp => {
              var amount = resp['amount'];
              if (amount > 0) {
                var fullOrderAmount = resp['amount'] + resp['sgst '] + resp['cgst'] + resp['supplierDeliveryCharge'] + resp['tafelDeliveryCharge'] + resp['packagingCharge'] + resp['convenience'];
                if (amount > fullOrderAmount) {
                  amount = fullOrderAmount;
                }
                fullOrderRejectOrderletIds = fullOrderRejectOrderletIds.replace(/-/g, "");
                this.orderItemService.callRefundServiceManager(rowData.dinerId, amount, rowData.fullOrder5DigitId, fullOrderRejectOrderletIds, rowData.id, rowData.mallId).subscribe(resp => {
                  // this.callRefundServiceOrderlet = resp;
                });
              }
            })
          }
        })
        

      });
  }
  fullOrderId="";
  fullOrderStatus=""
  fullOrderRowIndex=""
  fullOrderRowData=""
    openModel(fullOrderId, status, rowIndex, rowData){
      this.fullOrderId =fullOrderId;
      this.fullOrderStatus=status;
      this.fullOrderRowIndex = rowIndex;
      this.fullOrderRowData = rowData;
      console.log("rowData",this.fullOrderRowData)
      this.message1 = "Are you sure want to delete this order?"
    }
  // updateOrder(): void {
  //   let fullOrderId = this.id;
  //   let rowIndex = this.index;
  //   let item = this.item;
  //   let rowData= this.rowData
  //   item['disableRejectButton']=true;
  //   const fullOrderId5didgit = item['fullOrderId5didgit'];
  //   const updatedOrderLets = this.data[rowIndex].jmOrderLet;
  //   const mainOrder = (this.allOrdersList || []).filter(order => order.fullOrder5DigitId === fullOrderId5didgit)[0] || {};
  //   const mainOrderList = (mainOrder.orders || []).filter(order => order.itemName === item['itemName'])
  //   let orderletsStatus = [];
  //   const quantity = item['quantity'];
  //   mainOrderList.forEach((item, index) => {
  //     const isRejected = index < quantity;
  //     let orderletObj = { "id": item.id, "quantity": 0, "status": isRejected ? "REJECTED" : "INPROGRESS", "rejectionReason": "" };
  //     orderletsStatus.push(orderletObj);
  //   });
  //   let fullOrderRejectOrderletIds=""
  //   orderletsStatus.forEach((value,i)=>{
  //     if(i==0){
  //       fullOrderRejectOrderletIds=fullOrderRejectOrderletIds + value.id;
  //     }else{
  //       fullOrderRejectOrderletIds=fullOrderRejectOrderletIds +','+ value.id;
  //     }
  //   })
  // }

  updateOrder(): void {
    let fullOrderId = this.id;
    let rowIndex = this.index;
    let item = this.item;
    let rowData= this.rowData
    item['disableRejectButton']=true;
    // const fullOrderId5didgit = item.fullOrderId5didgit;
    // // item.status="REJECTED"
    // const updatedOrderLets = this.data[rowIndex].jmOrderLet;
    // const mainOrder = (this.allOrdersList || []).filter(order => order.fullOrder5DigitId === fullOrderId5didgit)[0] || {};
    // const mainOrderList = (mainOrder.orders || []).filter(order => order.itemName === item.itemName)
    
    let orderletsStatus = [];
  
    // const quantity = item.quantity; // 3
    // mainOrderList.forEach((item, index) => {
      
    //   const isRejected = index < quantity;
    //   let orderletObj = { "id": item.id, "quantity": 0, "status":  isRejected ? "REJECTED" : "HANDEDOVER", "rejectionReason": "" };
    //   orderletsStatus.push(orderletObj);
    // });

    for(var i= 0; i < item['quantity'] ; i++){
      let orderletObj = { "id": item['ordeletIds'][i], "quantity": 0, "status": "REJECTED", "rejectionReason": "Due to non availability" };
      orderletsStatus.push(orderletObj);

    }
    for(var j= item['quantity']; i < item['tempQuantity'] ; i++){
      let orderletObj = { "id": item['ordeletIds'][j], "quantity": 0, "status": "HANDEDOVER", "rejectionReason": "" };
      orderletsStatus.push(orderletObj);

    }
    let fullOrderRejectOrderletIds=""
    orderletsStatus.forEach((value,i)=>{
      if(i==0){
        fullOrderRejectOrderletIds=fullOrderRejectOrderletIds + value.id;
      }else{
        fullOrderRejectOrderletIds=fullOrderRejectOrderletIds +','+ value.id;
      }
    })

    this.changeOrderletStatus(fullOrderId, orderletsStatus, rowIndex,rowData,fullOrderRejectOrderletIds);
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
  deviceList=[]
  scanFullOrder(rowData): void {
    var modal = document.getElementById("myModal6");
    modal.style.display = "block";
    // to open the webCam 
    // this.qrScannerComponent.videoElement.setAttribute('playsinline', 'true');
    this.qrScannerComponent.getMediaDevices().then(devices => {
      // this.deviceList=devices.length > 0? devices: this.staticDevices
      this.deviceList=devices.length > 0? devices: this.staticDevices
      console.log("devices",this.deviceList)
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of this.deviceList) {
        if (device.kind.toString() === 'videoinput') {
          videoDevices.push(device);
        }
      }
      if (videoDevices.length > 0) {
        let choosenDev;
        for (const dev of videoDevices) {
          if (dev.label.includes('back')) {
            choosenDev = dev;
            break;
          }
        }
        if (choosenDev) {
          this.qrScannerComponent.chooseCamera.next(choosenDev);
        } else {
          this.qrScannerComponent.chooseCamera.next(videoDevices[0]);

        }
      }
    });

    this.qrScannerComponent.capturedQr.subscribe(result => {
      modal.style.display = "none";
      let value= result.split("/")[1];
      let id=result.split("/")[2]
      this.orderItemService.checkOtp(value, rowData.id).subscribe(resp => {
        if (resp['returnValue'] == "Success") {
          var url = "";
          var url = "";
          if(localStorage.getItem('allpermited')=='Yes'){
            url = "/malls/" + localStorage.getItem('mallId') + "/fullorder/" + rowData.id + "/statusChange";

           }else{
            url = "/malls/" + localStorage.getItem('mallId') + "/order/" + rowData.jmOrderLet[0].orderId + "/statusChange";        
           }
           this.showLoader = true;
          this.orderItemService.updateStatusChange(url, "COMPLETED", 0, "", rowData.id).subscribe(resp => {
            this.showLoader= !this.showLoader;
            this.getAllOrders();
            console.log('Your order has been completed', 'Success!');
          });
        }
        else {
          console.log("Invalid Qr code.!", 'Failure!');
        }
      });
    });
  }
  hoOrder(rowData): void {
  
    var confirmationCode = prompt("Please Enter Confirmation Code", "");
    if (confirmationCode) {
      this.orderItemService.checkOtp(confirmationCode, rowData.id).subscribe(resp => {
        if (resp['returnValue'] == "Success") {
          var url = "";
          if(localStorage.getItem('allpermited')=='Yes'){
            url = "/malls/" + localStorage.getItem('mallId') + "/fullorder/" + rowData.id + "/statusChange";
           }else{
            url = "/malls/" + localStorage.getItem('mallId') + "/order/" + rowData.jmOrderLet[0].orderId + "/statusChange";        
           }
          this.showLoader = true;
          this.orderItemService.updateStatusChange(url, "COMPLETED", 0, "", rowData.id).subscribe(resp => {
            this.showLoader= !this.showLoader;
            this.getAllOrders();
            console.log('Your order has been moved completed', 'Success!');
          });
        }
        else {
          console.log("Please Enter Valid Confirmation Code", 'Failure!');
        }
      });
    }
  }
  // closeModal(){

  // }
  checkOtp(rowIndex, fullOrderId, otp) {
    // this.orderItemService.checkOtp(fullOrderId, otp)
    //   .subscribe(res => {
    //     console.log(res);
    //     if(res) {
    // this.changeFullOrderStatus(fullOrderId, "COMPLETED", rowIndex);
    this.getAllOrders();
    //   }
    // });
  }
  openDialog(rowIndex): void {
    const dialogRef = this.dialog.open(HandedOverOtpDialog, {
      width: '230px',
      data: { otp: this.otp }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.otp = result;
      if (result) {
        this.checkOtp(rowIndex, this.data[rowIndex].id, this.otp);
      }
    });
  }
  ngOnInit() {
    this.getAllOrders();
    const routes = [
      'pending-orders',
      'accepted-orders',
      'ready-orders',
      'handed-orders'
    ];
    this.cols = [
      { active: true, field: 'invoiceNo', header: 'Invoice No' },
      { active: true, field: 'dateNTime', header: 'Date' },
      { active: true, field: 'grandTotal', header: 'Grand Total' },
      { active: true, field: 'itemsCount', header: 'No Of Items' },
      { active: true, field: 'orderType', header: 'Order Type' }
    ];
  }
  closeModal(){
    var modal = document.getElementById("myModal6");
    modal.style.display = "none"
  }

}
