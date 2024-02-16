import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
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
  mallDetailsService(getAllCountsURL){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(environment.profileService + getAllCountsURL, {
        headers: this.headers
    });
  }
  mallDetailsServices(getAllCountsURL){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + getAllCountsURL, {
        headers: this.headers
    });
  }
  outletDetailsService(getOutletDetailsURL){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + getOutletDetailsURL, {
        headers: this.headers
    });
  }
  getAllCountsService(mallDetailsURL){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + mallDetailsURL, {
        headers: this.headers
    });
  }
  orderDetailsService(orderDetailsURL){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get( environment.apiUrl + orderDetailsURL  , {
        headers: this.headers
    });
  }
}
