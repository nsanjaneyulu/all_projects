import { Injectable } from '@angular/core';
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
  
  baseApiUrl: string = environment.orderServiceURL;

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

  getAllCompletedFullOrders(): Observable<any> {
    let getAllCompletedFullOrdersApiUrl = this.baseApiUrl + "/mall/" + localStorage.getItem('mallId') + "/outlet/" + localStorage.getItem('outletIds') + "/getAllCompletedFullOrders"
    return this.httpClient.get(getAllCompletedFullOrdersApiUrl).pipe(
      tap(),
      catchError(this.handleError())
    );
  }

  getAllReceivedFullOrders(): Observable<any> {
    let getAllReceivedFullOrdersApiUrl = this.baseApiUrl + "/mall/" + localStorage.getItem('mallId') + "/outlet/" + localStorage.getItem('outletIds') + "/getAllReceivedFullOrders"
    return this.httpClient.get(getAllReceivedFullOrdersApiUrl).pipe(
      tap(),
      catchError(this.handleError())
    );
  }

  getAllReadyFullOrders(): Observable<any> {
    let getAllReadyFullOrdersApiUrl = this.baseApiUrl + "/mall/" + localStorage.getItem('mallId') + "/outlet/" + localStorage.getItem('outletIds') + "/getAllReadyFullOrders"
    return this.httpClient.get(getAllReadyFullOrdersApiUrl).pipe(
      tap(),
      catchError(this.handleError())
    );
  }

  checkOtp(fullOrderId, otp): Observable<any> {
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

  changeOrderletStatus(fullOrderId, orderletsStatus): Observable<any> {
    let changeOrderletStatusApiUrl = this.baseApiUrl + "/malls/" + localStorage.getItem('mallId') + "/order/" + fullOrderId + "/orderletstatuschange";
    return this.httpClient.put(changeOrderletStatusApiUrl, orderletsStatus).pipe(
      tap(),
      catchError(this.handleError())
    );
  }

  getAllPendingFullOrders(): Observable<any> {
    let getAllPendingFullOrdersApiUrl = this.baseApiUrl + "/mall/" + localStorage.getItem('mallId') + "/outlet/" + localStorage.getItem('outletIds') + "/getAllPendingFullOrders"
    return this.httpClient.get(getAllPendingFullOrdersApiUrl).pipe(
      tap(),
      catchError(this.handleError())
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }

}
