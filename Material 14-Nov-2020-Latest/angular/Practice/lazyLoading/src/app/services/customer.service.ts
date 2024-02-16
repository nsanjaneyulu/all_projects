import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public stringSubject = new Subject<string>();
  headers: HttpHeaders
  constructor(private http: HttpClient) {
    this.headers = this.headersAdded();
   }
   headersAdded() 
   {
        let headers = new HttpHeaders({
            'content-type': 'application/json',
            'x-api-key': 'P1MLcx67VI2wv9BpY9gVG4hZcjLA4LFT7aQyn5JQ'
        });
        return headers;
   }
   getCustomerDetails() {
        return this.http.get('../../assets/json/customer.json', {
            headers: this.headers
        });
    } 
}
