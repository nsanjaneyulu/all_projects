import { Component, OnInit, OnDestroy } from "@angular/core";
import { OrderService } from "../services/order.service";
import { IOrder } from "../model/order-model";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Angular2Csv } from "angular2-csv";

import { identifierModuleUrl } from "@angular/compiler";
import { NgxSpinnerService } from "ngx-spinner";
import Swal from "sweetalert2";
import { map } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit, OnDestroy {
  ordersThisWeek: IOrder[];
  order: any;
  orderList: IOrder[];
  searchForm: FormGroup;
  name = "Angular 6";
  status: any[];
  maxdate: Date;
  minDate: Date;
  subscriptions: Subscription;
  bsDateConfig: object;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: OrderService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.subscriptions = new Subscription();
    this.maxdate = new Date();
    this.minDate = new Date(2020, 0, 1);
    this.bsDateConfig = {
      dateInputFormat: "DD-MM-YYYY",
      endDate: this.maxdate,
      startDate: this.minDate,
      minDate: this.minDate,
      maxDate: this.maxdate,
    };
    this.spinner.show();
    this.searchForm = this.formBuilder.group({
      startdate: [
        "",
        [
          Validators.required,
          this.validateDate.bind(null, this.minDate, this.maxdate),
        ],
      ],
      enddate: [
        "",
        [
          Validators.required,
          this.validateDate.bind(null, this.minDate, this.maxdate),
        ],
      ],
    });
    const endDateValidation = this.getStartDate.valueChanges
      .pipe(
        map((value) => {
          if (value) {
            this.getEndDate.setValidators([
              Validators.required,
              this.validateDate.bind(null, value, this.maxdate),
            ]);
          } else {
            this.getEndDate.setValidators([
              Validators.required,
              this.validateDate.bind(null, this.minDate, this.maxdate),
            ]);
          }
          this.getEndDate.updateValueAndValidity();
        })
      )
      .subscribe();
    this.subscriptions.add(endDateValidation);
    this.getOrderList();
  }

  validateDate(minDate: Date, maxDate: Date, control: AbstractControl) {
    const inputValue = control.value;
    if (!inputValue) {
      return { required: true };
    }
    if (inputValue instanceof Date) {
      const time = inputValue.getTime();
      return time >= minDate.getTime() && time <= maxDate.getTime()
        ? null
        : { notInRange: true };
    }
  }

  get getStartDate() {
    return this.searchForm.get("startdate") as FormControl;
  }
  get getEndDate() {
    return this.searchForm.get("enddate") as FormControl;
  }

  getOrderList() {
    var authorisation = "Bearer " + window.localStorage.getItem("userToken");
    this.apiService.orderDetails(authorisation).then((res) => {
      console.log("res", res);
      let newArr = [];
      this.order = res;
      this.order.forEach((element) => {
        let obj = {} as IOrder;
        obj.transactionId = element.paymentCard.transactionID;
        obj.firstName = element.firstName;
        obj.lastName = element.lastName;
        obj.email = element.email;
        obj.phone = element.phoneNumber;
        obj.pickupLocation = element.pickUpLocationName;
        obj.pickupDate = element.pickUpDate;
        let prodQuantity: number = element.products
          .map((a) => a.quantity + "-" + a.name)
          .reduce(function (a, b) {
            return a + ",  " + b;
          });
        obj.quantity = prodQuantity;
        obj.amountPaid = element.paymentAmount;
        newArr.push(obj);
      });

      this.orderList = newArr;
      this.spinner.hide();
    });
  }

  onSearch() {
    if (!this.searchForm.valid) {
      return;
    }
    this.spinner.show();
    function convert(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }
    var startdate = convert(this.searchForm.controls.startdate.value);
    var enddate = convert(this.searchForm.controls.enddate.value);
    if (startdate == null && enddate == null) {
      this.getOrderList();
      return;
    }

    var authorisation = "Bearer " + window.localStorage.getItem("userToken");
    this.apiService
      .orderDetailsbyDate(authorisation, startdate, enddate)
      .subscribe((data) => {
        this.spinner.hide();
        var data1 = JSON.stringify(data);
        var data2 = JSON.parse(data1);
        if (data2.length != 0) {
          console.log("res", data2);
          let newArr = [];
          this.order = data2;
          this.order.forEach((element) => {
            let obj = {} as IOrder;
            obj.transactionId = element.paymentCard.transactionID;
            obj.firstName = element.firstName;
            obj.lastName = element.lastName;
            obj.email = element.email;
            obj.phone = element.phoneNumber;
            obj.pickupLocation = element.pickUpLocationName;
            obj.pickupDate = element.pickUpDate;
            let prodQuantity: number = element.products
              .map((a) => a.quantity)
              .reduce(function (a, b) {
                return a + b;
              });
            obj.quantity = prodQuantity;
            obj.amountPaid = element.paymentAmount;
            newArr.push(obj);
          });

          this.orderList = newArr;
        } else {
          Swal.fire("No record found!");
        }
      });
  }

  downloadCSV() {
    var options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalseparator: ".",
      showLabels: true,
      showTitle: false,
      useBom: true,
      headers: [
        "Order #",
        "Firstname",
        "LastName",
        "E-mail",
        "Phone #",
        "Pick-up location",
        "Pick-up Date",
        "Quantity",
        "Sales totals",
      ],
    };
    const testData = this.orderList.map((d) => {
      d.transactionId = d.transactionId.concat("##");
      return d;
    });
    const res = new Angular2Csv(testData, "Order-" + this.maxdate, options);
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
