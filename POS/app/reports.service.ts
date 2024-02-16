import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  headers: HttpHeaders
  constructor(private http: HttpClient,) {
    this.headers = this.getHeadersForService();
   }
  getHeadersForService() {
		let headers = new HttpHeaders({
			'content-type': 'application/json'
		});
		return headers;
  }
  getMallDetails(url) {
    console.log("@@@@@@@@@@@@@@@@@@@@22222")

    let pendingUrl = environment.supplierAccessURL + url;
    let localData = this.http.get(pendingUrl, {
        headers: this.headers
    });
    return localData;
}
getOutletDetails(url){
    let pendingUrl = environment.orderServiceURL + url;
    let localData = this.http.get(pendingUrl, {
        headers: this.headers
    });
    return localData;

}
getOutletTimings(url) {
    let pendingUrl = environment.orderServiceURL + url;
    let localData = this.http.get(pendingUrl, {
        headers: this.headers
    });
    return localData;
}
getDataforEndOfthereport(url) {
    let pendingUrl = environment.orderServiceURL + url;
    let localData = this.http.get(pendingUrl, {
        headers: this.headers
    });
    return localData;
}
sendMail(url) {
    let pendingUrl = environment.orderServiceURL + url;
    let localData = this.http.get(pendingUrl, {
        headers: this.headers
    });
    return localData;
}
}
