import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {
	OrdersProvider
} from '../../provider/orders/orders';
import {
	Storage
} from '@ionic/storage';
import {
	OrderDetailsPage
} from '../order-details/order-details';
import {
	imageEndPoint
} from '../../common/properties';



@IonicPage()
@Component({
  selector: 'page-post-orders',
  templateUrl: 'post-orders.html',
})
export class PostOrdersPage {
  getAllCompletedFullOrdersResp: any;
  mallId: string;
  userType: string = "";
  imageEndPoint: any;
	getMallDetailsResp: any = {address:{area: "", city: "",}};
	showLoader: boolean;
  constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams, private oprovider: OrdersProvider ) {
   
    this.imageEndPoint = imageEndPoint;
  }
  getMallDetails(mallId) {
		var getMallDetailsUrl = "/mall/" + mallId;
		this.showLoader = true;
		this.oprovider.getMallDetails(getMallDetailsUrl).subscribe(resp => {
			this.getMallDetailsResp = resp;
			this.showLoader = !true;
		});
	}
  getAllCompletedFullOrders(mallId) {

 


		var getAllCompletedFullOrders = "/mall/" + mallId + "/outlet/all/getAllCompletedFullOrders";
		this.showLoader = true;
		this.oprovider.getCompleteOrder(getAllCompletedFullOrders).subscribe(resp => {
			this.getAllCompletedFullOrdersResp = resp;
    
      this.getAllCompletedFullOrdersResp = this.getAllCompletedFullOrdersResp.map(order => {
				order.createdDateStr = new Date(order.createdDate);
				return order;
			});
		
			this.showLoader = !true;
		});
  }
  goOrderDetails(event, getAllCompletedFullOrdersResp) {
  
		var senderElementName = event.target.tagName.toLowerCase();
	
		if (senderElementName === 'button') {
    
		} else {
      this.navCtrl.push(OrderDetailsPage, {
				getAllCompletedFullOrdersResp: getAllCompletedFullOrdersResp,
       
        type: "completedOrders"
        });
      
			
			}
				
	}
  ionViewDidLoad() {
    console.log('ionViewDidLoad PostOrdersPage');
  }
  ionViewDidEnter() {
    this.storage.get("USER_TYPE").then((val) => {
			this.userType = val;
			this.storage.get("MALL_ID").then((val) => {
        this.mallId = val;  
    
        this.getMallDetails(this.mallId);
        this.getAllCompletedFullOrders(this.mallId);
      });
    });
   
   
}

}
