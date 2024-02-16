import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LiveOrderService {
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
  mallDetailsService(){
   
    return this.http.get(environment.apiUrl +'userid/'+localStorage.getItem("USERID")+'/getMalls' , {
        headers: this.headers
    });
  }
  receivedOrdersService(receivedOrdersURL){
   
    return this.http.get( environment.orderServiceURL + receivedOrdersURL , {
        headers: this.headers
    });
  }
  getData(outletId): Observable < any > {
		let Outlet_Orders_Url = environment.orderServiceURL + '/outlets/';
		let localData = this.http.get(Outlet_Orders_Url + outletId + '/orders?ignoreStatus=handedover,rejected&status=', {
			headers: this.headers
		});
		return localData;
	}
	getreportsData(url) {
		let pendingUrl = environment.orderServiceURL + url;
		let localData = this.http.get(pendingUrl, {
			headers: this.headers
		});
		return localData;
	}
	getMallTimings(url) {
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
	checkOtp(otp,fullOrderId): Observable < any > {

		let checkOtp = environment.orderServiceURL + "/fullOrder/"+fullOrderId+"/otp/"+otp;
		let localData = this.http.get(checkOtp, {
			headers: this.headers
		});
		return localData;
		}
	getDataNew(outletId, mallId, status): Observable < any > {
		let completeStatus = 'RECEIVED,INPROGRESS';
		if(status == "Pending") {
			completeStatus = 'RECEIVED,INPROGRESS';
		} else if(status == "Completed") {
			completeStatus = 'HANDEDOVER,COMPLETED';
		} else if(status == "Rejected") {
			completeStatus = 'REJECTED';
		}		
		let Outlet_Orders_Url = environment.orderServiceURL + '/malls/' + mallId + '/outletId/' + outletId + '/orderlevel';
		let localData = this.http.get(Outlet_Orders_Url + '?status=' + completeStatus, {
			headers: this.headers
		});
		return localData;
	}
	getSearchedItemsForOutlet(url) {
		let pendingUrl = environment.orderServiceURL + url;
		let localData = this.http.get(pendingUrl, {
			headers: this.headers
		});
		return localData;
	}
	getSearchedItemsForAll(url) {
		let pendingUrl = environment.orderServiceURL + url;
		let localData = this.http.get(pendingUrl, {
			headers: this.headers
		});
		return localData;
	}
	printOrder(url) {
		let pendingUrl = environment.orderServiceURL + url;
		let localData = this.http.get(pendingUrl, {
			headers: this.headers
		});
		return localData;
	}
	getCompletedData(outletId): Observable < any > {
		let Outlet_Orders_Url = environment.orderServiceURL + '/outlets/';
		let localData = this.http.get(Outlet_Orders_Url + outletId + '/orders?ignoreStatus=inprogress,received,rejected&status=', {
			headers: this.headers
		});
		return localData;
	}
	getRejectedDataNew(outletId): Observable < any > {
		let Outlet_Orders_Url = environment.orderServiceURL + '/outlets/';
		let localData = this.http.get(Outlet_Orders_Url + outletId + '/orders?ignoreStatus=inprogress,received,handedover&status=', {
			headers: this.headers
		});
		return localData;
	}
	getPendingOrder(url) {
		let pendingUrl = environment.orderServiceURL + url;
		let localData = this.http.get(pendingUrl, {
			headers: this.headers
		});
		return localData;
	}
	getOrders(url, allPermitted, mallOutletId) {
		console.log("allPermitted", allPermitted, mallOutletId);
		let pendingUrl = "";
		if(allPermitted == "Yes")
		{
		pendingUrl = environment.orderServiceURL + url;
		}
		else {
			if(mallOutletId=='all'){
			pendingUrl = environment.apiUrl + url;
			}
			else {
				pendingUrl = environment.orderServiceURL + url;
			}
		}
		console.log("pendingUrl", pendingUrl);
		let localData = this.http.get(pendingUrl, {
			headers: this.headers
		});
		return localData;
	}
	getMallDetails(url) {
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
	
	getCompleteOrder(urlVal) {
		let url = environment.orderServiceURL + urlVal;
		let localData = this.http.get(url, {
			headers: this.headers
		});
		return localData;
	}
	getDeliveredData(outletId): Observable < any > {
		let Outlet_Orders_Url = environment.orderServiceURL + '/outlets/';
		let localData = this.http.get(Outlet_Orders_Url + outletId + '/orders?status=handedover&ignoreStatus=', {
			headers: this.headers
		});
		return localData;
	}
	getRejectedData(outletId): Observable < any > {
		let Outlet_Orders_Url = environment.orderServiceURL + '/outlets/';
		let localData = this.http.get(Outlet_Orders_Url + outletId + '/orders?status=rejected&ignoreStatus=', {
			headers: this.headers
		});
		return localData;
	}
	getOrderItems(url): Observable < any > {
		let CONST_BASE_URL = environment.orderServiceURL;
		let localData = this.http.get(CONST_BASE_URL + url, {
			headers: this.headers
		});
		return localData;
	}
	callRefundServiceManager(dinnerId, itemPrice, fivedigitId, orderId,fullOrderId,mallId): Observable < any > {
		var input = {};
		input = {
			"dinerId": dinnerId,
			"amount": itemPrice,
			"orderId": fivedigitId,
			"orderNumber": orderId,
			"fullOrderId":fullOrderId,
			"mallId":mallId
		};
	
		let supplier_item_refund_api = environment.supplierItemRefundURL + '/refundtransaction';
		let localData = this.http.post(supplier_item_refund_api, JSON.stringify(input), {
			headers: this.headers
		});
		return localData;
	}
	callRefundAmountServiceFullOrder(url) {
		let pendingUrl = environment.orderServiceURL + url;
		let localData = this.http.get(pendingUrl, {
			headers: this.headers
		});
		return localData;
	}
	callRefundAmountServiceOrderLet(url) {
		let pendingUrl = environment.orderServiceURL + url;
		let localData = this.http.get(pendingUrl, {
			headers: this.headers
		});
		return localData;
	}
	callRefundServicFullOrdereManager(dinnerId, itemPrice, fivedigitId, orderId,fullOrderId,mallId): Observable < any > {
		var input = {};
		input = {
			"dinerId": dinnerId,
			"amount": itemPrice,
			"orderId": fivedigitId,
			"orderNumber": orderId,
			"fullOrderId":fullOrderId,
			"mallId":mallId
		};
	
		let supplier_item_refund_api = environment.supplierItemRefundURL + '/refundtransaction';
		let localData = this.http.post(supplier_item_refund_api, JSON.stringify(input), {
			headers: this.headers
		});
		return localData;
	}

	updateStatusDelete(url,status,quantity,reason): Observable < any > {
		let CONST_BASE_URL = environment.orderServiceURL;
		var input ={
			"status": status,
			"rejectReason": reason,
			"quantity": quantity,
			
		}
		let localData = this.http.put(CONST_BASE_URL + url, JSON.stringify(input), {
			headers: this.headers
		});
		return localData;
	}
	updateStatusChange(url,status,quantity,reason,fullOrderId): Observable < any > {
		
		let CONST_BASE_URL = environment.orderServiceURL;
		var input ={
			"status": status,
			"rejectReason": reason,
			"quantity": quantity,
			"fullOrderId":fullOrderId

		}
		let localData = this.http.put(CONST_BASE_URL + url, JSON.stringify(input), {
			headers: this.headers
		});
		return localData;
	}
	updateStatus(url, items ,status, quantity, reason): Observable < any > {
	
		let CONST_BASE_URL = environment.orderServiceURL;
		let input = [];
	
		if(status === "REJECTED") {
			for(var i=0;i<items.length;i++){
				var obj = {
					"status": status,
					"rejectionReason": reason,
					"quantity": quantity,
					"id":items[i].id
				}

				input.push(obj);
			}
		} else {
			for(var i=0;i<items.length;i++){
				var obj = {
					"status": status,
					"rejectionReason": reason,
					"quantity": quantity,
					"id":items[i].id
				}

				input.push(obj);
			
			}
			

		}
		
		let localData = this.http.put(CONST_BASE_URL + url, JSON.stringify(input), {
			headers: this.headers
		});
		return localData;
	}
	
	updateStatus_New(url, status): Observable < any > {
		let CONST_BASE_URL = environment.orderServiceURL;
		var input = {
			"status": status
		};
		this.http.put(CONST_BASE_URL + url, JSON.stringify(input), {
			headers: this.headers
		});
		return;
	}
	updateStatus_NewInOrderPage(url, status): Observable < any > {
		let CONST_BASE_URL = environment.orderServiceURL;
		var input = {
			"status": status
		};
		let localData =this.http.put(CONST_BASE_URL + url, JSON.stringify(input), {
			headers: this.headers
		});
		return localData;
	}
	updateOrderHandovered(url, status, outletOTP, dinerOTP) {
		let CONST_BASE_URL = environment.orderServiceURL;
		var input = {
			"status": status
		};
		let localData = this.http.put(CONST_BASE_URL + url + "?outletOTP=" + outletOTP + "&dinerOTP=" + dinerOTP, JSON.stringify(input), {
			headers: this.headers
		});
		return localData;
	}
	getFullOrderDetailsByMallId(ssId, mallId): Observable < any > {
		let fullOrdersUrl = environment.orderServiceURL + "/serviceStations/" + ssId + "/malls/" + mallId + "/ssFullOrders";
		let localData = this.http.get(fullOrdersUrl, {
			headers: this.headers
		});
		return localData;
	}
	getFullOrderStatus(url): Observable < any > {
		let fullOrdersUrl = environment.orderServiceURL + url;
		let localData = this.http.get(fullOrdersUrl, {
			headers: this.headers
		});
		return localData;
	}
	updateOrderLet(order, new_item) {
		let CONST_BASE_URL = environment.orderServiceURL + order.links[0].href;
		let localData = this.http.put(CONST_BASE_URL, JSON.stringify(new_item), {
			headers: this.headers
		});
		return localData;
	}


	getPushNotifications(supplierId): Observable < any > {
		let Outlet_Orders_Url = environment.orderServiceURL + "/suppliers/" + supplierId + "/pendingOrders";
		let localData = this.http.get(Outlet_Orders_Url, {
			headers: this.headers
		});
		return localData;
	}
}
