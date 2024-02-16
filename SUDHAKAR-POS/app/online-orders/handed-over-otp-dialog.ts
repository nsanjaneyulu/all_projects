import { Component, OnInit, Inject } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  otp: string;
}

@Component({
  selector: 'handed-over-otp-dialog',
  templateUrl: 'handed-over-otp-dialog.html',
})
export class HandedOverOtpDialog {

  constructor(
    public dialogRef: MatDialogRef<HandedOverOtpDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
