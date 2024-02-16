import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UtilitiesService } from './utilities.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class PaymentSelectionService {

  constructor(private storage: Storage, private utilitiesService: UtilitiesService, public http: HttpClient) { }

  postPostOrderDetails(fullOrderId, paymentMode, fullorderDetails) {

    let url = this.utilitiesService.orderServiceEndpoint + '/diners/' + fullorderDetails.userDetails.id + '/serviceStations/' + this.utilitiesService.serviceStationId + '/malls/' + fullorderDetails.mallId + '/fullOrders/' + fullOrderId + '/postOrders';
    return this.http.post(url, { paymentMode: paymentMode }, { headers: { "x-api-key": this.utilitiesService.tafelApiKey } });
    // .subscribe(
    //     res => {                
    //         this.postOrderId = res;                 
    //         console.log('Post Order Id :::' + JSON.stringify(this.postOrderId));  
    //         this.getPostOrderDetails();         
    //     },
    //     (err: HttpErrorResponse) => {
    //       console.log(err);              
    //     });        
  }
  getCardValidity(url) {
    var cardurl = this.utilitiesService.ccAvenueEndPoint + url;
    return this.http.get(cardurl, { headers: { "x-api-key": this.utilitiesService.tafelApiKey } });
  }
  coldstartccAvenue() {

    let url = this.utilitiesService.ccAvenueEndPoint + '/start';
    return this.http.get(url, { headers: { "x-api-key": this.utilitiesService.tafelApiKey } });

  }
  getCCAvenuePostURl(cardNumber, expiryMonth, expiryyear, cvv, orderNo, amount, paymentype, netBanking,
    paymentMode, customerCardId, cardType, saveCard, savedCard, orderId, mallId, orderuniqueNumber,dinerId) {
      let payment = {};
      if (paymentype == "CARDS") {
        payment = {
  
          "cardNumber": cardNumber,
          "expiryYear": expiryyear,
          "expiryMonth": expiryMonth,
          "cvv": cvv,
          "orderId": orderNo,
          "amount": amount,
          "dinnerid": dinerId,
          "customerCardId": customerCardId,
          "saveCard": saveCard,
          "newCard": "Yes",
          "fullOrderid": orderId,
          "mallId": mallId,
          "orderuniqueNumber": orderuniqueNumber
        }
      }else if (paymentype == "NET_BANKING") {

        payment = {
          "issuebank": netBanking,
          "orderId": orderNo,
          "amount": amount,
          "dinnerid": dinerId,
          "fullOrderid": orderId,
          "mallId": mallId,
          "orderuniqueNumber": orderuniqueNumber
        }
      }
      else {

        payment = {
          "issuebank": paymentMode,
          "orderId": orderNo,
          "amount": amount,
          "dinnerid":dinerId,
          "fullOrderid": orderId,
          "mallId": mallId,
          "orderuniqueNumber": orderuniqueNumber
        }
      }
      return payment;
    }

    checkTranscationStatus(orderId,dinerId) {
      let url = this.utilitiesService.paymentgatewayEndPoint + "/checkStatusOfOrder/" + dinerId + "/order/" + orderId;
      //   let url = ccAvenueEndPoint+"ssid/"+this.serviceStationId+"/mall/"+mallid+"/dinerid/"+this.dinerId+"/fullOrder/"+fullOrderId+"/orderstatus/"+orderId;
      return this.http.get(url,  { headers: { "x-api-key": this.utilitiesService.tafelApiKey} });
    }
    checkOrderStatus(url, mallId, fullOrderid,dinerId) {
      url = this.utilitiesService.ccAvenueEndPoint + "/ssid/" + this.utilitiesService.serviceStationId + "/mall/" + mallId + "/dinerid/" + dinerId + "/fullOrder/" + fullOrderid + "/orderstatus/" + url;
      return this.http.get(url, { headers: { "x-api-key": this.utilitiesService.tafelApiKey } });
    }

    initPayTMTxn(url) {
      return this.http.get(url, { headers: { "x-api-key": this.utilitiesService.tafelApiKey } });
    }
}
