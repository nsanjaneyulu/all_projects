import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ModalController, ViewController } from 'ionic-angular';
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
  stockSubMenuId:string;
  stockMenuId:string;
  items:any =[];
  outletName:string;
  submenuName: string;
  subMenuDiscount:String;
  availability = true;
  mallId:string;
  outletDiscount:any;
  submenuId:any;
  isPageActive: boolean = false;
  showLoader: boolean;
  // stockSubMenuStr:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private stockManager: StockmanagerProvider,private alertCtrl: AlertController,
              public modalCtrl: ModalController, public viewCtrl: ViewController,) {

    this.submenu = this.navParams.get("submenu");
    this.submenuName = this.submenu.name;
    this.submenuId = this.submenu.id;
    this.mallId = this.submenu.mallId;

    this.getSubMenuDetails(this.mallId, this.submenuId)


    
   
    

  
    
    this.outletId = this.navParams.get("outlet");
    this.outletName = this.navParams.get("outletName");

 
    this.getStockSubMenusItems(this.submenu,this.outletId);

 
     
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
  updateSubMenuDetails(){
		
    this.showLoader = true;
		this.stockManager.updateSubMenuDetails(this.mallId,this.submenuId,this.weeks,this.startTime,this.endTime,this.availability).subscribe(data=>{
      this.showLoader = true;
			this.stockManager.updateSubMenuDiscountDetails(this.mallId,this.submenuId,this.subMenuDiscount).subscribe(data=>{
        this.showLoader = !true;
			
      });
      this.showLoader = !true;
			
		})
  }
  
  getSubMenuDetails(mallId,subMenuId){
    this.showLoader = true;
    this.stockManager.getSubMenuDetails(mallId,subMenuId).subscribe(resp => {
      
      this.weeks = resp['availability']['weeks'];
      this.availability = resp['availability']['available'];
      this.startTime = resp['availability']['startHour'];
      this.endTime = resp['availability']['endHour'];
    
      if(this.submenu.discount){
        this.subMenuDiscount = resp['discount'];
      }
      else{
      this.subMenuDiscount ="0";
      }
      this.showLoader = !true;
    });
  }
  getStockSubMenusItems(stockSubMenu, outletId) {
		console.log("stockSubMenu, outletId", stockSubMenu, outletId);
		stockSubMenu.showStockItemsList = !stockSubMenu.showStockItemsList;
		let orderUrl = "/mall/" + stockSubMenu.mallId + "/outlet/" + outletId + "/menu/" + stockSubMenu.menuId + "/submenu/" + stockSubMenu.id;
    this.showLoader = true;
    this.stockManager.getStockSubMenusManager(orderUrl).subscribe(resp => {
      this.items = resp;
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
        
		  });
		   fullOrderReject.present();
  }
}
