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
} from '../../common/endPointService';
import {
	Storage
} from '@ionic/storage';
import {
	PdfgeneratePage
} from '../../pages/pdfgenerate/pdfgenerate';
import { InAppBrowser } from '@ionic-native/in-app-browser';
@IonicPage()
@Component({
	selector: 'page-order-details',
	templateUrl: 'order-details.html',
})
export class OrderDetailsPage {
	handedoverItemPrice:any;
	rejectItemPrice:any;
	totalPay: any;
	deliveryCharge: any;
	totalAmount: any;
	itemTotal: any;
	sgst:any;
	cgst : any;
	convenience : any;
	packagingCharge : any;
	supplierDeliveryCharge : any;
	tafelDeliveryCharge : any;
	supplierDiscount : any;
	tafelDiscount : any;
	itemWithoutDiscout=0;
	public fullorderAmount:any;
	public count = 0;
	public fullOrderstatus ="";
	public imageEndPoint: any;
	public vehicleNumber: String;
	public getAllCompletedFullOrdersResp: any;
	public fullorder: any = [];
	public dynamicText:String ="";
	public dynamicTextKOT:String ="";
	public fullOrderObjects: any = [];
	public fullOrderObjectsResp: any = {};
	public status: string;
	public type: string = "";
	mallId: string;
  	userType: string = "";
	  callDinerPhNum: any = "";
	  showLoader: boolean;
	  getAmount: any;
	  getCgst: any;
	  getreceivedAmount:any;
	  getrejectAmount:any;
	  getSgst: any;
	  getconvenience:any;
	  getpackagingCharge: any;
	  getGrandTotal: any;
	  getOrderId: any;
	  orderDetailsResp: any;
	  fullOrderResp: any;
	  outletorderArrayMap:any;
	  itemName: any;
	  outletOrdersDetails:any;
	  outletOrdersDetailsPrint:any;
	  itemPrice:any;
	  itemQty:any;
	  receivedCount:any
	  inprogressCount:any;
	  handedoverCount:any;
	  readyCount:any;
	  getDate:any;
	  getMallDetailsResp:any;
	  getMallDetailsRespObject:any;
	  printOrderDetails:any;
		fullOrder5DigitId:any;
		allpermited:any;
		outletIds:any;
		outletId:any;
	constructor(public appBrowser:InAppBrowser,private callNumber: CallNumber, private storage: Storage,public navCtrl: NavController, private oprovider: OrdersProvider,
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
						this.getMallDetails(this.mallId);
						let itemcount = ( this.fullOrderObjectsResp.handedoverCount + this.fullOrderObjectsResp.inprogressCount + this.fullOrderObjectsResp.receivedCount + this.fullOrderObjectsResp.rejectedCount);
						this.fullorderAmount = this.fullorder.price *itemcount ;
						
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
						this.getMallDetails(this.mallId);
					});
				});	
			}
			this.storage.get("OUTLET_ID").then((val) => {
				this.outletIds = val;
				this.outletId = this.outletIds[0];
		});
			this.storage.get("ALL_PERMITABLE").then((val) => {
				this.allpermited = val;
				console.log(this.allpermited,"$$$$$$")
				

		});
		this.imageEndPoint = imageEndPoint;
	}
	getMallDetails(mallId) {
		var getMallDetailsUrl = "/mall/" + mallId;
		this.showLoader = true;
		this.oprovider.getMallDetails(getMallDetailsUrl).subscribe(resp => {
			this.getMallDetailsResp = resp;	
		});
		// this.getMallDetailsRespObject = [...this.getMallDetailsResp];
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

	 readytheOrder(order){
		var status="READY";
		let orders = order.inprogress;
		let orderId = order.inprogress[0].orderId;
		let mallid = order.inprogress[0].mallId;
		let url  = "/malls/"+mallid+"/order/"+orderId+"/orderletstatuschange";
		this.showLoader = true;
		this.oprovider.updateStatus(url,orders,status,"",0).subscribe(resp => {
			this.getOrderDetails(this.fullorder);
		});
		this.showLoader = !true;
 	}
	 handedOvertheOrder(order){
		let orders = order.ready;
		let orderId = order.ready[0].orderId;
		let fullorderId = order.ready[0].fullOrderId;
		let mallid = order.ready[0].mallId;
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
		let fullorderUrl="";
		if(this.allpermited=='Yes'){
		fullorderUrl =   "/mall/" + orderData.mallId + "/fullOrder/" + orderData.id;

		}else{
			fullorderUrl =   "/mall/" + orderData.mallId +"/fullOrder/" + orderData.id+"/outlet/"+this.outletId;

		}
		this.showLoader = true;
		this.oprovider.getCompleteOrder(fullorderUrl).subscribe(resp => {
		this.fullorder = resp;
		console.log("@@@@@@@@@@@@@@@@",this.fullorder)
	if(this.fullorder.orderType=="Delivery"){
			this.fullorder.deliveryCharges =(this.fullorder.supplierDeliveryCharge+this.fullorder.tafelDeliveryCharge).toFixed(2)
		}else{
			this.fullorder.deliveryCharges = (0).toFixed(2);
		}
		this.fullorder.itemsAmount = (this.fullorder.amount).toFixed(2);
		this.fullorder.cgstAmount = (this.fullorder.cgst).toFixed(2);
		this.fullorder.sgstAmount = (this.fullorder.sgst).toFixed(2);
		this.fullorder.convenienceAmount = (this.fullorder.convenience).toFixed(2);
		this.fullorder.packagingChargeAmount = (this.fullorder.packagingCharge).toFixed(2);
		this.fullorder.totalItemsAmount = (this.fullorder.packagingCharge+this.fullorder.convenience+this.fullorder.sgst+this.fullorder.amount+this.fullorder.cgst+this.fullorder.supplierDeliveryCharge+this.fullorder.tafelDeliveryCharge).toFixed(2);
		this.fullorder.supplierDeliveryCharge = parseFloat(this.fullorder.supplierDeliveryCharge).toFixed(2);
		this.fullorder.tafelDeliveryCharge = parseFloat(this.fullorder.tafelDeliveryCharge).toFixed(2);
		
		this.fullorder.creatingDate = new Date(this.fullorder.createdDate);
		console.log("++++++++++++++++++++++++++++++++");
		console.log("++++++++++++++++++++++++++++++++")
		console.log(this.fullorder);
		console.log("++++++++++++++++++++++++++++++++")
		

		
		this.fullOrderstatus = this.camelize(this.fullorder.status)
		let orderUrl="";
		if(this.allpermited=='Yes'){
		orderUrl = "/mall/" + orderData.mallId + "/fullOrder/" + orderData.id + "/getorderdetails";
		}else{
			orderUrl = "/mall/" + orderData.mallId + "/orderId/" +this.fullorder.orderIds[0] + "/getorderdetails";
		}
		this.showLoader = true;
		this.oprovider.getCompleteOrder(orderUrl).subscribe(resp => {
			this.fullOrderObjects = resp;
			this.fullOrderObjects.forEach(element => {
				element.orders.forEach(value=>{
					this.itemWithoutDiscout = this.itemWithoutDiscout + value.item.price
				})
			});
			this.itemTotal = parseFloat(this.fullorder['amount']).toFixed(2);
			this.cgst = parseFloat(this.fullorder['cgst']).toFixed(2);
			this.sgst = parseFloat(this.fullorder['sgst']).toFixed(2);
			this.convenience = parseFloat(this.fullorder['convenience']).toFixed(2);
			this.packagingCharge = parseFloat(this.fullorder['packagingCharge']).toFixed(2);
			this.supplierDeliveryCharge = parseFloat(this.fullorder['supplierDeliveryCharge']).toFixed(2);
			this.tafelDeliveryCharge = parseFloat(this.fullorder['tafelDeliveryCharge']).toFixed(2);
			this.deliveryCharge = (parseFloat(this.tafelDeliveryCharge) + parseFloat(this.supplierDeliveryCharge)).toFixed(2);
		
			this.supplierDiscount = parseFloat(this.fullorder['supplierDiscount']).toFixed(2);
			this.tafelDiscount = parseFloat(this.fullorder['tafelDiscount']).toFixed(2);
			// orderDetail.amount - orderDetail.supplierDiscount + orderDetail.cgst + orderDetail.sgst + orderDetail.packagingCharge + orderDetail.supplierDeliveryCharge + orderDetail.tafelDeliveryCharge).toFixed(2)
			this.totalAmount = ((this.itemWithoutDiscout + parseFloat(this.cgst) + parseFloat(this.sgst) + parseFloat(this.packagingCharge) + parseFloat(this.deliveryCharge)) - parseFloat(this.supplierDiscount)).toFixed(2);
			this.totalPay = ((parseFloat(this.totalAmount) + (parseFloat(this.convenience))) - parseFloat(this.tafelDiscount)).toFixed(2);
			
			this.outletorderArrayMap = this.fullOrderObjects.map(outletOrder => {			
				this.outletOrdersDetails = (outletOrder.orders || []).map(order => {					
					this.itemName = order.item.name;
					console.log('****************************************')
					console.log(order);
					console.log('****************************************');
					var rejectItemPrice = 0;
					var handedoverItemPrice = 0;
					for(let i =0;i<order.rejected.length;i++){
						rejectItemPrice =rejectItemPrice+order.rejected[i].itemPrice;
					}
					for(let i =0;i<order.handedover.length;i++){
						handedoverItemPrice =handedoverItemPrice+order.handedover[i].itemPrice;
					}


					order.totalItemValue = rejectItemPrice+handedoverItemPrice;


					// if(order.rejectedCount > 0){				
					
					// 	this.rejectItemPrice = order.rejected[0].itemPrice;
					
					// 	console.log("rejectItemPrice",this.rejectItemPrice);
					// 	}
					// 	if(order.handedoverCount > 0){				
						
						
					// 		this.handedoverItemPrice = order.handedover[0].itemPrice;
					// 		console.log("handedoverItemPrice",this.handedoverItemPrice);
					// 		}
				
					return order;
				
				});
				
				return outletOrder;
			});
			console.log(this.fullOrderObjects,"########################");
			
			this.vehicleNumber = this.fullOrderObjects[0].currentVehicleNumber;
			this.callDinerPhNum = this.fullOrderObjects[0].diner.phoneNumber;
			this.fullOrder5DigitId = this.fullOrderObjects[0].fullOrder5DigitId;
			this.fullOrderObjectsResp = this.fullOrderObjects;
			this.orderDetailsResp = [...this.fullOrderObjects];			
		});
		this.showLoader = !true;
		});
		this.showLoader = !true;
		this.fullOrderResp = this.fullorder;
	}
	acceptFullOrder(fullorder){
		var url = "/malls/" + fullorder.mallId + "/fullorder/" +fullorder.id + "/statusChange";
		this.showLoader = true;
				this.oprovider.updateStatusDelete(url, "INPROGRESS", 0, "").subscribe(resp => {
					this.getOrderDetails(this.fullorder);
				});
				this.showLoader = !true;
	}

	readyFullOrder(fullorder){
		var url = "/malls/" + fullorder.mallId + "/fullorder/" +fullorder.id + "/statusChange";
		this.showLoader = true;
				this.oprovider.updateStatusDelete(url, "READY", 0, "").subscribe(resp => {
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
		console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@");
		console.log(order.item.name)
		console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@");
		let prompt = this.alertCtrl.create({
			title: "Reject Item (or) Quantity!",
            message: "Do You want to Reject Item "+order.item.name+" or Quantity?",
			buttons: [
			  {
				text: 'Cancel',
				handler: data => {
				 
				}
			  },
			  {
				text: 'Proceed',
				handler: data => {
                    let fullOrderReject = this.modalCtrl.create(RejectorderPage, {
						jmOrder: order,
						type: "fullorderReject"
					   }, {
						cssClass: "modal-halfscreen-reject"
					   });
					   fullOrderReject.onDidDismiss(data => {
						this.getOrderDetails(this.fullorder);		
					   });
					   fullOrderReject.present();
				}
			}
		]
	  });
	  prompt.present();
		
	}
	rejectFullOrder(fullorder){
		let fullOrderReject = this.modalCtrl.create(RejectorderPage, {
			fullOrderObjectsResp: fullorder,
			type: "fullorderReject"
		   }, {
			cssClass: "modal-halfscreen-reject"
		   });
		   fullOrderReject.onDidDismiss(data => {
			this.getOrderDetails(this.fullorder);		
		   });
		   fullOrderReject.present();
	}
	callDiner(phNumber) {	
		this.callNumber.callNumber(phNumber, true).then(res => console.log('Launched dialer!', res)).catch(err => console.log('Error launching dialer', err));
	}
	appendPrint(name,price,quantity){

		var itemPrice = price / quantity;
		var stringSpaceitem = '';
		if(itemPrice.toString().length==5){
			stringSpaceitem = ' '+itemPrice.toFixed(2);
		}
		else if(itemPrice.toString().length==4){
			stringSpaceitem = '  '+itemPrice.toFixed(2);
		}else if(itemPrice.toString().length==3){
			stringSpaceitem = '   '+itemPrice.toFixed(2);
		}
		else if(itemPrice.toString().length==2){
			stringSpaceitem = '    '+itemPrice.toFixed(2);
		}
		else if(itemPrice.toString().length==1){
			stringSpaceitem = '     '+itemPrice.toFixed(2);
		}
	
		var stringSpace='';
		if(price.toString().length==5){
			stringSpace = ' '+price.toFixed(2);
		}
		else if(price.toString().length==4){
			stringSpace = '  '+price.toFixed(2);
		}else if(price.toString().length==3){
			stringSpace = '   '+price.toFixed(2);
		}
		else if(price.toString().length==2){
			stringSpace = '    '+price.toFixed(2);
		}
		else if(price.toString().length==1){
			stringSpace = '     '+price.toFixed(2);
		}
		var qtySpace='';
		if(quantity.toString().length==2){
			qtySpace = quantity+'';
		}
		else if(quantity.toString().length==1){
			qtySpace = quantity+' ';
		}
		this.dynamicText =this.dynamicText+ '<text>' + name +'    ' + qtySpace +' ' + stringSpaceitem + ' ' + stringSpace + '&#10;</text>\n';
		// console.log("this.dynamicText....", this.dynamicText);
	}
	appendPrintKOT(name,quantity){
		var qtySpace='';
		if(quantity.toString().length==2){
			qtySpace = quantity+'';
		}
		else if(quantity.toString().length==1){
			qtySpace = quantity+' ';
		}
		this.dynamicTextKOT =this.dynamicTextKOT+ '<text>' + qtySpace +'  ' + name +' ' + '&#10;</text>\n';
		// console.log("this.dynamicText....", this.dynamicText);
	}
	pdfgenerate(fullOrderObjects) {
		
		}	
		
		
	}
	
