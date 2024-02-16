import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { map } from "rxjs/operators";

@Component({
  selector: "app-orders-status",
  templateUrl: "./orders-status.component.html",
  styleUrls: ["./orders-status.component.scss"],
})
export class OrdersStatusComponent implements OnInit {
  routeState: any;

  // Order Response
  orderResponse: any;
  totalQuantity: any;
  totalAmountPaid: any;
  pickupDate: any;
  constructor(
    private routeCtrl: Router,
    private formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.routeState = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );

    this.routeState.subscribe((data) => {
      this.orderResponse = data;
      let q = 0;
      let amount = 0;
      let datePart = data.pickUpDate.split("T")[0];
      let dTimezone = new Date();
      let offset = dTimezone.getTimezoneOffset() / 60;
      let pickupdateLocale = new Date(Date.parse(datePart));
      pickupdateLocale.setHours(pickupdateLocale.getHours() + offset);
      this.pickupDate = pickupdateLocale.toDateString();
      data.products.forEach((prod) => {
        q += prod.quantity;
        amount += prod.pricePerUnit * prod.quantity;
      });
      this.totalQuantity = q;
      this.totalAmountPaid = amount;
    });
  }
}
