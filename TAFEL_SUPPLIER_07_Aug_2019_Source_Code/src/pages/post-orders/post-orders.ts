import { Component, Renderer, ViewChild } from '@angular/core';
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
} from '../../common/endPointService';



@IonicPage()
@Component({
    selector: 'page-post-orders',
    templateUrl: 'post-orders.html',
})
export class PostOrdersPage {
    getAllCompletedFullOrdersResp: any;
    searchgetAllCompletedFullOrdersResp: any;
    mallId: string;
    userType: string = "";
    imageEndPoint: any;
    getMallDetailsResp: any = { address: { area: "", city: "", } };
    showLoader: boolean;
    accordionExpandedOne = true;
    accordionExpandedTwo = false;
    accordionExpandedThree = false;
    toDate: number;
    fromDate: number;
    searchTerm: string = '';
    isOpenedSearchBar: boolean = false;
    dayCount: number;
    allpermited:any;
    outletIds:any;
    outletId:any;
    getOutletDetailsVal: any = {name:""} ;
    constructor(public renderer: Renderer, public navCtrl: NavController, private storage: Storage, public navParams: NavParams, private oprovider: OrdersProvider) {

        this.imageEndPoint = imageEndPoint;
        this.getOutletDetailsVal.name ="";
        this.storage.get("ALL_PERMITABLE").then((val) => {
            this.allpermited = val;
            console.log(this.allpermited,"$$$$$$")
           

        });
        this.storage.get("OUTLET_ID").then((val) => {
            this.outletIds = val;
            this.outletId = this.outletIds[0];
           
        });
        this.storage.get("MALL_ID").then((val) => {
            let mallId=val;
            this.getOutletDetails(mallId,this.outletId);

        })

    }

    getMallDetails(mallId) {
        var getMallDetailsUrl = "/mall/" + mallId;
        this.showLoader = true;
        this.oprovider.getMallDetails(getMallDetailsUrl).subscribe(resp => {
            this.getMallDetailsResp = resp;
            this.showLoader = !true;
        });
    }
    getOutletDetails(mallId,outletId){
        var getMallDetailsUrl = "/mall/" + mallId+ "/outlet/"+outletId;
        this.oprovider.getOutletDetails(getMallDetailsUrl).subscribe(resp => {
            this.getOutletDetailsVal = resp;
console.log("this.getOutletDetailsVal", this.getOutletDetailsVal.name);

        });
    }
    getAllCompletedFullOrders(mallId, dayValue) {

        this.dayCount = dayValue;

        // 3days ago
        var threeDayStart = new Date();
        threeDayStart.setDate(threeDayStart.getDate() - 3);
        threeDayStart.setHours(0, 0, 0, 0);
        var threeDayEnd = new Date();
        threeDayEnd.setDate(threeDayEnd.getDate() - 3);
        threeDayEnd.setHours(23, 59, 59, 999);
        // 2days ago
        var twoDayStart = new Date();
        twoDayStart.setDate(twoDayStart.getDate() - 2);
        twoDayStart.setHours(0, 0, 0, 0);
        var twoDayEnd = new Date();
        twoDayEnd.setDate(twoDayEnd.getDate() - 2);
        twoDayEnd.setHours(23, 59, 59, 999);

        // 1 days ago
        var oneDayStart = new Date();
        oneDayStart.setDate(oneDayStart.getDate() - 1);
        oneDayStart.setHours(0, 0, 0, 0);
        var oneDayEnd = new Date();
        oneDayEnd.setDate(oneDayEnd.getDate() - 1);
        oneDayEnd.setHours(23, 59, 59, 999);

        //current day
        var currentStart = new Date();
        currentStart.setHours(0, 0, 0, 0);
        var currentEnd = new Date();
        currentEnd.setHours(23, 59, 59, 999);
        this.toDate = threeDayEnd.setHours(23, 59, 59, 999);
        this.fromDate = threeDayStart.setHours(0, 0, 0, 0);
        // if(dayValue===0){
        // 	this.toDate = currentEnd.setHours(23, 59, 59, 999);
        // 	this.fromDate = currentStart.setHours(0, 0, 0, 0);
        // }
        // if(dayValue===1){
        // 	this.toDate = oneDayEnd.setHours(23, 59, 59, 999);
        // 	this.fromDate = oneDayStart.setHours(0, 0, 0, 0);
        // }
        // if(dayValue===2){
        // 	this.toDate = twoDayEnd.setHours(23, 59, 59, 999);
        // 	this.fromDate = twoDayStart.setHours(0, 0, 0, 0);
        // }
        // if(dayValue===3){
        // 	this.toDate = threeDayEnd.setHours(23, 59, 59, 999);
        // 	this.fromDate = threeDayStart.setHours(0, 0, 0, 0);
        // }
        var getAllCompletedFullOrders = ""

        if(this.allpermited=="Yes"){
            
            getAllCompletedFullOrders = "/mall/" + mallId + "/outlet/all/getAllCompletedFullOrders/noOfDays/"+dayValue;//to/" + this.toDate + "/from/" + this.fromDate;/*"/mall/" + mallId + "/outlet/all/getAllCompletedFullOrders";*/

        }else{
             getAllCompletedFullOrders = "/mall/" + mallId + "/outlet/"+ this.outletId+"/getAllCompletedFullOrders/noOfDays/"+dayValue;//to/" + this.toDate + "/from/" + this.fromDate;/*"/mall/" + mallId + "/outlet/all/getAllCompletedFullOrders";*/

        }

        this.showLoader = true;
        this.oprovider.getCompleteOrder(getAllCompletedFullOrders).subscribe(resp => {
            this.getAllCompletedFullOrdersResp = resp;
            console.log(" this.getAllCompletedFullOrdersResp getCompleteOrder", this.getAllCompletedFullOrdersResp)

            this.getAllCompletedFullOrdersResp = this.getAllCompletedFullOrdersResp.map(order => {
                order.createdDateStr = new Date(order.modifiedDate);
                return order;
            });
            console.log("this.getAllCompletedFullOrdersResp map after",this.getAllCompletedFullOrdersResp);

            if (dayValue === 0) {
                // this.toDate = currentEnd.setHours(23, 59, 59, 999);
								// this.fromDate = currentStart.setHours(0, 0, 0, 0);
								this.getAllCompletedFullOrdersResp.filter((order) => {
									return (order.modifiedDate <= currentEnd.setHours(23, 59, 59, 999)) && (order.modifiedDate >= currentStart.setHours(0, 0, 0, 0));
                            });
                            console.log("this.getAllCompletedFullOrdersResp day 1",this.getAllCompletedFullOrdersResp);
            }
            if (dayValue === 1) {
                // this.toDate = oneDayEnd.setHours(23, 59, 59, 999);
								// this.fromDate = oneDayStart.setHours(0, 0, 0, 0);
								this.getAllCompletedFullOrdersResp.filter((order) => { 
									return (order.modifiedDate <= oneDayEnd.setHours(23, 59, 59, 999)) && (order.modifiedDate >= oneDayStart.setHours(0, 0, 0, 0));
                            });
                            this.setFilteredItems();
            }
            if (dayValue === 2) {
                // this.toDate = twoDayEnd.setHours(23, 59, 59, 999);
								// this.fromDate = twoDayStart.setHours(0, 0, 0, 0);
								this.getAllCompletedFullOrdersResp.filter((order) => {
									return (order.modifiedDate <= twoDayEnd.setHours(23, 59, 59, 999)) && (order.modifiedDate >= twoDayStart.setHours(0, 0, 0, 0));
							});
            }
            if (dayValue === 3) {
                // this.toDate = threeDayEnd.setHours(23, 59, 59, 999);
								// this.fromDate = threeDayStart.setHours(0, 0, 0, 0);
								this.getAllCompletedFullOrdersResp.filter((order) => {
									return (order.modifiedDate <= threeDayEnd.setHours(23, 59, 59, 999)) && (order.modifiedDate >= threeDayStart.setHours(0, 0, 0, 0));
							});
            }
            
            this.setFilteredItems();

            this.showLoader = !true;
        });
    }
    goOrderDetails(event, getAllCompletedFullOrdersResp) {
        console.log('sdkhfgsdfhsdfjhsdkf')
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
    ionViewWillEnter() {
        this.storage.get("USER_TYPE").then((val) => {
            this.userType = val;
            this.storage.get("MALL_ID").then((val) => {
                this.mallId = val;

                this.getMallDetails(this.mallId);
                this.getAllCompletedFullOrders(this.mallId, 1);
            });
        });


    }
    ionViewWillLeave() {
        console.log('this is after');
        this.accordionExpandedOne = true;
        this.accordionExpandedTwo = false;
        this.accordionExpandedThree = false;
    }



    menuitem() {
        console.log('sadfasjbsafghjsgfasfashdgfhas');
    }

    toggleAccordionOne() {
        if (this.accordionExpandedOne) {
            this.accordionExpandedOne = false;
            this.accordionExpandedTwo = false;
            this.accordionExpandedThree = false;
        } else {
            this.getAllCompletedFullOrders(this.mallId, 1);
            this.accordionExpandedOne = true;
            this.accordionExpandedTwo = false;
            this.accordionExpandedThree = false;
        }
    }
    toggleAccordionTwo() {
        if (this.accordionExpandedTwo) {
            this.accordionExpandedOne = false;
            this.accordionExpandedTwo = false;
            this.accordionExpandedThree = false;
        } else {
            this.getAllCompletedFullOrders(this.mallId, 2);
            this.accordionExpandedOne = false;
            this.accordionExpandedTwo = true;
            this.accordionExpandedThree = false;
        }
    }

    toggleAccordionThree() {
        if (this.accordionExpandedThree) {
            this.accordionExpandedOne = false;
            this.accordionExpandedTwo = false;
            this.accordionExpandedThree = false;
        } else {
            this.getAllCompletedFullOrders(this.mallId, 3);
            this.accordionExpandedOne = false;
            this.accordionExpandedTwo = false;
            this.accordionExpandedThree = true;
        }
    }

    setFilteredItems() { 
        console.log(this.searchTerm);
        console.log("getAllCompletedFullOrdersResp", this.getAllCompletedFullOrdersResp);
        this.searchgetAllCompletedFullOrdersResp = this.getAllCompletedFullOrdersResp.filter((order) => { 
            return order.fullOrder5DigitId.toString().indexOf(this.searchTerm) > -1;
        });
        console.log("searchgetAllCompletedFullOrdersResp", this.searchgetAllCompletedFullOrdersResp);




    }
    @ViewChild('search') search: any;

    autoFocusCursor(): void {
        setTimeout(() => {
            this.search.setFocus();
        }, 50);
    }
    cancelSearch() {
        this.isOpenedSearchBar = false;
        this.searchTerm = '';
        this.storage.get("USER_TYPE").then((val) => {
            this.userType = val;
            this.storage.get("MALL_ID").then((val) => {
                this.mallId = val;

                //this.getMallDetails(this.mallId);
                this.getAllCompletedFullOrders(this.mallId, this.dayCount);
            });
        });

    }


}
