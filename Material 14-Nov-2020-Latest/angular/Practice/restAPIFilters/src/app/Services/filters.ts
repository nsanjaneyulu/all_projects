import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  headers: HttpHeaders
  constructor(private http: HttpClient) {
    this.headers = this.getHeadersForService();
   }
   getHeadersForService() 
   {
        let headers = new HttpHeaders({
            'content-type': 'application/json'
        });
        return headers;
   }
   getFiltersDetails() {
    //    let filtersURL = https://api.spacexdata.com/v3/launches?limit=100&launch_success=true;
        return this.http.get("https://api.spaceXdata.com/v3/launches?limit=100", {
            headers: this.headers
        });
    }
      
}
