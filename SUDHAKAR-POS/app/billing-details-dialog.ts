import { Component, OnInit, Inject } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  itemTotal: number;
  taxes: number;
  discount: number;
  grandTotal: number;
}

@Component({
  selector: 'billing-details-dialog',
  templateUrl: 'billing-details-dialog.html',
})
export class BillingDetailsDialog {

  constructor(
    public dialogRef: MatDialogRef<BillingDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

}
