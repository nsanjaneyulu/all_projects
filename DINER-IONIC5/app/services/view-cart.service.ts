import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UtilitiesService } from './utilities.service';
@Injectable({
  providedIn: 'root'
})
export class ViewCartService {

  constructor(private utilitiesService:UtilitiesService,public http: HttpClient) { }

  getAmount(fullOrder){
    console.log(fullOrder)
    let url = this.utilitiesService.orderServiceEndpoint+"/getAmount";
    return this.http.post(url, fullOrder, { headers: {"x-api-key":this.utilitiesService.tafelApiKey} });
  }
  getUniqueAdressForA1(mallId){

    let addressurl  = this.utilitiesService.orderServiceEndpoint +"/getUniqueA1Address/mall/"+mallId;
    return this.http.get(addressurl,{ headers: {"x-api-key":this.utilitiesService.tafelApiKey} });

}
getUniqueAdressForA2(mallId, a1){

  let addressurl  = this.utilitiesService.orderServiceEndpoint +"/getUniqueA2Address/mall/"+mallId+"/a1/"+a1;
  return this.http.get(addressurl,{  headers: {"x-api-key":this.utilitiesService.tafelApiKey}  });

}
getUniqueAdressForA3(mallId,a1,a2){
  let addressurl  = this.utilitiesService.orderServiceEndpoint +"/getUniqueA3Address/mall/"+mallId+"/a1/"+a1+"/a2/"+a2;
        return this.http.get(addressurl,{ headers: {"x-api-key":this.utilitiesService.tafelApiKey} });
}
postssFullOrderDetailsWithDeliveryCharges(fullorderDetails){
  let orderUrl = this.utilitiesService.orderServiceEndpoint + '/diners/' + fullorderDetails.dinerId + '/serviceStations/' + this.utilitiesService.serviceStationId + '/malls/' + fullorderDetails.mallId + '/ssFullOrders';
  return this.http.post(orderUrl,fullorderDetails,{ headers: {"x-api-key":this.utilitiesService.tafelApiKey} });;
}
}
