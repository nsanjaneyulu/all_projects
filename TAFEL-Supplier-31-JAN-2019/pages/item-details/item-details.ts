import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ToastController } from 'ionic-angular';
import {StockmanagerProvider}from '../../provider/stockmanager/stockmanager';
import {SubMenuDetailsPage}from '../../pages/sub-menu-details/sub-menu-details';
@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {
  outletId="";
  itemDetails:any;
  itemDetailsId: string;
  itemDetailsmallId: string;
  itemDetailsResp: any;
  startTime:any; 
  endTime:any;
  weeks:any[];
  availability = true;
  availabilityVeg = true;
  itemDiscount:any;
  price: any;
  veg: any;
  description: any;
  mallId: any;
  itemId: any;
  name: any;
  nameUpperCase: any;
  getUpdateItem: any;
  itemDetailsname: any;
  itemDetailsSubMenuId: any;
  deleteItemResp: any;
  showLoader: boolean;
  outletValidate : boolean = true;
  constructor(private toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private stockManager: StockmanagerProvider,) {
     this.itemDetails = this.navParams.get("item");
     this.outletId = this.navParams.get("outletId");
     this.itemDetailsId = this.itemDetails.id;
     this.itemDetailsSubMenuId = this.itemDetails.subMenuId;
     this.itemDetailsmallId = this.itemDetails.mallId;
     this.itemDetailsname = this.itemDetails.name;
   
  
    
     this.getItemDetails(this.itemDetailsId,this.itemDetailsmallId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetailsPage');
  }
  getItemDetails(itemId, mallId) {
    let orderUrl = "/mall/" + mallId + "/item/" + itemId;
    this.showLoader = true;
		this.stockManager.getItemDetailsManager(orderUrl).subscribe(resp => {
      console.log(resp);
      
      this.weeks = resp['availability']['weeks'];
      this.startTime = resp['availability']['startHour'];
      this.endTime = resp['availability']['endHour'];
      this.availability = resp['availability']['available'];
      this.availabilityVeg = resp['veg'];
      this.price = resp['price'];
      this.description = resp['description'];
      if(this.itemDetails.discount){
        this.itemDiscount = resp['discount'];
      }
      else{
      this.itemDiscount ="0";
      }
      this.showLoader = false;
		});
  }
  updateItem() {
    if (this.startTime && this.endTime) {
			
			// var startTime = moment(this.startTime);
			// var endTime = moment(this.endTime);
			// console.log("startTime endTime",startTime, endTime);
			if (this.startTime >= this.endTime) {
			
				this.outletValidate = true;
				this.showToast('bottom', 'From Date should not be greater than To Date');
				return false;
				
			}
			else if (this.itemDiscount > 0 && this.itemDiscount > 50) {
			
				this.outletValidate = true;
				this.showToast('bottom', 'Discount should not greather than 0 and greather than 50');
				return false;
			}
			else if (this.weeks.length === 0) {
				console.log("this.weeks.length",this.weeks.length);
				this.outletValidate = true;
				this.showToast('bottom', 'Please select atleast one day');
				return false;
			}
			else {

			}
		}
		else {
			
			
		}
    this.showLoader = true;
    this.stockManager.getUpdateItem(this.startTime,this.weeks,this.endTime,this.availability,this.outletId,this.itemDetailsmallId, this.itemDetailsId, this.itemDetailsSubMenuId, this.itemDiscount,this.price, this.availabilityVeg, this.itemDetailsname,this.description,this.nameUpperCase).subscribe(resp => {
        this.getUpdateItem = resp;
        this.showLoader = false;
    });
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
  deleteItem() {
    let orderUrl = "/mall/" + this.itemDetailsmallId + "/item/" + this.itemDetailsId;
    this.showLoader = true;
		this.stockManager.getDeleteItemManager(orderUrl).subscribe(resp => {
      this.deleteItemResp = resp;
      this.showLoader = false;
    });
  }
  BackButtonClick() {
    this.viewCtrl.dismiss();
  //   this.navCtrl.push(SubMenuDetailsPage, {
  //     fullorder: fullorder,
  //     type: "fullorders"
  // });
    
	}

}
