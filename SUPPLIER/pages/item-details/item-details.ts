import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ToastController,AlertController} from 'ionic-angular';
import {StockmanagerProvider}from '../../provider/stockmanager/stockmanager';
import {SubMenuDetailsPage}from '../../pages/sub-menu-details/sub-menu-details';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {
  supplierId: any;
  preparationTime=20;
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
  img:any;
  nameUpperCase: any;
  getUpdateItem: any;
  itemDetailsname: any;
  itemDetailsSubMenuId: any;
  deleteItemResp: any;
  showLoader: boolean;
  outletValidate : boolean = true;
  outletStartTime : any;
  outletEndTime:any;
  itemOuteletAvailable:boolean = false;
  overRideAvailablity:boolean = false;
  open=true;
  close=false;
  closedOn:any;
  available:any;
  logicType:any;
  overrideAvlFlag:any;
  openEndTime:any;
	openStartTime:any;
	closeEndTime:any;
  closeStartTime:any;
  outletOpen:boolean;
	outletClose:boolean;
  logicTypeData={}
  itemLogicType="";
  itemDetailsCustomization: any;
  itemDetailsCustomizationData: any;
  itemDetailsName: any;
  custItemStatusData: any;
  custAvailability: any;
  times=[
		"00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30","08:00",
		"08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00",
		"16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30"
	]
  constructor(private storage:Storage,private toastCtrl: ToastController,public navCtrl: NavController, 
    private alertCtrl: AlertController,public navParams: NavParams, public viewCtrl: ViewController, private stockManager: StockmanagerProvider,) {
     this.itemDetails = this.navParams.get("item");
     this.outletId = this.navParams.get("outletId");
     this.itemDetailsId = this.itemDetails.id;
     this.itemDetailsSubMenuId = this.itemDetails.subMenuId;
     this.itemDetailsmallId = this.itemDetails.mallId;
     this.itemDetailsname = this.itemDetails.name;
     console.log("this.itemDetails",this.itemDetails);
     
     this.itemDetailsCustomization = this.itemDetails['itemCustomization'];
     
     console.log("this.itemDetailsCustomization",this.itemDetailsCustomization);
     this.itemDetailsCustomization.forEach(itemCustomizationData => {
        this.itemDetailsCustomizationData = itemCustomizationData.customization;
        console.log("this.itemDetailsCustomizationData", this.itemDetailsCustomizationData);
        this.itemDetailsCustomizationData.forEach(itemCustomizationName => {
          this.itemDetailsName = itemCustomizationName.price;
          console.log("this.itemDetailsName....", this.itemDetailsName);
       });
     });
   
    //  for(let i=0; i<this.itemDetailsCustomization.customization.length; i++)
    //  {
    //         console.log("this.itemDetailsCustomization.customization[i].name",this.itemDetailsCustomization.customization[i].name);
    //  }
     this.getItemDetails(this.itemDetailsId,this.itemDetailsmallId);
     this.storage.get("SUPPLIER_ID").then((val) => {
			this.supplierId = val;
		
		});
  }
  custItemStatus(CustItemName) {
    console.log("changed", CustItemName);
    
    console.log("this.custAvailability", this.custAvailability);
    this.custItemStatusData={
      "outletId": CustItemName.outletId, 
      "id": CustItemName.id, 
      "availability": "Yes",
      "price": CustItemName.price
      }
      console.log("this.custItemStatusData", this.custItemStatusData);
      this.stockManager.custItemStatusService(this.custItemStatusData).subscribe(data => {
          console.log("data", data);
      });
        
  }
  validateInputValue(value){
    if(value>50 || value < 0){
      let alert = this.alertCtrl.create({
        title: "Please enter between 0 to 50",
        buttons: ['Ok']
      });
      alert.present();
      this.itemDiscount=0;
    }
  }
  validatePreperationTime(value){
    if(value>90 || value < 0){
      let alert = this.alertCtrl.create({
        title: "Please enter between 0 to 90",
        buttons: ['Ok']
      });
      alert.present();
       this.preparationTime=20;
     }
  }
  checkClose(){
		this.open=false;
    this.close=true;
    this.itemLogicType="Close";
    let data={
      "closeStartHour": this.closeStartTime, 
					"closeEndHour": this.closeEndTime, 
				"closedOn": this.closedOn,
				"available": this.available, 
				"weeks": this.weeks,
				"logicType": this.itemLogicType,
				"overrideAvlFlag": this.overrideAvlFlag
    }
    this.logicTypeData = data;
  }
  updateAvaliabilityItem(availabilityValue){
   
  }

	checkOpen(){
		this.open=true;
    this.close=false;
    this.itemLogicType="Open"
    let data={
      "startHour": this.openStartTime, 
				"endHour": this.openEndTime, 
				"closedOn": this.closedOn,
				"available":this.available, 
				"weeks":this.weeks,
				"logicType": this.itemLogicType,
				"overrideAvlFlag":this.overrideAvlFlag
    }
    this.logicTypeData = data;
	}
  ionViewDidEnter(){
    this.storage.get("OUTLET_OBJECT").then((val) => {
     
      this.stockManager.getOutletDetails(val[0].mallId, val[0].id).subscribe(data => {
      
       var outletData = data;
      let startTime = outletData["availability"].startHour; 
      let endTime = outletData["availability"].endHour;  
     
      // startTime =parseInt(startTime.split(":")[0]+startTime.split(":")[1]);
      // endTime =parseInt(endTime.split(":")[0]+endTime.split(":")[1]);
      // this.outletStartTime = startTime;
      // this.outletEndTime = endTime;
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetailsPage');
  }
 
  getItemDetails(itemId, mallId) {
    let orderUrl = "/mall/" + mallId + "/item/" + itemId;
    this.showLoader = true;
		this.stockManager.getItemDetailsManager(orderUrl).subscribe(resp => {
      this.openStartTime = resp['availability']['startHour'];
      this.openEndTime = resp['availability']['endHour'];
      this.closedOn =  resp["availability"].closedOn;
      this.available= resp["availability"].available; 
				this.weeks= resp["availability"].weeks;
				this.logicType= resp["availability"].logicType;
        this.overrideAvlFlag =resp["availability"].overrideAvlFlag;
        this.closeStartTime = resp['availability']['closeStartHour'];
        this.closeEndTime = resp['availability']['closeEndHour'];
        this.itemLogicType=resp["availability"].logicType
      if(resp["availability"].logicType=="Open"){
        this.open=true;
        this.close=false;
        this.outletOpen = true;
				this.outletClose = false;
        this.openStartTime = resp['availability']['startHour'];
      this.openEndTime = resp['availability']['endHour'];
     
      this.logicTypeData={
        
				"startHour": this.openStartTime, 
				"endHour": this.openEndTime, 
				"closedOn": resp["availability"].closedOn,
				"available": resp["availability"].available, 
				"weeks": resp["availability"].weeks,
				"logicType": resp["availability"].logicType,
				"overrideAvlFlag": resp["availability"].overrideAvlFlag
				}

			}else{
        this.open=false;
        this.close=true;
        this.outletOpen = false;
				this.outletClose = true;
        this.closeStartTime = resp['availability']['closeStartHour'];
        this.closeEndTime = resp['availability']['closeEndHour'];
        this.logicTypeData={
					"closeStartHour": this.closeStartTime, 
					"closeEndHour": this.closeEndTime, 
					"closedOn": resp["availability"].closedOn,
					"available": resp["availability"].available, 
					"weeks": resp["availability"].weeks, 
					"logicType": resp["availability"].logicType,
					"overrideAvlFlag": resp["availability"].overrideAvlFlag
					}
      }
			
      
      this.weeks = resp['availability']['weeks'];
      // this.startTime = resp['availability']['startHour'];
      // this.endTime = resp['availability']['endHour'];
      this.availability = resp['availability']['available'];
      this.itemOuteletAvailable = this.availability;
      this.availabilityVeg = resp['veg'];
      this.price = resp['priceBeforeGST'];
      this.img = resp['img'];
      this.preparationTime= resp['preparationTime'];
      this.description = resp['description'];
      this.itemDiscount = resp['supplierDiscount'];
      // if(this.itemDetails.discount){
      //   this.itemDiscount = resp['supplierDiscount'];
      // }
      // else{
      // this.itemDiscount ="0";
      // }
      this.showLoader = false;
		});
  }

  getOutletStartTime(){
   
    var startTime =parseInt(this.startTime.split(":")[0]+this.startTime.split(":")[1]); 
    if(this.outletStartTime<=startTime){
    }else{
      this.showToast('bottom', 'Item start time should not before outlet start time.');
			return false;
    }
  }
  getOutletEndTime(){
    
    var endTime =parseInt(this.endTime.split(":")[0]+this.endTime.split(":")[1]);
    if(this.outletEndTime>=endTime){
    }else{
      this.showToast('bottom', 'Item end time should not exceed outlet end time.');
			return false;
    }
  } 
  updateItem() {
    if(this.itemLogicType=="Open"){
    this.logicTypeData={
      
      "startHour": this.openStartTime, 
      "endHour": this.openEndTime, 
      "closedOn": this.closedOn,
      "available":this.available, 
      "weeks": this.weeks,
      "logicType": this.itemLogicType,
      "overrideAvlFlag": this.overrideAvlFlag,
      "modifiedBy": this.supplierId
      }

    }else{
     
      this.logicTypeData={
        "closeStartHour": this.closeStartTime, 
        "closeEndHour": this.closeEndTime, 
        "closedOn": this.closedOn,
        "available": this.available, 
        "weeks": this.weeks, 
        "logicType": this.itemLogicType,
        "overrideAvlFlag": this.overrideAvlFlag,
        "modifiedBy": this.supplierId
        }
    }
    if(this.itemOuteletAvailable != this.availability){
      this.overRideAvailablity = true;
    }
    this.logicTypeData['available']=this.availability;
    this.logicTypeData['overrideAvlFlag']=this.overRideAvailablity;
    this.stockManager.checkItemAvailability(this.itemDetailsmallId, this.outletId,  this.itemDetailsId, this.itemDetailsSubMenuId, this.logicTypeData ).subscribe(data => {
      if(!data["returnVal"]){
        this.availability= true;
        if(data["reason"] =='Invalid Time'){
					this.showToast('bottom', 'Please check your item timings');
				}else{
					this.showToast('bottom', 'Please check your item  selected weeks');
				}
      }else{
        var updateItemName = this.itemDetailsname;
    // var startTime =parseInt(this.startTime.split(":")[0]+this.startTime.split(":")[1]); 
    // console.log(this.outletStartTime);
    // console.log(startTime);
    // if(this.outletStartTime<=startTime){
    // }else{
    //   this.showToast('bottom', 'Item start time should not before outlet start time.');
		// 	return false;
    // }
    // var endTime =parseInt(this.endTime.split(":")[0]+this.endTime.split(":")[1]);
    // if(this.outletEndTime>=endTime){
      
    // }else{
    //   this.showToast('bottom', 'Item end time should not exceed outlet end time.');
		// 	return false;
    // }
    // console.log("updateItemName",updateItemName);
    // if (this.startTime && this.endTime) {
			
		// 	// var startTime = moment(this.startTime);
		// 	// var endTime = moment(this.endTime);
		// 	// console.log("startTime endTime",startTime, endTime);
		// 	if (this.startTime >= this.endTime) {
			
		// 		this.outletValidate = true;
		// 		this.showToast('bottom', 'From Date should not be greater than To Date');
		// 		return false;
				
		// 	}
		// 	else if (this.itemDiscount > 0 && this.itemDiscount > 50) {
			
		// 		this.outletValidate = true;
		// 		this.showToast('bottom', 'Discount should not greather than 0 and greather than 50');
		// 		return false;
		// 	}
		// 	else if (this.weeks.length === 0) {
		// 		console.log("this.weeks.length",this.weeks.length);
		// 		this.outletValidate = true;
		// 		this.showToast('bottom', 'Please select atleast one day');
		// 		return false;
		// 	}
		// 	else {

		// 	}
		// }
		// else {
			
			
    // }
    if(this.itemOuteletAvailable == this.availability){
      this.overRideAvailablity = false;
    }else{
      this.overRideAvailablity = true;
    }
    this.logicTypeData['available']=this.availability;
    this.logicTypeData['overrideAvlFlag']=this.overRideAvailablity;
    this.showLoader = true;

    this.stockManager.getUpdateItem(this.startTime,this.weeks,this.endTime,this.availability,this.outletId,this.itemDetailsmallId, this.itemDetailsId, this.itemDetailsSubMenuId, this.itemDiscount,this.price, this.availabilityVeg, this.itemDetailsname,this.description,this.nameUpperCase,this.preparationTime,this.img,this.overRideAvailablity,this.logicTypeData, this.supplierId).subscribe(resp => {
        this.getUpdateItem = resp;
        this.updateToast('bottom', 'Item Updated Successfully...');
        this.viewCtrl.dismiss();
       
        this.showLoader = false;
    });
      }
    });
    
  }
  updateToast(position: string, message) {
    let toast = this.toastCtrl.create({
        message: this.itemDetailsname + '  Updated Successfully',
        duration: 2500,
        position: position,
        cssClass: 'toast-style'
    });
    toast.present(toast);
}
  showToast(position: string, message) {
    let toast = this.toastCtrl.create({
        message: message,
        duration: 7000,
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
