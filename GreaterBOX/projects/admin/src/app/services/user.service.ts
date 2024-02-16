import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, config } from "rxjs";
import { Router } from "@angular/router";
import { User } from "../model/user.model";
import { ApiResponse } from "../model/api.response";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string;

  constructor(private http: HttpClient, private router: Router) {
    this.url = environment.api_endpoint;
   }

   login(loginPayload: { email: any; password: any }): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.url + `Api/User/Token`, loginPayload);
  }
}
