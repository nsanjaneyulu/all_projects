import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { environment } from "../../environments/environment";
import { catchError, tap } from "rxjs/operators";
import { Observable, of, ReplaySubject, throwError } from "rxjs";
import { PaymentEntity } from "../models/PaymentEntity";
import { OrderEntity } from "../models/OrderEntity";
@Injectable({
  providedIn: "root",
})
export class HomeService {
  private orderDetails: object;
  private confirmedOrderDetails: object;
  private boxtypeUrl = "Products";
  private cardUrl = "Payment/Vesta/Card/Valid/";
  private uuIDUrl = "Payment/Vesta/Session/";
  private pickUpLocationUrl = "PickUp/Locations";
  private checkoutUrl = "Order";
  private inventoryAvailableUrl = "Available/Inventories";

  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = this.getHeadersForService();
  }

  getHeadersForService() {
    const headers = new HttpHeaders({
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    return headers;
  }

  boxtypeService() {
    return this.http.get(environment.serverURL + this.boxtypeUrl, {
      headers: this.headers,
    });
  }

  pickUpservice() {
    return this.http.get(environment.serverURL + this.pickUpLocationUrl, {
      headers: this.headers,
    });
  }

  // Available Inventories.
  GetAvailableInventories() {
    return this.http.get(environment.serverURL + this.inventoryAvailableUrl, {
      headers: this.headers,
    });
  }

  WebSessionIDService(uuid) {
    return this.http.get(environment.serverURL + this.uuIDUrl + uuid, {
      headers: this.headers,
    });
  }

  checkoutFormSubmit(formData: OrderEntity) {
    return this.http
      .post(
        environment.serverURL + this.checkoutUrl,
        JSON.stringify(formData),
        {
          headers: this.headers,
        }
      )
      .pipe(tap(), catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = "";
    if (error instanceof HttpErrorResponse) {
      // client-side error
      if (error.status === 401 && error.error === null) {
        errorMessage = "UnAuthorized Request";
      } else if (error.error === null) {
        errorMessage = error.name;
      } else {
        errorMessage = error.error;
      }
    } else {
      // server-side error
      errorMessage = `${error.status} ${error.statusText}`;
    }
    return throwError(errorMessage);
  }

  setOrderDetails(data) {
    this.orderDetails = data;
  }

  getConfirmedOrderStatus() {
    return this.confirmedOrderDetails;
  }

  setConfirmedOrderStatus(data) {
    this.confirmedOrderDetails = data;
  }

  getOrderDetails() {
    return this.orderDetails;
  }
}
