import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AccordionModule } from 'primeng/accordion';

import { OrderItemService } from '../order-item.service';
import { UniqueFilterPipe } from '../unique-filter.pipe';
import { BillingDetailsDialog } from '../billing-details-dialog';

@Component({
  selector: 'tafelposapp-pos-orders',
  templateUrl: './pos-orders.component.html',
  styleUrls: ['./pos-orders.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class PosOrdersComponent implements OnInit {
  cols: any[] = [];
  data: any[] = [];
  invoiceNo: string = "";
  disableUpdateBtn: boolean = true;
  discount: any = 0;

  constructor(public dialog: MatDialog, private orderItemService: OrderItemService, private uniqueFilterPipe: UniqueFilterPipe) { }

  getAllCompletedFullOrders(): void {
    this.orderItemService.getAllCompletedFullOrders()
      .subscribe(allCompletedFullOrders => {
        if (allCompletedFullOrders.length) {
          allCompletedFullOrders.forEach((item, index) => {
            if (item.orderType.includes("POS-")) {
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
                grandTotal: item.amount + (item.cgst + item.sgst) - (item.tafelDiscount + item.supplierDiscount),
                itemsCount: item.jmOrderLet.length,
                reprint: "print",
                status: item.status,
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

  // incCount(rowIndex, selectedItemIndex): void {
  //   let qty = this.data[rowIndex].jmOrderLet[selectedItemIndex].quantity;
  //   let price = this.data[rowIndex].jmOrderLet[selectedItemIndex].itemPrice;
  //   let amount = this.data[rowIndex].jmOrderLet[selectedItemIndex].amount;
  //   let grandTotal = this.data[rowIndex].grandTotal;
  //   let itemsCount = this.data[rowIndex].itemsCount;

  //   if (this.data[rowIndex].jmOrderLet[selectedItemIndex].quantity === 0) {
  //     this.data[rowIndex].itemsCount = itemsCount + 1;
  //   }

  //   this.data[rowIndex].jmOrderLet[selectedItemIndex].quantity = qty + 1;
  //   this.data[rowIndex].jmOrderLet[selectedItemIndex].amount = amount + price;
  //   this.data[rowIndex].grandTotal = grandTotal + price;
  // }

  // decCount(rowIndex, selectedItemIndex): void {
  //   let qty = this.data[rowIndex].jmOrderLet[selectedItemIndex].quantity;
  //   let price = this.data[rowIndex].jmOrderLet[selectedItemIndex].itemPrice;
  //   let amount = this.data[rowIndex].jmOrderLet[selectedItemIndex].amount;
  //   let grandTotal = this.data[rowIndex].grandTotal;
  //   let itemsCount = this.data[rowIndex].itemsCount;

  //   if (qty > 0) {
  //     this.data[rowIndex].jmOrderLet[selectedItemIndex].quantity = qty - 1;
  //     this.data[rowIndex].jmOrderLet[selectedItemIndex].amount = amount - price;
  //     this.data[rowIndex].grandTotal = grandTotal - price;
  //     if (this.data[rowIndex].jmOrderLet[selectedItemIndex].quantity === 0) {
  //       this.data[rowIndex].itemsCount = itemsCount - 1;
  //     }

  //   }
  // }

  // deleteItem(rowIndex, selectedItemIndex): void {
  //   let amount = this.data[rowIndex].jmOrderLet[selectedItemIndex].amount;
  //   let grandTotal = this.data[rowIndex].grandTotal;
  //   let itemsCount = this.data[rowIndex].itemsCount;
  //   this.data[rowIndex].jmOrderLet.splice(selectedItemIndex, 1);
  //   this.data[rowIndex].grandTotal = grandTotal - amount;
  //   if (this.data[rowIndex].itemsCount !== 0) {
  //     this.data[rowIndex].itemsCount = itemsCount - 1;
  //   }
  // }

  // rejectOrder(rowIndex): void {
  //   console.log(rowIndex);
  // }

  // updateOrder(rowIndex): void {

  // }

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
      { field: 'reprint', header: 'Reprint' },
      { field: 'status', header: 'Status' }
    ];
  }

}
