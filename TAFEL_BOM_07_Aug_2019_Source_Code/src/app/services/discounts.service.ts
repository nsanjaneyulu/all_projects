import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DiscountsService {
  headers = new HttpHeaders().set('Content-Type', 'application/json'); 
  constructor(private http: HttpClient,) {
    this.headers = this.getHeadersForService();
   }
   getHeadersForService() {
		let headers = new HttpHeaders({
			'content-type': 'application/json'
		});
		return headers;
  }
  getDiscounts() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json'
  });
    let url = 'http://localhost:3000/' + 'Discount';
    return this.http.get<JSON>(url, { headers: headers });
  }
  
  // updateDiscount(Discount){
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'responseType': 'json'
  // });
  // let url = 'http://localhost:3000/' + 'Discount/'+Discount._id;
  //   return this.http.put<JSON>(url, Discount,{ headers: headers });
  // }
  // deleteDiscounts(id){
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'responseType': 'json'
  // });
  // let url = 'http://localhost:3000/' + 'Discount/'+id;
  //   return this.http.delete<JSON>(url,id);
  // }
  getServiceStations() {
		let Outlet_Orders_Url = environment.serviceStations + '/serviceStations?lo=78.3489&la=17.46';
		let localData = this.http.get(Outlet_Orders_Url, {
			headers: this.headers
		});
		return localData;
  }
  getPromoTypes(){
    let promoTypes_url= environment.profileService + '/promoTypes/All';
		let localData = this.http.get(promoTypes_url, {
			headers: this.headers
		});
		return localData;
  }
  getDiscountTypes(){
    let promoTypes_url= environment.profileService + '/discountTypes/All';
		let localData = this.http.get(promoTypes_url, {
			headers: this.headers
		});
		return localData;
  }
  getAllDiscounts(url){
    let promoTypes_url= environment.profileService + url
		let localData = this.http.get(promoTypes_url, {
			headers: this.headers
		});
		return localData;
  }
  createDiscount(data) {
    let discountCreationUrl = environment.profileService + "/createDiscount";
    let localData = this.http.post(discountCreationUrl,data, {
        headers: this.headers
    });
    return localData;
  }
  createDiscountAssignment(data) {
    let discountCreationUrl = environment.profileService + "/createDiscountAssignment";
    let localData = this.http.post(discountCreationUrl,data, {
        headers: this.headers
    });
    return localData;
  }
  updateDiscountAssignment(data) {
    let discountCreationUrl = environment.profileService + "/updateDiscountAssignment";
    let localData = this.http.put(discountCreationUrl,data, {
        headers: this.headers
    });
    return localData;
  }
  updateDiscount(data) {
    let discountCreationUrl = environment.profileService + "/updateDiscount";
    let localData = this.http.put(discountCreationUrl,data, {
        headers: this.headers
    });
    return localData;
  }
  getAssignedDiscountById(id){
    let promoTypes_url= environment.profileService + '/getDiscountAssignment/'+id
		let localData = this.http.get(promoTypes_url, {
			headers: this.headers
		});
		return localData;
  }
  getAllAssignmentsList(id){
    let getAllmallsAssigned=environment.profileService + "/getDiscountAssignmentByDiscountID/"+id;
    let localData = this.http.get(getAllmallsAssigned, {
			headers: this.headers
		});
		return localData;
  }
  deleteDiscount(url){
    let deleteDiscount=environment.profileService +url ;
    let localData = this.http.delete(deleteDiscount, {
			headers: this.headers
		});
		return localData;
  }
}
