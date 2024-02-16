import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, config } from "rxjs";
import { Router } from "@angular/router";
import { ApiResponse } from "../model/api.response";
import { environment } from "../../environments/environment";
import { Inventory } from "../model/inventory.model";

@Injectable({
  providedIn: "root",
})
export class InventoryService {
  url: string;
  createInventoryURL = "Api/Inventory";

  constructor(private http: HttpClient, private router: Router) {
    this.url = environment.api_endpoint;
  }

  getInventory(Authorization: string): Observable<ApiResponse> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: Authorization,
    });
    let options = { headers: headers };
    return this.http.get<ApiResponse>(this.url + `Api/Inventories`, options);
  }

  getAvailableInventory(Authorization: string): Observable<ApiResponse> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: Authorization,
    });
    let options = { headers: headers };
    return this.http.get<ApiResponse>(
      this.url + `Api/Available/Inventories`,
      options
    );
  }

  inventoryPatch(
    Authorization: string,
    loginPayload: {
      id: any;
      productId: any;
      productName: any;
      beginingInventory: any;
      orderdedQuantity: any;
      remaining: any;
      isActive: any;
    }
  ): Observable<ApiResponse> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: Authorization,
    });
    let options = { headers: headers };
    return this.http.patch<ApiResponse>(
      this.url + `Api/Inventory`,
      loginPayload,
      options
    );
  }

  createInventory(inventoryPayLoad: Inventory) {
    var authorisation = "Bearer " + window.localStorage.getItem("userToken");

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: authorisation,
    });
    let options = { headers: headers };

    const url = `${this.url}${this.createInventoryURL}`;
    return this.http.post(url, inventoryPayLoad, options);
  }
}
