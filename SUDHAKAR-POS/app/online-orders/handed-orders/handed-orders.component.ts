import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AccordionModule } from 'primeng/accordion';

import { OrderItemService } from '../../order-item.service';
import { UniqueFilterPipe } from '../../unique-filter.pipe';
import { BillingDetailsDialog } from '../../billing-details-dialog';

@Component({
  selector: 'tafelposapp-handed-orders',
  templateUrl: './handed-orders.component.html',
  styleUrls: ['./handed-orders.component.scss']
})
export class HandedOrdersComponent implements OnInit {
  cols: any[] = [];
  data: any[] = [];
  invoiceNo: string = "";

  constructor(public dialog: MatDialog, private orderItemService: OrderItemService, private uniqueFilterPipe: UniqueFilterPipe) { }

  getAllCompletedFullOrders(): void {
    this.orderItemService.getAllCompletedFullOrders()
      .subscribe(allCompletedFullOrders => {
        if (allCompletedFullOrders.length) {
          allCompletedFullOrders.forEach((item, index) => {
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
              allCompletedFullOrders[index].jmOrderLet = uniqueJmOrderLet;

              this.data[this.data.length] = {
                id: item.id,
                invoiceNo: item.fullOrder5DigitId,
                date: new Date(item.modifiedDate).toLocaleDateString(),
                time: new Date(item.modifiedDate).toLocaleTimeString(),
                itemTotal: item.amount,
                discount: item.tafelDiscount + item.supplierDiscount,
                taxes: item.cgst + item.sgst,
                grandTotal: item.amount + (item.cgst + item.sgst - item.tafelDiscount - item.supplierDiscount),
                itemsCount: item.jmOrderLet.length,
                jmOrderLet: item.jmOrderLet,
                status: item.status
              };
            }
          });
        }
      })
  }

  filterByInvoiceNo(dt): void {
    dt.filter(this.invoiceNo, 'invoiceNo', 'contains');
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
    this.getAllCompletedFullOrders();

    this.cols = [
      { field: 'invoiceNo', header: 'Invoice No' },
      { field: 'date', header: 'Date' },
      { field: 'time', header: 'Time' },
      { field: 'grandTotal', header: 'Grand Total' },
      { field: 'itemsCount', header: 'No Of Items' },
      { field: 'status', header: 'Status' }
    ];
  }

}
