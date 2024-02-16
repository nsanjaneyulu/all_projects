import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';
import { env } from '../common/properties';
export var supplier_access_url;
export var Order_Service_Url;
export var admin_service_endpoint;
export var supplier_item_refund;
export var TAFEL_API_KEY;
export var BomServiceEndPoint;
export const imageEndPoint = 'https://s3.ap-south-1.amazonaws.com/tafel-images';
@Injectable()
export class endPointService implements ErrorHandler {
    PropertiesUrlObj: any;
    headers: HttpHeaders;
    headersNonAdmin: HttpHeaders;
    serviceEndPoint: any;
    orderServiceEndpoint: any;
    adminServiceEndpoint: any;
    dashboardServiceEndpoint: any;
    ccAvenueEndPoint: any;
    tafelApiKey: any;
    paymentgatewayEndPoint: any;
    imageEndPoint: any;
    BomServiceEndPoint:any;
    // env = 'PROD';

    //env='PROD';
    constructor(public http: HttpClient) {
        //this.PropertiesUrlFunction();
    }
    handleError(error) {
        console.log(error);
    }
    PropertiesUrlFunction() {
        console.log("This is not.");
        let propertiesUrl = "https://s3.ap-south-1.amazonaws.com/tafel-images/properties.json";
        this.http.get(propertiesUrl, { headers: this.headersNonAdmin }).subscribe(resp => {
           
            supplier_access_url = resp[env].serviceEndPoint;
            Order_Service_Url = resp[env].orderServiceEndpoint;
            admin_service_endpoint = resp[env].adminServiceEndpoint;
            supplier_item_refund = resp[env].ccAvenueEndPoint;
            BomServiceEndPoint=resp[env].ModulatorServiceEndpoint;
            TAFEL_API_KEY = resp[env].tafelApiKey;
            this.serviceEndPoint=resp[env].serviceEndPoint

        });
    }
}