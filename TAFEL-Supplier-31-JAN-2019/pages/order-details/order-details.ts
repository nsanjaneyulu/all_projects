import {
	Component
} from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams,
	ViewController,
	ModalController,
	AlertController
	
} from 'ionic-angular';
import {
	OrdersProvider
} from '../../provider/orders/orders';
import {
	CallNumber
}
from '@ionic-native/call-number';
import {
	RejectorderPage
} from '../../pages/rejectorder/rejectorder';
import {
	imageEndPoint
} from '../../common/properties';
import {
	Storage
} from '@ionic/storage';
import {
	PdfgeneratePage
} from '../../pages/pdfgenerate/pdfgenerate';
@IonicPage()
@Component({
	selector: 'page-order-details',
	templateUrl: 'order-details.html',
})
export class OrderDetailsPage {
	public fullorderAmount:any;
	public count = 0;
	public fullOrderstatus ="";
	public imageEndPoint: any;
	public vehicleNumber: String;
	// public fullOrderObject: any;
	public getAllCompletedFullOrdersResp: any;
	public fullorder: any = [];
	
	public fullOrderObjects: any = [];
	
	public fullOrderObjectsResp: any = {};
	public status: string;
	public type: string = "";
	mallId: string;
  	userType: string = "";
	  callDinerPhNum: any = "";
	  showLoader: boolean;
	 
	constructor(private callNumber: CallNumber, private storage: Storage,public navCtrl: NavController, private oprovider: OrdersProvider,
		 private alertCtrl: AlertController, public navParams: NavParams,
		public viewCtrl: ViewController, public modalCtrl: ModalController) {
		
			
			this.type = navParams.get('type');
		
			if(this.type === "completedOrders")
			{
				this.storage.get("USER_TYPE").then((val) => {
					this.userType = val;
					this.storage.get("MALL_ID").then((val) => {
						this.mallId = val;  
						
						this.fullorder = navParams.get('getAllCompletedFullOrdersResp');
						
						this.getOrderDetails(this.fullorder);
						console.log(this.fullOrderObjectsResp);

						let itemcount = ( this.fullOrderObjectsResp.handedoverCount + this.fullOrderObjectsResp.inprogressCount + this.fullOrderObjectsResp.receivedCount + this.fullOrderObjectsResp.rejectedCount);
						console.log("this.fullorderAmount", itemcount); 
						this.fullorderAmount = this.fullorder.price *itemcount ;
						 console.log("this.fullorderAmount", this.fullorderAmount);
					});
				});
			
			
				
			}
			else{
				this.storage.get("USER_TYPE").then((val) => {
					this.userType = val;
					this.storage.get("MALL_ID").then((val) => {
						this.mallId = val;  
					
						this.fullorder = navParams.get('fullorder');
						
						this.getOrderDetails(this.fullorder);
						
						
					});
				});

				
			}

		
	
		this.imageEndPoint = imageEndPoint;
	}
	ionViewDidLoad() {
		console.log('ionViewDidLoad OrderdetailsPage');
	}
	BackButtonClick() {
		this.viewCtrl.dismiss();
	}
	camelize(str) {
		return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
			return index == 0 ? letter.toUpperCase() : letter.toLowerCase();
		}).replace(/\s+/g, '');
		}

	acceptOrder(order){
			var status="INPROGRESS";
		
			let orders = order.received;
			let orderId = order.received[0].orderId;
			let mallid = order.received[0].mallId;
			let url  = "/malls/"+mallid+"/order/"+orderId+"/orderletstatuschange";
			this.showLoader = true;
			this.oprovider.updateStatus(url,orders,status,"",0).subscribe(resp => {
				this.getOrderDetails(this.fullorder);
			});
			this.showLoader = !true;
	 }
	 handedOvertheOrder(order){
		
		let orders = order.inprogress;
		
		let orderId = order.inprogress[0].orderId;
		let fullorderId = order.inprogress[0].fullOrderId;
		let mallid = order.inprogress[0].mallId;
		let prompt = this.alertCtrl.create({
			message: "",
			inputs: [
			  {
				name: 'OTP',
				type: 'number',
				placeholder: 'OTP'
			  },
			],
			buttons: [
			  {
				text: 'Cancel',
				handler: data => {
				  console.log('Cancel clicked');
				}
			  },
			  {
				text: 'Proceed',
				handler: data => {
					this.showLoader = true;
					this.oprovider.checkOtp(data['OTP'],fullorderId).subscribe(resp=>{
					
						if(resp['returnValue'] == "Success"){
							
								var status="HANDEDOVER";
							
								
								let url  = "/malls/"+mallid+"/order/"+orderId+"/orderletstatuschange";
								this.showLoader = true;
								this.oprovider.updateStatus(url,orders,status,"",0).subscribe(resp => {
									this.getOrderDetails(this.fullorder);
								});
								this.showLoader = !true;
						}
						else{
							let alert = this.alertCtrl.create({
								title: 'Invalid OTP',
								subTitle: 'Invalid OTP',
								buttons: ['ok']
							  });
							  alert.present();
							
						}
					});
					this.showLoader = !true;

				}
			  }
			]
		  });
		  prompt.present();

			
	 }		
	getOrderDetails(orderData) {
		
		let fullorderUrl =   "/mall/" + orderData.mallId + "/fullOrder/" + orderData.id;
		this.showLoader = true;
		this.oprovider.getCompleteOrder(fullorderUrl).subscribe(resp => {
	
		this.fullorder = resp; 
		this.fullOrderstatus = this.camelize(this.fullorder.status)
		let orderUrl = "/mall/" + orderData.mallId + "/fullOrder/" + orderData.id + "/getorderdetails";
		this.showLoader = true;
		this.oprovider.getCompleteOrder(orderUrl).subscribe(resp => {
			this.fullOrderObjects = resp;
			this.vehicleNumber = this.fullOrderObjects[0].currentVehicleNumber;
			this.callDinerPhNum = this.fullOrderObjects[0].diner.phoneNumber;
			this.fullOrderObjectsResp = this.fullOrderObjects;
			
		
			
		});
		this.showLoader = !true;
		});
		this.showLoader = !true;
	}
	acceptFullOrder(fullorder){
		
		var url = "/malls/" + fullorder.mallId + "/fullorder/" +fullorder.id + "/statusChange";
		this.showLoader = true;
				this.oprovider.updateStatusDelete(url, "INPROGRESS", 0, "").subscribe(resp => {
				
					this.getOrderDetails(this.fullorder);
					

				});
				this.showLoader = !true;
		
	}
	handOverFullOrder(fullorder){
		let prompt = this.alertCtrl.create({
			message: "",
			inputs: [
			  {
				name: 'OTP',
				type: 'number',
				placeholder: 'OTP'
			  },
			],
			buttons: [
			  {
				text: 'Cancel',
				handler: data => {
				 
				}
			  },
			  {
				text: 'Proceed',
				handler: data => {
				
					
					this.showLoader = true;
					this.oprovider.checkOtp(data['OTP'],fullorder.id).subscribe(resp=>{
					
						if(resp['returnValue'] == "Success"){
							
								var status="HANDEDOVER";
							
								
								var url = "/malls/" + this.fullorder.mallId + "/fullorder/" +fullorder.id + "/statusChange";
								this.showLoader = true;
								this.oprovider.updateStatusDelete(url, "COMPLETED", 0, "").subscribe(resp => {
							
								this.getOrderDetails(this.fullorder);
								

							});
							this.showLoader = !true;
						}
						else{
							
							let alert = this.alertCtrl.create({
								title: 'Invalid OTP',
								subTitle: 'Invalid OTP',
								buttons: ['ok']
							  });
							  alert.present();
							
						}
					});
					this.showLoader = !true;
				}
			}
		]
	  });
	  prompt.present();

		
		

	}
	goRejectOrder(order) {
	
		let fullOrderReject = this.modalCtrl.create(RejectorderPage, {
			jmOrder: order,
			type: "fullorderReject"
		   }, {
			cssClass: "modal-halfscreen"
		   });
		   fullOrderReject.onDidDismiss(data => {
			this.getOrderDetails(this.fullorder);

					
		   });
		   fullOrderReject.present();
	}


	rejectFullOrder(fullorder){
	

		let fullOrderReject = this.modalCtrl.create(RejectorderPage, {
			fullOrderObjectsResp: fullorder,
			type: "fullorderReject"
		   }, {
			cssClass: "modal-halfscreen"
		   });
		   fullOrderReject.onDidDismiss(data => {
			this.getOrderDetails(this.fullorder);

					
		   });
		   fullOrderReject.present();
	}

	callDiner(phNumber) {
		
		this.callNumber.callNumber(phNumber, true).then(res => console.log('Launched dialer!', res)).catch(err => console.log('Error launching dialer', err));
	}
	pdfgenerate(fullOrderObjects) {
		console.log("fullOrderObjects",this.fullorder);
		this.navCtrl.push(PdfgeneratePage, {
			fullorder: this.fullorder,
               
		});
	}
	
}