import {
	HttpClient, HttpHeaders, HttpErrorResponse
}
from '@angular/common/http';
import {
	Injectable
}
from '@angular/core';
import {
	Storage
}
from '@ionic/storage';

import {
	UserDataProvider
}
from '../../provider/login/login';
import { imageEndPoint,Order_Service_Url, supplier_item_refund,admin_service_endpoint, supplier_access_url, TAFEL_API_KEY} from '../../common/properties';
@Injectable()
export class UtilityProvider {
	idToken: any = '';
	tafelApiKey: any;
	apiDetails: any = {};
	constructor(public http: HttpClient, private storage: Storage, private user: UserDataProvider) {
		//this.endPointService.PropertiesUrlFunction();
		this.tafelApiKey = TAFEL_API_KEY;
		// this.callDB().subscribe(resp=>{
		// 	console.log(resp);
		// 	let data = resp[env];
		// 	  this.tafelApiKey = data.tafelApiKey;
		// 	//   this.adminServiceEndpoint = data.adminServiceEndpoint;
		// 	//   this.orderServiceEndpoint = data.orderServiceEndpoint;
		// 	//   this.serviceEndPoint = data.serviceEndPoint;
		// 	//   this.ccAvenueEndPoint = data.ccAvenueEndPoint;
		// 	//   this.dashboardServiceEndpoint = data.dashboardServiceEndpoint;
		// 	//   this.paymentgatewayEndPoint = data.paymentgatewayEndPoint;
	  
		// 	})
	}
	setIdToken(idToken) {
		this.idToken = idToken;
	}
	setApiDetails(res) {
		this.apiDetails = res;
		this.idToken = this.apiDetails.idToken;
	}
	setUserHeaders() {
		let headersForAdmin = this.getHeaderForAdminService();
		let headersForNonAdmin = this.getHeadersForService();
		this.user.setHeaders(headersForAdmin, headersForNonAdmin);
	}
	getHeaderForAdminService() {
		let headers = new HttpHeaders({
			'x-api-key': TAFEL_API_KEY
		});
		return headers;
	}
	getHeadersForService() {
		console.log(this.idToken);
		let headers = new HttpHeaders({
			'x-api-key': TAFEL_API_KEY,
			'Authorization': this.idToken,
			'content-type': 'application/json'
		});
		return headers;
	}
	refreshAccessTokens(refreshToken, callback) {
		let url = admin_service_endpoint + '/refreshAccessTokens';
		let body = {
			refreshToken: refreshToken,
			callback: callback
		};
		let headers = this.getHeaderForAdminService();
		return this.http.post(url, body, {
			headers: headers
		}).subscribe((res: any) => {
			this.setIdToken(res.idToken);
			this.setUserHeaders();
			this.initiateApis();
		}, (err: HttpErrorResponse) => {
			if(err.status != 200) {
				console.log('Refresh Access Token Error' + err);
				this.refreshTokens();
			}
		});
	}
	refreshTokens() {
		let headers = this.getHeaderForAdminService();
		let url = admin_service_endpoint + '/refreshTokens';
		let body = {
			id: this.apiDetails.id,
			encriptedPassword: this.apiDetails.encryptedPassword
		}
		this.http.post(url, body, {
			headers: headers
		}).subscribe((res: any) => {
			this.storage.set('apiDetails.accessToken', res.accessToken);
			this.storage.set('apiDetails.refreshToken', res.refreshToken);
			this.storage.set('apiDetails.idToken', res.idToken);
			this.storage.set('apiDetails.refreshDate', res.refreshDate);
			this.setIdToken(res.idToken);
			this.initiateApis();
		}, (err: HttpErrorResponse) => {
			console.error('Error in refreshTokens api');
		});
	}
	
	initiateApis() {
		let headers = this.getHeadersForService();
		let profileUrl = supplier_access_url + '/start';
		let orderUrl = Order_Service_Url + '/start';
		this.http.get(profileUrl, {
			headers: headers
		}).subscribe(() => {}, (err: HttpErrorResponse) => {
			if(err.status != 200) {
				this.refreshAccessTokens(this.apiDetails.refreshToken, this.apiDetails.callback);
			}
		});
		this.http.get(orderUrl, {
			headers: headers
		}).subscribe(() => {}, (err: HttpErrorResponse) => {
			if(err.status != 200) {
				console.error('Error in order Service');
			}
		});
	}

	getHeadersForServiceInterceptor() {
		
		let headers = {
		  'x-api-key': TAFEL_API_KEY,
		  'Authorization': this.idToken,
		  'content-type': 'application/json'
		};
		// console.log("this.idToken");
		console.log("getHeadersForService call", headers);
		return headers;
	  }
}