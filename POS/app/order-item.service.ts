import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { CategoryItem } from './category-item';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {
  private ordersDb: any;
  selectedItem = new ReplaySubject<CategoryItem>();
  isClearAll = new ReplaySubject<boolean>();
  selectedItems = new ReplaySubject<any>();
  selectedCategory = new EventEmitter;
  selectedoutLet = new EventEmitter;
  selectedOutletId=""
  itemsSelected=[];
  billDetails={}
  offlineOrders=[]
  baseApiUrl: string = environment.orderServiceURL;
  supplierItemRefundURL: string = environment.supplierItemRefundURL;

  constructor(private httpClient: HttpClient) {
  }

  setOrderItem(selectedItem: CategoryItem) {
   
    // Fire the update event with the new data
    this.selectedItem.next(selectedItem);
  }

  getOrderItem(): Observable<any> {
    return this.selectedItem.asObservable();
  }

  setClearOrderStatus(status: boolean) {
    this.isClearAll.next(status);
  }

  getClearOrderStatus(): Observable<boolean> {
    return this.isClearAll.asObservable();
  }

  setSelectedItems(items) {
   
    this.selectedItems.next(items);
  }

  getSelectedItems(): Observable<any> {
    return this.selectedItems.asObservable();
  }

  createFullOrder(order): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'}); 
    return this.httpClient.post(this.baseApiUrl + "/createFullOrder", order, {responseType: 'json', headers}).pipe(
      tap(),
      catchError(this.handleError())
    );
  }
  initMosambeeTransaction(url): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'}); 
    return this.httpClient.post(environment.paymentgatewayEndPoint + url,  {responseType: 'json', headers}).pipe(
      tap(),
      catchError(this.handleError())
    );
  }
  getPostOrderDetails(url,data): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'}); 
    return this.httpClient.post(environment.orderServiceURL + url, data, {responseType: 'json', headers}).pipe(
      tap(),
      catchError(this.handleError())
    );
  }
  
  checkpaymentStatus(url): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'}); 
    return this.httpClient.post(environment.paymentgatewayEndPoint + url,  {responseType: 'json', headers}).pipe(
      tap(),
      catchError(this.handleError())
    );
  }
  createFullOrders(order): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'}); 
    return this.httpClient.post(this.baseApiUrl + "/createFullOrders", order, {responseType: 'json', headers}).pipe(
      tap(),
      catchError(this.handleError())
    );
  }

  getAllCompletedFullOrders(outletid): Observable<any> {
    let getAllCompletedFullOrdersApiUrl =""
    if(localStorage.getItem('allpermited')=="Yes"){
      getAllCompletedFullOrdersApiUrl= this.baseApiUrl + "/mall/" + localStorage.getItem('mallId') + "/outlet/" +"all" + "/getAllCompletedFullOrders/noOfDays/0"
    }else{
      getAllCompletedFullOrdersApiUrl= this.baseApiUrl + "/mall/" + localStorage.getItem('mallId') + "/outlet/" + outletid + "/getAllCompletedOrders"

    }
    return this.httpClient.get(getAllCompletedFullOrdersApiUrl).pipe(
      tap(),
      catchError(this.handleError())
    );
  }
  updateStatusChange(url,status,quantity,reason,fullOrderId): Observable < any > {
   
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
		let CONST_BASE_URL = environment.orderServiceURL;
		var input ={
			"status": status,
			"rejectReason": reason,
			"quantity": quantity,
			"fullOrderId":fullOrderId

    }
    return this.httpClient.put(CONST_BASE_URL + url, input, {responseType: 'json', headers}).pipe(
      tap(),
      catchError(this.handleError())
    );
	}
 
  getAllReceivedFullOrders(url): Observable<any> {
    let getAllReceivedFullOrdersApiUrl = this.baseApiUrl + url;
    return this.httpClient.get(getAllReceivedFullOrdersApiUrl).pipe(
      tap(),
      catchError(this.handleError())
    );
  }
  
  getMallDetails(url){
    console.log("@@@@@@@@@@@@@@@@@@@@1111")

    let refundUrlGet = environment.supplierAccessURL + url;
    return this.httpClient.get(refundUrlGet).pipe(
      tap(),
      catchError(this.handleError())
    );
  }

  getAllReadyFullOrders(url): Observable<any> {
    let getAllReadyFullOrdersApiUrl = this.baseApiUrl + url;
    return this.httpClient.get(getAllReadyFullOrdersApiUrl).pipe(
      tap(),
      catchError(this.handleError())
    );
  }

  getAllRefundDetails(refundUrl): Observable<any> {
    let refundUrlGet = environment.orderServiceURL + refundUrl;
    return this.httpClient.get(refundUrlGet).pipe(
      tap(),
      catchError(this.handleError())
    );
  }

  checkOtp(otp, fullOrderId): Observable<any> {
 
    let checkOtpApiUrl = this.baseApiUrl + "/fullOrder/" + fullOrderId + "/otp/" + otp;
    return this.httpClient.get(checkOtpApiUrl).pipe(
      tap(),
      catchError(this.handleError())
    );
  }

  changeFullOrderStatus(fullOrderId, obj): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    
    let changeFullOrderStatusApiUrl = this.baseApiUrl + "/malls/" + localStorage.getItem('mallId') + "/fullorder/" + fullOrderId + "/statusChange";
    return this.httpClient.put(changeFullOrderStatusApiUrl, obj, {responseType: 'json', headers}).pipe(
      tap(),
      catchError(this.handleError())
    );
  }
  changeFullOrderStatusforOnlineOrders(fullOrderId, obj,rowData): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    let changeFullOrderStatusApiUrl =""
    if(localStorage.getItem('allpermitted')=="Yes"){                     
      changeFullOrderStatusApiUrl = this.baseApiUrl + "/malls/" + localStorage.getItem('mallId') + "/fullorder/" + fullOrderId + "/statusChange";
  }else{
    changeFullOrderStatusApiUrl = this.baseApiUrl + "/malls/" + localStorage.getItem('mallId') + "/order/" + rowData.jmOrderLet[0].orderId + "/statusChange";

  }
    return this.httpClient.put(changeFullOrderStatusApiUrl, obj, {responseType: 'json', headers}).pipe(
      tap(),
      catchError(this.handleError())
    );
  }
  
  callRefundAmountServiceFullOrder(refundurl): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    let fullOrderRefundUrl = environment.orderServiceURL + refundurl;
    return this.httpClient.get(fullOrderRefundUrl, {responseType: 'json', headers}).pipe(
      tap(),
      catchError(this.handleError())
    );
  }
  getFullOrderStatus(url): Observable<any> {
    let fullOrdersUrl = environment.orderServiceURL + url;
    return this.httpClient.get(fullOrdersUrl).pipe(
      tap(),
      catchError(this.handleError())
    );
  }
  callRefundServicFullOrdereManager(dinnerId, itemPrice, fivedigitId, fullOrderId, orderId, mallId): Observable<any> {
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    var input = {};
		input = {
			"dinerId": dinnerId,
			"amount": itemPrice,
			"orderId": fivedigitId,
			"orderNumber": fullOrderId,
			"fullOrderId":fullOrderId,
			"mallId":mallId
		};
   
		let supplier_item_refund_api = environment.supplierItemRefundURL + '/refundtransaction';
    return this.httpClient.post(supplier_item_refund_api, JSON.stringify(input), {responseType: 'json', headers}).pipe(
      tap(),
      catchError(this.handleError())
    );
  }
  // voidsOrderletStatus(url, items ,status, quantity, reason): Observable<any> {
   
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
  //   let input = [];
	// 	for(var i=0;i<items.length;i++){
  //     var obj = {
  //       "status": status,
  //       "rejectionReason": reason,
  //       "quantity": quantity,
  //       "id":items[i].id
  //     }

  //     input.push(obj);
  //     console.log("input n",input);
  //   }
	
	
  //   return this.httpClient.put(this.baseApiUrl + url, JSON.stringify(input), {responseType: 'json', headers}).pipe(
  //     tap(),
  //     catchError(this.handleError())
  //   );
  // }
  callRefundServiceManager(dinnerId, itemPrice, fivedigitId, orderId,fullOrderId,mallId): Observable<any> {
    var input = {};
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
		input = {
			"dinerId": dinnerId,
			"amount": itemPrice,
			"orderId": fivedigitId,
			"orderNumber": orderId,
			"fullOrderId":fullOrderId,
			"mallId":mallId
		};
	
    let supplier_item_refund_api = environment.supplierItemRefundURL + '/refundtransaction';
    return this.httpClient.post(supplier_item_refund_api, JSON.stringify(input), {responseType: 'json', headers}).pipe(
      tap(),
      catchError(this.handleError())
    );
  }
  changeOrderletStatus(fullOrderId, orderletsStatus,rowData): Observable<any> {
   
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
   
	
		let changeOrderletStatusApiUrl = this.baseApiUrl + "/malls/" + localStorage.getItem('mallId') + "/order/" + rowData.jmOrderLet[0].orderId + "/orderletstatuschange";
    return this.httpClient.put(changeOrderletStatusApiUrl, orderletsStatus, {responseType: 'json', headers}).pipe(
      tap(),
      catchError(this.handleError())
    );
    
 
	
	
    
  }
  callRefundAmountServiceOrderLet(url): Observable<any> {
    let pendingUrl = environment.orderServiceURL + url;
    return this.httpClient.get(pendingUrl).pipe(
      tap(),
      catchError(this.handleError())
    );
  }
  getAllPendingFullOrders(url): Observable<any> {
    let getAllPendingFullOrdersApiUrl = this.baseApiUrl + url;
    return this.httpClient.get(getAllPendingFullOrdersApiUrl).pipe(
      tap(),
      catchError(this.handleError())
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      return of(result as T);
    };
  }

}
