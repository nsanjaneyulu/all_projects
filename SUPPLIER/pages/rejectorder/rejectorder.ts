import {
	Component
}
from '@angular/core';
import {
	NavController,
	NavParams,
	ViewController,
	LoadingController
}
from 'ionic-angular';
import {
	OrdersProvider
}
from '../../provider/orders/orders';
import {
	Storage
}
from '@ionic/storage';

@Component({
	selector: 'page-rejectorder',
	templateUrl: 'rejectorder.html',
})
export class RejectorderPage {
	public quantity = 1;
	public maxQuantity = 1;
	// public orderlet;
	public fullOrderObjectsResp;
	public itemCount;
	public jmOrderResp;
	

	public rejectReason = "customer request to cancel";
	public type: string = "";
	public orderletList:any = [];
	constructor(public storage: Storage, public navCtrl: NavController, public navParams: NavParams, 
				public viewCtrl: ViewController, private oprovider: OrdersProvider,
				public loadingctrl: LoadingController) {
		
		this.fullOrderObjectsResp = navParams.get('fullOrderObjectsResp');
		this.jmOrderResp = navParams.get('jmOrder');
	
		if(this.fullOrderObjectsResp){
			this.type="FullOrder";
		}
		else{
			this.type='JMOrder';
			if(this.jmOrderResp.status == "RECEIVED"){
				this.orderletList = this.jmOrderResp.received;
				this.maxQuantity = this.jmOrderResp.receivedCount;
			}
			else if(this.jmOrderResp.status =="READY"){
				this.orderletList = this.jmOrderResp.ready;
				this.maxQuantity = this.jmOrderResp.readyCount;
			}
			else{
				this.orderletList = this.jmOrderResp.inprogress;
				this.maxQuantity = this.jmOrderResp.inprogressCount;
			}
			
		}

	
		this.itemCount = 0;
		this.quantity = this.quantity;
		
	
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad RejectorderPage');
	}
	
	SubmitButtonClick() {
		let dinnerId="";
		let fullOrderId5didgit="";
		let items=[];
		let inprogressItems =[];
		let mallId="";
		let orderId="";

		if(this.type == "JMOrder") {
			let orderletIds="";
			let inprogressorderletIds="";
			dinnerId= this.jmOrderResp.received[0].dinnerId;
			mallId = this.jmOrderResp.received[0].mallId;
			orderId = this.jmOrderResp.received[0].orderId;
			fullOrderId5didgit = this.jmOrderResp.received[0].fullOrderId5didgit;

			for(var i=0;i<this.quantity;i++){
				items.push(this.jmOrderResp.received[i]);
				if(i ==this.quantity-1){
					orderletIds = orderletIds+this.jmOrderResp.received[i].id;
					console.log("orderletIds JMOrder if",orderletIds);
				}
				else{
					orderletIds = orderletIds+this.jmOrderResp.received[i].id+",";
					console.log("orderletIds JMOrder else",orderletIds);
				}
			}
			for(var i = this.quantity; i<this.jmOrderResp.received.length;i++){
				inprogressItems.push(this.jmOrderResp.received[i]);
			}
			let loading = this.loadingctrl.create({
				content: 'Please wait...'
			   });
			loading.present(); 
			var ordeLetLevelurl = "/getrefundamountorderlet" + "/malls/" + mallId + "/orderlets/" + orderletIds;
		
			this.oprovider.callRefundAmountServiceOrderLet(ordeLetLevelurl).subscribe(resp => {
				
				var amount = resp['amount'];
				this.callRefundServiceOrderlet(dinnerId,amount,fullOrderId5didgit,orderletIds,orderId,mallId);
				var deleteUrl = "/malls/" + mallId + "/order/" + orderId + "/orderletstatuschange";
				this.oprovider.updateStatus(deleteUrl,items,"REJECTED",0,this.rejectReason).subscribe(resp => {
				
					
					if(inprogressItems.length>0){
						this.oprovider.updateStatus(deleteUrl,inprogressItems,"INPROGRESS",0,this.rejectReason).subscribe(resp => {

							loading.dismiss();
							this.viewCtrl.dismiss();
						});
					}
					else{
						loading.dismiss();
						this.viewCtrl.dismiss();
					}

				});
				
				
			});	
		}
		else {
			let loading = this.loadingctrl.create({
				content: 'Please wait...'
			   });
			loading.present();  
			var refundurl =  "/getrefundamountFullOrder/malls/"+this.fullOrderObjectsResp.mallId +"/fullorder/"+this.fullOrderObjectsResp.id;
			this.oprovider.callRefundAmountServiceFullOrder(refundurl).subscribe(resp=>{
				
				var amount = resp['amount'];
				this.callRefundServiceFullOrder(this.fullOrderObjectsResp,amount);
				var deleteUrl = "/malls/" + this.fullOrderObjectsResp.mallId + "/fullorder/" + this.fullOrderObjectsResp.id + "/statusChange"
				this.oprovider.updateStatusDelete(deleteUrl, "REJECTED", 0, this.rejectReason).subscribe(resp => {
					
					loading.dismiss();
					console.log("resp",resp);
					this.viewCtrl.dismiss();
				});
				
				
			}); 
			
		}
	

	}
	callRefundServiceFullOrder(fullorder, amount) {
		var orderId = fullorder.id;
		orderId = orderId.replace(/-/g, "");
		this.oprovider.callRefundServicFullOrdereManager(fullorder.dinerId, amount, fullorder.fullOrder5DigitId, orderId,fullorder.id,fullorder.mallId).subscribe(resp => {
			this.callRefundServiceFullOrder = resp;
		});
	}
	callRefundServiceOrderlet(dinnerId, amount,fullOrderId5didgit,orderIds,fullOrderId,mallId) {
		
		orderIds = orderIds.replace(/-/g, "");
		this.oprovider.callRefundServiceManager(dinnerId, amount, fullOrderId5didgit, orderIds,fullOrderId,mallId).subscribe(resp => {
			this.callRefundServiceOrderlet = resp;
		});
	}
	radioButtonClicked(eventNumber) {
		if(eventNumber == 0) {
			this.rejectReason = "out of stock";
		} else if(eventNumber == 1) {
			this.rejectReason = "unable to find customer";
		} else if(eventNumber == 2) {
			this.rejectReason = "outlet closed";
		} else if(eventNumber == 3) {
			this.rejectReason = "customer request to cancel";
		} else if(eventNumber == 4) {
			this.rejectReason = "other";
		} else {
			this.rejectReason = "customer request to cancel";
		}
	}
	
	BackButtonClick() {
		this.viewCtrl.dismiss();
	
	}

	
	private quantityIncreament() {
		if(this.maxQuantity == this.quantity) {
			return false;
			}
			this.quantity++;
		}
	  
	private quantityDecrement() {
			if(1 == this.quantity) {
			return false;
			}
			this.quantity--;
		  }
}