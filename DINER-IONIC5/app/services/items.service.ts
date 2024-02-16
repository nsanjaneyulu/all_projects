import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private utilitiesService:UtilitiesService,public http: HttpClient) { }

  getOutlets(outletDetails){
    let url = this.utilitiesService.serviceEndPoint + outletDetails.links[1].href;
    return this.http.get(url,{ headers: {"x-api-key":this.utilitiesService.tafelApiKey} });
  }

  getItems(link){
    let preference ="";
    
      preference ='veg';
    
    
    let itemsUrl = this.utilitiesService.serviceEndPoint + link + '?sort=' + preference + '&search=';
    return this.http.get(itemsUrl, { headers: {"x-api-key":this.utilitiesService.tafelApiKey} });
  }
}
