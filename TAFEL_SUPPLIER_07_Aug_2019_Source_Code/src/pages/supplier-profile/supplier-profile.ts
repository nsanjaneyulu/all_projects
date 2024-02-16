import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, App } from 'ionic-angular';

import { LoginPage } from '../login/login';

import { Storage } from '@ionic/storage';
import { imageEndPoint } from '../../common/endPointService';
import { ProfileProvider } from '../../provider/profile/profile';
import { BackbuttonService } from '../../provider/backbutton/backbutton.service';

/**
 * Generated class for the SupplierProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-supplier-profile',
  templateUrl: 'supplier-profile.html',
})
export class SupplierProfilePage {
  supplierProfile: any = null;
  supplierId: any;
  loading: any;
  isProfileLoaded: boolean = false;
  segmentSelected: any = "outlet";
  outletIds: any;
  outlets: any;
  imageEndPoint:string;
  alert: any;
  mallId: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private profileProvider: ProfileProvider,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private alertCtrl:AlertController,
    private appCtrl: App,
    private backbuttonService:BackbuttonService) {
  
    this.imageEndPoint=imageEndPoint;
      if(!this.isProfileLoaded){
       this.loadProfile();
      }
    }
loadProfile() {
  this.presentLoadingDefault();
      
  this.storage.get("SUPPLIER_ID").then((val) => {
    this.supplierId = val;
 
    this.getSupplierProfile();
  });
}
  logoutSupplier(){
    let deviceRegistrationId="";
    this.storage.get("DEVICE_REG_ID").then((val)=>{
      deviceRegistrationId=val;
      this.storage.clear().then(val=>{
        this.setOnlyDeviceRegistrationId(deviceRegistrationId);
        this.appCtrl.getRootNav().setRoot(LoginPage);
        this.backbuttonService.popAllPages();
      });
    })      
  } 
    
  setOnlyDeviceRegistrationId(deviceRegistrationId){
    this.storage.set("DEVICE_REG_ID",deviceRegistrationId);
  }

  getSupplierProfile() {
  
    this.profileProvider.getSupplierProfile(this.supplierId).subscribe(data =>{
      this.supplierProfile = data;
      this.storage.set("SUPPLIER_PROFILE", data);
      this.storage.set("OUTLET_ID", data.outletIds);
    
      this.supplierProfile = data;
      this.profileProvider.supplierProfile = data; 
      this.isProfileLoaded = true;

      this.outletIds = data.outletIds;
      this.mallId = data.mallId;
     
      this.getOutlets();
    
    });
  }

  getOutlets(){
    console.log(' SupplierProfilePage ::getOutlets()  Getting outlets for outletIds');
    this.outlets = [];
    //this.presentLoadingDefault();
    if(this.outletIds.length == 0 ){
      this.dismissLoading();
    }
    this.outletIds.forEach(outletId => {
      this.profileProvider.getOutletProfile(outletId, this.mallId).subscribe(
        data =>{
          this.outlets.push(data);
          if(this.outlets.length == this.outletIds.length ){
            this.dismissLoading();
          }
        },
        error => {
          //this.dismissLoading();
        }
      );
    });
    console.log(' ProfileSettingsPage ::getOutlets() After Getting outlets ', this);
    //this.dismissLoading();
  }

  setShowItems(outlet){
    outlet.showItems = !outlet.showItems;
  }

  

  

  updateOutletStatus(outlet){
    console.log(' Updating Outlet status for ' + outlet.name + ' to -> ', outlet.availability.available);
    this.presentLoadingDefault();
    this.profileProvider.updateOutletStatus(outlet).subscribe(
      data =>{
        // this.storage.set("OUTLET_OBJECT", this.outlets);
        this.dismissLoading();
      },
      error=>{
        this.dismissLoading();
      }
    );
  }

  setDate( outlet){
    
    console.log(' startHour Time = ', outlet.availability.startHour);
    console.log(' endHour Time = ', outlet.availability.endHour);
    var sh = parseInt(outlet.availability.startHour);
    var eh = parseInt(outlet.availability.endHour);
    if(sh == NaN){
      outlet.availability.startHour = 0;
      sh = 0 ;
    } 
    
    if(eh == NaN){
      outlet.availability.endHour = 23;
      eh = 23;
    }

    if(sh != NaN && eh != NaN && (sh < eh))
    {
      //this.updateOutletStatus(outlet);
      return true;
    }
    else{

      this.presentAlert('Error', 'Start Hour should not be less than End Hour.');
      return false;
    }
  }

  updateOpenTime( outlet){
    if(this.setDate( outlet))
    {
      this.updateOutletStatus(outlet);
    }
  }

  presentAlert(title,message) {
    this.alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Okay']
    });
    this.alert.present();
  }





  ionViewDidLoad() {
    console.log('ionViewDidLoad SupplierProfilePage');
  }

  presentLoadingDefault() {
     this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  dismissLoading(){
      this.loading.dismiss();
  }
  goRefresh(refresher) {
    this.loadProfile();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
	}
}
