import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { StockmanagerProvider} from '../stockmanager/stockmanager';
import { supplier_access_url } from '../../common/properties';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {
  headers: HttpHeaders;
  idToken: any = '';
  apiDetails: any={};
  public supplierId: String;
  supplierProfile: any;


  constructor(public http: HttpClient, public stockMgr: StockmanagerProvider) {
    this.stockMgr = stockMgr;
    console.log('In constructor for ProfileProvider ');
  }

  getSupplierProfile(supplierId):Observable<any>{
   
    this.supplierId = supplierId;
    let apiUrl = supplier_access_url + '/suppliers/' + this.supplierId;
    let localData = this.http.get(apiUrl); 
  
    return localData;
  }

  getOutletIdsForSupplier(supplierId): Observable<any>{
   
    return ;
  }

  getOutletData(outletId): Observable < any > {
    let Outlet_Orders_Url = supplier_access_url + '/outlets/';
    let localData = this.http.get(Outlet_Orders_Url + outletId );
    return localData;
  }

  getOutletProfile(OutletId,mallId):Observable<any>{
    var outlet_profile_url = supplier_access_url+"/malls/"+mallId+"/outlets/";
    let apiUrl = outlet_profile_url + OutletId;
    let localData = this.http.get(apiUrl); 
    return localData;
  }

  updateSupplierProfile(supplier):Observable<any>{
    let apiUrl= supplier_access_url + '/suppliers/' + supplier.id;
    var headers={};
    headers["Content-Type"]="application/json";
    var headersinfo={};
    headersinfo["headers"]= headers;
    supplier.deviceId="XParam";
    let localData = this.http.put(apiUrl,JSON.stringify(supplier),headersinfo);
    return localData;
  }

  updateOutletStatus(outlet):Observable<any>{
    var pendingurl = "/outlets/" + outlet.id;
  
    let apiUrl=supplier_access_url + pendingurl;    
    var outletStatus={ availability: outlet.availability, mallId:outlet.mallId};    
    
    let localData = this.http.put(apiUrl,JSON.stringify(outletStatus),{ headers: this.headers });
    return localData;
  }
    

}
