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
// import {
// 	supplier_access_url, TAFEL_API_KEY,Order_Service_Url
// }
// from '../../common/properties';
import {endPointService,imageEndPoint,Order_Service_Url, supplier_item_refund,admin_service_endpoint, supplier_access_url, TAFEL_API_KEY} from '../../common/endPointService';
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
	constructor(public endPointService:endPointService,public http: HttpClient, private _utilityProvider: UtilityProvider) {
		console.log('Hello ReportsmanagerProvider Provider');
		this.endPointService.PropertiesUrlFunction();
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
          
            let supplier_item_refund_api = Order_Service_Url + urlVal ;
            let localData = this.http.get(supplier_item_refund_api,  {
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
	  
		let supplier_item_refund_api = Order_Service_Url + urlVal ;
		let localData = this.http.get(supplier_item_refund_api,  {
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
  
	let supplier_item_refund_api = Order_Service_Url + urlVal ;
	let localData = this.http.get(supplier_item_refund_api, {
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

	sendReportMail(url,all) {
		let reportUrl = Order_Service_Url + url;
		let localData = this.http.get(reportUrl, {
			headers: this.headers
		});
		return localData;
	}
}