import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, config } from "rxjs";
import { Router } from "@angular/router";
import { ApiResponse } from "../model/api.response";
import { environment } from "../../environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  url: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    public jwtHelper: JwtHelperService
  ) {
    this.url = environment.api_endpoint;
  }

  public isAuthenticated(): boolean {
    const userToken = window.localStorage.getItem("userToken");
    return !this.jwtHelper.isTokenExpired(userToken);
  }

  productDetails(Authorization: string): Observable<ApiResponse> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: Authorization,
    });
    let options = { headers: headers };
    return this.http.get<ApiResponse>(this.url + `Api/Products`, options);
  }

  productPatch(
    Authorization: string,
    loginPayload: {
      id: any;
      name: any;
      description: any;
      pricePerUnit: any;
      items: any;
      sequence: any;
      isActive: any;
    }
  ): Observable<ApiResponse> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: Authorization,
    });
    let options = { headers: headers };
    return this.http.patch<ApiResponse>(
      this.url + `Api/Product`,
      loginPayload,
      options
    );
  }

  addProduct(
    Authorization: string,
    loginPayload: {
      name: any;
      description: any;
      pricePerUnit: any;
      items: any;
      sequence: any;
      isActive: any;
    }
  ): Observable<string> {
    let headers = new HttpHeaders({
      Authorization: Authorization,
      "Content-Type": "application/json",
    });
    const options = { headers };
    return this.http.post<string>(
      this.url + `Api/Product`,
      loginPayload,
      Object.assign({}, options, {
        responseType: "text",
      })
    );
  }

  deleteProduct(
    Authorization: string,
    productId: any
  ): Observable<ApiResponse> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: Authorization,
    });
    let options = { headers: headers };
    return this.http.delete<ApiResponse>(
      this.url + `Api/Product/` + productId,
      options
    );
  }
}
