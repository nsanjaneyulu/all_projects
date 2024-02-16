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
// import {
// 	supplier_access_url, TAFEL_API_KEY, Order_Service_Url
// }
// from '../../common/properties';
import {imageEndPoint,Order_Service_Url, supplier_item_refund,admin_service_endpoint, supplier_access_url, TAFEL_API_KEY} from '../../common/endPointService';
/*  Generated class for the StockmanagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StockmanagerProvider {
	public supplierId: String;
	headers: HttpHeaders;
	idToken: any = '';
	constructor(public http: HttpClient, private _utilityProvider: UtilityProvider) {
		console.log('Hello StockmanagerProvider Provider');
		this.headers = this._utilityProvider.getHeadersForService();
	}
	headersinfo: any = {};
	apiDetails: any = {};
	getSupplierProfile(supplierId):Observable<any>{
   
		this.supplierId = supplierId;
		let apiUrl = supplier_access_url + '/suppliers/' + this.supplierId;
		let localData = this.http.get(apiUrl); 
	  
		return localData;
	  }
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
	
	getAddItem(startHour, week, endHour, available, outletId, mallId, subMenuId, discount, price, veg, name, description, nameUpperCase, preparationTime,supplierId): Observable < any > {
		let apiUrl = Order_Service_Url + "/item";
		var addItemInput = {};
		addItemInput = {			
			"availability": {
				"startHour":startHour,
				"weeks":week,
				"endHour":endHour,
				"available":available,
				"overrideAvlFlag":false
			},
			"outletId": outletId,
			"mallId": mallId,
			"subMenuId": subMenuId,
			"discount": discount,
			"price": price,
			"veg": veg,
			"name": name,
			"description": description,
			"nameUpperCase": name.toUpperCase(),
			"preparationTime":preparationTime,
			"priceBeforeGST":price,
			"modifiedBy": supplierId
		};
		let localData = this.http.post(apiUrl, JSON.stringify(addItemInput), {
			headers: this.headers
		});
		return localData;
	}

	getUpdateItem(startHour, week, endHour, available, outletId, mallId, itemid, SubMenuId, itemDiscount, price, availabilityVeg, name, description, nameUpperCase,preparationTime,img,overRideAvailable, logictype,modifiedBy): Observable < any > {
		let apiUrl = Order_Service_Url + "/item";
		console.log(availabilityVeg);
		var updateItemInput = {};
		updateItemInput = {			
		    "availability": logictype,
			"outletId": outletId,
			"mallId": mallId,
			"subMenuId": SubMenuId,
			"id": itemid,
			"supplierDiscount": itemDiscount,
			"price": price,
			"veg": availabilityVeg,
			"name": name,
			"description": description,
			"nameUpperCase": name.toUpperCase(),
			"preparationTime":preparationTime,
			"priceBeforeGST":price,
			"img":img,
			"modifiedBy": modifiedBy
		};
		let localData = this.http.put(apiUrl, JSON.stringify(updateItemInput), {
			headers: this.headers
		});
		return localData;
	}
	updateMallDetails(mallID, outletId, discount, data){
		let updateMenuUrl = Order_Service_Url+"/outlet";
		
		let finalData={
			id: outletId,
			discount :discount,
			mallId:mallID,
			
			availability:JSON.stringify(data)
		}
		return this.http.put(updateMenuUrl,JSON.stringify(finalData),{
			headers: this.headers

			
		})
	}
	custItemStatusService(data){	
		console.log("service data", data);
		let custItemStatusUrl = supplier_access_url+"/updateCustomization";
		return this.http.post(custItemStatusUrl,JSON.stringify(data),{
			headers: this.headers	
		})
	}
	checkAvailability(mallid,outletid, data){
		
		// let updateMenuUrl = Order_Service_Url+"/mall/"+mallid+"/outlet/"+outletid+"/outletAvailability";
		let updateMenuUrl = Order_Service_Url+"/mall/"+mallid+"/outlet/"+outletid+"/outletAvailability";

		return this.http.post(updateMenuUrl,JSON.stringify(data),{
			headers: this.headers

			
		})
	}
	checkOutletAvailability(mallid,outletid, data){
		// let updateMenuUrl = Order_Service_Url+"/mall/"+mallid+"/outlet/"+outletid+"/outletAvailability";
		console.log("data service before url", data);
		let updateMenuUrl = Order_Service_Url+"/validateOutletAvailability";
		console.log("data service before url", data);

		let finalData={
			mallId:mallid,
			// outletId:outletid,
			availability:JSON.stringify(data)
		}
		return this.http.post(updateMenuUrl,finalData,{
			headers: this.headers

			
		})
	}
	checkItemAvailability(mallid,outletid,itemId, submenuId, data){
		// let updateMenuUrl = Order_Service_Url+"/mall/"+mallid+"/outlet/"+outletid+"/item/"+itemId +"/itemAvailability?submenuid="+submenuId;
		let updateMenuUrl = Order_Service_Url+"/validateItemAvailability";
		let finalData={
			mallId: mallid,
			submenuId:submenuId,
			availability :JSON.stringify(data)
		}

		return this.http.post(updateMenuUrl,finalData,{
			headers: this.headers

			
		})
	}
	updateDiscountDetails(mallid,outletid,discount,modifiedBy){
		let url = Order_Service_Url+"/mall/"+mallid+"/outlet/"+outletid+"/outletDiscount?discount="+discount;

		discount = {"discount":discount,"modifiedBy": modifiedBy};

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
	updateSubMenuDetails_new(availability){
		let updateMenuUrl = Order_Service_Url+"/submenu/";
		
		
		return this.http.put(updateMenuUrl,JSON.stringify(availability),{
			headers: this.headers

			
		})
	}
	checkSubmenuAvailability(mallid,outletid,submenuId, data){
		// let updateMenuUrl = Order_Service_Url+"/mall/"+mallid+"/outlet/"+outletid+"/submenuAvailability?submenuid="+submenuId;
	 let updateMenuUrl = Order_Service_Url+"/validateSubmenuAvailability";
	 let finalData={
		 mallId:mallid,
		 outletId:outletid,
		 submenuId:submenuId,
		 availability:JSON.stringify(data)
	 }

		return this.http.post(updateMenuUrl,finalData,{
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
		console.log(outletDetails, "outletDetails");
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