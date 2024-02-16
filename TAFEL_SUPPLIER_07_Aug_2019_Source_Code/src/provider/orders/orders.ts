import {
	Injectable
}
from '@angular/core';
import {
	HttpClient, HttpHeaders
}
from '@angular/common/http';
import 'rxjs/add/operator/map';
import {
	Observable
}
from 'rxjs';
import {
	UtilityProvider
}
from '../utility/utility';
import {
	LoadingController
}
from 'ionic-angular';
// import {
// 	Order_Service_Url, supplier_item_refund, supplier_access_url, TAFEL_API_KEY
// }
// from '../../common/properties';
import {Order_Service_Url, supplier_item_refund,admin_service_endpoint, supplier_access_url, TAFEL_API_KEY} from '../../common/endPointService';
/*
  Generated class for the OrdersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@
Injectable()
export class OrdersProvider {
	headers: HttpHeaders;
	idToken: any = '';
	apiDetails: any = {};
	constructor(private http: HttpClient, private _utilityProvider: UtilityProvider, public loadingCtrl: LoadingController) {
		this.headers = this._utilityProvider.getHeadersForService();
		
	}
	headersinfo: any = {};
	getData(outletId): Observable < any > {
		let Outlet_Orders_Url = Order_Service_Url + '/outlets/';
		let localData = this.http.get(Outlet_Orders_Url + outletId + '/orders?ignoreStatus=handedover,rejected&status=', {
			headers: this.headers
		});
		return localData;
	}
	getreportsData(url) {
		let pendingUrl = Order_Service_Url + url;
		let localData = this.http.get(pendingUrl, {
			headers: this.headers
		});
		return localData;
	}
	getMallTimings(url) {
		let pendingUrl = Order_Service_Url + url;
		let localData = this.http.get(pendingUrl, {
			headers: this.headers
		});
		return localData;
	}
	getOutletTimings(url) {
		let pendingUrl = Order_Service_Url + url;
		console.log("pendingUrl", pendingUrl);
		let localData = this.http.get(pendingUrl, {
			headers: this.headers
		});
		return localData;
	}
	getDataforEndOfthereport(url) {
		let pendingUrl = Order_Service_Url + url;
		let localData = this.http.get(pendingUrl, {
			headers: this.headers
		});
		return localData;
	}
	sendMail(url) {
		let pendingUrl = Order_Service_Url + url;
		let localData = this.http.get(pendingUrl, {
			headers: this.headers
		});
		return localData;
	}
	checkOtp(otp,fullOrderId): Observable < any > {

		let checkOtp = Order_Service_Url + "/fullOrder/"+fullOrderId+"/otp/"+otp;
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
		let Outlet_Orders_Url = Order_Service_Url + '/malls/' + mallId + '/outletId/' + outletId + '/orderlevel';
		let localData = this.http.get(Outlet_Orders_Url + '?status=' + completeStatus, {
			headers: this.headers
		});
		return localData;
	}
	getSearchedItemsForOutlet(url) {
		let pendingUrl = Order_Service_Url + url;
		let localData = this.http.get(pendingUrl, {
			headers: this.headers
		});
		return localData;
	}
	getSearchedItemsForAll(url) {
		let pendingUrl = Order_Service_Url + url;
		let localData = this.http.get(pendingUrl, {
			headers: this.headers
		});
		return localData;
	}
	printOrder(url) {
		let pendingUrl = Order_Service_Url + url;
		let localData = this.http.get(pendingUrl, {
			headers: this.headers
		});
		return localData;
	}
	getCompletedData(outletId): Observable < any > {
		let Outlet_Orders_Url = Order_Service_Url + '/outlets/';
		let localData = this.http.get(Outlet_Orders_Url + outletId + '/orders?ignoreStatus=inprogress,received,rejected&status=', {
			headers: this.headers
		});
		return localData;
	}
	getRejectedDataNew(outletId): Observable < any > {
		let Outlet_Orders_Url = Order_Service_Url + '/outlets/';
		let localData = this.http.get(Outlet_Orders_Url + outletId + '/orders?ignoreStatus=inprogress,received,handedover&status=', {
			headers: this.headers
		});
		return localData;
	}
	getPendingOrder(url) {
		let pendingUrl = Order_Service_Url + url;
		let localData = this.http.get(pendingUrl, {
			headers: this.headers
		});
		return localData;
	}
	getOrders(url) {
		
		let pendingUrl = Order_Service_Url + url;
		let localData = this.http.get(pendingUrl, {
			headers: this.headers
		});
		return localData;
	}
	getMallDetails(url) {
		let pendingUrl = supplier_access_url + url;
		let localData = this.http.get(pendingUrl, {
			headers: this.headers
		});
		return localData;
	}

	getOutletDetails(url){

		let pendingUrl = Order_Service_Url + url;
		console.log("pendingUrl",pendingUrl);
		let localData = this.http.get(pendingUrl, {
			headers: this.headers
		});
		return localData;

	}
	
	getCompleteOrder(urlVal) {
		let url = Order_Service_Url + urlVal;
		let localData = this.http.get(url, {
			headers: this.headers
		});
		return localData;
	}
	getDeliveredData(outletId): Observable < any > {
		let Outlet_Orders_Url = Order_Service_Url + '/outlets/';
		let localData = this.http.get(Outlet_Orders_Url + outletId + '/orders?status=handedover&ignoreStatus=', {
			headers: this.headers
		});
		return localData;
	}
	getRejectedData(outletId): Observable < any > {
		let Outlet_Orders_Url = Order_Service_Url + '/outlets/';
		let localData = this.http.get(Outlet_Orders_Url + outletId + '/orders?status=rejected&ignoreStatus=', {
			headers: this.headers
		});
		return localData;
	}
	getOrderItems(url): Observable < any > {
		let CONST_BASE_URL = Order_Service_Url;
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
		console.log("@@@@@@@@@@@@@@@@@@@@@@@@@");
		console.log(input);
		console.log("@@@@@@@@@@@@@@@@@@@@@@@@@");
		let supplier_item_refund_api = supplier_item_refund + '/refundtransaction';
		let localData = this.http.post(supplier_item_refund_api, JSON.stringify(input), {
			headers: this.headers
		});
		return localData;
	}
	callRefundAmountServiceFullOrder(url) {
		let pendingUrl = Order_Service_Url + url;
		let localData = this.http.get(pendingUrl, {
			headers: this.headers
		});
		return localData;
	}
	callRefundAmountServiceOrderLet(url) {
		let pendingUrl = Order_Service_Url + url;
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
		console.log(input);
		let supplier_item_refund_api = supplier_item_refund + '/refundtransaction';
		let localData = this.http.post(supplier_item_refund_api, JSON.stringify(input), {
			headers: this.headers
		});
		return localData;
	}

	updateStatusDelete(url,status,quantity,reason): Observable < any > {
		let CONST_BASE_URL = Order_Service_Url;
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
		this.headers = this._utilityProvider.getHeadersForService();
		let CONST_BASE_URL = Order_Service_Url;
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
		console.log(items);
		let CONST_BASE_URL = Order_Service_Url;
		let input = [];
		console.log(status);
		console.log("quantity...", quantity);
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
				console.log(input);
			}
			

		}
		console.log(input);
		let localData = this.http.put(CONST_BASE_URL + url, JSON.stringify(input), {
			headers: this.headers
		});
		return localData;
	}
	
	updateStatus_New(url, status): Observable < any > {
		let CONST_BASE_URL = Order_Service_Url;
		var input = {
			"status": status
		};
		this.http.put(CONST_BASE_URL + url, JSON.stringify(input), {
			headers: this.headers
		});
		return;
	}
	updateStatus_NewInOrderPage(url, status): Observable < any > {
		let CONST_BASE_URL = Order_Service_Url;
		var input = {
			"status": status
		};
		let localData =this.http.put(CONST_BASE_URL + url, JSON.stringify(input), {
			headers: this.headers
		});
		return localData;
	}
	updateOrderHandovered(url, status, outletOTP, dinerOTP) {
		let CONST_BASE_URL = Order_Service_Url;
		var input = {
			"status": status
		};
		let localData = this.http.put(CONST_BASE_URL + url + "?outletOTP=" + outletOTP + "&dinerOTP=" + dinerOTP, JSON.stringify(input), {
			headers: this.headers
		});
		return localData;
	}
	getFullOrderDetailsByMallId(ssId, mallId): Observable < any > {
		let fullOrdersUrl = Order_Service_Url + "/serviceStations/" + ssId + "/malls/" + mallId + "/ssFullOrders";
		let localData = this.http.get(fullOrdersUrl, {
			headers: this.headers
		});
		return localData;
	}
	getFullOrderStatus(url): Observable < any > {
		let fullOrdersUrl = Order_Service_Url + url;
		let localData = this.http.get(fullOrdersUrl, {
			headers: this.headers
		});
		return localData;
	}
	updateOrderLet(order, new_item) {
		let CONST_BASE_URL = Order_Service_Url + order.links[0].href;
		let localData = this.http.put(CONST_BASE_URL, JSON.stringify(new_item), {
			headers: this.headers
		});
		return localData;
	}
	setAPIDetails(apiDetails) {
		let currTimeInMillis = new Date().getTime();
		if(currTimeInMillis > apiDetails.refreshDate) {
			console.log("Session Expired here " + currTimeInMillis + " > " + apiDetails.refreshDate);
			let _this = this;
			_this._utilityProvider.refreshAccessTokens(apiDetails.refreshToken, function(apiDetails) {
				_this.setHedersOnExpire(apiDetails);
			});
		} else {
			let headers = {};
			headers["Authorization"] = (apiDetails ? apiDetails.idToken : "");
			headers["Content-Type"] = "application/json";
			headers["x-api-key"] = TAFEL_API_KEY;
			this.headersinfo["headers"] = headers;
			this.apiDetails = apiDetails;
		}
	}
	setHedersOnExpire(apiDetails) {
		let headers = {};
		console.log("New Token Received ", apiDetails);
		headers["Authorization"] = (apiDetails ? apiDetails.idToken : "");
		headers["Content-Type"] = "application/json";
		headers["x-api-key"] = TAFEL_API_KEY;
		this.headersinfo["headers"] = headers;
		this.apiDetails = apiDetails;
	}
	getPushNotifications(supplierId): Observable < any > {
		let Outlet_Orders_Url = Order_Service_Url + "/suppliers/" + supplierId + "/pendingOrders";
		let localData = this.http.get(Outlet_Orders_Url, {
			headers: this.headers
		});
		return localData;
	}
}