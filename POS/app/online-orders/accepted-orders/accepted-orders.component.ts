import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AccordionModule } from 'primeng/accordion';

import { OrderItemService } from '../../order-item.service';
import { UniqueFilterPipe } from '../../unique-filter.pipe';
import { HandedOverOtpDialog } from '../handed-over-otp-dialog';
import { BillingDetailsDialog } from '../../billing-details-dialog';

export interface DialogData {
  otp: string;
}

@Component({
  selector: 'tafelposapp-accepted-orders',
  templateUrl: './accepted-orders.component.html',
  styleUrls: ['./accepted-orders.component.scss']
})
export class AcceptedOrdersComponent implements OnInit {
  cols: any[] = [];
  data: any[] = [];
  invoiceNo: string = "";
  disableUpdateBtn: boolean = true;
  otp: string;

  constructor(public dialog: MatDialog, private orderItemService: OrderItemService, private uniqueFilterPipe: UniqueFilterPipe) { }

  getAllPendingFullOrders(): void {
    let url=""
    if(localStorage.getItem('allpermited')=='Yes'){
     url= "/mall/" + localStorage.getItem('mallId') + "/outlet/" + "all" + "/getAllPendingOrders"
    }else{
      url= "/mall/" + localStorage.getItem('mallId') + "/outlet/" + localStorage.getItem('outletIds') + "/getAllPendingOrders"

    }
    this.orderItemService.getAllPendingFullOrders(url)
      .subscribe(allPendingFullOrders => {
        if (allPendingFullOrders.length) {
          allPendingFullOrders.forEach((item, index) => {
            if (!item.orderType.includes("POS-")) {
              let jmOrderLet = item.jmOrderLet;
              let uniqueJmOrderLet = this.uniqueFilterPipe.transform(item.jmOrderLet, "itemId");
              uniqueJmOrderLet.forEach((uniqueItem, uniqueItemIndex) => {
                let itemQty = 0;
                itemQty = jmOrderLet.reduce((n, jmOrderLetItem) => {
                  return n + (jmOrderLetItem.itemId == uniqueItem.itemId);
                }, 0);
                uniqueJmOrderLet[uniqueItemIndex].quantity = itemQty;
                uniqueJmOrderLet[uniqueItemIndex].amount = itemQty * uniqueJmOrderLet[uniqueItemIndex].itemPrice;
              });
              allPendingFullOrders[index].jmOrderLet = uniqueJmOrderLet;

              this.data[this.data.length] = {
                id: item.id,
                invoiceNo: item.fullOrder5DigitId,
                date: new Date(item.modifiedDate).toLocaleDateString(),
                time: new Date(item.modifiedDate).toLocaleTimeString(),
                itemTotal: item.amount,
                discount: item.tafelDiscount + item.supplierDiscount,
                taxes: item.cgst + item.sgst,
                packagingCharge: item.packagingCharge,
                deliveryCharges: (item.supplierDeliveryCharge + item.tafelDeliveryCharge),
                grandTotal: item.amount + (item.cgst + item.sgst - item.tafelDiscount - item.supplierDiscount),
                itemsCount: item.jmOrderLet.length,
                jmOrderLet: item.jmOrderLet
              };
            }
          });
        }
      })
  }

  filterByInvoiceNo(dt): void {
    dt.filter(this.invoiceNo, 'invoiceNo', 'contains');
  }

  changeFullOrderStatus(fullOrderId, status, rowIndex) {

    let obj = { "status": status, "rejectReason": "", "quantity": 0, "fullOrderId": fullOrderId }
    this.orderItemService.changeFullOrderStatus(fullOrderId, obj)
      .subscribe(res => {
        if(res.returnValue === "UpdateFullOrder") {
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
      width: '230px',
      data: {otp: this.otp}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.otp = result;
      if(result) {
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

  ngOnInit() {
    this.getAllPendingFullOrders();

    this.cols = [
      { field: 'invoiceNo', header: 'Invoice No' },
      { field: 'date', header: 'Date' },
      { field: 'time', header: 'Time' },
      { field: 'grandTotal', header: 'Grand Total' },
      { field: 'itemsCount', header: 'No Of Items' }
    ];
  }

}
