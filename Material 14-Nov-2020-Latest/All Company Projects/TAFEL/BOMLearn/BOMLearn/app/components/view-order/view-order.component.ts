import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {
  viewDetails: any;
  uniqueJmOrderLet: any;
  constructor(public matDialog: MatDialogRef<ViewOrderComponent>,@Inject(MAT_DIALOG_DATA) public data?: any) {
    this.viewDetails=data;
    const items = this.viewDetails['orderLet'].reduce((prev, curr) => {
      const key = `${curr.itemName}`
      prev[key] = [...(prev[key] || []), curr];
      return prev;
  }, {});
  console.log("items", items);
  this.uniqueJmOrderLet = Object.keys(items).reduce((prev, curr) => {
      const total = items[curr].reduce((a, b) => [a[0] + b.quantity, a[1] + b.itemPrice * b.quantity], [0, 0]);
      const item = items[curr][0];
      item.quantity = total[0];
      item.totalQuantity = total[0];
      item.amount = total[1];
      prev.push(item);
      return prev;
  }, []);
    console.log("this.uniqueJmOrderLet",this.uniqueJmOrderLet);
    }

  ngOnInit() {
  }

}
