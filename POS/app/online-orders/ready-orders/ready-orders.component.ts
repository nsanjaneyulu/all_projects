import { Component, OnInit, Inject } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccordionModule } from 'primeng/accordion';

import { OrderItemService } from '../../order-item.service';
import { UniqueFilterPipe } from '../../unique-filter.pipe';
import { HandedOverOtpDialog } from '../handed-over-otp-dialog';
import { BillingDetailsDialog } from '../../billing-details-dialog';
import * as $ from 'jquery';
export interface DialogData {
  otp: string;
}

@Component({
  selector: 'tafelposapp-ready-orders',
  templateUrl: './ready-orders.component.html',
  styleUrls: ['./ready-orders.component.scss']
})
export class ReadyOrdersComponent implements OnInit {
  cols: any[] = [];
  data: any[] = [];
  invoiceNo: string = "";
  disableUpdateBtn: boolean = true;
  otp: string;
  noDataFound="";
  refundAmount: any;
  refundAmountGet: any;
  showLoader: boolean;
  allpermited="";
  outletDetails:any=[];
  outeltId="";
  mallName=""
  constructor(public dialog: MatDialog, private orderItemService: OrderItemService, private uniqueFilterPipe: UniqueFilterPipe) {
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
        this.sortOrdersResponse(orders);
      })
  }
  customizationNames="";
  customizationNames2=""
  sortOrdersResponse(orders = []) {
    this.noDataFound="";
    if (!orders || orders.length === 0) {
      return;
    }
    orders.forEach((item, index) => {
      if (!item.orderType.includes("POS-")) {
        if (item.status.includes("REJECTED")) {
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
                  if( itemDetails.itemCustomization!=null && itemDetails.itemCustomization.length != 0){
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
          // let jmOrderLet = item.jmOrderLet;
          // let uniqueJmOrderLet = item.jmOrderLet;
          // const items = uniqueJmOrderLet.reduce((prev, curr) => {
          //   const key = `${curr.itemName}_${curr.status}`
          //   prev[key] = [...(prev[key] || []), curr];
          //   return prev;
          // }, {});
          // uniqueJmOrderLet = Object.keys(items).reduce((prev, curr) => {
          //   const total = items[curr].reduce((a, b) => [a[0] + b.quantity, a[1] + b.itemPrice * b.quantity], [0, 0]);
          //   const item = items[curr][0];
          //   item.quantity = total[0];
          //   item.amount = total[1];
          //   prev.push(item);
          //   return prev;
          // }, []);
          // orders[index].jmOrderLet = uniqueJmOrderLet;
          //   this.data[this.data.length] = {
          //     id: item.id,
          //     invoiceNo: item.fullOrder5DigitId,
          //     date: new Date(item.modifiedDate).toLocaleDateString(),
          //     time: new Date(item.modifiedDate).toLocaleTimeString(),
          //     itemTotal: item.amount.toFixed(2),
          //     discount: (item.tafelDiscount + item.supplierDiscount).toFixed(2),
          //     taxes: (item.cgst + item.sgst).toFixed(2),
          //     packagingCharge: item.packagingCharge.toFixed(2),
          //     deliveryCharges: (item.supplierDeliveryCharge + item.tafelDeliveryCharge).toFixed(2),
          //     grandTotal: (item.amount + (item.cgst + item.sgst - item.tafelDiscount - item.supplierDiscount)).toFixed(2),
          //     itemsCount: item.jmOrderLet.length,
          //     jmOrderLet: item.jmOrderLet,
          //     status: item.status,
          //     refundAmountGet: this.refundAmount
          //   };
        }
      }
    });
    this.noDataFound=this.data.length?"":"No Data Found";
  }
  refund(data){
     let refundUrl = "/print/mall/" + data.jmOrderLet[0].mallId + "/order/" + data.jmOrderLet[0].orderId;
          this.orderItemService.getAllRefundDetails(refundUrl).subscribe(resp => {
            this.refundAmountGet = parseFloat(resp.rejectedConvienceCharges) + parseFloat(resp.rejectedamount) + parseFloat(resp.rejectedcgst) + parseFloat(resp.rejectedsgst);
            let refungCheck = [...this.refundAmountGet];
            this.refundAmount = refungCheck + '';
  })
  }
  filterByInvoiceNo(dt): void {
    dt.filter(this.invoiceNo, 'invoiceNo');
  }
  get filterCols() {
    return (this.cols || []).filter(field => field.active)
  }
  changeFullOrderStatus(fullOrderId, status, rowIndex) {
    let obj = { "status": status, "rejectReason": "", "quantity": 0, "fullOrderId": fullOrderId }
    this.orderItemService.changeFullOrderStatus(fullOrderId, obj)
      .subscribe(res => {
        if (res.returnValue === "UpdateFullOrder") {
          this.data.splice(rowIndex, 1);
        }
      });
  }

  checkOtp(rowIndex, fullOrderId, otp) {
    this.changeFullOrderStatus(fullOrderId, "COMPLETED", rowIndex)
  }

  hoOrder(rowIndex): void {
    this.openDialog(rowIndex);
  }

  openDialog(rowIndex): void {
    const dialogRef = this.dialog.open(HandedOverOtpDialog, {
      data: { otp: this.otp }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.otp = result;
      if (result) {
        this.checkOtp(rowIndex, this.data[rowIndex].id, this.otp);
      }
    });
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
  getAllOrders() {
    this.getAllCompletedFullOrders();
  }
  ngOnInit() {
    this.getAllOrders();
    this.cols = [
      { active: true, field: 'invoiceNo', header: 'Invoice No' },
      { active: true, field: 'dateNTime', header: 'Date' },
      // { active: true, field: 'time', header: 'Time' },
      { active: true, field: 'grandTotal', header: 'Grand Total' },
      { active: true, field: 'itemsCount', header: 'No Of Items' },
      { active: true, field: 'status', header: 'Status' }
    ];
  }

}
