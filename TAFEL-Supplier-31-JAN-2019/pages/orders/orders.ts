import {
    Component,ViewChild
} from '@angular/core';
import {
    NavController,Content 

} from 'ionic-angular';
import {
    ModalController
} from 'ionic-angular';
import {
    OrdersProvider
} from '../../provider/orders/orders';
import {
    imageEndPoint
} from '../../common/properties';
import {
    Storage
} from '@ionic/storage';


import {
    OrderDetailsPage
} from '../order-details/order-details';

@Component({
    selector: 'page-orders',
    templateUrl: 'orders.html',
})

export class OrdersPage {
    ordersList: string = "All";
    outletIds: string[];
    getMallDetailsResp: any = { address: { area: "", city: "", } };
    supplierProfile: any;
    outletId: string;
    orders: string;
    userType: string = "";
    mallId: string;
    outlets: any[];
    ssId: string;
    dinerProfile: any = {};
    imageEndPoint: any;
    fullorders: any = [];
    supplierId: string;
    originalPendingOrders: any = [];
    segmentSelect: string = "All";
    showLoader: boolean;
    segmentName:string;
    clearIntervals:number;
    @ViewChild(Content) content: Content;
    constructor(public navCtrl: NavController, public modalCtrl: ModalController,
        private oprovider: OrdersProvider, private storage: Storage,
    ) {
        this.segmentName = 'All';
        this.doRefresh(0);
        this.segmentChange('All',0);
        
        this.storage.get("OUTLET_ID").then((val) => {
            this.outletIds = val;
            this.outletId = this.outletIds[0];
            this.orders = 'pending';
        });
        this.storage.get("USER_TYPE").then((val) => {
            this.userType = val;
            this.storage.get("MALL_ID").then((val) => {
                this.mallId = val;
                this.storage.get("OUTLET_OBJECT").then((val) => {
                    this.outlets = val;
                    this.storage.get("SS_ID").then((val) => {
                        this.ssId = val;
                        if (this.userType === "SUPPLIER") {
                            this.storage.get("SUPPLIER_ID").then((val) => {
                                this.supplierId = val;
                                this.storage.get("API_KEYS").then((val) => {

                                    for (var i = 0; i < this.outlets.length; i++) {
                                        if (this.outlets[i].id == "All") {

                                            this.getAllFullOrders(this.mallId,0);
                                            this.getMallDetails(this.mallId);
                                            this.oprovider.setAPIDetails(val);
                                        }
                                    }
                                });
                            });

                        }
                        else {

                        }
                    });


                });
            });
        });
        this.dinerProfile = {};
        this.imageEndPoint = imageEndPoint;
    }
    getMallDetails(mallId) {
        var getMallDetailsUrl = "/mall/" + mallId;

        this.oprovider.getMallDetails(getMallDetailsUrl).subscribe(resp => {
            this.getMallDetailsResp = resp;


        });
    }
    doRefresh(refresher){
        this.segmentChange(this.segmentName,1);
        if(refresher != 0){
            refresher.complete();
        }
    }

    getAllFullOrders(mallId,flikTime) {
        var getAllFullOrdersUrl = "/mall/" + mallId + "/outlet/all/getAllFullOrders";
        if(flikTime==0){
            this.showLoader = true;
        }
        this.oprovider.getOrders(getAllFullOrdersUrl).subscribe(resp => {
            this.fullorders = resp;

            this.fullorders = this.fullorders.map(order => {
                order.createdDateStr = new Date(order.createdDate);
                return order;
            });
            this.originalPendingOrders = [...this.fullorders];
            this.showLoader = !true;
        });
    }

    getAllPendingFullOrders(mallId,flikTime) {

        var getAllFullOrdersUrl = "/mall/" + mallId + "/outlet/all/getAllPendingFullOrders";
        if(flikTime==0){
            this.showLoader = true;
        }
        this.oprovider.getOrders(getAllFullOrdersUrl).subscribe(resp => {
            this.fullorders = resp;
            this.fullorders = this.fullorders.map(order => {
                order.createdDateStr = new Date(order.createdDate);
                return order;
            });
            this.showLoader = !true;


        });
    }
    getAllReceivedFullOrders(mallId, outletId,flikTime) {

        var getAllFullOrdersUrl = "/mall/" + mallId + "/outlet/all/getAllReceivedFullOrders";
        if(flikTime==0){
            this.showLoader = true;
        }
        this.oprovider.getOrders(getAllFullOrdersUrl).subscribe(resp => {
            this.fullorders = resp;
            this.fullorders = this.fullorders.map(order => {
                order.createdDateStr = new Date(order.createdDate);
                return order;
            });
            this.showLoader = !true;
        });
    }

    segmentChange(ordersList,flikTime) {
        this.segmentName = ordersList;
        if (ordersList === 'All') {
            if (this.mallId) {
                this.getAllFullOrders(this.mallId,flikTime);
            }
        } else if (ordersList === 'Pending') {

            this.getAllPendingFullOrders(this.mallId,flikTime);
        } else if (ordersList === 'InProgress') {

            this.getAllReceivedFullOrders(this.mallId, this.outletId,flikTime);
        } else {

        }
    }
    goOrderDetails(event, fullorder) {
        var senderElementName = event.target.tagName.toLowerCase();

        if (senderElementName === 'button') {

        } else {
            this.navCtrl.push(OrderDetailsPage, {
                fullorder: fullorder,
                type: "fullorders"
            });

        }

    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad OrdersPage');
        
    }

    ionViewDidEnter(){
        console.log('after load');
        this.clearIntervals = setInterval(function(){console.log(this.segmentName);this.segmentChange(this.segmentName,1)}.bind(this), 6000);
    }

    ionViewWillEnter() {
        if (this.mallId) {
            this.segmentChange('All',0);
            this.segmentSelect = "All";

        }
    }
    ionViewWillLeave(){
        console.log('this is after');
        clearInterval(this.clearIntervals);
    }

    ionViewDidLeave(){
        console.log('after leave OrdersPage');
        
    }
    newTop(){
        console.log('new content');
        this.segmentChange(this.segmentName,1);
        this.content.scrollToTop(400);
    }

}