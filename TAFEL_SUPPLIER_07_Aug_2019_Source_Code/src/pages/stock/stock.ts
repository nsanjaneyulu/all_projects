import {
	Component,
}
	from '@angular/core';
import {
	NavController,
	App, NavParams,
	LoadingController,
	AlertController,
	ToastController,
	ViewController,
	Platform
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
	from '../../common/endPointService';
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
import { OrdersPage } from '../orders/orders';
import * as moment from 'moment';
import {
	UserDataProvider
}
	from '../../provider/login/login';
import {
	UniqueDeviceID
}
	from '@ionic-native/unique-device-id';
import {env} from '../../common/properties';
@Component({
	selector: 'page-stock',
	templateUrl: 'stock.html'
})
export class StockPage {
	OTP: String = "";
	supplierProfile: any;
	supplierId: any;
	code: any = "";
	deviceId: string;
	platform: any;
	phoneNumber: string;
	stockMessage: boolean = false;
	stockShow: boolean = false;
	outlets: any = [];
	outletIds: string[];
	outletOpen:boolean;
	outletClose:boolean;
	selectedOutlet: any;
	selectedOutletForSegment: string;
	getMallDetailsResp: any = { address: { area: "", city: "", } };
	StockData: any = [];
	UpdateStockData: any = {};
	imageEndPoint: string;
	outletId: string;
	mallId: string;
	ssId: string;
	open=true;
	close=false;
	outletDatalogic={};
	outletLogicType="";
	originalStockData: any[] = [];
	outletSeleted: string;
	availability = true;
	startTime: any;
	endTime: any;
	outletDiscount: any;
	weeks: any[];
	showLoader: boolean;
	autheCount = 0;
	mallStartTime="";
	mallEndTime="";
	logicTypeData={}
	outletValidate: boolean = true;
	errorMessage: String = "Please provide valid Date Range.";
	sendOutletValidateError: boolean = false;
	brightness: number = 20;
	contrast: number = 0;
	warmth: number = 1300;
	structure: any = { lower: 33, upper: 60 };
	text: number = 0;
	overRideAvailablity: boolean = false;
	getCurrentSeconds: any;
	openEndTime:any;
	openStartTime:any;
	closeEndTime:any;
	closeStartTime:any;
	allpermited:any;
	getOutletDetailsVal: any = {name:""} ;
	times=[
		"00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30","08:00",
		"08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00",
		"16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30"
	];
	outletAvailable:boolean = false;
	constructor(private uniqueDeviceID: UniqueDeviceID, private user: UserDataProvider, public plt: Platform, private viewCtrl: ViewController, private oprovider: OrdersProvider, public navCtrl: NavController,
		private stockManager: StockmanagerProvider, private storage: Storage,
		private loadingCtrl: LoadingController, private navParams: NavParams, private toastCtrl: ToastController, private alertCtrl: AlertController, private appCtrl: App, private backbuttonService: BackbuttonService) {
		this.imageEndPoint = imageEndPoint;
		//this.getCurrentSeconds = new Date().getTime();
		var newDate = new Date();
		newDate.setHours(0, 0, 0, 0);
		this.getOutletDetailsVal.name ="";

		this.storage.set("STOCK_OTP", new Date().getTime() - 3610000);
	
		this.storage.get("SUPPLIER_ID").then((val) => {
			this.supplierId = val;
		
		});
		this.storage.get("ALL_PERMITABLE").then((val) => {
			this.allpermited = val;
		
			// this.outletIds = val;
			// this.outletId = this.outletIds[0];
			// this.orders = 'pending';

	});
		this.storage.get("OUTLET_ID").then((val) => {
			this.outletIds = val;
			this.outletId = val[0];

			this.storage.get("MALL_ID").then((val) => {
				this.mallId = val;
				this.storage.get("API_KEYS").then((val) => {
					this.stockManager.setAPIDetails(val);
					this.getMallDetails(this.mallId);
					this.getStockMenus(this.mallId, this.outletId);
					// this.getMallDetails(this.mallId);
					this.getOutletDetails(this.mallId,this.outletId);

					this.storage.get("OUTLET_OBJECT").then((val) => {
					
						this.outlets = val;
						this.outletSeleted = this.outlets[0].name;
						for (var i = 0; i < this.outlets.length; i++) {
							if (this.outlets[i].id == "All") {
								this.outlets.pop(this.outlets[i]);
								break;
							}
						}
						this.selectedOutlet = val[0];
						this.setOutletId(val[0]);

					});
					// this.getPlatform();
					// this.createOTP();

				});
			});
		});

	}
	getOutletDetails(mallId,outletId){
        var getMallDetailsUrl = "/mall/" + mallId+ "/outlet/"+outletId;
        this.oprovider.getOutletDetails(getMallDetailsUrl).subscribe(resp => {
            this.getOutletDetailsVal = resp;


        });
    }
	checkClose(){
		this.open=false;
		this.close=true;
		this.outletLogicType='Close';
		let data={
			"closeStartHour": this.openStartTime, 
			"closeEndHour": this.openEndTime, 
				"closedOn": this.outletDatalogic['availability'].closedOn,
				"available": this.outletDatalogic['availability'].available, 
				"weeks": this.weeks,
				"logicType": this.outletLogicType,
				"overrideAvlFlag": this.outletDatalogic['availability'].overrideAvlFlag
		}
		this.logicTypeData = data;
		
	}
	checkOpen(){
		this.open=true;
		this.close=false;
		this.outletLogicType="Open"
		let data={
					"startHour": this.closeStartTime, 
					"endHour": this.closeEndTime, 
					"closedOn":this.outletDatalogic['availability'].closedOn,
					"available": this.outletDatalogic['availability'].available, 
					"weeks": this.weeks, 
					"logicType": this.outletLogicType,
					"overrideAvlFlag": this.outletDatalogic['availability'].overrideAvlFlag
		}
		this.logicTypeData = data;
	}
	getSupplierProfile(supplierId) {

		this.stockManager.getSupplierProfile(supplierId).subscribe(data => {
			this.supplierProfile = data;
			this.phoneNumber = this.supplierProfile.phoneNumber;
		
			var half_an_hour = 60 * 60 * 1000;
			this.storage.get("STOCK_OTP").then((resp) => {
				if (resp) {
					var half_hour = resp + half_an_hour;
					var getCurrentSeconds = new Date().getTime();
					//if ((getCurrentSeconds - resp) > 3600000) {
						var respTime = (env=="PROD"?900000:900000*2);
						if ((getCurrentSeconds - resp) > respTime) {
						this.createOTP();
					}
				}
			});


		});
	}
	getUniqueDeviceId() {
		this.uniqueDeviceID.get().then((uuid: any) => {
			this.deviceId = uuid;
			return uuid;
		}).catch((error: any) => {
			this.deviceId = "1111-2222-5555";
			return this.deviceId;
		});
	}
	getPlatform() {
		if (this.plt.is('ios')) {
			this.platform = 'ios';
		} else if (this.plt.is('android')) {
			this.platform = 'android';
		} else {
			this.platform = 'browser';
		}
	}
	createOTP() {
		
		var phoneNumber = this.phoneNumber;
		if (phoneNumber !== null && phoneNumber !== "" && phoneNumber.length == 13) {



			this.user.createOTP(this.platform, phoneNumber, this.deviceId);


		} else {
			// this.showAlert('Error', 'Please Enter a valid phone number.');
		}
	}
	validateOTP(otp, getCurrentSeconds) {
	

		this.user.checkOTP(otp, this.platform, this.phoneNumber, this.deviceId).subscribe(res => {
			let supplierOtpResponse = res;
		
			if (supplierOtpResponse['status'] == "Failure") {
			
				this.stockShow = false;
				this.stockMessage = true;

			}
			else {
				this.stockShow = true;
				this.stockMessage = false;
			
				this.storage.set("STOCK_OTP", getCurrentSeconds);

			}
		
		});

	}
	getMallDetails(mallId) {
		var getMallDetailsUrl = "/mall/" + mallId;
		this.showLoader = true;
		this.oprovider.getMallDetails(getMallDetailsUrl).subscribe(resp => {
			this.getMallDetailsResp = resp;
			
			this.mallStartTime=this.getMallDetailsResp.availability.startHour;
			this.mallEndTime=this.getMallDetailsResp.availability.endHour




		});
	}
	getsubMenu(submenu) {

		this.navCtrl.push(SubMenuDetailsPage, {
			"submenu": submenu,
			"outlet": this.outletId

		})


	}
	getOutletStartTime(){
		var mallStartTime =parseInt(this.mallStartTime.split(":")[0]+this.mallStartTime.split(":")[1]); 
		var outletStartTime =parseInt(this.startTime.split(":")[0]+this.startTime.split(":")[1]);
		if(mallStartTime > outletStartTime){
			this.showToast('bottom', 'Outlet start time should not before Mall start time.');
				return false;
		}
	  }
	  getOutletEndTime(){
		var mallEndTime =parseInt(this.mallEndTime.split(":")[0]+this.mallEndTime.split(":")[1]);
		var outletEndTime =parseInt(this.endTime.split(":")[0]+this.endTime.split(":")[1]);
		if(outletEndTime > mallEndTime){
			return false;
		}
	  } 

	updateOutletDiscount() { 
		
		if(this.outletLogicType=='Open'){
			this.startTime=this.openStartTime;
			this.endTime = this.openEndTime 
			this.logicTypeData={
			"startHour": this.openStartTime, 
			"endHour": this.openEndTime, 
			"closedOn": this.outletDatalogic['availability'].closedOn,
			"available": this.outletDatalogic['availability'].available, 
			"weeks": this.weeks,
			"logicType": this.outletLogicType,
			"overrideAvlFlag": this.outletDatalogic['availability'].overrideAvlFlag,
			"modifiedBy": this.supplierId
			}
			console.log("this.logicTypeData", this.logicTypeData);
		}else{
			this.startTime=this.closeStartTime;
			this.endTime = this.closeEndTime;
			this.logicTypeData={ 
				"closeStartHour": this.closeStartTime, 
				"closeEndHour": this.closeEndTime, 
				"closedOn": this.outletDatalogic['availability'].closedOn,
				"available": this.outletDatalogic['availability'].available, 
				"weeks": this.weeks, 
				"logicType": this.outletLogicType,
				"overrideAvlFlag": this.outletDatalogic['availability'].overrideAvlFlag,
				"modifiedBy": this.supplierId
				}	
				console.log("this.logicTypeData", this.logicTypeData);
		}
		if(this.outletAvailable != this.availability){
			this.overRideAvailablity = true;
			console.log("this.overRideAvailablityif update", this.overRideAvailablity);
    }else{
      
    }
    this.logicTypeData['available']=this.availability;
		this.logicTypeData['overrideAvlFlag']=this.overRideAvailablity;
		console.log("this.logicTypeData['overrideAvlFlag'] check", this.logicTypeData['overrideAvlFlag']);
		
		this.stockManager.checkOutletAvailability(this.mallId, this.outletId, this.logicTypeData ).subscribe(data => {
			console.log("data checkOutletAvailability", data);
			if(!data["returnVal"]){
				if(data["reason"] =='Invalid Time'){
					this.showToast('bottom', 'Please check your Outlet Timeings');
				}else if(data["reason"] =='StartEndNull') {
					this.showToast('bottom', 'Please check your Start End Timings');
				}
				else if(data["reason"] =='CloseStartEndNull') {
				this.showToast('bottom', 'Please check your Close Start End Timings');
				}
				else {
				this.showToast('bottom', 'Please check your SubMenu selected weeks');
				}
				this.availability= true;
			}else{	
		this.storage.get("OUTLET_OBJECT").then((val) => {
			
			this.stockManager.getOutletDetails(val[0].mallId, val[0].id).subscribe(data => {
				console.log("data getOutletDetails", data);
		
				
				var outletData = data;
			
			
				if(this.outletLogicType=='Open'){
					this.startTime=this.openStartTime;
					this.endTime = this.openEndTime 
					this.logicTypeData={
					"startHour": this.openStartTime, 
					"endHour": this.openEndTime, 					
					"available": this.outletDatalogic['availability'].available, 
					"weeks": this.weeks,
					"logicType": this.outletLogicType,
					"overrideAvlFlag": this.outletDatalogic['availability'].overrideAvlFlag,
					"closedOn": this.outletDatalogic['availability'].closedOn
					}
		
				}else{
					this.startTime=this.closeStartTime;
					this.endTime = this.closeEndTime;
					this.logicTypeData={ 
						"closeStartHour": this.closeStartTime, 
						"closeEndHour": this.closeEndTime, 						
						"available": this.outletDatalogic['availability'].available, 
						"weeks": this.weeks, 
						"logicType": this.outletLogicType,
						"overrideAvlFlag": this.outletDatalogic['availability'].overrideAvlFlag,
						"closedOn": this.outletDatalogic['availability'].closedOn
						}	
				}
				if(outletData["availability"].available != this.availability){
					this.overRideAvailablity = true;
					console.log("this.overRideAvailablity if", this.overRideAvailablity);
				}
				this.logicTypeData['available']=this.availability;
				this.logicTypeData['overrideAvlFlag']=this.overRideAvailablity;
				console.log("this.logicTypeData['overrideAvlFlag'] update", this.logicTypeData['overrideAvlFlag']);
				this.stockManager.updateMallDetails(this.mallId, this.outletId, this.outletDiscount,this.logicTypeData).subscribe(data => {
				console.log("data updateMallDetails", data);	
				this.showToast('bottom', 'Outlet Details Updated Successfully');
					
					

				});
				
			});
		
		});
			
			}
			
		});
	
		// if ( this.outletValidate.startTime && this.outletValidate.endTime){

		// 	var startTime = moment(this.outletValidate.startTime);}
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
		



	}
	decimalAllow(el: any) {
		// console.log("decimalAllow pressed");
		// if(! (/^[0-9]{2}\.[0-9]{2}$/).test(el)) {
		// 	console.log("if");
		// }
		// else {
		// 	console.log("else");
		// }
	}
	validateInputValue(value) {
		if (value > 50 || value < 0) {
			let alert = this.alertCtrl.create({
				title: "Please enter between 0 to 50",
				buttons: ['Ok']
			});
			alert.present();
			this.outletDiscount = 0;
		}
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
		
			// this.closeEndTime=this.StockData[0].availability.closeEndHour;
			// this.closeStartTime= this.StockData[0].availability.closeStartHour;
			// this.openEndTime=this.StockData[0].availability.endHour;
			// this.openStartTime= this.StockData[0].availability.startHour;
			// this.outletLogicType= this.StockData[0].availability.logicType
			// if(this.StockData[0].availability.logicType=='Open'){
			// 	this.outletOpen = true;
			// 	this.outletClose = false;
			// 	this.openEndTime=this.StockData[0].availability.endHour;
			// 	this.openStartTime= this.StockData[0].availability.startHour;
			// 	this.open = true;
			// 	this.close= false;

			// }else{
			// 	this.outletOpen = false;
			// 	this.outletClose = true;
			// 	this.closeEndTime=this.StockData[0].availability.closeEndHour;
			// 	this.closeStartTime= this.StockData[0].availability.closeStartHour;
			// 	this.open = false;
			// 	this.close= true;	
			// }
			this.originalStockData = [...this.StockData];
			this.showLoader = !true;
		});
		
	}
	visible = false;
	getStockSubMenusItems(stockSubMenu, outletId) {
		this.visible = !this.visible;
		stockSubMenu.showStockItemsList = !stockSubMenu.showStockItemsList;
		// let orderUrl = "/mall/" + stockSubMenu.mallId + "/outlet/" + outletId + "/menu/" + stockSubMenu.id + "/submenu/" + stockSubMenu.id;
		 let orderUrl = "/mall/" + stockSubMenu.mallId + "/submenu/" + stockSubMenu.id+'/getItem';

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
		this.stockManager.getOutletDetails(outlet.mallId, outlet.id).subscribe(data => {
			console.log("setOutletId............",data);
			this.outletDatalogic=data;
			
			this.outletId = data['id'];
			this.selectedOutlet = outlet;
			this.availability = data['availability']['available'];
			this.startTime = data['availability']['startHour'];
			this.endTime = data['availability']['endHour'];
			this.weeks = data['availability']['weeks'];
			if (data['discount']) {
				this.outletDiscount = data['discount'];
			}
			else {
				this.outletDiscount = "0";
			}
			this.closeEndTime=data['availability'].closeEndHour;
			this.closeStartTime=data['availability'].closeStartHour;
			this.openEndTime=data['availability'].endHour;
			this.openStartTime= data['availability'].startHour;
			this.outletLogicType= data['availability'].logicType;
			console.log("this.outletLogicType.......",this.outletLogicType);
			if(data['availability'].logicType=='Open'){
				this.outletOpen = true;
				this.outletClose = false;
				this.openEndTime=data['availability'].endHour;
				this.openStartTime= data['availability'].startHour;
				this.open = true;
				this.close= false;
				console.log("this.outletLogicType if.......",this.outletLogicType);
			}else{
				this.outletOpen = false;
				this.outletClose = true;
				this.closeEndTime=data['availability'].closeEndHour;
				this.closeStartTime= data['availability'].closeStartHour;
				this.open = false;
				this.close= true;	
				console.log("this.outletLogicType else.......",this.outletLogicType);
			}

			this.getStockMenus(this.mallId, this.outletId);
			this.showLoader = !true;
		});




		this.getStockMenus(this.mallId, this.outletId);

	}
	// ionViewDidEnter(){

	// 	if(this.navParams.data==0){
	// 		this.stockShow = false;
	// 		this.stockMessage = false;
	// 	}else{
	// 		this.stockShow = false;
	// 		//this.stockMessage = true;
	// 	}
	// 	// console.log("test stock");
	// 	// this.stockShow = true;
	// 	// this.stockMessage = true;
	// 	// if(this.navParams.data==0){
	// 	// 	this.stockShow = false;
	// 	// 	this.stockMessage = false;
	// 	// }else{
	// 	// 	this.stockShow = true;
	// 	// 	this.stockMessage = true;
	// 	// }

	//  }
	ionViewWillEnter() {
	
		this.storage.get("OUTLET_ID").then((val) => {
			this.outletIds = val;
			this.outletId = val[0];

			this.storage.get("MALL_ID").then((val) => {
				this.mallId = val;
				this.storage.get("API_KEYS").then((val) => {
					this.stockManager.setAPIDetails(val);
					this.getMallDetails(this.mallId);
					this.getStockMenus(this.mallId, this.outletId);
					// this.getMallDetails(this.mallId);
					this.getOutletDetails(this.mallId,this.outletId);

					this.storage.get("OUTLET_OBJECT").then((val) => {
					
						this.outlets = val;
						this.outletSeleted = this.outlets[0].name;
						for (var i = 0; i < this.outlets.length; i++) {
							if (this.outlets[i].id == "All") {
								this.outlets.pop(this.outlets[i]);
								break;
							}
						}
						this.selectedOutlet = val[0];
						this.setOutletId(val[0]);

					});
					// this.getPlatform();
					// this.createOTP();

				});
			});
		});
		
		this.storage.get("SUPPLIER_ID").then((val) => {
			this.supplierId = val;
			
			this.getSupplierProfile(this.supplierId);

		});
		var half_an_hour = 60 * 60 * 1000;
		this.storage.get("STOCK_OTP").then((resp) => {
			if (resp) {
				var half_hour = resp + half_an_hour;
				var getCurrentSeconds = new Date().getTime();
				//if ((getCurrentSeconds - resp) > 3600000) {
				var respTime = (env=="PROD"?900000:900000*2);
				if ((getCurrentSeconds - resp) > respTime) {

					//this.createOTP();
					var prompt = this.alertCtrl.create({
						title: 'OTP',
						message: "Please Provide Valid OTP...",
						enableBackdropDismiss: false,
						inputs: [
							{
								name: 'otp',
								placeholder: '****',
								type: "password",
							},
						],
						buttons: [
							{
								text: 'Cancel',
								//  role: 'cancel',
								handler: data => {

								
									this.stockShow = false;
									this.stockMessage = true;

									// this.viewCtrl.dismiss();
									// this.appCtrl.getRootNav().push(OrdersPage);


									//  this.navCtrl.push('OrdersPage');


								}
							},
							{
								text: 'Submit',
								handler: data => {
								
									if (data['otp'] != null && data['otp'].length == 6) {
										this.OTP = data['otp'];
										this.validateOTP(data.otp, getCurrentSeconds),
											console.log(data.otp);
										// if(data['otp'] === '5555'){
										// 	this.stockShow = true;
										// 	this.stockMessage = false;
										// 	this.storage.set("STOCK_OTP", getCurrentSeconds);
										// 	return true;
										// }

										

									} else {
										prompt.setMessage("Please enter valid OTP");
										return false;
									}



								}


							}
						]
					});
					prompt.present();
					//this.navParams.data =1;
					//this.storage.set("STOCK_OTP", getCurrentSeconds);
				
				} else {
					this.stockShow = true;
					this.stockMessage = false;
				
					
				}
			} else {
				this.storage.set("STOCK_OTP", new Date().getTime());
			}



		})
		this.navParams.data = 0;
		// if(this.navParams.data==0){
		// 	var prompt = this.alertCtrl.create({
		// 		title: 'OTP',
		// 		message: "Please Provide Valid OTP...",
		// 		enableBackdropDismiss: false,
		// 		inputs: [
		// 			{
		// 			name: 'otp',
		// 			placeholder: '****',
		// 			type: "password",
		// 			},
		// 		],
		// 		buttons: [
		// 			{
		// 			text: 'Cancel',
		// 		 //  role: 'cancel',
		// 			handler: data => {

		// 				console.log('Cancel clicked');
		// 				this.stockShow = false;
		// 				this.stockMessage = true;

		// 		 // this.viewCtrl.dismiss();
		// 		 // this.appCtrl.getRootNav().push(OrdersPage);


		// 			 //  this.navCtrl.push('OrdersPage');


		// 			}
		// 			},
		// 			{
		// 			text: 'Submit',
		// 			handler: data => {
		// 				if (data['otp'] != null && data['otp'].length == 6) {
		// 					this.OTP = data['otp'];
		// 					this.validateOTP(data.otp),
		// 					console.log(data.otp);
		// 					return true;

		// 				} else {
		// 					prompt.setMessage("Please enter valid OTP");
		// 					return false;
		// 				}



		// 			}


		// 			}
		// 		]
		// 		});
		// 		prompt.present();
		// 		this.navParams.data =1;
		// }else{
		// 	this.stockShow = false;
		// 	this.stockMessage = true;

		// }


		// this.getStockMenus(this.mallId, this.outletId);
		// console.log("this.getStockMenus(this.mallId, this.outletId)",this.mallId, this.outletId);
	}
	// ionViewDidEnter() {
	// 	this.stockShow = false;
	// 	this.stockMessage = false;
	// 	console.log("ionViewDidEnter", this.navParams.data = 0);
	// }
	ionViewDidLeave() {
		this.stockShow = false;
		this.stockMessage = false;
	

	}
	presentAlert(title, message) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: message,
			buttons: ['Okay']
		});
		alert.present();
	}

	logoutSupplier() {
		let deviceRegistrationId = "";
		this.storage.get("DEVICE_REG_ID").then((val) => {
			deviceRegistrationId = val;
			this.storage.clear().then(val => {
				this.setOnlyDeviceRegistrationId(deviceRegistrationId);
				this.appCtrl.getRootNav().setRoot(LoginPage);
				this.backbuttonService.popAllPages();
			});
		})
	}

	setOnlyDeviceRegistrationId(deviceRegistrationId) {
		this.storage.set("DEVICE_REG_ID", deviceRegistrationId);
	}





}