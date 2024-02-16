import { Component } from '@angular/core';
import { Platform, NavParams, ViewController, AlertController, NavController } from 'ionic-angular';
import { OrdersProvider } from '../../provider/orders/orders';

@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html'
})

export class DeliveryPage {

  constructor(public navCtrl:NavController, public platform: Platform,
    public params: NavParams, private alertCtrl: AlertController,
    public viewCtrl: ViewController,private oprovider:OrdersProvider) {
    console.log(params);
    this.item=params.data;
    this.ssId=this.item.ssId;
    this.mallId=this.item.mallId;
    this.supplierId=this.supplierId;
  }

  item:any;
  dinerOtp: number;
  ssId:string;
  mallId:string;
  supplierId:string;

  dismiss() {
    this.viewCtrl.dismiss();
  }

  isSupplierOtpReadOnly(){
    return true;
  }

  confirmHandovered(){
    var outletId=this.item.outletId;
    var orderId=this.item.id;
    
    console.log(" Confirm Handovered");
    // let url="/suppliers/"+this.supplierId+"/serviceStations/"+this.ssId+"/malls/"+this.mallId+"/outlets/"+outletId+"/orders/"+orderId;
     let url="/suppliers/"+this.supplierId+"/serviceStations/"+this.ssId+"/malls/"+this.mallId+"/orders/"+orderId;

    this.oprovider.updateOrderHandovered(url,"HANDEDOVER",this.item.otpOutlet,this.dinerOtp).subscribe(d =>{
      this.dismiss();
    },err =>{
      this.presentAlert('Wrong OTP!','Invalid Diner OTP');
    });
  }

  presentAlert(title,message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();
  }

  getRoundedValue(n){
    return Math.round(n);
  }
}
