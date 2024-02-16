import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UtilitiesService } from './utilities.service';
@Injectable({
  providedIn: 'root'
})
export class OrderSummaryService {

  constructor(private utilitiesService: UtilitiesService, public http: HttpClient) { }

  getPostOrderDetails(postOrderId, mallId, dinerId) {
    let url = this.utilitiesService.orderServiceEndpoint + '/diners/' + dinerId + '/malls/' + mallId + '/postOrdersByFullOrder/' + postOrderId;
    return this.http.get(url, { headers: { "x-api-key": this.utilitiesService.tafelApiKey } });
  }
  getOrderDetailsInfo(fullOrderDetails, dinerId,serviceStation) {
    //let url = "https://3xpr4y5qmc.execute-api.ap-southeast-1.amazonaws.com/dm/serviceStations/47e5fb51-61f2-4d66-a7f0-1427eb6fbc43/malls/2277b28a-0b55-4586-95ba-01b6750975c5/ssFullOrders/544c9cb1-601c-4ba1-b38e-f5cb4f6a6773";
    let url = "https://3xpr4y5qmc.execute-api.ap-southeast-1.amazonaws.com/dm/serviceStations/"+serviceStation+"/malls/"+fullOrderDetails.mallId+"/ssFullOrders/"+fullOrderDetails.id;
    //let url = this.utilitiesService.orderServiceEndpoint + '/diners/' + dinerId + '/serviceStations/' + this.utilitiesService.serviceStationId + '/malls/' + fullOrderDetails.mallId + '/ssFullOrders/' + fullOrderDetails.id;
    return this.http.get(url, { headers: { "x-api-key": this.utilitiesService.tafelApiKey } });
  }
  sendRcvdMsg(type, orderId, fullorderId, mallid,dinerId) {
    let url = this.utilitiesService.orderServiceEndpoint + "/mall/sendMail/";
    // let url =  ccAvenueEndPoint+"/sendsentSMS/diner/"+this.dinerId+"/type/"+type+"/order/"+orderId+"/fullorder/"+fullorderId+"/mall/"+mallid;
    return this.http.post(url, {
      "dinerId": dinerId,
      "mallId": mallid,
      "fullOrderId": fullorderId
    }, { headers: { "x-api-key": this.utilitiesService.tafelApiKey } });
  }
}
