import {
	HttpClient, HttpHeaders
}
from '@angular/common/http';
import {
	Injectable
}
from '@angular/core';

import {
	UtilityProvider
}
from '../utility/utility';
import {
	supplier_access_url, TAFEL_API_KEY
}
from '../../common/properties';
import {
	Observable
}
from 'rxjs';


/*  Generated class for the StockmanagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReportsmanagerProvider {
	headers: HttpHeaders;
	idToken: any = '';
	constructor(public http: HttpClient, private _utilityProvider: UtilityProvider) {
		console.log('Hello ReportsmanagerProvider Provider');
		this.headers = this._utilityProvider.getHeadersForService();
	}
	headersinfo: any = {};
	apiDetails: any = {};

	
	

	getReportDayWise(urlVal, all): Observable < any > {
			console.log("urlVal",urlVal);
            var input = [];
            input = [
              all
               
            ];
          
            let supplier_item_refund_api = supplier_access_url + urlVal + '/day/0';
            let localData = this.http.post(supplier_item_refund_api, JSON.stringify(input), {
                headers: this.headers
            });
            return localData;
    

        
	}
	getReportWeekWise(urlVal, all): Observable < any > {
		console.log("urlVal",urlVal);
		var input = [];
		input = [
		  all
		   
		];
	  
		let supplier_item_refund_api = supplier_access_url + urlVal + '/day/6';
		let localData = this.http.post(supplier_item_refund_api, JSON.stringify(input), {
			headers: this.headers
		});
		return localData;


	
}
getReportMonthWise(urlVal, all): Observable < any > {
	console.log("urlVal",urlVal);
	var input = [];
	input = [
	  all
	   
	];
  
	let supplier_item_refund_api = supplier_access_url + urlVal + '/day/29';
	let localData = this.http.post(supplier_item_refund_api, JSON.stringify(input), {
		headers: this.headers
	});
	return localData;



}
	setAPIDetails(apiDetails) {
		let currTimeInMillis = new Date().getTime();
		if(currTimeInMillis > apiDetails.refreshDate) {
			console.log("Session Expired here " + currTimeInMillis + " > " + apiDetails.refreshDate);
			let _this = this;
			this._utilityProvider.refreshAccessTokens(apiDetails.refreshToken, function(apiDetails) {
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
}