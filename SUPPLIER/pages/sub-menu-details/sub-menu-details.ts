import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ModalController, ViewController, ToastController } from 'ionic-angular';
import {StockmanagerProvider}from '../../provider/stockmanager/stockmanager';
import { ItemDetailsPage } from '../../pages/item-details/item-details';
import { AddItemPage } from '../../pages/add-item/add-item';

@IonicPage()
@Component({
  selector: 'page-sub-menu-details',
  templateUrl: 'sub-menu-details.html',
})
export class SubMenuDetailsPage {
  submenu :any ;
  // outletDiscount=0;
  startTime:any; 
  endTime:any;
  weeks:any[];
 // inventoryId="";
  outletId="";
  preparationTime=20;
  stockSubMenuId:string;
  stockMenuId:string;
  items:any =[];
  outletName:string;
  submenuName: string;
  subMenuDiscount:String;
  availability = true;
  mallId:string;
  outletDiscount:any;
  submenuData= {}
  submenuId:any;
  isPageActive: boolean = false;
  showLoader: boolean;
  outletOpen:boolean;
  outletClose:boolean;
  openEndTime:any;
	openStartTime:any;
	closeEndTime:any;
  closeStartTime:any;
  itemDiscount=0;
  subMenuLogicType="";
  open=true;
  close=false;
  submenuDiscount:any;
  submenuAvailable:boolean = false;
  overRideAvailablity:boolean = false;
  logicTypeData={}
  times=[
		"00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30","08:00",
		"08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00",
		"16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30"
	]
  // stockSubMenuStr:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private stockManager: StockmanagerProvider,private alertCtrl: AlertController,
              public modalCtrl: ModalController, public viewCtrl: ViewController,
              private toastCtrl: ToastController,) {

    this.submenu = this.navParams.get("submenu");
    console.log(this.navParams);
    console.log('sdfa,hasfjasfdhgasdfghjasfhsafdjhasd')
    this.submenuName = this.submenu.name;
    this.submenuId = this.submenu.id;
    this.mallId = this.submenu.mallId;

    this.getSubMenuDetails(this.mallId, this.submenuId)


    
   
    

  
    
    this.outletId = this.navParams.get("outlet");
    this.outletName = this.navParams.get("outletName");

 
    this.getStockSubMenusItems(this.submenu,this.outletId);

 
     
  }
  validateInputValue(value){
    if(value>50 || value < 0){
      let alert = this.alertCtrl.create({
        title: "Please enter between 0 to 50",
        buttons: ['Ok']
      });
      alert.present();
      this.submenuDiscount=0;
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
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad SubMenuDetailsPage');
  }
  ionViewWillEnter() {
		// this.getStockSubMenusItems(this.submenu,this.outletId);
    // console.log("this.getStockSubMenusItems(this.submenu,this.outletId)",this.submenu,this.outletId);
    console.log("this.getStockSubMenusItems load");
    // this.viewCtrl.dismiss();
    }
    checkClose(){
      this.open=false;
      this.close=true;
      this.subMenuLogicType='Close';
      let data={
        "closeStartHour": this.openStartTime, 
        "closeEndHour": this.openEndTime, 
          "closedOn": this.submenuData['availability'].closedOn,
          "available": this.submenuData['availability'].available, 
          "weeks": this.weeks,
          "logicType": this.subMenuLogicType,
          "overrideAvlFlag": this.submenuData['availability'].overrideAvlFlag
      }
      this.logicTypeData = data;
      
    }
    checkOpen(){
      this.open=true;
      this.close=false;
      this.subMenuLogicType="Open"
      let data={
            "startHour": this.closeStartTime, 
            "endHour": this.closeEndTime, 
            "closedOn":this.submenuData['availability'].closedOn,
            "available": this.submenuData['availability'].available, 
            "weeks": this.weeks, 
            "logicType": this.subMenuLogicType,
            "overrideAvlFlag": this.submenuData['availability'].overrideAvlFlag
      }
      this.logicTypeData = data;
    }

    ionViewWillLeave(){
      //this.navParams.get("navcount");
      this.navParams.data=1;
      console.log(this.navParams.data)
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
  updateSubMenuDetails(){
    if(this.subMenuLogicType=='Open'){
			this.startTime=this.openStartTime;
			this.endTime = this.openEndTime 
			this.logicTypeData={
			"startHour": this.openStartTime, 
			"endHour": this.openEndTime, 
			"closedOn": this.submenuData['availability'].closedOn,
			"available": this.submenuData['availability'].available, 
			"weeks": this.weeks,
			"logicType": this.subMenuLogicType,
			"overrideAvlFlag": this.submenuData['availability'].overrideAvlFlag
			// "modifiedBy": this.supplierId
			}

		}else{
			this.startTime=this.closeStartTime;
			this.endTime = this.closeEndTime;
			this.logicTypeData={ 
				"closeStartHour": this.closeStartTime, 
				"closeEndHour": this.closeEndTime, 
				"closedOn": this.submenuData['availability'].closedOn,
				"available": this.submenuData['availability'].available, 
				"weeks": this.weeks, 
				"logicType": this.subMenuLogicType,
				"overrideAvlFlag": this.submenuData['availability'].overrideAvlFlag,
				// "modifiedBy": this.submenuData
				}	
    }
    if(this.submenuAvailable != this.availability){
      this.overRideAvailablity = true;
    }
    this.logicTypeData['available']=this.availability;
    this.logicTypeData['overrideAvlFlag']=this.overRideAvailablity;
    this.submenuData['availability']=	this.logicTypeData;
    this.submenuData['weeks']=this.weeks;
    this.submenuData['discount']=this.submenuDiscount;
    this.submenuData['preparationTime']=this.preparationTime;

    this.showLoader = true;
    console.log("this.logicTypeData checkSubmenuAvailability before", this.logicTypeData);
    this.stockManager.checkSubmenuAvailability(this.submenuData['mallId'],this.outletId,this.submenuData['id'],this.logicTypeData).subscribe(data=>{
      console.log("this.logicTypeData checkSubmenuAvailability after", this.logicTypeData);
      this.showLoader = false;
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
          this.showLoader = true;
          console.log("this.logicTypeData updateSubMenuDetails_new before", this.logicTypeData);
          this.stockManager.updateSubMenuDetails_new(this.submenuData).subscribe(data=>{
            console.log("this.logicTypeData updateSubMenuDetails_new after", this.logicTypeData);
            this.showToast('bottom', 'Submenu Details Updated Successfully');
            this.showLoader = !true;
            this.getStockSubMenusItems(this.submenu,this.outletId)
            
          })
      }
    })
    // this.showLoader = true;
		// this.stockManager.updateSubMenuDetails(this.mallId,this.submenuId,this.weeks,this.startTime,this.endTime,this.availability).subscribe(data=>{
    //   this.showLoader = true;
		// 	this.stockManager.updateSubMenuDiscountDetails(this.mallId,this.submenuId,this.subMenuDiscount).subscribe(data=>{
    //     this.showLoader = !true;
			
    //   });
    //   this.showLoader = !true;
			
    // })
    
    
  }
  
  getSubMenuDetails(mallId,subMenuId){
    this.showLoader = true;
    this.stockManager.getSubMenuDetails(mallId,subMenuId).subscribe(resp => {
      this.submenuData = resp;
      this.weeks = resp['availability']['weeks'];
      this.availability = resp['availability']['available'];
      this.submenuAvailable=resp['availability']['available']
      // this.startTime = resp['availability']['startHour'];
      // this.endTime = resp['availability']['endHour'];
      this.submenuDiscount=this.submenuData['discount'];
      this.preparationTime=this.submenuData['preparationTime'];
    
      if(this.submenu.discount){
        this.subMenuDiscount = resp['discount'];
      }
      else{
      this.subMenuDiscount ="0";
      }
      this.showLoader = !true;
      this.closeEndTime=resp['availability'].closeEndHour;
			this.closeStartTime=resp['availability'].closeStartHour;
			this.openEndTime=resp['availability'].endHour;
			this.openStartTime= resp['availability'].startHour;
			this.subMenuLogicType= resp['availability'].logicType
			if(resp['availability'].logicType=='Open'){
				this.outletOpen = true;
				this.outletClose = false;
				this.openEndTime=resp['availability'].endHour;
				this.openStartTime= resp['availability'].startHour;
				this.open = true;
				this.close= false;

			}else{
				this.outletOpen = false;
				this.outletClose = true;
				this.closeEndTime=resp['availability'].closeEndHour;
				this.closeStartTime= resp['availability'].closeStartHour;
				this.open = false;
				this.close= true;	
			}
    });
  }
  getStockSubMenusItems(stockSubMenu, outletId) {
		console.log("stockSubMenu, outletId", stockSubMenu, outletId);
		stockSubMenu.showStockItemsList = !stockSubMenu.showStockItemsList;
    // let orderUrl = "/mall/" + stockSubMenu.mallId + "/outlet/" + outletId + "/menu/" + stockSubMenu.menuId + "/submenu/" + stockSubMenu.id;
    let orderUrl = "/mall/" + stockSubMenu.mallId + "/submenu/" + stockSubMenu.id+'/getItem';

    this.showLoader = true;
    this.stockManager.getStockSubMenusManager(orderUrl).subscribe(resp => {
      this.items = resp;
      console.log("@@@@@@@@@@@@",this.items)
      console.log(this.items);
      this.stockSubMenuId = stockSubMenu.id;
      this.stockMenuId = stockSubMenu.menuId;
      this.mallId = stockSubMenu.mallId;
      this.showLoader = !true;
    
      
		});
  }
 
  
  getItemModal(item){
    let fullOrderReject = this.modalCtrl.create(ItemDetailsPage,{
        "item":item,
        "outletId":this.outletId
    },{
			cssClass: "modal-halfscreen"
		   });
		   fullOrderReject.onDidDismiss(data => {
         console.log("page called");

         this.getStockSubMenusItems(this.submenu, this.outletId);
      
		  });
		   fullOrderReject.present();
  }
  addItem(){
    let fullOrderReject = this.modalCtrl.create(AddItemPage,{
        // "item":additems,
        "outletId":this.outletId,
        "stockMenuId": this.stockMenuId,
        "stockSubmenuId": this.stockSubMenuId,
        "outletName": this.outletName,
        "submenuName": this.submenuName
    },{
			cssClass: "modal-halfscreen"
		   });
		   fullOrderReject.onDidDismiss(data => {
         console.log("this.mallId, this.submenuId",this.mallId, this.submenuId);
         this.getStockSubMenusItems(this.submenu,this.outletId);
		  });
		   fullOrderReject.present();
  }
}
