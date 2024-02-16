import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-view-order-details',
  templateUrl: './view-order-details.component.html',
  styleUrls: ['./view-order-details.component.scss']
})
export class ViewOrderDetailsComponent implements OnInit {
  viewDetails: any;
  dineraddress: any;
  constructor(public dialogRef: MatDialogRef<ViewOrderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any) {
     
      this.viewDetails=data;
      this.viewDetails.orderLet.forEach(element => {
      this.dineraddress = element.dinnerVehicleNumber;
    });
  
     }

  ngOnInit() {
  }

}
