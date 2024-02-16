import { Injectable,EventEmitter } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  env: any;
  propertiesURl: any;
  adminServiceEndpoint: any;
  ccAvenueEndPoint: any;
  dashboardServiceEndpoint: any;
  imageEndPoint: any;
  orderServiceEndpoint: any;
  paymentgatewayEndPoint: any;
  serviceEndPoint: any;
  tafelApiKey: any;
  latitude: any;
  longitude: any;
  serviceStationId: any;
  mallDataDetails: any;
  getOutletDetails: any;
  cartData: any = [];
  viewCartData: any = [];
  outletsData: any = [];
  cartOutletsData:any=[];
  fullOrderDetailsData:any;
  changeItemsPage = new EventEmitter;
  screenSelection = new EventEmitter;
  screenGetPageData:any;
  nameData:any;
  profileSelection:string="";
  postOrderDetails:any;
  constructor(public alertController: AlertController,private storage: Storage, public http: HttpClient, public toaster: ToastController) { }



  async toastFunction(message) {
    const toast = await this.toaster.create({
      //header: 'Toast header',
      message: message,
      position: 'top',
      duration: 3000
    });
    toast.present();
  }

  propertiesUrlFunction() {
    let propertiesUrl = "https://s3.ap-south-1.amazonaws.com/tafel-images/properties.json";
    this.http.get(propertiesUrl).subscribe(data => {
      //console.log(data[this.env]);
      this.propertiesURl = data;
      //let envVal = "SINDEV_REVAMP";
      let envVal = "SINDEV";
      console.log(envVal)
      console.log(this.propertiesURl[envVal]);
      this.env = envVal;
      this.adminServiceEndpoint = this.propertiesURl[envVal].adminServiceEndpoint;
      this.ccAvenueEndPoint = this.propertiesURl[envVal].ccAvenueEndPoint;
      this.dashboardServiceEndpoint = this.propertiesURl[envVal].dashboardServiceEndpoint;
      this.imageEndPoint = this.propertiesURl[envVal].imageEndPoint;
      this.orderServiceEndpoint = this.propertiesURl[envVal].orderServiceEndpoint;
      this.paymentgatewayEndPoint = this.propertiesURl[envVal].paymentgatewayEndPoint;
      this.serviceEndPoint = this.propertiesURl[envVal].serviceEndPoint;
      this.tafelApiKey = this.propertiesURl[envVal].tafelApiKey;

    });
  }

  setGeoCords(cords) {
    this.latitude = cords.latitude;
    this.longitude = cords.longitude;
  }
  
  setServiceStation(serviceStationData) {
    this.serviceStationId = serviceStationData.id;
  }

  setMallData(mallData) {
    console.log(mallData);
    this.mallDataDetails = mallData;
  }
  setScreenVision(screenData){
    this.screenGetPageData = screenData;
  }
  setNameData(deliveryName){
    this.nameData = deliveryName;
  }

  setTogetOutletDetail(toGetOutletDetails) {
    this.getOutletDetails = toGetOutletDetails;
  }

  extractRelationPath(links, rel) {
    var value;
    for (var i = 0; i < links.length;) {
      if (links[i].rel == rel) {
        if ("image" == rel) {
          value = this.imageEndPoint + links[i].href;
          break;
        }
        else {
          value = links[i].href;
          break;
        }
      }
      i++;
    }
    return value;
  }

  cartSetData(cartDataDetails) {
    this.cartData = cartDataDetails;
    console.log(this.cartData)
  }

  setCartViewData(cartViewDataDetails) {
    this.viewCartData = cartViewDataDetails;
  }

  setOutletsData(outletsDataDetails) {
    this.outletsData = outletsDataDetails;
  }

  setCartOutletsData(outletsDataDetails) {
    this.cartOutletsData = outletsDataDetails;
    console.log(this.cartOutletsData)
  }

  setProfilePageName(profileName){
    this.profileSelection = profileName;
  }

  userDetails(phoneNumber){
    let addressurl  = this.orderServiceEndpoint +"/phone_number/"+phoneNumber;
    return this.http.get(addressurl,{ headers: {"x-api-key":this.tafelApiKey} });
  }

  fullOrderDetails(fullOrder){
    this.fullOrderDetailsData = fullOrder;
  }

  getUPIOptions(url){
    var cardurl = this.ccAvenueEndPoint + url;
    return this.http.get(cardurl, { headers: {"x-api-key":this.tafelApiKey} });
  }

  setPostOrderDetails(orderDetails){
    this.postOrderDetails = orderDetails;
  }

  async cardsAlert(){
    let alert = await this.alertController.create({
      header: 'Invalid Card',
      message: 'Card details entered are wrong,Pls. check',
      buttons: ['OK']
    });

    await alert.present();
  }

  async paymentFailed(){
    let alert = await this.alertController.create({
      header: 'Payment Failed',

      buttons: ['OK']
    });
    await alert.present();
  }

  async someError(){
    let alert = await this.alertController.create({
      header: 'Some error occurred!!!',
			buttons: ['OK']
    });
    await alert.present();
  }

  async timeOutError(){
    let alert = await this.alertController.create({
      header: 'Payment Timeout ',
			
											buttons: ['OK']
    });
    await alert.present();
  }

}
