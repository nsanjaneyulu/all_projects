import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private utilitiesService:UtilitiesService,public http: HttpClient) { }

  getServiceStation(){
    var serviceStationUrl2='';
    serviceStationUrl2 = this.utilitiesService.dashboardServiceEndpoint + '/serviceStations?lo=' + this.utilitiesService.longitude + '&la=' + this.utilitiesService.latitude;
    return this.http.get(serviceStationUrl2,{ headers: {"x-api-key":this.utilitiesService.tafelApiKey} })
  }
  getDriveIns(serviceStationData,cords){
    let url = this.utilitiesService.dashboardServiceEndpoint + '/serviceStationsnearBy?serviceStationId=' + serviceStationData +'&lo=' + cords.longitude + '&la=' + cords.latitude + '&typeOfDining=DINEINS&criteria=nearby';
    return this.http.get(url,{ headers: {"x-api-key":this.utilitiesService.tafelApiKey} })
  }
  getCinemas(serviceStationData,cords){
    let url = this.utilitiesService.dashboardServiceEndpoint + '/serviceStationsnearBy?serviceStationId=' + serviceStationData +'&lo=' + cords.longitude + '&la=' + cords.latitude + '&typeOfDining=CINEMAS&criteria=nearby';
    return this.http.get(url,{ headers: {"x-api-key":this.utilitiesService.tafelApiKey} })
  }
  getFoodCourts(serviceStationData,cords){
    let url = this.utilitiesService.dashboardServiceEndpoint + '/serviceStationsnearBy?serviceStationId=' + serviceStationData +'&lo=' + cords.longitude + '&la=' + cords.latitude + '&typeOfDining=FOODCOURT&criteria=nearby';
    return this.http.get(url,{ headers: {"x-api-key":this.utilitiesService.tafelApiKey} })
  }
  getRestaurants(serviceStationData,cords){
    let url = this.utilitiesService.dashboardServiceEndpoint + '/serviceStationsnearBy?serviceStationId=' + serviceStationData +'&lo=' + cords.longitude + '&la=' + cords.latitude + '&typeOfDining=RESTAURANT&criteria=nearby';
    return this.http.get(url,{ headers: {"x-api-key":this.utilitiesService.tafelApiKey} })
  }
  getCafeterias(serviceStationData,cords){
    let url = this.utilitiesService.dashboardServiceEndpoint + '/serviceStationsnearBy?serviceStationId=' + serviceStationData +'&lo=' + cords.longitude + '&la=' + cords.latitude + '&typeOfDining=CAFETERIA&criteria=nearby';
    return this.http.get(url,{ headers: {"x-api-key":this.utilitiesService.tafelApiKey} })
  }
  getshowDiscoverNearYou(key){
    let url = this.utilitiesService.orderServiceEndpoint + '/givekey/'+ key;
    return this.http.get(url,{ headers: {"x-api-key":this.utilitiesService.tafelApiKey} });
  }
  getOffers(servicStationID){
    let url = this.utilitiesService.adminServiceEndpoint + '/serviceStations/' + servicStationID + '/offers';
    return this.http.get(url,{ headers: {"x-api-key":this.utilitiesService.tafelApiKey} });
  }
  getofferDetailsItems(serviceStationID){
    let url = this.utilitiesService.dashboardServiceEndpoint + '/getOffers?serviceStation='+ serviceStationID;
    return this.http.get(url,{ headers: {"x-api-key":this.utilitiesService.tafelApiKey} });
  }
  getRecommendedItems(criteria, serviceStationID){
    let url = this.utilitiesService.dashboardServiceEndpoint + '/items?serviceStations='+ serviceStationID +'&criteria=' + criteria;
    return this.http.get(url,{ headers: {"x-api-key":this.utilitiesService.tafelApiKey} });
  }
  getOutlets(criteria, serviceStationID){
    let url = this.utilitiesService.dashboardServiceEndpoint + '/outlets?serviceStations='+ serviceStationID +'&criteria=' + criteria;
    return this.http.get(url,{ headers: {"x-api-key":this.utilitiesService.tafelApiKey} });
  }
}
