import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  headers: HttpHeaders
  constructor(private http: HttpClient,) {
    this.headers = this.getHeadersForService();
   }
  getHeadersForService() {
		let headers = new HttpHeaders({
			'content-type': 'application/json'
		});
		return headers;
  }
  outletDetailsService(getOutletDetailsURL){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + getOutletDetailsURL, {
        headers: this.headers
    });
  }
  getMallDetails(url) {
    console.log("@@@@@@@@@@@@@@@@@@@@3333")

		let pendingUrl = environment.supplierAccessURL + url;
		let localData = this.http.get(pendingUrl, {
			headers: this.headers
		});
		return localData;
	}
  mallDetailsService(){
   
    // return this.http.get(environment.apiUrl +'userid/'+localStorage.getItem('USERID')+'/getMalls' , {
    //     headers: this.headers
    // });
    return this.http.get(environment.apiUrl +'userid/'+'00ae9fbf-e7f8-469e-81da-3ce16cb4c123'+'/getMalls' , {
      headers: this.headers
  });
  }
  getStockDataManager(url) {
    let stockUrl = environment.supplierAccessURL + url;
    let localData = this.http.get(stockUrl, {
        headers: this.headers
    });
    return localData;
}
getStockSubMenusManager(url) {
    let stockUrl = environment.supplierAccessURL + url;
    let localData = this.http.get(stockUrl, {
        headers: this.headers
    });
    return localData;
}
getItemDetailsManager(url) {
  let itemDetailsUrl = environment.orderServiceURL + url;
  let localData = this.http.get(itemDetailsUrl, {
      headers: this.headers
  });
  return localData;
}
getOutletDetails(url) {
  let itemDetailsUrl = environment.orderServiceURL + url;
  let localData = this.http.get(itemDetailsUrl, {
      headers: this.headers
  });
  return localData;
}
checkOutletAvailability(url, mallid,outletid, data) {
  let checkOutletAvailabilityUrl = environment.orderServiceURL + url;
  let finalData={
    mallId:mallid,
    // outletId:outletid,
    availability:JSON.stringify(data)
  }
  let localData = this.http.post(checkOutletAvailabilityUrl,finalData, {
      headers: this.headers
  });

  return localData;
}
checkSubmenuAvailability(url, mallid,outletid,submenuId, data) {
  let checkOutletAvailabilityUrl = environment.orderServiceURL + url;
  let finalData={
    mallId:mallid,
    outletId:outletid,
    submenuId:submenuId,
    availability:JSON.stringify(data)
  }

  let localData = this.http.post(checkOutletAvailabilityUrl,finalData, {
      headers: this.headers
  });
  return localData;
}
checkItemAvailability(url, mallid,outletid,itemId, submenuId, data) {
  let checkOutletAvailabilityUrl = environment.orderServiceURL + url;
  let finalData={
    mallId: mallid,
    submenuId:submenuId,
    availability :JSON.stringify(data)
  }
  let localData = this.http.post(checkOutletAvailabilityUrl,finalData, {
      headers: this.headers
  });
  return localData;
}
updateSubMenuMallDetails(url, availability) {
  let updateSubMenuMallDetailsUrl = environment.orderServiceURL + url;
 
  let localData = this.http.put(updateSubMenuMallDetailsUrl,JSON.stringify(availability), {
      headers: this.headers
  });
  return localData;
}
updateMallDetails(url,mallID, outletId, discount, data) {
  let updateMallDetailsUrl = environment.orderServiceURL + url;
  let finalData={
    id: outletId,
    discount :discount,
    mallId:mallID,
    
    availability:JSON.stringify(data)
  }
  let localData = this.http.put(updateMallDetailsUrl,JSON.stringify(finalData), {
      headers: this.headers
  });
  return localData;
}
updateDiscountDetails(url, discount,modifiedBy) {
  let updateDiscountDetailsUrl = environment.orderServiceURL + url;
  discount = {"discount":discount,"modifiedBy": modifiedBy};
  let localData = this.http.put(updateDiscountDetailsUrl,JSON.stringify(discount), {
      headers: this.headers
  });
  return localData;
}
getSubMenuDetails(url) {
  let getSubMenuDetailsUrl = environment.supplierAccessURL + url;

  let localData = this.http.get(getSubMenuDetailsUrl, {
      headers: this.headers
  });
  return localData;
}
getUpdateItem(url, outletId, mallId, itemid, SubMenuId, itemDiscount, price, availabilityVeg, name, description, preparationTime,img,logictype,modifiedBy, itemQuantity, itemLiveQuantity): Observable < any > {
  let getUpdateItemUrl = environment.orderServiceURL + url;
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
    "nameUpperCase": name,
    "preparationTime":preparationTime,
    "priceBeforeGST":price,
    "img":img,
    "modifiedBy": modifiedBy,
    "quantity": itemQuantity,
    "liveQuantity": itemLiveQuantity
  };

  let localData = this.http.put(getUpdateItemUrl, JSON.stringify(updateItemInput), {
    headers: this.headers
    
  });
 
  return localData;
}
}
