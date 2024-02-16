import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UtilitiesService } from './utilities.service';
@Injectable({
  providedIn: 'root'
})
export class MyordersService {

  constructor(private storage:Storage,private http:HttpClient,private utilitiesService:UtilitiesService) { }

  getAllOrderDetails(dinerId){
    
      let url = this.utilitiesService.orderServiceEndpoint + '/diners/' + dinerId + '/ssFullOrders';
      return this.http.get(url,{ headers: {"x-api-key":this.utilitiesService.tafelApiKey} });
    
    
}
}
