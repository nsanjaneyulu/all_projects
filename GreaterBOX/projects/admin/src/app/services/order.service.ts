import { Injectable, OnInit, OnDestroy } from "@angular/core";
import { IOrder } from "../model/order-model";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, config } from "rxjs";
import { Router } from "@angular/router";
import { ApiResponse } from "../model/api.response";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class OrderService implements OnInit, OnDestroy {
  orders: IOrder[];
  url: string;

  constructor(private http: HttpClient, private router: Router) {
    this.url = environment.api_endpoint;
  }

  orderDetails(Authorization: string) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: Authorization,
    });
    let options = { headers: headers };
    return this.http
      .get<ApiResponse>(this.url + `Api/Orders`, options)
      .toPromise();
  }

  orderDetailsbyDate(
    Authorization: string,
    startdate: any,
    enddate: any
  ): Observable<ApiResponse> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: Authorization,
    });
    let options = { headers: headers };
    const offset = new Date().getTimezoneOffset();
    return this.http.get<ApiResponse>(
      this.url +
        `Api/Orders/By/Dates?startDate=${startdate}&endDate=${enddate}&timeZoneOffset=${offset}`,
      options
    );
  }

  //OnInit
  ngOnInit() {
    this.Initialize();
  }

  //OnDestroy
  ngOnDestroy() {}

  //Private Methods
  Initialize() {}

  // Get Orders:
  GetOrders() {
    return [
      {
        id: "1",
        firstName: "shekhar",
        lastName: "kumar",
        amountPaid: 200.9,
        email: "shekhar@talentas.in",
        orderNumber: "9037243875",
        products: "Produce Box, Donation Box",
        quantity: 4,
      },
      {
        id: "2",
        firstName: "Tom",
        lastName: "Biswas",
        amountPaid: 200.9,
        email: "shekhar@talentas.in",
        orderNumber: "9037243875",
        products: "Produce Box, Donation Box",
        quantity: 4,
      },
      {
        id: "3",
        firstName: "Tubai",
        lastName: "Biswas",
        amountPaid: 200.9,
        email: "shekhar@talentas.in",
        orderNumber: "9037243875",
        products: "Produce Box, Donation Box",
        quantity: 4,
      },
    ];
  }
}
