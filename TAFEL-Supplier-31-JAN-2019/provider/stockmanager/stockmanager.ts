import {
	HttpClient, HttpHeaders
}
from '@angular/common/http';
import {
	Injectable
}
from '@angular/core';
import {
	Observable
}
from 'rxjs';
import {
	UtilityProvider
}
from '../utility/utility';
import {
	supplier_access_url, TAFEL_API_KEY, Order_Service_Url
}
from '../../common/properties';
/*  Generated class for the StockmanagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StockmanagerProvider {
	headers: HttpHeaders;
	idToken: any = '';
	constructor(public http: HttpClient, private _utilityProvider: UtilityProvider) {
		console.log('Hello StockmanagerProvider Provider');
		this.headers = this._utilityProvider.getHeadersForService();
	}
	headersinfo: any = {};
	apiDetails: any = {};
	getStockDataManager(url): Observable < any > {
		let pendingUrl = supplier_access_url + url;
		let localData = this.http.get(pendingUrl, {
			headers: this.headers
		});
		return localData;
	}
	getStockSubMenusManager(urlVal) {
		let url = supplier_access_url + urlVal;
		let localData = this.http.get(url, {
			headers: this.headers
		});
		return localData;
	}
	getItemDetailsManager(urlVal) {
		let url = Order_Service_Url + urlVal;
		let localData = this.http.get(url, {
			headers: this.headers
		});
		return localData;
	}
	getDeleteItemManager(urlVal) {
		let url = Order_Service_Url + urlVal;
		let localData = this.http.delete(url, {
			headers: this.headers
		});
		return localData;
	}
	getSubMenuDetails(mallId,subMenuId){
		var url = supplier_access_url+"/mall/"+mallId+"/submenu/"+subMenuId;
		let localData = this.http.get(url, {
			headers: this.headers
		});
		return localData;
	}
	getStockData(outletId, mallId, serviceStationId): Observable < any > {
		var stockEndPoint = supplier_access_url + "/serviceStations/" + serviceStationId + "/malls/" + mallId + "/outlets/";
		let apiUrl = stockEndPoint + outletId + "/inventory?sort=veg&search=";
		let localData = this.http.get(apiUrl, {
			headers: this.headers
		});
		return localData;
	}
	// updateOutletStatus(url, supplier) {
	// 	let pendingUrl = supplier_access_url + url;
	// 	var outletStatus = {
	// 		availability: {
	// 			available: false,
	// 			startHour: 0,
	// 			endHour: 23
	// 		},
	// 		mallId: ""
	// 	};
	// 	outletStatus.availability.available = (supplier.OutletState && supplier.OutletState == "open" ? true : false);
	// 	outletStatus.availability.startHour = supplier.StartHour;
	// 	outletStatus.availability.endHour = supplier.EndHour;
	// 	outletStatus.mallId = supplier.mallId;
	// 	let localData = this.http.put(pendingUrl, JSON.stringify(outletStatus), {
	// 		headers: this.headers
	// 	});
	// 	return localData;
	// }
	updateOutletStatus(outletId, outletItem, mallId) {
		let pendingUrl = supplier_access_url + "/outlets/" + outletId + "/items/" + outletItem.id;
		outletItem = {			
			"price": outletItem.price,
			"availability": outletItem.availability,
			"discount": outletItem.discount,
			"quantity": outletItem.quantity,
			"liveQuantity": 10,
			"id": outletItem.id,
			"mallId":outletItem.mallId
		};
		// outletItem.availability.available = (supplier.outletItem && supplier.outletItem == "open" ? true : false);
		// outletItem.availability.startHour = supplier.StartHour;
		// outletItem.availability.endHour = supplier.EndHour;
		// outletItem.mallId = supplier.mallId;
		let localData = this.http.put(pendingUrl, JSON.stringify(outletItem), {
			headers: this.headers
		});
		return localData;
	}
	updateItemData(outletId, outletItem, mallId): Observable < any > {
		let apiUrl = supplier_access_url + "/outlets/" + outletId + "/items/" + outletItem.id;
		outletItem = {
			"mallId": mallId,
			"price": outletItem.price,
			"availability": outletItem.availability,
			"discount": outletItem.discount,
			"quantity": outletItem.quantity,
			"liveQuantity": 10,
			"menuId": outletItem.menuId
		};
		let localData = this.http.put(apiUrl, JSON.stringify(outletItem), {
			headers: this.headers
		});
		return localData;
	}
	
	getAddItem(startHour, week, endHour, available, outletId, mallId, subMenuId, discount, price, veg, name, description, nameUpperCase): Observable < any > {
		let apiUrl = Order_Service_Url + "/item";
		var addItemInput = {};
		addItemInput = {			
			"availability": {
				"startHour":startHour,
				"weeks":week,
				"endHour":endHour,
				"available":available
			},
			"outletId": outletId,
			"mallId": mallId,
			"subMenuId": subMenuId,
			"discount": discount,
			"price": price,
			"veg": veg,
			"name": name,
			"description": description,
			"nameUpperCase": "test"
		};
		let localData = this.http.post(apiUrl, JSON.stringify(addItemInput), {
			headers: this.headers
		});
		return localData;
	}

	getUpdateItem(startHour, week, endHour, available, outletId, mallId, itemid, SubMenuId, itemDiscount, price, availabilityVeg, name, description, nameUpperCase): Observable < any > {
		let apiUrl = Order_Service_Url + "/item";
		var updateItemInput = {};
		updateItemInput = {			
			"availability": {
				"startHour":startHour,
				"weeks":week,
				"endHour":endHour,
				"available":available
			},
			"outletId": outletId,
			"mallId": mallId,
			"subMenuId": SubMenuId,
			"id": itemid,
			"discount": itemDiscount,
			"price": price,
			"veg": availabilityVeg,
			"name": name,
			"description": description,
			"nameUpperCase": "test"
		};
		let localData = this.http.put(apiUrl, JSON.stringify(updateItemInput), {
			headers: this.headers
		});
		return localData;
	}
	updateMallDetails(mallid,outletid,weeks,startTime,endTime,availability){
		let updateMenuUrl = Order_Service_Url+"/mall/"+mallid+"/outlet/"+outletid+"/outletAvailbility";
		
		availability={
			"startHour":startTime,
			"endHour":endTime,
			"available":availability,
			"weeks":weeks
		}
		return this.http.put(updateMenuUrl,JSON.stringify(availability),{
			headers: this.headers

			
		})
	}
	updateDiscountDetails(mallid,outletid,discount){
		let url = Order_Service_Url+"/mall/"+mallid+"/outlet/"+outletid+"/outletDiscount?discount="+discount;

		discount = {"discount":discount};

		return this.http.put(url,JSON.stringify(discount),{
			headers: this.headers

			
		})

	}
	updateSubMenuDetails(mallid,submenuId,weeks,startTime,endTime,availability){
		let updateMenuUrl = Order_Service_Url+"/mall/"+mallid+"/submenu/"+submenuId+"/subMenuAvailbility";
		
		availability={
			"startHour":startTime,
			"endHour":endTime,
			"available":availability,
			"weeks":weeks
		}
		return this.http.put(updateMenuUrl,JSON.stringify(availability),{
			headers: this.headers

			
		})
	}
	updateSubMenuDiscountDetails(mallid,submenuId,subMenuDiscount){
		let url = Order_Service_Url+"/mall/"+mallid+"/submenu/"+submenuId+"/subMenuDiscount?discount="+ subMenuDiscount;

	

		return this.http.put(url,{
			headers: this.headers

			
		})

	}
	getOutletDetails(mallid,outletid) {

		let outletDetails = Order_Service_Url+"/mall/"+mallid+"/outlet/"+outletid;
		return this.http.get(outletDetails,{
			headers: this.headers
		});


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