import {
	Component,
}
from '@angular/core';
import {
	NavController,
	App,
	LoadingController,
	AlertController,
	ToastController
}
from 'ionic-angular';
// import { Vibration } from '@ionic-native/vibration';
import 'rxjs/add/operator/map';
import {
	StockmanagerProvider
}
from '../../provider/stockmanager/stockmanager';
import {
	imageEndPoint
}
from '../../common/properties';
import {
	LoginPage
}
from '../login/login';
import {
	Storage
}
from '@ionic/storage';
import {
	BackbuttonService
}
from '../../provider/backbutton/backbutton.service';
import {
	OrdersProvider
} from '../../provider/orders/orders';
import { SubMenuDetailsPage } from '../sub-menu-details/sub-menu-details';
import * as moment from 'moment';
@Component({
	selector: 'page-stock',
	templateUrl: 'stock.html'
})
export class StockPage {
	outlets: any = [];
	outletIds: string[];
	selectedOutlet: any;
	selectedOutletForSegment: string;
	getMallDetailsResp: any = {address:{area: "", city: "",}};
	StockData: any = [];
	UpdateStockData: any = {};
	imageEndPoint: string;
	outletId: string;
	mallId: string;
	ssId: string;
	originalStockData: any[] = [];
	outletSeleted: string;
	availability = true;
	startTime:any;
	endTime:any;
	outletDiscount:any;
	weeks:any[];
	showLoader: boolean;

	outletValidate : boolean = true;
	errorMessage : String = "Please provide valid Date Range.";
	sendOutletValidateError : boolean = false;
	brightness: number = 20;
	contrast: number = 0;
	warmth: number = 1300;
	structure: any = { lower: 33, upper: 60 };
	text: number = 0;
	constructor(private oprovider: OrdersProvider,public navCtrl: NavController, 
		private stockManager: StockmanagerProvider, private storage: Storage,
		 private loadingCtrl: LoadingController, private toastCtrl: ToastController, private alertCtrl: AlertController, private appCtrl: App, private backbuttonService: BackbuttonService) {
		this.imageEndPoint = imageEndPoint;
		this.storage.get("OUTLET_ID").then((val) => {
			this.outletIds = val;
			this.outletId = val[0];
			
			this.storage.get("MALL_ID").then((val) => {
				this.mallId = val;
				this.storage.get("API_KEYS").then((val) => {
					this.stockManager.setAPIDetails(val);
					this.getStockMenus(this.mallId, this.outletId);
					this.getMallDetails(this.mallId);

					this.storage.get("OUTLET_OBJECT").then((val) => {
						this.outlets = val;
						this.outletSeleted = this.outlets[0].name;
						for(var i=0;i<this.outlets.length;i++){
							if(this.outlets[i].id=="All"){
								this.outlets.pop(this.outlets[i]);
								break; 
							}
						}
						this.selectedOutlet = val[0];
						this.setOutletId(val[0]);
						
					});
				
				});
			});
		});
		
	}
	getMallDetails(mallId) {
		var getMallDetailsUrl = "/mall/" + mallId;
		this.showLoader = true;
		this.oprovider.getMallDetails(getMallDetailsUrl).subscribe(resp => {
			this.getMallDetailsResp = resp;

			
            this.showLoader = !true;
			
		});
	}
	getsubMenu(submenu){

		this.navCtrl.push(SubMenuDetailsPage,{
			"submenu":	submenu,
			"outlet":this.outletId
			
		})
		
		
	}

	updateOutletDiscount(){
		// if ( this.outletValidate.startTime && this.outletValidate.endTime){
			
		// 	var startTime = moment(this.outletValidate.startTime);
		// 	var endTime = moment(this.outletValidate.endTime);
		
		// 	if(startTime.isAfter(endTime)){
		// 	  this.sendOutletValidateError = true;
		// 	  this.errorMessage = "From Date should not be greater than To Date";
		// 	}
		// 	else{
		// 	  this.sendOutletValidateError = false;
		// 	}
			  
		//   }
		//   else{
		// 	this.sendOutletValidateError = true;
		// 	if(!this.outletValidate.startTime && !this.outletValidate.endTime ){
		// 	  this.errorMessage = "Please provide valid Date Range.";
		// 	}
		// 	else if(!this.outletValidate.startTime ){
		// 	  this.errorMessage = "From Date should not be empty.";
		// 	}
		// 	else if(!this.outletValidate.endTime){
		// 	  this.errorMessage = "To Date should not be empty.";
		// 	}
		//   }
		// var input_field = this.outletDiscount.val();
		// console.log("input_field",input_field);
		// input_field.addEventListener('change', function() {
		// 	var v = parseFloat(this.value);
		// 	if (isNaN(v)) {
		// 		this.value = '';
		// 	} else {
		// 		this.value = v.toFixed(2);
		// 	}
		// });
		
		if (this.startTime && this.endTime) {
			
			// var startTime = moment(this.startTime);
			// var endTime = moment(this.endTime);
			// console.log("startTime endTime",startTime, endTime);
			if (this.startTime >= this.endTime) {
			
				this.outletValidate = true;
				this.showToast('bottom', 'From Date should not be greater than To Date');
				return false;
				
			}
			else if (this.outletDiscount > 0 && this.outletDiscount > 50) {
			
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

		this.stockManager.updateMallDetails(this.mallId,this.outletId,this.weeks,this.startTime,this.endTime,this.availability).subscribe(data=>{
			this.showLoader = true;
			this.stockManager.updateDiscountDetails(this.mallId,this.outletId,this.outletDiscount).subscribe(data=>{

				this.showLoader = !true;
				
			});
			this.showLoader = !true;
			
		})

		
	}
	decimalAllow(el: any){
		// console.log("decimalAllow pressed");
		// if(! (/^[0-9]{2}\.[0-9]{2}$/).test(el)) {
		// 	console.log("if");
		// }
		// else {
		// 	console.log("else");
		// }
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
	updateItem(item, outlet) {
		this.showLoader = true;
		this.stockManager.updateOutletStatus(this.outletId, item, this.mallId).subscribe(data => {
			this.UpdateStockData = data;
			this.showLoader = !true;
		});
	}
	getStockMenus(mallId, outletId) {
		var getStockMenusUrl = "/mall/" + mallId + "/outlet/" + outletId;
		this.showLoader = true;
		this.stockManager.getStockDataManager(getStockMenusUrl).subscribe(data => {
			this.StockData = data;
			this.originalStockData = [...this.StockData];
			
		});
		this.showLoader = !true;
	}
	visible = false;
	getStockSubMenusItems(stockSubMenu, outletId) {
		this.visible = !this.visible;
		stockSubMenu.showStockItemsList = !stockSubMenu.showStockItemsList;
		let orderUrl = "/mall/" + stockSubMenu.mallId + "/outlet/" + outletId + "/menu/" + stockSubMenu.id + "/submenu/" + stockSubMenu.id;
		this.showLoader = true;
		this.stockManager.getStockSubMenusManager(orderUrl).subscribe(resp => {
			stockSubMenu.getStockSubMenusItemsObject = resp;
			this.showLoader = !true;
		});
	}
	saveThisMenu(item) {
		this.showLoader = true;
		this.stockManager.updateItemData(this.outletId, item, this.mallId).subscribe(data => {
			this.showLoader = !true;
			this.presentAlert("Item Updated", "Success!");
			
		});
	}

	setOutletId(outlet) {
		this.showLoader = true;
		this.stockManager.getOutletDetails( outlet.mallId,outlet.id).subscribe(data => {

			this.showLoader = !true;
			this.outletId = data['id'];
			this.selectedOutlet = outlet;
			this.availability = data['availability']['available'];
			this.startTime = data['availability']['startHour'];
			this.endTime =  data['availability']['endHour'];
			this.weeks = data['availability']['weeks'];
			if(data['discount']){
				this.outletDiscount = data['discount']	;
			}
			else{
				this.outletDiscount = "0";
			}
			
			this.getStockMenus(this.mallId, this.outletId);
			console.log("this.mallId, this.outletId", this.mallId, this.outletId);
		});

		
		
		
		this.getStockMenus(this.mallId, this.outletId);
		
	}
	ionViewWillEnter() {
		// this.getStockMenus(this.mallId, this.outletId);
		// console.log("this.getStockMenus(this.mallId, this.outletId)",this.mallId, this.outletId);
    }

	presentAlert(title, message) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: message,
			buttons: ['Okay']
		});
		alert.present();
	}

	
	
	

}