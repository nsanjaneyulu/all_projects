import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService  {

  constructor(private utilitiesService:UtilitiesService,public http: HttpClient) { }
 
  
  getWalletInfo(url){
  
    
    
    let cardurl = this.utilitiesService.serviceEndPoint + url;
    return this.http.get(cardurl, { headers: {"x-api-key":this.utilitiesService.tafelApiKey} });
  }
  getWalletPoints(url){
    var cardurl = this.utilitiesService.serviceEndPoint + url;
    return this.http.get(cardurl, { headers: {"x-api-key":this.utilitiesService.tafelApiKey} });
  }

 
  getOrdersList(url){
    var cardurl = this.utilitiesService.orderServiceEndpoint + url;
    return this.http.get(cardurl, { headers: {"x-api-key":this.utilitiesService.tafelApiKey} });
  }
  updateUserDetails(userDetails) {

    let updateUrl = this.utilitiesService.serviceEndPoint + '/updateEmailDiner';;

    return this.http.put(updateUrl, { "email": userDetails.email,"firstName":userDetails.firstName,"id":userDetails.id },  { headers: {"x-api-key":this.utilitiesService.tafelApiKey} });
  }
}
