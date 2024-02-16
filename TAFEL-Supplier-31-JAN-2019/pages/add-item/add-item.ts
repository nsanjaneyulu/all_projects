import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ToastController } from 'ionic-angular';
import {
	StockmanagerProvider
}
from '../../provider/stockmanager/stockmanager';
import {
	Storage
}
from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {
  outletId="";
  stockSubmenuId: string;
  stockMenuId:string;
  getAddItemResp: any;
  discount:any;
  startHour = '00:00';
  endHour= '23:59';
  price: any;
  veg: any[]
  description: any;
  nameUpperCase: any;
  available: any;
  week = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  mallId: any;
  outletIds: string[];
  name: any;
  submenuName:string;
  outletName:string;
  showLoader: boolean;
  outletValidate : boolean = true;
  constructor( private toastCtrl: ToastController,private storage: Storage,public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController,private stockManager: StockmanagerProvider,) {
    this.storage.get("OUTLET_ID").then((val) => {
			this.outletIds = val;
			this.outletId = val[0];
			this.storage.get("MALL_ID").then((val) => {
        this.mallId = val;
       
      });
    });
    this.outletId = this.navParams.get("outletId");
    this.stockSubmenuId = this.navParams.get("stockSubmenuId");
    this.stockMenuId = this.navParams.get("stockMenuId");
    this.submenuName = this.navParams.get("submenuName");
    this.outletName = this.navParams.get("outletName");
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
  }
  BackButtonClick() {
		this.viewCtrl.dismiss();
  }
  showToast(position: string, message) {
    let toast = this.toastCtrl.create({
        message: message,
        duration: 2500,
        position: position,
        cssClass: 'toast-style'
    });
    toast.present(toast);
}
  addItem() {
    if (this.startHour && this.endHour) {
			
			// var startTime = moment(this.startTime);
			// var endTime = moment(this.endTime);
			// console.log("startTime endTime",startTime, endTime);
			if (this.startHour >= this.endHour) {
			
				this.outletValidate = true;
				this.showToast('bottom', 'From Date should not be greater than To Date');
				return false;
				
			}
			else if (this.discount > 0 && this.discount > 50) {
			
				this.outletValidate = true;
				this.showToast('bottom', 'Discount should not greather than 0 and greather than 50');
				return false;
			}
			else if (this.week.length === 0) {
				console.log("this.weeks.length",this.week.length);
				this.outletValidate = true;
				this.showToast('bottom', 'Please select atleast one day');
				return false;
			}
			else if(!this.price) {
        this.outletValidate = true;
        this.showToast('bottom', 'Please provide valid price');
        return false;
      }
      else if(!this.name) {
        this.outletValidate = true;
        this.showToast('bottom', 'Please provide valid Item name');
        return false;
			}
		}
		else {
			
			
		}
    this.showLoader = true;
    this.stockManager.getAddItem(this.startHour,this.week,this.endHour,this.available,this.outletId, this.mallId, this.stockSubmenuId,this.discount,this.price, this.veg, this.name,this.description,this.nameUpperCase).subscribe(resp => {
        this.getAddItemResp = resp;
        this.showLoader = !true;
    });
  }
}

