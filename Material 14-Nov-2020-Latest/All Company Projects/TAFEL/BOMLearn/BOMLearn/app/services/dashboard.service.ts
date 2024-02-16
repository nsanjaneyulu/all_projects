import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public stringSubject = new Subject<string>();
  headers: HttpHeaders
  constructor(private http: HttpClient) {
    this.headers = this.getHeadersForService();
   }
   passValue(data) {
       console.log("data",data);
    this.stringSubject.next(data);
  }
   getHeadersForService() 
   {
        let headers = new HttpHeaders({
            'content-type': 'application/json',
            'x-api-key': 'P1MLcx67VI2wv9BpY9gVG4hZcjLA4LFT7aQyn5JQ'
        });
        return headers;
   }
    getMallDetails(getMallDetailsUrl) {
        return this.http.get(environment.apiUrl + getMallDetailsUrl, {
            headers: this.headers
        });
    }
    outletDetailsService(getOutletDetailsURL){
        return this.http.get(environment.apiUrl + getOutletDetailsURL, {
            headers: this.headers
        });
      }
    orderDetailsService(getOutletDetailsURL){
        return this.http.get(environment.apiUrl + getOutletDetailsURL, {
            headers: this.headers
        });
    }
    deliveryStatusService(deliveryStatusURL){
  
        let deliveryStatusServiceUrl = environment.orderServiceURL + deliveryStatusURL;
        return this.http.put(deliveryStatusServiceUrl, {
            headers: this.headers
        });
      }
      getSupplierList(suppliersURL) {
        
        let suppliersServiceURL = environment.supplierAccessURL + suppliersURL;
        return this.http.get(suppliersServiceURL, {
            headers: this.headers
        });
    }
    getAllServiceStations(getLocationsURL){
        
        let getLocationsServiceURL = environment.runnerCreation + getLocationsURL;
        return this.http.get(getLocationsServiceURL, {
            headers: this.headers
      });
      }
      getOutLets(getOutletsURL){
        let getOutletsServiceURL = environment.runnerCreation + getOutletsURL;
       
    
            return this.http.get(getOutletsServiceURL, {
              headers: this.headers
          });
          }
          updateSupplier(data, url){
            let updateServiceURL = environment.runnerCreation + url;
    
            return this.http.post(updateServiceURL,data, {
                headers: this.headers
          });
          }
          createSupplier(data, url){
           
            let createServiceURL = environment.runnerCreation + url;
            return this.http.post(createServiceURL,JSON.stringify(data), {
                headers: this.headers
            });
           
          }
          getOutletTimings(url) {
            let pendingUrl = environment.orderServiceURL + url;
            let localData = this.http.get(pendingUrl, {
                headers: this.headers
            });
            return localData;
        }
        posLoginUsersServices(posHealthCheckUrl){
            return this.http.get(environment.supplierAccessURL + posHealthCheckUrl, {
                headers: this.headers
            });
          }
          getDataforEndOfthereport(url) {
            let pendingUrl = environment.orderServiceURL + url;
            let localData = this.http.get(pendingUrl, {
                headers: this.headers
            });
            return localData;
        }
      
}
