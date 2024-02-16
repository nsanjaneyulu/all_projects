import {Component} from '@angular/core';
import {NavController,AlertController,LoadingController} from 'ionic-angular';
import {ModalController} from 'ionic-angular';
import {OrdersProvider} from '../../provider/orders/orders';
import { imageEndPoint } from '../../common/endPointService'
import { Storage } from '@ionic/storage';
import {CallNumber } from '@ionic-native/call-number';
import { BackbuttonService } from '../../provider/backbutton/backbutton.service';
import { OrderDetailsPage }from '../order-details/order-details';
import { endPointService } from '../../common/endPointService';
@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
	providers:[endPointService]
})
export class HomePage {
	outletIds: string[];
	outletId: string;
	orders: string;
	userType: string = "";
	mallId: string;
	outlets: any[];
	selectedOutlet: String;
	statusLet: any = ['Pending', 'Completed'];
	ssId: string;
	selectStatus: string = 'Pending';
	outletorderArray: any = [];
	OriginalOutletOrderArray: any[] = [];
	dinerProfile: any = {};
	imageEndPoint: any;
	pendingFullOrderObj: any = [];
	supplierId: string;
	originalPendingOrders: any = [];
	fullOrders: any = [];
	originalCompletedOrders: any = [];
	phNumber: any;
	constructor(public navCtrl: NavController, public modalCtrl: ModalController, 
				private oprovider: OrdersProvider, private alertCtrl: AlertController,
				private loadingCtrl: LoadingController, private storage: Storage, 
				private callNumber: CallNumber, private backbuttonService: BackbuttonService, private endPoint: endPointService) {
					
		
					this.storage.get("OUTLET_ID").then((val) => {
						this.outletIds = val;
						this.outletId = this.outletIds[0];
						this.orders = 'pending';
					});
					this.storage.get("USER_TYPE").then((val) => {
						this.userType = val;
						this.storage.get("MALL_ID").then((val) =>{
							this.mallId = val;
							this.storage.get("OUTLET_OBJECT").then((val) =>{
								this.outlets = val;
								let allFound = false;
								for(var i = 0; i < this.outlets.length; i++) {
									if(this.outlets[i].id == "All") {
										allFound = true;
										console.log("all found", allFound);	
										console.log("this.outlets found", this.outlets);
										break;
									} else {
										allFound = false;
										console.log("all not found", allFound);	
										console.log("this.outlets not found", this.outlets);					
									}
								}
								if (allFound) {
									this.selectedOutlet= "All";
									this.getPendingOrder(this.mallId);						
								}
								else {
									this.selectedOutlet= this.outlets[0].id;	
									this.valueChangeOutlet(this.outlets[0].id);
									console.log("this.selectedOutletLevel", this.selectedOutlet);	
								}
							});
							this.storage.get("SS_ID").then((val) => {
								this.ssId = val;
								if(this.userType === "SUPPLIER") {
									this.storage.get("SUPPLIER_ID").then((val) => {
										this.supplierId = val;
										this.storage.get("API_KEYS").then((val) => {
											this.oprovider.setAPIDetails(val);
											// this.getPendingOrder(this.mallId);
										});
									});
								} else {
									this.getFullOrderDetails()
								}
							});	
						});
							
					});
					this.dinerProfile = {};
					this.imageEndPoint = imageEndPoint;
				}
				ionViewWillEnter() {
					if(this.selectedOutlet == "All") {
						if(this.selectStatus == "Completed") {
							this.getCompletedOrder(this.mallId);
						} else {
							this.getPendingOrder(this.mallId);
						}
					} else {
						this.getCompletedOrder(this.mallId);
					}
					
				} 
				ionViewDidEnter() {
					
				  }
				valueChangeOutlet(val){
					var statusRest = ['Pending', 'Completed', 'Rejected'];
					var statusAll = ['Pending', 'Completed'];
					if(val == "All") {
						console.log("Goes All");
						document.getElementById("allOrders").style.display = "block";
						document.getElementById("outletOrders").style.display = "none";
						this.statusLet = statusAll;
						this.selectStatus = statusAll[0];
						this.getPendingOrder(this.mallId);
					} else {
						console.log("Goes Outlet");
						document.getElementById("allOrders").style.display = "none";
						document.getElementById("outletOrders").style.display = "block";
						this.statusLet = statusRest;
						this.selectStatus = statusRest[0];
						let loading = this.loadingCtrl.create({
							content: 'Please wait...'
						});
						loading.present();
						this.oprovider.getDataNew(val, this.mallId, "Pending").subscribe(data => {
							this.outletorderArray = data;
							console.log("this.outletorderArray", this.outletorderArray);
							this.OriginalOutletOrderArray = [...this.pendingFullOrderObj];
							this.OriginalOutletOrderArray = this.outletorderArray;
							for(var i = 0; i < this.outletorderArray.length; i++) {
								this.outletorderArray[i]['createdDateStr'] = new Date(this.outletorderArray[i].createdDate);
								for(var j = 0; j < this.outletorderArray[i].orderlet.length; j++) {
									if(this.outletorderArray[i].orderlet[j]['status'] == "HANDEDOVER" || this.outletorderArray[i].orderlet[j]['status'] == "REJECTED" || this.outletorderArray[i].orderlet[j]['status'] == "COMPLETED") {
										this.outletorderArray[i].orderlet[j]['showdeletediv'] = false;
									} else {
										this.outletorderArray[i].orderlet[j]['showdeletediv'] = true;
									}
								}
							}
						});
						loading.dismiss();
				  }
				}
			   
		   getPendingOrder(mallId) {
			var pendingurl = "/malls/" + mallId + "/pendingFullOrders";
			let loading = this.loadingCtrl.create({
				content: 'Please wait...'
			   });
			loading.present();
			this.oprovider.getPendingOrder(pendingurl).subscribe(resp => {
				this.pendingFullOrderObj = resp;
				
				for(var i = 0; i < this.pendingFullOrderObj.length; i++) {
					this.pendingFullOrderObj[i]['createdDateStr'] = new Date(this.pendingFullOrderObj[i]['createdDate']);
					this.pendingFullOrderObj[i]['showOrderList'] = false;
					this.pendingFullOrderObj[i]['showDiv'] = true;
					
				}
				this.originalPendingOrders = [...this.pendingFullOrderObj];
				loading.dismiss();
			});
		
			  
		}
		getFullOrderDetails() {
			this.oprovider.getFullOrderDetailsByMallId(this.ssId, this.mallId).subscribe(data => {
				this.fullOrders = data;
			});
		}
		getCompletedOrder(mallId) {
			var pendingurl = "/malls/" + mallId + "/completedFullOrders";
			this.oprovider.getPendingOrder(pendingurl).subscribe(resp => {
				let loading = this.loadingCtrl.create({
					content: 'Please wait...'
				});
				loading.present();
				this.pendingFullOrderObj = resp;
				this.originalCompletedOrders = [...this.pendingFullOrderObj];
				
				for(var i = 0; i < this.pendingFullOrderObj.length; i++) {
					this.pendingFullOrderObj[i]['createdDateStr'] = new Date(this.pendingFullOrderObj[i]['createdDate']);
					if(this.pendingFullOrderObj[i]['status'] == "COMPLETED") {
						this.pendingFullOrderObj[i]['showDiv'] = false;
					} else {
						this.pendingFullOrderObj[i]['showDiv'] = true;
					}
				}
				loading.dismiss();
			});
		}
		OrderStatusChange() {
			if(this.selectedOutlet == "All") {
				if(this.selectStatus == "Completed") {
					this.getCompletedOrder(this.mallId)
				} else {
					this.getPendingOrder(this.mallId);
				}
			} else {
				let loading = this.loadingCtrl.create({
					content: 'Please wait...'
				});
				loading.present();
				this.oprovider.getDataNew(this.selectedOutlet, this.mallId, this.selectStatus).subscribe(data => {
					this.outletorderArray = data;
					
					for(var i = 0; i < this.outletorderArray.length; i++) {
						this.outletorderArray[i]['createdDateStr'] = new Date(this.outletorderArray[i].createdDate);
						for(var j = 0; j < this.outletorderArray[i].orderlet.length; j++) {
							if(this.outletorderArray[i].orderlet[j]['status'] == "HANDEDOVER" || this.outletorderArray[i].orderlet[j]['status'] == "REJECTED" || this.outletorderArray[i].orderlet[j]['status'] == "COMPLETED") {
								this.outletorderArray[i].orderlet[j]['showdeletediv'] = false;
							} else {
								this.outletorderArray[i].orderlet[j]['showdeletediv'] = true;
							}
						}
					}
				});
				loading.dismiss();
			}
		}
		goOrderDetails(event, pendingFullOrderObj) {
			var senderElementName = event.target.tagName.toLowerCase();
			console.log("senderElementName", senderElementName);
			if(senderElementName === 'div' || senderElementName === 'ion-icon')
			{
				this.callDiner(this.phNumber);
			} 
			else
			{
				// let modal = this.modalCtrl.create(OrderDetailsPage, {
				// 	"pendingFullOrderObj": pendingFullOrderObj,
				// 	type: "pendingFullOrderObj"
				// });
				// modal.onDidDismiss(data => {
					
				// });
				// modal.present();
				this.navCtrl.push(OrderDetailsPage, {
					pendingFullOrderObj: pendingFullOrderObj,
					count:0  
				  });
			}
		 }
		 callDiner(phNumber) {
			console.log("phNumber",phNumber);
			this.callNumber.callNumber(phNumber, true).then(res => console.log('Launched dialer!', res)).catch(err => console.log('Error launching dialer', err));
		}
		
	  }
		