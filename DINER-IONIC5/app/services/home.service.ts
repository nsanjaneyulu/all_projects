import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  headersNonAdmin:HttpHeaders;
  constructor(private utilitiesService:UtilitiesService,public http: HttpClient) { }

  createOTP(loginData) {
    // This will create OTP and send SMS  
    
    let url = this.utilitiesService.adminServiceEndpoint + '/otp?otp=';
    console.log(loginData)
    let body = {
      "deviceType": loginData.platform,
      "deviceId": loginData.deviceId ? loginData.deviceId : '1111-2222-5555',
      "phoneNumber": loginData.phoneNumber,
      "userType": "DINER"
    }

    if (loginData.platform === "browser") {
      body.deviceId = 'Guest-Browser';
      body.deviceType = 'android';
    }
    console.log(url)
    return this.http.post(url, body, { headers: {"x-api-key":this.utilitiesService.tafelApiKey} });
  }

  validateOTP(validatingOTP) {
    console.log(validatingOTP)
    let url = this.utilitiesService.adminServiceEndpoint + '/otp?otp=' + validatingOTP.code;
    console.log(url)
    let body={
      "deviceType": validatingOTP.platform,
      "deviceId": validatingOTP.deviceId ? validatingOTP.deviceId : '1111-2222-5555',
      "phoneNumber": validatingOTP.phoneNumber,
      "userType": "DINER",
      "email":validatingOTP.emailId
    }
    // console.log(deviceId);
    // let body = {
    //   "deviceType": platform,
    //   "deviceId": deviceId ? deviceId : '1111-2222-5555',
    //   "phoneNumber": phoneNumber,
    //   "userType": "DINER"
    // }
    if (validatingOTP.platform === "browser") {
      body.deviceId = 'Guest-Browser';
      body.deviceType = 'android';
    }
    //console.log(body);
    return this.http.post(url, body, { headers: {"x-api-key":this.utilitiesService.tafelApiKey}  });
  }
}
