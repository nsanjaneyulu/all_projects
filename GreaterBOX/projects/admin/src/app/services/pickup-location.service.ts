import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, config } from "rxjs";
import { Router } from "@angular/router";
import { ApiResponse } from "../model/api.response";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class PickupLocationService {
  url: string;

  constructor(private http: HttpClient, private router: Router) {
    this.url = environment.api_endpoint;
  }

  getPickUpLocations(Authorization: string): Observable<ApiResponse> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: Authorization,
    });
    let options = { headers: headers };
    return this.http.get<ApiResponse>(
      this.url + `Api/PickUp/Locations`,
      options
    );
  }

  pickUpLocationPatch(
    Authorization: string,
    loginPayload: {
      id: any;
      location: any;
      pickUpTimeStart: any;
      pickUpTimeEnd: any;
      isActive: any;
    }
  ): Observable<ApiResponse> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: Authorization,
    });
    let options = { headers: headers };
    return this.http.patch<ApiResponse>(
      this.url + `Api/PickUp/Location`,
      loginPayload,
      options
    );
  }

  deletePickUpLocation(
    Authorization: string,
    productId: any
  ): Observable<ApiResponse> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: Authorization,
    });
    let options = { headers: headers };
    return this.http.delete<ApiResponse>(
      this.url + `Api/PickUp/Location/` + productId,
      options
    );
  }

  addLocation(
    Authorization: string,
    loginPayload: {
      location: any;
      pickUpTimeStart: any;
      pickUpTimeEnd: any;
      isActive: any;
    }
  ): Observable<ApiResponse> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: Authorization,
    });
    let options = { headers: headers };
    return this.http.post<ApiResponse>(
      this.url + `Api/PickUp/Location`,
      loginPayload,
      options
    );
  }

  getFormatTime(timeValue: string): string {
    let timeSplit = timeValue.split(":");
    let hours, minutes, meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = "PM";
      hours -= 12;
    } else if (hours < 12) {
      meridian = "AM";
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = "PM";
    }
    return `${String(hours).padStart(2, "0")}:${String(minutes).padEnd(
      2,
      "0"
    )} ${meridian}`;
  }

  getTime(formattedValue: string): string {
    let time: string;
    const splitValue = formattedValue.trim().split(" ");
    let formattedHrs;
    let merdian: string;
    let timeInput: string;
    if (splitValue && splitValue.length === 2) {
      merdian = splitValue[1];
      timeInput = splitValue[0];
    } else if (splitValue && splitValue.length === 1) {
      merdian = "AM";
      timeInput = splitValue[0];
    }
    if (!timeInput.includes(":")) {
      return time;
    }
    const [hours, min] = timeInput.split(":");
    const hoursVal = Number(hours);
    const minsVal = Number(min);
    if (merdian === "AM") {
      formattedHrs = hoursVal === 0 ? 12 : hoursVal;
    } else if (merdian === "PM") {
      formattedHrs = hoursVal + 12;
    } else {
      formattedHrs = hoursVal === 0 ? 12 : hoursVal;
    }
    time = `${formattedHrs}:${minsVal}`;
    return time;
  }
}
