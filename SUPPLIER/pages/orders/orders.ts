import { Component, ViewChild } from '@angular/core';
import { NavController, Content, Platform, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { OrdersProvider } from '../../provider/orders/orders';
import { imageEndPoint } from '../../common/properties';
import { Storage } from '@ionic/storage';
import { OrderDetailsPage } from '../order-details/order-details';
import { AppVersion } from '@ionic-native/app-version';
import { ProfileProvider } from '../../provider/profile/profile';
import {
    RejectorderPage
} from '../../pages/rejectorder/rejectorder';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {
    CallNumber
}
    from '@ionic-native/call-number';
import { ConditionalExpr } from '@angular/compiler';
@Component({
    selector: 'page-orders',
    templateUrl: 'orders.html',
})

export class OrdersPage {
    delivaryCharges: any;
    showVeg = false;
    showNonVeg = false;
    callDinerValue: any;
    public quantity = 1;
    public maxQuantity = 1;
    fullordersmap: any;
    itemDetailsStore: any;
    itemDetailsNameString: any;
    itemDetailsName: any;
    fullOrder5DigitId: any;
    public dynamicText: String = "";
    public dynamicTextKOT: String = "";
    printOrderDetails: any;
    getAmount: any;
    showBlack = false;
    showAcceptedBlock = false;
    showPendingBlock = false;
    showhandedOverBlock = true;
    showReadyBlock = false;
    getAllPendingFullOrdersLength = 0;
    getAllHandedOverOrdersLength = 0;
    getAllReadyFullOrdersLength = 0;
    getAllReceivedFullOrdersLength = 0;
    getCgst: any;
    getreceivedAmount: any;
    getrejectAmount: any;
    getSgst: any;
    getconvenience: any;
    getpackagingCharge: any;
    getGrandTotal: any;
    getOrderId: any;
    public fullOrderObjects: any = [];
    public fullOrderObjectsResp: any = {};
    orderDetailsResp: any;
    k = 0;
    public fullorder: any = [];
    public fullOrderstatus = "";

    outletorderArrayMap: any;
    outletOrdersDetails: any;
    fullOrderCount = 0;
    pendingOrderCount = 0;
    acceptedOrderCount = 0;
    readyOrderCount = 0;
    hadedOverCount = 0;
    itemFullName = [];
    handedHoverCount = 0;
    searchFullOrderCount = 0;
    searchPendingOrderCount = 0;
    searchAcceptedOrderCount = 0;
    searchReadyOrderCount = 0;
    ordersList: string = "All";
    //itemName = "Chicken Biryani(3), Mutton Birayani(5) lassi(7), coca cola(2), etc.";
    outletIds: string[];
    getOutletDetailsVal: any = {name:""} ;
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
    searchFullorders: any = [];
    supplierId: string;
    originalPendingOrders: any = [];
    segmentSelect: string = "Pending";
    showLoader: boolean;
    showOrderLoader: boolean;
    segmentName: string;
    clearIntervals: number;
    searchTerm: string = '';
    isOpenedSearchBar: boolean = false;
    versionNumber = 'unknown';
    searchFalse: boolean = true;
    toDate: any;
    fromDate: any;
    fullAllOrderDetails: any;
    loadingDiv: any;
    allpermited:any;
    @ViewChild(Content) content: Content;
    constructor(public loadingctrl: LoadingController, public appBrowser: InAppBrowser, private callNumber: CallNumber,
         private toastCtrl: ToastController, public navCtrl: NavController, public modalCtrl: ModalController,
        private oprovider: OrdersProvider, private storage: Storage, private appVersion: AppVersion, 
        public platform: Platform, private alertCtrl: AlertController,private profile :ProfileProvider
    ) {
        this.segmentName = 'Pending';
      
        this.getOutletDetailsVal.name ="";

        this.storage.get("OUTLET_ID").then((val) => {
            this.outletIds = val;
            this.outletId = this.outletIds[0];
            this.orders = 'pending';
        });
        this.storage.get("ALL_PERMITABLE").then((val) => {
            this.allpermited = val;
            console.log(this.allpermited,"$$$$$$")
            // this.outletIds = val;
            // this.outletId = this.outletIds[0];
            // this.orders = 'pending';

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
                                    this.doRefresh(0);
                                    this.segmentChange('Pending', 0);
                                    this.getorderCount();

                                    this.getMallDetails(this.mallId);
                                    this.getOutletDetails(this.mallId,this.outletIds[0]);
 
                                    for (var i = 0; i < this.outlets.length; i++) {
                                        if (this.outlets[i].id == "All") {

                                            this.getAllFullOrders(this.mallId, 0);
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
    getOutletDetails(mallId,outletId){
        var getMallDetailsUrl = "/mall/" + mallId+ "/outlet/"+outletId;
        this.oprovider.getOutletDetails(getMallDetailsUrl).subscribe(resp => {
            this.getOutletDetailsVal = resp;
        console.log("this.getOutletDetailsVal", this.getOutletDetailsVal.name);

        });
    }
    getMallDetails(mallId) {
        var getMallDetailsUrl = "/mall/" + mallId;

        this.oprovider.getMallDetails(getMallDetailsUrl).subscribe(resp => {
            this.getMallDetailsResp = resp;
            console.log("this.getMallDetailsResp", this.getMallDetailsResp);


        });
    }
    doRefresh(refresher) {
        if(this.segmentName=='Pending'){
            this.segmentChange(this.segmentName, 1);
        }
        if (refresher != 0) {
            refresher.complete();
        }
    }

    getAllFullOrders(mallId, flikTime) {
       
        this.getAllReceivedFullOrders(mallId, "", flikTime);

        // });
    }
    checkAllpermiatable(type,mallId){
        //this.profile.getSupplierProfile(this.supplierId).subscribe(resp =>{
          if(this.allpermited =="Yes"){
              if(type == "PENDING"){
                return "/mall/" + mallId + "/outlet/all/getAllPendingFullOrders";
              }
              else if(type =="RECEIVED"){
                return "/mall/" + mallId + "/outlet/all/getAllReceivedFullOrders";
              }
              else if(type =="READY"){
                return "/mall/" + mallId + "/outlet/all/getAllReadyFullOrders";
              }
              else if(type =="HANDEDOVER"){
                return "/mall/" + mallId + "/outlet/all/getAllCompletedFullOrders";
              }
              else if(type =="count"){
                return "/mall/" + mallId + "/outletid/all/page/liveOrder/getAllOrderStatusCount";
              }

          }
          else{
            if(type == "PENDING"){
                return "/mall/" + mallId + "/outlet/"+this.outletId+"/getAllPendingOrders";
              }
              else if(type =="RECEIVED"){
                return "/mall/" + mallId + "/outlet/"+this.outletId+"/getAllReceivedOrders";
              }
              else if(type =="READY"){
                return "/mall/" + mallId + "/outlet/"+this.outletId+"/getAllReadyOrders";
              }
              else if(type =="HANDEDOVER"){
                return "/mall/" + mallId + "/outlet/"+this.outletId+"/getAllCompletedOrders";
              }
              else if(type =="count"){
                return "/mall/" + mallId + "/outletid/"+this.outletId+"/page/liveOrder/getAllOrderStatusCount";
              }
          }
        //});

    }
    getAllPendingFullOrders(mallId, flikTime) {
        
        
        var getAllFullOrdersUrl = this.checkAllpermiatable("PENDING",mallId);
        if (flikTime == 0) {
            this.showLoader = true;
        }
        this.oprovider.getOrders(getAllFullOrdersUrl).subscribe(resp => {
            this.fullorders = resp;
            
           
            let itemDesc = '';
            for (let i = 0; i < this.fullorders.length; i++) {

                let orderletObj = [];
                let orderletActualObjs = []
                let jmOrderLet = this.fullorders[i].jmOrderLet;
             
                for (let j = 0; j < jmOrderLet.length; j++) {

                    if (orderletObj.indexOf(jmOrderLet[j].itemName) == -1) {

                        orderletObj.push(jmOrderLet[j].itemName);
                        let orderletObjVal = {
                            "itemName": jmOrderLet[j].itemName,
                            "data": [jmOrderLet[j]],
                            "itemPrice": jmOrderLet[j].itemPrice,
                            "itemType": jmOrderLet[j].itemtype

                        }
                        orderletObjVal['rejecetdItems'] = []
                        orderletObjVal['NonrejecetdItems'] = [];
                        if (jmOrderLet[j].status == "REJECTED") {
                            orderletObjVal['rejecetdItems'].push(jmOrderLet[j]);
                        }
                        else {
                            orderletObjVal['NonrejecetdItems'].push(jmOrderLet[j]);
                        }
                        orderletActualObjs.push(orderletObjVal);
                    }
                    else {
                        for (let k = 0; k < orderletActualObjs.length; k++) {
                            if (orderletActualObjs[k].itemName == jmOrderLet[j].itemName) {

                                orderletActualObjs[k].data.push(jmOrderLet[j]);


                                if (jmOrderLet[j].status == "REJECTED") {
                                  
                                    orderletActualObjs[k]['rejecetdItems'].push([jmOrderLet[j]]);
                                }
                                else {
                                  
                                    orderletActualObjs[k]['NonrejecetdItems'].push([jmOrderLet[j]]);
                                }

                                break;
                            }

                        }
                    }

                    this.fullorders[i].orderlets = orderletActualObjs;

                    //itemDesc = itemDesc + orderletActualObjs[i].itemName + '('+orderletActualObjs[i].data.length+')';
                    this.fullorders[i].createdDateStr = new Date(this.fullorders[i].modifiedDate);
                    var name = "";
                    for (var temp = 0; temp < orderletActualObjs.length; temp++) {


                        if (temp == 0) {
                            name = orderletActualObjs[temp].itemName + "(" + orderletActualObjs[temp].data.length + ")"
                        }
                        else {
                            name = name + "," + orderletActualObjs[temp].itemName + "(" + orderletActualObjs[temp].data.length + ")"
                        }



                    }
                    this.fullorders[i].typeOfDinning = this.getMallDetailsResp.typeOfDining;
                  
                    if (this.getMallDetailsResp.typeOfDining === "CINEMAS") {
                        var dinnerAddress = this.fullorders[i].orderlets[0].data[0].dinnerVehicleNumber;
                        if (dinnerAddress)
                        {
                        var splitDinnerAddress = dinnerAddress.split(",");
                        
                        
                        this.fullorders[i].deliveryAddress = splitDinnerAddress[0];
                       
                        this.fullorders[i].deliveryAddress1 = splitDinnerAddress[1];
                       
                        this.fullorders[i].deliveryAddress2 = splitDinnerAddress[2];
                        this.fullorders[i].deliveryAddress3=splitDinnerAddress[3];
                        }
                    }
                    else {
                        var dinnerAddress = this.fullorders[i].orderlets[0].data[0].dinnerVehicleNumber;
                        if (dinnerAddress)
                        {
                        var splitDinnerAddress = dinnerAddress.split(",");
                        
                       
                        this.fullorders[i].deliveryAddress = splitDinnerAddress[0];
                       
                       
                        this.fullorders[i].deliveryAddress1 =splitDinnerAddress[1];
                        this.fullorders[i].deliveryAddress2 = splitDinnerAddress[2];
                        this.fullorders[i].deliveryAddress3=splitDinnerAddress[3];
                        }
                    }
                    this.fullorders[i].name = name;
                    this.fullorders[i].phoneNumber = this.fullorders[i].orderlets[0].data[0].dinnerPhoneNumber;
                  


                }

             


            }
            this.getAllPendingFullOrdersLength = this.fullorders.length;
          
            this.setFilteredItems();
            this.showLoader = !true;


        });
    }
    getAllReadyFullOrders(mallId, outletId, flikTime) {

        var getAllFullOrdersUrl =this.checkAllpermiatable("READY",mallId);
        if (flikTime == 0) {
            this.showLoader = true;
        }
        this.oprovider.getOrders(getAllFullOrdersUrl).subscribe(resp => {
            this.fullorders = resp;
            
          
            let itemDesc = '';
            for (let i = 0; i < this.fullorders.length; i++) {

                let orderletObj = [];
                let orderletActualObjs = []
                let jmOrderLet = this.fullorders[i].jmOrderLet;
              
                for (let j = 0; j < jmOrderLet.length; j++) {

                    if (orderletObj.indexOf(jmOrderLet[j].itemName) == -1) {

                        orderletObj.push(jmOrderLet[j].itemName);
                        let orderletObjVal = {
                            "itemName": jmOrderLet[j].itemName,
                            "data": [jmOrderLet[j]],
                            "itemPrice": jmOrderLet[j].itemPrice,
                            "itemType": jmOrderLet[j].itemtype

                        }
                        orderletObjVal['rejecetdItems'] = []
                        orderletObjVal['NonrejecetdItems'] = [];
                        if (jmOrderLet[j].status == "REJECTED") {
                            orderletObjVal['rejecetdItems'].push(jmOrderLet[j]);
                        }
                        else {
                            orderletObjVal['NonrejecetdItems'].push(jmOrderLet[j]);
                        }
                        orderletActualObjs.push(orderletObjVal);
                    }
                    else {
                        for (let k = 0; k < orderletActualObjs.length; k++) {
                            if (orderletActualObjs[k].itemName == jmOrderLet[j].itemName) {

                                orderletActualObjs[k].data.push(jmOrderLet[j]);


                                if (jmOrderLet[j].status == "REJECTED") {
                                 
                                    orderletActualObjs[k]['rejecetdItems'].push([jmOrderLet[j]]);
                                }
                                else {
                                  
                                    orderletActualObjs[k]['NonrejecetdItems'].push([jmOrderLet[j]]);
                                }

                                break;
                            }

                        }
                    }

                    this.fullorders[i].orderlets = orderletActualObjs;

                  
                    this.fullorders[i].createdDateStr = new Date(this.fullorders[i].modifiedDate);
                    var name = "";
                    for (var temp = 0; temp < orderletActualObjs.length; temp++) {


                        if (temp == 0) {
                            name = orderletActualObjs[temp].itemName + "(" + orderletActualObjs[temp].data.length + ")"
                        }
                        else {
                            name = name + "," + orderletActualObjs[temp].itemName + "(" + orderletActualObjs[temp].data.length + ")"
                        }



                    }
                    this.fullorders[i].typeOfDinning = this.getMallDetailsResp.typeOfDining;
                   
                    if (this.getMallDetailsResp.typeOfDining === "CINEMAS") {
                        var dinnerAddress = this.fullorders[i].orderlets[0].data[0].dinnerVehicleNumber;
                        if (dinnerAddress)
                        {
                        var splitDinnerAddress = dinnerAddress.split(",");
                        
                       
                        this.fullorders[i].deliveryAddress = splitDinnerAddress[0];
                       
                        this.fullorders[i].deliveryAddress1 = splitDinnerAddress[1];
                       
                        this.fullorders[i].deliveryAddress2 = splitDinnerAddress[2];
                        this.fullorders[i].deliveryAddress3=splitDinnerAddress[3];
                        }
                    }
                    else {
                        var dinnerAddress = this.fullorders[i].orderlets[0].data[0].dinnerVehicleNumber;
                        if (dinnerAddress)
                        {
                        var splitDinnerAddress = dinnerAddress.split(",");
                        
                      
                        this.fullorders[i].deliveryAddress = splitDinnerAddress[0];
                       
                       
                        this.fullorders[i].deliveryAddress1 =splitDinnerAddress[1];
                        this.fullorders[i].deliveryAddress2 = splitDinnerAddress[2];
                        this.fullorders[i].deliveryAddress3=splitDinnerAddress[3];
                        }
                    }
                    this.fullorders[i].name = name;
                    this.fullorders[i].phoneNumber = this.fullorders[i].orderlets[0].data[0].dinnerPhoneNumber;
                 


                }

            


            }
         
            this.getAllReadyFullOrdersLength = this.fullorders.length;
            this.setFilteredItems();
            this.showLoader = !true;
        });
    }
    getAllReceivedFullOrders(mallId, outletId, flikTime) {
        var getAllFullOrdersUrl = this.checkAllpermiatable("RECEIVED",mallId);
        if (flikTime == 0) {
            this.showLoader = true;
        }
        this.oprovider.getOrders(getAllFullOrdersUrl).subscribe(resp => {
            this.fullorders = resp;
            
         

            let itemDesc = '';
            for (let i = 0; i < this.fullorders.length; i++) {

                let orderletObj = [];
                let orderletActualObjs = []
                let jmOrderLet = this.fullorders[i].jmOrderLet;
             
                for (let j = 0; j < jmOrderLet.length; j++) {

                    if (orderletObj.indexOf(jmOrderLet[j].itemName) == -1) {

                        orderletObj.push(jmOrderLet[j].itemName);
                        let orderletObjVal = {
                            "itemName": jmOrderLet[j].itemName,
                            "data": [jmOrderLet[j]],
                            "itemPrice": jmOrderLet[j].itemPrice,
                            "itemType": jmOrderLet[j].itemtype

                        }
                        orderletObjVal['rejecetdItems'] = []
                        orderletObjVal['NonrejecetdItems'] = [];
                        if (jmOrderLet[j].status == "REJECTED") {
                            orderletObjVal['rejecetdItems'].push(jmOrderLet[j]);
                        }
                        else {
                            orderletObjVal['NonrejecetdItems'].push(jmOrderLet[j]);
                        }
                        orderletActualObjs.push(orderletObjVal);
                    }
                    else {
                        for (let k = 0; k < orderletActualObjs.length; k++) {
                            if (orderletActualObjs[k].itemName == jmOrderLet[j].itemName) {

                                orderletActualObjs[k].data.push(jmOrderLet[j]);


                                if (jmOrderLet[j].status == "REJECTED") {
                                 
                                    orderletActualObjs[k]['rejecetdItems'].push(jmOrderLet[j]);
                                }
                                else {
                                   
                                    orderletActualObjs[k]['NonrejecetdItems'].push(jmOrderLet[j]);
                                }

                                break;
                            }

                        }
                    }

                    this.fullorders[i].orderlets = orderletActualObjs;

                   
                    this.fullorders[i].createdDateStr = new Date(this.fullorders[i].modifiedDate);
                    var name = "";
                    for (var temp = 0; temp < orderletActualObjs.length; temp++) {


                        if (temp == 0) {
                            name = orderletActualObjs[temp].itemName + "(" + orderletActualObjs[temp].data.length + ")"
                        }
                        else {
                            name = name + "," + orderletActualObjs[temp].itemName + "(" + orderletActualObjs[temp].data.length + ")"
                        }



                    }
                    this.fullorders[i].typeOfDinning = this.getMallDetailsResp.typeOfDining;
                  
                    if (this.getMallDetailsResp.typeOfDining === "CINEMAS") {
                        var dinnerAddress = this.fullorders[i].orderlets[0].data[0].dinnerVehicleNumber;
                        if (dinnerAddress)
                        {
                       
                       
                        var splitDinnerAddress = dinnerAddress.split(",");
                        
                      
                        this.fullorders[i].deliveryAddress = splitDinnerAddress[0];
                       
                        this.fullorders[i].deliveryAddress1 = splitDinnerAddress[1];
                       
                        this.fullorders[i].deliveryAddress2 = splitDinnerAddress[2];
                        this.fullorders[i].deliveryAddress3=splitDinnerAddress[3];
                        
                        }
                    }
                    else {
                        var dinnerAddress = this.fullorders[i].orderlets[0].data[0].dinnerVehicleNumber;
                        if (dinnerAddress)
                        {
                        var splitDinnerAddress = dinnerAddress.split(",");
                       
                       
                        this.fullorders[i].deliveryAddress = splitDinnerAddress[0];
                      
                      
                        this.fullorders[i].deliveryAddress1 =splitDinnerAddress[1];
                        this.fullorders[i].deliveryAddress2 = splitDinnerAddress[2];
                        this.fullorders[i].deliveryAddress3=splitDinnerAddress[3];
                        }
                    }
                    this.fullorders[i].phoneNumber = this.fullorders[i].orderlets[0].data[0].dinnerPhoneNumber;
                    this.fullorders[i].descString = name.length > 60 ? name.substring(0, 54) + '...etc' : name;
                    this.fullorders[i].itemFullName = [];
                    this.fullorders[i].itemFullName[0] = this.fullorders[i].descString.substring(0, 29);
                    this.fullorders[i].itemFullName[1] = this.fullorders[i].descString.substring(29, 60);
                  
                    if (name.length > 60) {
                        this.fullorders[i].showAcceptDecline = false;
                    } else {
                        this.fullorders[i].showAcceptDecline = true;
                    }


                }

             


            }
          
            this.getAllReceivedFullOrdersLength = this.fullorders.length;
            this.setFilteredItems();
            this.showLoader = !true;
        });
    }



    getAllHandedOverOrders(mallId, outletId, flikTime) {


        var currentStart = new Date();
        currentStart.setHours(0, 0, 0, 0);
        var currentEnd = new Date();
        currentEnd.setHours(23, 59, 59, 999);


        var oneDayStart = new Date();
        oneDayStart.setDate(oneDayStart.getDate() - 1);
        oneDayStart.setHours(0, 0, 0, 0);
        var oneDayEnd = new Date();
        oneDayEnd.setDate(oneDayEnd.getDate() - 1);
        oneDayEnd.setHours(23, 59, 59, 999);

        this.toDate = currentEnd.setHours(23, 59, 59, 999);
        this.fromDate = oneDayStart.setHours(0, 0, 0, 0);
        var getAllFullOrdersUrl = this.checkAllpermiatable("HANDEDOVER",mallId);
        // var getAllFullOrdersUrl = "/mall/" + mallId + "/outlet/all/getAllCompletedFullOrders/to/" + this.toDate + "/from/" + this.fromDate;/*"/mall/" + mallId + "/outlet/all/getAllCompletedFullOrders";*/
        if (flikTime == 0) {
            this.showLoader = true;
        }
        this.oprovider.getOrders(getAllFullOrdersUrl).subscribe(resp => {
            this.fullorders = resp;
            console.log("this.fullorders", this.fullorders);
            let itemDesc = '';
            for (let i = 0; i < this.fullorders.length; i++) {
                let orderletObj = [];
                let orderletActualObjs = []
                let jmOrderLet = this.fullorders[i].jmOrderLet;             
                for (let j = 0; j < jmOrderLet.length; j++) {
                    if (orderletObj.indexOf(jmOrderLet[j].itemName) == -1) {
                        orderletObj.push(jmOrderLet[j].itemName);
                        let orderletObjVal = {
                            "itemName": jmOrderLet[j].itemName,
                            "data": [jmOrderLet[j]],
                            "itemPrice": jmOrderLet[j].itemPrice,
                            "itemType": jmOrderLet[j].itemtype
                        }
                        orderletObjVal['rejecetdItems'] = []
                        orderletObjVal['NonrejecetdItems'] = [];
                        if (jmOrderLet[j].status == "REJECTED") {
                            orderletObjVal['rejecetdItems'].push(jmOrderLet[j]);
                        }
                        else {
                            orderletObjVal['NonrejecetdItems'].push(jmOrderLet[j]);
                        }
                        orderletActualObjs.push(orderletObjVal);
                    }
                    else {
                        for (let k = 0; k < orderletActualObjs.length; k++) {
                            if (orderletActualObjs[k].itemName == jmOrderLet[j].itemName) {
                                orderletActualObjs[k].data.push(jmOrderLet[j]);
                                if (jmOrderLet[j].status == "REJECTED") {                                
                                    orderletActualObjs[k]['rejecetdItems'].push([jmOrderLet[j]]);
                                }
                                else {                                 
                                    orderletActualObjs[k]['NonrejecetdItems'].push([jmOrderLet[j]]);
                                }
                                break;
                            }
                        }
                    }
                    this.fullorders[i].orderlets = orderletActualObjs;                 
                    this.fullorders[i].createdDateStr = new Date(this.fullorders[i].modifiedDate);
                    var name = "";
                    for (var temp = 0; temp < orderletActualObjs.length; temp++) {
                        if (temp == 0) {
                            name = orderletActualObjs[temp].itemName + "(" + orderletActualObjs[temp].data.length + ")"
                        }
                        else {
                            name = name + "," + orderletActualObjs[temp].itemName + "(" + orderletActualObjs[temp].data.length + ")"
                        }
                    }
                    this.fullorders[i].typeOfDinning = this.getMallDetailsResp.typeOfDining;
                    console.log("this.getMallDetailsResp.typeOfDining ready",this.getMallDetailsResp.typeOfDining)
                    if (this.getMallDetailsResp.typeOfDining === "CINEMAS") {
                        var dinnerAddress = this.fullorders[i].orderlets[0].data[0].dinnerVehicleNumber;
                        if (dinnerAddress)
                        {
                        var splitDinnerAddress = dinnerAddress.split(",");                       
                        this.fullorders[i].deliveryAddress = splitDinnerAddress[0];
                        this.fullorders[i].deliveryAddress1 = splitDinnerAddress[1];
                        this.fullorders[i].deliveryAddress2 = splitDinnerAddress[2];
                        this.fullorders[i].deliveryAddress3=splitDinnerAddress[3];
                        }
                    }
                    else {
                        var dinnerAddress = this.fullorders[i].orderlets[0].data[0].dinnerVehicleNumber;
                        if (dinnerAddress)
                        {
                        var splitDinnerAddress = dinnerAddress.split(",");
                        this.fullorders[i].deliveryAddress = splitDinnerAddress[0];
                        this.fullorders[i].deliveryAddress1 =splitDinnerAddress[1];
                        this.fullorders[i].deliveryAddress2 = splitDinnerAddress[2];
                        this.fullorders[i].deliveryAddress3=splitDinnerAddress[3];
                        }
                    }
                    this.fullorders[i].name = name;
                    this.fullorders[i].phoneNumber = this.fullorders[i].orderlets[0].data[0].dinnerPhoneNumber;
                }
            }
            this.fullorders = this.fullorders.map(order => {
                order.createdDateStr = new Date(order.modifiedDate);
                return order;
            });
            
            this.fullorders = this.fullorders.filter((order) => {
                return (order.modifiedDate <= currentEnd.setHours(23, 59, 59, 999)) && (order.modifiedDate >= currentStart.setHours(0, 0, 0, 0));
            });
            this.getAllHandedOverOrdersLength = this.fullorders.length;
         
            this.setFilteredItems();
            this.showLoader = !true;

        });


    }

    setFilteredLocations(ev: any) {
        let val = ev.target.value;

        if (val && val.trim() !== '') {
            return this.fullorders(val);
        }

    }

    segmentChange(ordersList, flikTime) {  

        this.segmentName = ordersList;

        if (ordersList === 'All') {
            if (this.mallId) {
                this.getAllFullOrders(this.mallId, flikTime);
            }
        } else if (ordersList === 'Pending') {
            this.k = -1;
            this.showAcceptedBlock = false;
            this.showPendingBlock = true;
            this.showhandedOverBlock = true;
            this.showReadyBlock = false;
            this.getAllReceivedFullOrders(this.mallId, this.outletId, flikTime);



        } else if (ordersList === 'Accepted') {
            this.k = -1;
            this.showAcceptedBlock = true;
            this.showPendingBlock = false;
            this.showhandedOverBlock = true;
            this.showReadyBlock = false;
            this.getAllPendingFullOrders(this.mallId, flikTime);

        } else if (ordersList === 'Ready') {
            this.k = -1;
            this.showAcceptedBlock = false;
            this.showPendingBlock = false;
            this.showhandedOverBlock = true;
            this.showReadyBlock = true;
            this.getAllReadyFullOrders(this.mallId, this.outletId, flikTime);

        } else if (ordersList === 'handedOver') {
            this.k = -1;
            this.showAcceptedBlock = false;
            this.showPendingBlock = false;
            this.showhandedOverBlock = false;
            this.showReadyBlock = false;
            this.getAllHandedOverOrders(this.mallId, this.outletId, flikTime);

        }
    }

    goOrderDetails(event, fullorder, x) {
        
          
            if (this.k == x) {
                this.k = -1;
                var descStringLength = fullorder.itemFullName[0] + fullorder.itemFullName[1]
                if (descStringLength.includes('...etc')) {
                    fullorder.showAcceptDecline = false;
                }

            } else {
                fullorder.showAcceptDecline = true;
                this.k = x;
                var senderElementName = event.target.tagName.toLowerCase();
               
                this.showOrderLoader = true;
                this.fullOrderObjects = [];
                if (senderElementName === 'ion-col' || senderElementName === 'p') {
                  
                } else {

                   

                    this.getOrderDetails(fullorder);

                }
            }
        


    }
    getOrderDetails(orderData) {
        console.log("orderData.orderlets", orderData.orderlets);
        this.outletOrdersDetails = orderData.orderlets;
        var outletOrderDetailsVal = orderData.orderlets
        let received = 1
        let inprogress = 2
        let rejected = 3

        let minStatus = 10;

        var statusMap = {
            "RECEIVED": 1,
            "INPROGRESS": 2,
            "READY": 3,
            "COMPLETED": 4,
            "REJECETED": 5

        }
     

        for (var i = 0; i < this.outletOrdersDetails.length; i++) {
            minStatus = 10;
            for (var j = 0; j < this.outletOrdersDetails[i].data.length; j++) {
                if (minStatus > statusMap[this.outletOrdersDetails[i].data[j].status]) {
                    minStatus = statusMap[this.outletOrdersDetails[i].data[j].status];
                 
                }
            }
            if (minStatus == 1) {
                this.outletOrdersDetails[i].status = "RECEIVED"
            }
            else if (minStatus == 2) {
                this.outletOrdersDetails[i].status = "INPROGRESS"
            }
            else if (minStatus == 3) {
                this.outletOrdersDetails[i].status = "READY"
            }
            else if (minStatus == 4) {
                this.outletOrdersDetails[i].status = "COMPLETED"
            } else {
                this.outletOrdersDetails[i].status = "REJECTED"
            }

            this.outletOrdersDetails[i].rejectedCount = this.outletOrdersDetails[i].data.length

        }



        this.showOrderLoader = false;




    }
    camelize(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
            return index == 0 ? letter.toUpperCase() : letter.toLowerCase();
        }).replace(/\s+/g, '');
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad OrdersPage');

    }

    ionViewDidEnter() {
        console.log('after load');
        this.clearIntervals = setInterval(function () { console.log(this.segmentName); this.segmentChange(this.segmentName, 1) }.bind(this), 60000);
    }

    showDiv=true;
    buzzerOnOff(){
        this.showDiv=!this.showDiv
        var element = document.getElementById("pullout");
        if(!this.showDiv){
            element.classList.add("active");
        }
        else{
            element.classList.remove("active");
        }
    }
    i=60000
    buzzer=true 


    // getPendingStatusCount(){
    //     var ordeLetLevelurl = "/mallt" + this.mallId + "/outletid/all/page/liveOrder/getAllOrderStatusCount";
    //     this.oprovider.callRefundAmountServiceOrderLet(ordeLetLevelurl).subscribe(resp => {


    //     })
    // }
    getorderCount(){
        var getAllFullOrdersUrl = this.checkAllpermiatable("count", this.mallId);
        this.oprovider.getOrderCount(getAllFullOrdersUrl).subscribe(resp => {   
            this.getAllReceivedFullOrdersLength = resp['recieved'];
            this.getAllPendingFullOrdersLength=resp['inprogress']
            this.getAllReadyFullOrdersLength=resp['ready']
            this.getAllHandedOverOrdersLength=resp['completed'] + resp['rejected']
        });
    }
    ionViewWillEnter() {
        if (this.mallId) {
            this.segmentChange('Pending', 0);
            this.segmentSelect = "Pending";

        }
        setInterval(function(){
           this.getorderCount() 
             
        }.bind(this), 30000 );
     
        setInterval(function(){
            console.log("@@@@@@@@@@@@@@@@@@@@@",this.getAllReceivedFullOrdersLength)
            if(this.buzzer && this.getAllReceivedFullOrdersLength > 0){
                this.i=70000;
                var audio = new Audio('assets/alertAlarm.mp3');
                audio.play();
            }else{
                this.i=60000;
            }
         }.bind(this), this.i );
    }

    ionViewWillLeave() {
        console.log('this is after');
        clearInterval(this.clearIntervals);
    }

    ionViewDidLeave() {
        console.log('after leave OrdersPage');

    }
    newTop() {

        this.segmentChange(this.segmentName, 1);
        this.content.scrollToTop(400);
    }
    setFilteredItems() {
        this.searchTerm = this.searchTerm.toUpperCase();
        if (!this.searchTerm) {
            this.searchFalse = true;
        } else {
            this.searchFalse = false;
        }
        this.searchFullorders = this.fullorders.filter((order) => {
            return order.fullOrder5DigitId.toString().indexOf(this.searchTerm) > -1;
        })
      



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
        this.segmentChange(this.segmentName, 1);

    }
    callDiner(phNumber) {
     
        this.callNumber.callNumber(phNumber, true).then(res => console.log('Launched dialer!', res)).catch(err => console.log('Error launching dialer', err));
    }
    appendPrint(name, price, quantity) {

        var itemPrice = price / quantity;
        var stringSpaceitem = '';
        if (itemPrice.toString().length == 5) {
            stringSpaceitem = ' ' + itemPrice.toFixed(2);
        }
        else if (itemPrice.toString().length == 4) {
            stringSpaceitem = '  ' + itemPrice.toFixed(2);
        } else if (itemPrice.toString().length == 3) {
            stringSpaceitem = '   ' + itemPrice.toFixed(2);
        }
        else if (itemPrice.toString().length == 2) {
            stringSpaceitem = '    ' + itemPrice.toFixed(2);
        }
        else if (itemPrice.toString().length == 1) {
            stringSpaceitem = '     ' + itemPrice.toFixed(2);
        }

        var stringSpace = '';
        if (price.toString().length == 5) {
            stringSpace = ' ' + price.toFixed(2);
        }
        else if (price.toString().length == 4) {
            stringSpace = '  ' + price.toFixed(2);
        } else if (price.toString().length == 3) {
            stringSpace = '   ' + price.toFixed(2);
        }
        else if (price.toString().length == 2) {
            stringSpace = '    ' + price.toFixed(2);
        }
        else if (price.toString().length == 1) {
            stringSpace = '     ' + price.toFixed(2);
        }
        var qtySpace = '';
        if (quantity.toString().length == 2) {
            qtySpace = quantity + '';
        }
        else if (quantity.toString().length == 1) {
            qtySpace = quantity + ' ';
        }
        this.dynamicText = this.dynamicText + '<text>' + name + '    ' + qtySpace + ' ' + stringSpaceitem + ' ' + stringSpace + '&#10;</text>\n';
      
    }
    appendPrintKOT(name, quantity) {
        var qtySpace = '';
        if (quantity.toString().length == 2) {
            qtySpace = quantity + '';
        }
        else if (quantity.toString().length == 1) {
            qtySpace = quantity + ' ';
        }
        this.dynamicTextKOT = this.dynamicTextKOT + '<text>'+ qtySpace + ' ' + name + '&#10;</text>\n';
      
    }
    acceptFullOrder(fullorder) {
        var url ="";
        if(this.allpermited=="Yes"){
            url = "/malls/" + fullorder.mallId + "/fullorder/" + fullorder.id + "/statusChange";

        }else{
            url = "/malls/" + fullorder.mallId + "/order/" + fullorder.jmOrderLet[0].orderId + "/statusChange"; 
        }
        this.showLoader = true;
        this.oprovider.updateStatusChange(url, "INPROGRESS", 0, "",fullorder.id).subscribe(resp => {

            this.showLoader = false
          
            this.pendingOrderCount = this.pendingOrderCount - 1;
            this.acceptedOrderCount = this.acceptedOrderCount + 1;
            this.showToast('bottom', 'Order has been moved to Accepted');
            var orderType = this.fullorder.orderType;
            if (orderType === "Pickup") {
                var orderTypeGet = "DINEIN";
            }
            else {
                var orderTypeGet = "DELIVERY";
            }
            var mallNameGet = (this.getMallDetailsResp.name).toUpperCase();
            var mallName = mallNameGet;
            var mallNameResteurant = mallNameGet;
            var rejorderletIds = '';
            let rejectedItemsArray = [];
            let rejectedFullArray = [];
            for (var i = 0; i < fullorder.orderlets.length; i++) {
                for (var j = 0; j < fullorder.orderlets[i].rejecetdItems.length; j++) {
                    rejectedItemsArray.push({ "id": fullorder.orderlets[i].rejecetdItems[j].id });
                    rejectedFullArray.push(fullorder.orderlets[i].rejecetdItems[j]);
                }

            }

            for (var i = 0; i < rejectedItemsArray.length; i++) {
                if (i == rejectedItemsArray.length - 1) {
                    rejorderletIds = rejorderletIds + rejectedItemsArray[i].id
                } else {
                    rejorderletIds = rejorderletIds + rejectedItemsArray[i].id + ',';
                }
            }
          
            if (rejectedItemsArray.length > 0) {
                var ordeLetLevelurl = "/getrefundamountorderlet" + "/malls/" + fullorder.mallId + "/orderlets/" + rejorderletIds;
                this.oprovider.callRefundAmountServiceOrderLet(ordeLetLevelurl).subscribe(resp => { 

                    var amount = resp['amount'];
                    var fullOrderAmount = fullorder.amount + fullorder.sgst + fullorder.cgst+fullorder.supplierDeliveryCharge+fullorder.tafelDeliveryCharge+fullorder.packagingCharge+fullorder.convenience;
                    if (amount > fullOrderAmount) {
                        amount = fullOrderAmount;
                      
                    }
                  
                    rejorderletIds = rejorderletIds.replace(/-/g, "");
                   // if(this.allpermited == 'No'){
                        var fullOrderStatusUrl = "/mall/"+fullorder.mallId+"/fullOrder/"+fullorder.id;
                        this.oprovider.getFullOrderStatus(fullOrderStatusUrl).subscribe(resp => {

                            // if(resp.status!="RECEIVED")
                            if(resp.status=="READY" || resp.status=="COMPLETED" || resp.status=="REJECTED"){
                                var  refundurl = "/getrefundamountFullOrder/malls/" + this.mallId + "/fullorder/" + fullorder.id;
                                this.oprovider.callRefundAmountServiceFullOrder(refundurl).subscribe(resp1 => {

                                    var amount = resp1['amount'];
                                    var fullOrderAmount = resp.amount + resp.sgst + resp.cgst+resp.supplierDeliveryCharge+resp.tafelDeliveryCharge+resp.packagingCharge+resp.convenience;
                                    console.log(amount);
                                    console.log(fullOrderAmount);
                                    if (amount > fullOrderAmount) {
                                        amount = fullOrderAmount;
                                    
                                    }
                                    console.log(amount)
                                    this.oprovider.callRefundServiceManager(fullorder.dinerId, amount, fullorder.fullOrder5DigitId, rejorderletIds,fullorder.id,  fullorder.mallId).subscribe(resp => {
                                        this.callRefundServiceOrderlet = resp;
                                    });

                            });

                            }
                        })
                    //}
                    
                    // else{
                        
                    //     this.oprovider.callRefundServiceManager(fullorder.dinerId, amount, fullorder.fullOrder5DigitId, rejorderletIds, fullorder.id, fullorder.mallId).subscribe(resp => {
                    //         this.callRefundServiceOrderlet = resp;
                    //     });
                    // }

                   


                });
            }

            this.printFunction(fullorder);
            this.segmentChange('Pending', 0);

        });

        this.goOrderDetails(event, fullorder, this.k)
        this.showLoader = !true;
    }

    callRefundServiceFullOrder(fullorder, amount) {
        var orderId = fullorder.id;
        orderId = orderId;
        this.oprovider.callRefundServicFullOrdereManager(fullorder.dinerId, amount, fullorder.fullOrder5DigitId, orderId, fullorder.id, fullorder.mallId).subscribe(resp => {
            this.callRefundServiceFullOrder = resp;
        });
    }

    callRefundServiceOrderlet(dinnerId, amount, fullOrderId5didgit, orderIds, fullOrderId, mallId) {
      
        orderIds = orderIds.replace(/-/g, "");
        this.oprovider.callRefundServiceManager(dinnerId, amount, fullOrderId5didgit, orderIds, fullOrderId, mallId).subscribe(resp => {
            this.callRefundServiceOrderlet = resp;
        });
    }
    quantityIncreament(orderData) {
      
        if (orderData.data.length == orderData.rejectedCount) {
          
            return false;
        } else {
            orderData.rejectedCount++;
        }

    }

    printFunction(fullorder) { 
        console.log("fullorder....",fullorder);
        var fullAddress='';
        var outletName='';
        var outletNameDynamic='';
        if (this.allpermited == "No")
        {
            outletName = (this.getOutletDetailsVal.name);
            outletNameDynamic = '<text>' +'           ' + outletName + '&#10;</text>\n';
        }
        if (this.allpermited == "Yes")
        {
            outletName = (this.getOutletDetailsVal.name);
            outletNameDynamic = '';
        }
        if(fullorder.typeOfDinning=='CINEMAS'){ 
           
            if (fullorder.orderType == "Delivery")
            {
            var deliveryAddress = fullorder.deliveryAddress;
            var deliveryAddress1 = fullorder.deliveryAddress1;
            var deliveryAddress2 = fullorder.deliveryAddress2;
            var deliveryAddress3 = fullorder.deliveryAddress3;
            var name = '<text>' + 'Name-' + deliveryAddress +  '&#10;</text>';
            fullAddress = '<text>' + 'Screen-' + deliveryAddress1 + '|Row-' + deliveryAddress2 + '|Seat-' + deliveryAddress3 + '&#10;</text>';
        }
        }
        else if(fullorder.typeOfDinning=='RESTAURANT'){ 
            if (fullorder.orderType == "Delivery")
            {
            var deliveryAddress = fullorder.deliveryAddress;
            var deliveryAddress1 = fullorder.deliveryAddress1;
            var deliveryAddress2 = fullorder.deliveryAddress2;
            var deliveryAddress3 = fullorder.deliveryAddress3;
            var name = '<text>' + 'Name-' + deliveryAddress +  '&#10;</text>';
            fullAddress = '<text>' + 'Company-' + deliveryAddress1 + '\nQuadrant-' + deliveryAddress2 + '|Floor-' + deliveryAddress3 + '&#10;</text>';
            }
        }
        else if(fullorder.typeOfDinning=='FOODCOURT'){ 
            if (fullorder.orderType == "Delivery")
            {
            var deliveryAddress = fullorder.deliveryAddress;
            var deliveryAddress1 = fullorder.deliveryAddress1;
           
            var name = '<text>' + 'Name-' + deliveryAddress +  '&#10;</text>';
            fullAddress = '<text>' + 'Table Number-' + deliveryAddress1 + '&#10;</text>';
            }
        }
        
        this.dynamicText = "";
        this.dynamicTextKOT = "";
        var getAddress = this.getMallDetailsResp.address.area + ", " + this.getMallDetailsResp.address.city;
        var mallNameGet = (this.getMallDetailsResp.name).toUpperCase();
        
        var mallName = mallNameGet;
        var mallNameResteurant = mallNameGet;
        var mallId = fullorder.mallId;
        console.log("mallId", mallId);
        var fullOrderId = fullorder.id
        var orderType = fullorder.orderType;
        console.log("orderType", orderType);
        if (orderType == "Pickup") {
            var orderTypeGet = "DINEIN";
           
        }
        else {
            var orderTypeGet = "DELIVERY";
            
        }
        var url ="";
        if(this.allpermited=="Yes"){
            url = "/print/mall/" + mallId + "/fullOrder/" + fullOrderId;

        }else{
            url = "/print/mall/" + mallId + "/order/" + fullorder.jmOrderLet[0].orderId; 
        }
        this.oprovider.printOrder(url).subscribe(resp => {
            this.printOrderDetails = resp;
         if(orderType == "Pickup"){
            
            this.printOrderDetails.nonrejectedSupplierDeliveryCharges = 0;
            this.printOrderDetails.nonrejectedTafelDeliveryCharges = 0;
           
            this.printOrderDetails.nonrejectedPackagingCharges = 0
           
         }
            this.getAmount = this.printOrderDetails.totalamount;
            
             var valueAmount = parseFloat(this.printOrderDetails.nonrejectedamount)+parseFloat(this.printOrderDetails.nonrejectedSupplierDiscount)+parseFloat(this.printOrderDetails.nonrejectedTafelDiscount);
            var amount = valueAmount.toFixed(2) + '';
            this.printOrderDetails.nonrejectedSupplierDeliveryCharges = parseFloat(this.printOrderDetails.nonrejectedSupplierDeliveryCharges);
            this.printOrderDetails.nonrejectedTafelDeliveryCharges = parseFloat(this.printOrderDetails.nonrejectedTafelDeliveryCharges);
            this.delivaryCharges = (parseFloat(this.printOrderDetails.nonrejectedSupplierDeliveryCharges) + parseFloat(this.printOrderDetails.nonrejectedTafelDeliveryCharges)).toFixed(2);
            
            this.printOrderDetails.nonrejectedConvienceCharges = parseFloat(this.printOrderDetails.nonrejectedConvienceCharges).toFixed(2);
            this.printOrderDetails.nonrejectedPackagingCharges = parseFloat(this.printOrderDetails.nonrejectedPackagingCharges).toFixed(2);
            let nonrejectedSupplierDiscount=parseFloat(this.printOrderDetails.nonrejectedSupplierDiscount).toFixed(2);
            this.printOrderDetails.nonrejectedSupplierDiscount = '-'+parseFloat(this.printOrderDetails.nonrejectedSupplierDiscount).toFixed(2);
            this.printOrderDetails.nonrejectedTafelDiscount = '-'+parseFloat(this.printOrderDetails.nonrejectedTafelDiscount).toFixed(2);
            this.printOrderDetails.nonrejectedSupplierDiscountAmount = parseFloat(nonrejectedSupplierDiscount).toFixed(2);
            this.printOrderDetails.nonrejectedTafelDiscountAmount = parseFloat(this.printOrderDetails.nonrejectedTafelDiscount).toFixed(2);            
            var nonrejectedAmountTax = parseFloat(this.printOrderDetails.nonrejectedamount) + parseFloat(this.printOrderDetails.nonrejectedsgst) + parseFloat(this.printOrderDetails.nonrejectedcgst) + parseFloat(this.printOrderDetails.nonrejectedConvienceCharges) + parseFloat(this.printOrderDetails.nonrejectedPackagingCharges) + parseFloat(this.delivaryCharges);
            var nonrejectedToPayTax = ((parseFloat(amount) + parseFloat(this.printOrderDetails.nonrejectedsgst) + parseFloat(this.printOrderDetails.nonrejectedcgst) + parseFloat(this.printOrderDetails.nonrejectedPackagingCharges) + parseFloat(this.delivaryCharges)) - parseFloat(this.printOrderDetails.nonrejectedSupplierDiscountAmount));
            var toPayTotalNonreject = (parseFloat(amount) + parseFloat(this.printOrderDetails.nonrejectedsgst) + parseFloat(this.printOrderDetails.nonrejectedcgst) + parseFloat(this.printOrderDetails.nonrejectedPackagingCharges) + parseFloat(this.delivaryCharges));
            var suppDiscount = parseFloat(this.printOrderDetails.nonrejectedSupplierDiscountAmount);
            console.log("nonrejectedToPayTax", nonrejectedToPayTax);
            console.log("amount", amount, typeof(amount));
            console.log("toPayTotalNonreject", toPayTotalNonreject, typeof(toPayTotalNonreject));
            console.log("suppDiscount", suppDiscount, typeof(suppDiscount));
            console.log("this.delivaryCharges", this.delivaryCharges, typeof(this.delivaryCharges));
            console.log("this.printOrderDetails.nonrejectedPackagingCharges", this.printOrderDetails.nonrejectedPackagingCharges, typeof(this.printOrderDetails.nonrejectedPackagingCharges));
            console.log("this.printOrderDetails.nonrejectedSupplierDiscountAmount", this.printOrderDetails.nonrejectedSupplierDiscountAmount,typeof(this.printOrderDetails.nonrejectedSupplierDiscountAmount));
            console.log("this.printOrderDetails.nonrejectedTafelDiscountAmount", this.printOrderDetails.nonrejectedTafelDiscountAmount, typeof(this.printOrderDetails.nonrejectedTafelDiscountAmount));
            console.log("this.printOrderDetails.nonrejectedsgst", this.printOrderDetails.nonrejectedsgst, typeof(this.printOrderDetails.nonrejectedsgst));
            console.log("this.printOrderDetails.nonrejectedcgst", this.printOrderDetails.nonrejectedcgst, typeof(this.printOrderDetails.nonrejectedcgst));
            if (this.printOrderDetails.nonrejectedSupplierDiscount.length == 8) {
                this.printOrderDetails.nonrejectedSupplierDiscount = '   ' + this.printOrderDetails.nonrejectedSupplierDiscount;
            }
            else if (this.printOrderDetails.nonrejectedSupplierDiscount.length == 7) {
                this.printOrderDetails.nonrejectedSupplierDiscount = '    ' + this.printOrderDetails.nonrejectedSupplierDiscount;
            } else if (this.printOrderDetails.nonrejectedSupplierDiscount.length == 6) {
                this.printOrderDetails.nonrejectedSupplierDiscount = '     ' + this.printOrderDetails.nonrejectedSupplierDiscount;
            }
            else if (this.printOrderDetails.nonrejectedSupplierDiscount.length == 5) {
                this.printOrderDetails.nonrejectedSupplierDiscount = '      ' + this.printOrderDetails.nonrejectedSupplierDiscount;

            }
            else if (this.printOrderDetails.nonrejectedSupplierDiscount.length == 4) {
                this.printOrderDetails.nonrejectedSupplierDiscount = '       ' + this.printOrderDetails.nonrejectedSupplierDiscount;
            }
            else if (this.printOrderDetails.nonrejectedSupplierDiscount.length == 3) {
                this.printOrderDetails.nonrejectedSupplierDiscount = '        ' + this.printOrderDetails.nonrejectedSupplierDiscount;
            }
            else if (this.printOrderDetails.nonrejectedSupplierDiscount.length == 2) {
                this.printOrderDetails.nonrejectedSupplierDiscount = '         ' + this.printOrderDetails.nonrejectedSupplierDiscount;
            }
            else if (this.printOrderDetails.nonrejectedSupplierDiscount.length == 1) {
                this.printOrderDetails.nonrejectedSupplierDiscount = '          ' + this.printOrderDetails.nonrejectedSupplierDiscount;
            }
            if (this.printOrderDetails.nonrejectedTafelDiscount.length == 8) {
                this.printOrderDetails.nonrejectedTafelDiscount = '   ' + this.printOrderDetails.nonrejectedTafelDiscount;
            }
            else if (this.printOrderDetails.nonrejectedTafelDiscount.length == 7) {
                this.printOrderDetails.nonrejectedTafelDiscount = '    ' + this.printOrderDetails.nonrejectedTafelDiscount;
            } else if (this.printOrderDetails.nonrejectedTafelDiscount.length == 6) {
                this.printOrderDetails.nonrejectedTafelDiscount = '     ' + this.printOrderDetails.nonrejectedTafelDiscount;
            }
            else if (this.printOrderDetails.nonrejectedTafelDiscount.length == 5) {
                this.printOrderDetails.nonrejectedTafelDiscount = '      ' + this.printOrderDetails.nonrejectedTafelDiscount;

            }
            else if (this.printOrderDetails.nonrejectedTafelDiscount.length == 4) {
                this.printOrderDetails.nonrejectedTafelDiscount = '       ' + this.printOrderDetails.nonrejectedTafelDiscount;
            }
            else if (this.printOrderDetails.nonrejectedTafelDiscount.length == 3) {
                this.printOrderDetails.nonrejectedTafelDiscount = '        ' + this.printOrderDetails.nonrejectedTafelDiscount;
            }
            else if (this.printOrderDetails.nonrejectedTafelDiscount.length == 2) {
                this.printOrderDetails.nonrejectedTafelDiscount = '         ' + this.printOrderDetails.nonrejectedTafelDiscount;
            }
            else if (this.printOrderDetails.nonrejectedTafelDiscount.length == 1) {
                this.printOrderDetails.nonrejectedTafelDiscount = '          ' + this.printOrderDetails.nonrejectedTafelDiscount;
            }
            if (this.printOrderDetails.nonrejectedConvienceCharges.length == 8) {
                this.printOrderDetails.nonrejectedConvienceCharges = '   ' + this.printOrderDetails.nonrejectedConvienceCharges;
            }
            else if (this.printOrderDetails.nonrejectedConvienceCharges.length == 7) {
                this.printOrderDetails.nonrejectedConvienceCharges = '    ' + this.printOrderDetails.nonrejectedConvienceCharges;
            } else if (this.printOrderDetails.nonrejectedConvienceCharges.length == 6) {
                this.printOrderDetails.nonrejectedConvienceCharges = '     ' + this.printOrderDetails.nonrejectedConvienceCharges;
            }
            else if (this.printOrderDetails.nonrejectedConvienceCharges.length == 5) {
                this.printOrderDetails.nonrejectedConvienceCharges = '      ' + this.printOrderDetails.nonrejectedConvienceCharges;

            }
            else if (this.printOrderDetails.nonrejectedConvienceCharges.length == 4) {
                this.printOrderDetails.nonrejectedConvienceCharges = '       ' + this.printOrderDetails.nonrejectedConvienceCharges;
            }
            else if (this.printOrderDetails.nonrejectedConvienceCharges.length == 3) {
                this.printOrderDetails.nonrejectedConvienceCharges = '        ' + this.printOrderDetails.nonrejectedConvienceCharges;
            }
            else if (this.printOrderDetails.nonrejectedConvienceCharges.length == 2) {
                this.printOrderDetails.nonrejectedConvienceCharges = '         ' + this.printOrderDetails.nonrejectedConvienceCharges;
            }
            else if (this.printOrderDetails.nonrejectedConvienceCharges.length == 1) {
                this.printOrderDetails.nonrejectedConvienceCharges = '          ' + this.printOrderDetails.nonrejectedConvienceCharges;
            }
            if (this.printOrderDetails.nonrejectedPackagingCharges.length == 8) {
                this.printOrderDetails.nonrejectedPackagingCharges = '   ' + this.printOrderDetails.nonrejectedPackagingCharges;
            }
            else if (this.printOrderDetails.nonrejectedPackagingCharges.length == 7) {
                this.printOrderDetails.nonrejectedPackagingCharges = '    ' + this.printOrderDetails.nonrejectedPackagingCharges;
            } else if (this.printOrderDetails.nonrejectedPackagingCharges.length == 6) {
                this.printOrderDetails.nonrejectedPackagingCharges = '     ' + this.printOrderDetails.nonrejectedPackagingCharges;
            }
            else if (this.printOrderDetails.nonrejectedPackagingCharges.length == 5) {
                this.printOrderDetails.nonrejectedPackagingCharges = '      ' + this.printOrderDetails.nonrejectedPackagingCharges;

            }
            else if (this.printOrderDetails.nonrejectedPackagingCharges.length == 4) {
                this.printOrderDetails.nonrejectedPackagingCharges = '       ' + this.printOrderDetails.nonrejectedPackagingCharges;
            }
            else if (this.printOrderDetails.nonrejectedPackagingCharges.length == 3) {
                this.printOrderDetails.nonrejectedPackagingCharges = '        ' + this.printOrderDetails.nonrejectedPackagingCharges;
            }
            else if (this.printOrderDetails.nonrejectedPackagingCharges.length == 2) {
                this.printOrderDetails.nonrejectedPackagingCharges = '         ' + this.printOrderDetails.nonrejectedPackagingCharges;
            }
            else if (this.printOrderDetails.nonrejectedPackagingCharges.length == 1) {
                this.printOrderDetails.nonrejectedPackagingCharges = '          ' + this.printOrderDetails.nonrejectedPackagingCharges;
            }
            if (this.delivaryCharges.length == 8) {
                this.delivaryCharges = '   ' + this.delivaryCharges;
            }
            else if (this.delivaryCharges.length == 7) {
                this.delivaryCharges = '    ' + this.delivaryCharges;
            } else if (this.delivaryCharges.length == 6) {
                this.delivaryCharges = '     ' + this.delivaryCharges;
            }
            else if (this.delivaryCharges.length == 5) {
                this.delivaryCharges = '      ' + this.delivaryCharges;

            }
            else if (this.delivaryCharges.length == 4) {
                this.delivaryCharges = '       ' + this.delivaryCharges;
            }
            else if (this.delivaryCharges == 3) {
                this.delivaryCharges = '        ' + this.delivaryCharges;
            }
            else if (this.delivaryCharges.length == 2) {
                this.delivaryCharges = '         ' + this.delivaryCharges;
            }
            else if (this.delivaryCharges.length == 1) {
                this.delivaryCharges = '          ' + this.delivaryCharges;
            }
            if (amount.length == 8) {
                amount = '   ' + amount;
            }
            else if (amount.length == 7) {
                amount = '    ' + amount;
            } else if (amount.length == 6) {
                amount = '     ' + amount;
            }
            else if (amount.length == 5) {
                amount = '      ' + amount;

            }
            else if (amount.length == 4) {
                amount = '       ' + amount;
            }
            else if (amount.length == 3) {
                amount = '        ' + amount;
            }
            else if (amount.length == 2) {
                amount = '         ' + amount;
            }
            else if (amount.length == 1) {
                amount = '          ' + amount;
            }
            
            this.getCgst = this.printOrderDetails.totalcgst;
            var cgst = this.printOrderDetails.nonrejectedcgst + '';
            if (cgst.length == 8) {
                cgst = '   ' + cgst;
            }
            else if (cgst.length == 7) {
                cgst = '    ' + cgst;
            } else if (cgst.length == 6) {
                cgst = '     ' + cgst;
            }
            else if (cgst.length == 5) {
                cgst = '      ' + cgst;
            }
            else if (cgst.length == 4) {
                cgst = '       ' + cgst;
            }
            else if (cgst.length == 3) {
                cgst = '        ' + cgst;
            }
            else if (cgst.length == 2) {
                cgst = '         ' + cgst;
            }
            else if (cgst.length == 1) {
                cgst = '          ' + cgst;
            }
            this.getSgst = this.printOrderDetails.totalsgst;
            var sgst = this.printOrderDetails.nonrejectedsgst + '';
            if (sgst.length == 8) {
                sgst = '   ' + sgst;
            }
            else if (sgst.length == 7) {
                sgst = '    ' + sgst;
            } else if (sgst.length == 6) {
                sgst = '     ' + sgst;
            }
            else if (sgst.length == 5) {
                sgst = '      ' + sgst;
            }
            else if (sgst.length == 4) {
                sgst = '       ' + sgst;
            }
            else if (sgst.length == 3) {
                sgst = '        ' + sgst;
            }
            else if (sgst.length == 2) {
                sgst = '         ' + sgst;
            }
            else if (sgst.length == 1) {
                sgst = '          ' + sgst;
            }
            this.getreceivedAmount = parseFloat(this.printOrderDetails.totalamount) + parseFloat(this.printOrderDetails.totalcgst) + parseFloat(this.printOrderDetails.totalsgst);

            var receivedAmount = this.getreceivedAmount.toFixed(2) + '';


            if (receivedAmount.length == 8) {
                receivedAmount = '   ' + receivedAmount;
            }
            else if (receivedAmount.length == 7) {
                receivedAmount = '    ' + receivedAmount;
            } else if (receivedAmount.length == 6) {
                receivedAmount = '     ' + receivedAmount;
            }
            else if (receivedAmount.length == 5) {
                receivedAmount = '      ' + receivedAmount;
            }
            else if (receivedAmount.length == 4) {
                receivedAmount = '       ' + receivedAmount;
            }
            else if (receivedAmount.length == 3) {
                receivedAmount = '        ' + receivedAmount;
            }
            else if (receivedAmount.length == 2) {
                receivedAmount = '         ' + receivedAmount;
            }
            else if (receivedAmount.length == 1) {
                receivedAmount = '          ' + receivedAmount;
            }

            if(orderType == "Pickup"){
                this.getrejectAmount = parseFloat(this.printOrderDetails.rejectedConvienceCharges)+ parseFloat(this.printOrderDetails.rejectedamount) + parseFloat(this.printOrderDetails.rejectedcgst) + parseFloat(this.printOrderDetails.rejectedsgst);
            }else{
                this.getrejectAmount = parseFloat(this.printOrderDetails.rejectedPackagingCharges)+parseFloat(this.printOrderDetails.rejectedTafelDeliveryCharges)+parseFloat(this.printOrderDetails.rejectedConvienceCharges)+parseFloat(this.printOrderDetails.rejectedSupplierDeliveryCharges)+ parseFloat(this.printOrderDetails.rejectedamount) + parseFloat(this.printOrderDetails.rejectedcgst) + parseFloat(this.printOrderDetails.rejectedsgst);
            }
            

            var rejectAmount = parseFloat(this.getrejectAmount).toFixed(2) + '';


            if (rejectAmount.length == 8) {
                rejectAmount = '   ' + rejectAmount;
            }
            else if (rejectAmount.length == 7) {
                rejectAmount = '    ' + rejectAmount;
            } else if (rejectAmount.length == 6) {
                rejectAmount = '     ' + rejectAmount;
            }
            else if (rejectAmount.length == 5) {
                rejectAmount = '      ' + rejectAmount;
            }
            else if (rejectAmount.length == 4) {
                rejectAmount = '       ' + rejectAmount;
            }
            else if (rejectAmount.length == 3) {
                rejectAmount = '        ' + rejectAmount;
            }
            else if (rejectAmount.length == 2) {
                rejectAmount = '         ' + rejectAmount;
            }
            else if (rejectAmount.length == 1) {
                rejectAmount = '          ' + rejectAmount;
            }

            this.getGrandTotal = parseFloat(amount) + parseFloat(cgst) + parseFloat(sgst);
            var grandtotal = nonrejectedAmountTax.toFixed(2) + '';
            var toPay = nonrejectedToPayTax.toFixed(2) + '';
            console.log("toPay", toPay);
            if (grandtotal.length == 8) {
                grandtotal = '   ' + grandtotal;
            }
            else if (grandtotal.length == 7) {
                grandtotal = '    ' + grandtotal;
            } else if (grandtotal.length == 6) {
                grandtotal = '     ' + grandtotal;
            }
            else if (grandtotal.length == 5) {
                grandtotal = '      ' + grandtotal;
            }
            else if (grandtotal.length == 4) {
                grandtotal = '       ' + grandtotal;
            }
            else if (grandtotal.length == 3) {
                grandtotal = '        ' + grandtotal;
            }
            else if (grandtotal.length == 2) {
                grandtotal = '         ' + grandtotal;
            }
            else if (grandtotal.length == 1) {
                grandtotal = '          ' + grandtotal;
            }

            if (toPay.length == 8) {
                toPay = '   ' + toPay;
            }
            else if (toPay.length == 7) {
                toPay = '    ' + toPay;
            } else if (toPay.length == 6) {
                toPay = '     ' + toPay;
            }
            else if (toPay.length == 5) {
                toPay = '      ' + toPay;
            }
            else if (toPay.length == 4) {
                toPay = '       ' + toPay;
            }
            else if (toPay.length == 3) {
                toPay = '        ' + toPay;
            }
            else if (toPay.length == 2) {
                toPay = '         ' + toPay;
            }
            else if (toPay.length == 1) {
                toPay = '          ' + toPay;
            }
            for (var j = 0; j < this.printOrderDetails.jmNonRejectedItems.length; j++) {
                let str = this.printOrderDetails.jmNonRejectedItems[j].itemName.replace('&', 'and');
                let strKot = this.printOrderDetails.jmNonRejectedItems[j].itemName.replace('&', 'and');
                let price = parseFloat(this.printOrderDetails.jmNonRejectedItems[j].itemPrice) + parseFloat(this.printOrderDetails.jmNonRejectedItems[j].supplierDiscount) + parseFloat(this.printOrderDetails.jmNonRejectedItems[j].tafelDiscount);                let quantity = this.printOrderDetails.jmNonRejectedItems[j].quantity;
               
                var len = str.length;
                if (len == 20) {
                    str = str + ' ';
                }
                if (len > 20) {
                    str = str.substring(0, 20) + ' ';
                }
                var spacelength = 20 - len;
                if (spacelength > 0) {
                    for (var k = 0; k <= spacelength; k++) {
                        str = str + ' ';
                    }
                }
                this.appendPrint(str, price, quantity);
                this.appendPrintKOT(strKot, quantity);
            }
            var getMonth = new Date().getMonth() + 1;
          
            var success = window.location.href;
            var specialInstructions = '<text>Note:' + fullorder.specialInstructions + '</text>';
           console.log('$#$#$#$#$#$#$#$#$#$#$43');
           console.log(this.printOrderDetails.nonrejectedPackagingCharges);
           console.log('$#$#$#$#$#$#$#$#$#$#$43');
            if (!fullorder.specialInstructions) {
                specialInstructions = '';
            }
            if(fullorder.status === 'RECEIVED')
            {
            var x=""
            var ver = '1';
            var datatype = 'eposprintxml';
            var data = '<epos-print xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print">\n' +
                '<feed unit="30"/>\n' +
                '<text>           ' + mallName + '&#10;</text>\n' + outletNameDynamic +
                '<text>           ' + getAddress + ' &#10;</text>\n' +
                '<text>           GSTIN : 36AAGCB4303A1ZE    &#10;</text>\n' +
                '<text>           Date :' + new Date().getDate() + "/" + getMonth + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ' &#10;</text>\n' +
                '<text>----------------------------------------------- &#10;</text>\n' +
                '<text>Order No:' + fullorder.fullOrder5DigitId + '             Order Type:' + orderTypeGet + ' &#10;</text>\n' + name + '\n' + fullAddress + '\n' +
                '<text>----------------------------------------------- &#10;</text>\n' +
                '<text>Item Name                Qty    Price     Total&#10;</text>\n' +
                '<text>----------------------------------------------- &#10;</text>\n' + this.dynamicText +
                '<text>----------------------------------------------- &#10;</text>\n' +
                '<text>                         Item Total:' + amount + '&#10;</text>\n' +
                '<text>      Supplier Discount(Exc. Taxes):' + this.printOrderDetails.nonrejectedSupplierDiscount + '&#10;</text>\n' +
                '<text>                         CGST(2.5%):' + cgst + '&#10;</text>\n' +
                '<text>                         SGST(2.5%):' + sgst + '&#10;</text>\n' +
                '<text>      Packaging Charges(Inc. Taxes):' + this.printOrderDetails.nonrejectedPackagingCharges + '&#10;</text>\n' +
                '<text>       Delivery Charges(Inc. Taxes):' + this.delivaryCharges + '&#10;</text>\n' +
                '<text>----------------------------------------------- &#10;</text>\n' +
                '<text>                       Total Amount:' + toPay + '&#10;</text>\n' +
                '<text>----------------------------------------------- &#10;</text>\n' +                
                '<text>         TAFEL Discount(Exc. Taxes):' + this.printOrderDetails.nonrejectedTafelDiscount + '&#10;</text>\n' +
                '<text>    Convenience Charges(Inc. Taxes):' + this.printOrderDetails.nonrejectedConvienceCharges + '&#10;</text>\n' +
                '<text>----------------------------------------------- &#10;</text>\n' +
                '<text>                               Paid:' + grandtotal + '&#10;</text>\n' +
                '<text>-----------------------------------------------&#10;</text>\n' +
                '<text>               Refund Under Process:' + rejectAmount + '&#10;</text>\n' +
                '<text>===============================================&#10;</text>\n' +
                '<text>             Thank you Order Again! &#10;</text>\n' +
                '<text>               Powered By TAFEL! &#10;</text>\n' +
                '<text>          Reach us at contact@tafel.in &#10;</text>\n' +
                '<text>                      ---------------- &#10;</text>\n' +
                '<feed line="3"/>\n' +
                '<cut type="feed"/>\n' +
                '<feed unit="30"/>\n' +
                '<text>           ' + mallName + '&#10;</text>\n' + outletNameDynamic +
                '<text>           KOT - ' + orderTypeGet + '&#10;</text>\n' +
                '<text>           ' + getAddress + ' &#10;</text>\n' +
                '<text>           Date :' + new Date().getDate() + "/" + getMonth + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ' &#10;</text>\n' +
                '<text>----------------------------------------------- &#10;</text>\n' +
                '<text>Order No:' + fullorder.fullOrder5DigitId + ' &#10;</text>\n' +
                '<text>----------------------------------------------- &#10;</text>\n' +
                '<text>Qty Item Name                         &#10;</text>\n' +
                '<text>----------------------------------------------- &#10;</text>\n' + this.dynamicTextKOT + '\n' +
                '<text>----------------------------------------------- &#10;</text>\n' + specialInstructions +
                '<feed line="3"/>\n' +
                '<cut type="feed"/>\n' +
                '<feed line="3"/>\n' +
                '<text>           ' + mallName + '&#10;</text>\n' + outletNameDynamic +
                '<text>           ' + getAddress + ' &#10;</text>\n' +
                '<text>           GSTIN : 36AAGCB4303A1ZE    &#10;</text>\n' +
                '<text>           Date :' + new Date().getDate() + "/" + getMonth + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ' &#10;</text>\n' +
                '<text>----------------------------------------------- &#10;</text>\n' +
                '<text>Order No:' + fullorder.fullOrder5DigitId + '             Order Type:' + orderTypeGet + ' &#10;</text>\n' +
                '<text>----------------------------------------------- &#10;</text>\n' +
                '<text>Item Name                Qty    Price     Total&#10;</text>\n' +
                '<text>----------------------------------------------- &#10;</text>\n' + this.dynamicText +
                '<text>----------------------------------------------- &#10;</text>\n' +
                '<text>                         Item Total:' + amount + '&#10;</text>\n' +
                '<text>      Supplier Discount(Exc. Taxes):' + this.printOrderDetails.nonrejectedSupplierDiscount + '&#10;</text>\n' +
                '<text>                         CGST(2.5%):' + cgst + '&#10;</text>\n' +
                '<text>                         SGST(2.5%):' + sgst + '&#10;</text>\n' +
                '<text>      Packaging Charges(Inc. Taxes):' + this.printOrderDetails.nonrejectedPackagingCharges + '&#10;</text>\n' +
                '<text>       Delivery Charges(Inc. Taxes):' + this.delivaryCharges + '&#10;</text>\n' +
                '<text>----------------------------------------------- &#10;</text>\n' +
                '<text>                       Total Amount:' + toPay + '&#10;</text>\n' +
                '<text>----------------------------------------------- &#10;</text>\n' +                
                '<text>         TAFEL Discount(Exc. Taxes):' + this.printOrderDetails.nonrejectedTafelDiscount + '&#10;</text>\n' +
                '<text>    Convenience Charges(Inc. Taxes):' + this.printOrderDetails.nonrejectedConvienceCharges + '&#10;</text>\n' +
                '<text>                               Paid:' + grandtotal + '&#10;</text>\n' +
                '<text>-----------------------------------------------&#10;</text>\n' +
                '<text>               Refund Under Process:' + rejectAmount + '&#10;</text>\n' +
                '<text>===============================================&#10;</text>\n' +
                '<text>             Thank you Order Again! &#10;</text>\n' +
                '<text>               Powered By TAFEL! &#10;</text>\n' +
                '<text>          Reach us at contact@tafel.in &#10;</text>\n' +
                '<text>                      ---------------- &#10;</text>\n' +
                '<feed line="3"/>\n' +
                '<cut type="feed"/>\n' +
                '</epos-print>'
            var errordialog = 'yes';
            console.log("test.........", data);
            var urldata = 'tmprintassistant://tmprintassistant.epson.com/print?' +
                'success=' + encodeURIComponent + '&' +
                'ver=' + ver + '&' +
                'data-type=' + datatype + '&' +
                'data=' + encodeURIComponent(data) + '&' +
                'error-dialog=' + errordialog;
            console.log(urldata);
            const browser = this.appBrowser.create(urldata, '_system');
            browser.on('loadstop').subscribe(event => {
                browser.insertCSS({ code: "body{color: red;" });
            });


        }
        if((fullorder.status === 'COMPLETED') || (fullorder.status === 'EXPIRED'))
        {
        var x=""
        var ver = '1';
        var datatype = 'eposprintxml';
        var data = '<epos-print xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print">\n' +
            '<feed unit="30"/>\n' +
            '<text>           ' + mallName + '&#10;</text>\n' + outletNameDynamic +
            '<text>           ' + getAddress + ' &#10;</text>\n' +
            '<text>           GSTIN : 36AAGCB4303A1ZE    &#10;</text>\n' +
            '<text>           Date :' + new Date().getDate() + "/" + getMonth + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ' &#10;</text>\n' +
            '<text>----------------------------------------------- &#10;</text>\n' +
            '<text>Order No:' + fullorder.fullOrder5DigitId + '             Order Type:' + orderTypeGet + ' &#10;</text>\n' + name + '\n' + fullAddress + '\n' +
            '<text>----------------------------------------------- &#10;</text>\n' +
            '<text>Item Name                Qty    Price     Total&#10;</text>\n' +
            '<text>----------------------------------------------- &#10;</text>\n' + this.dynamicText +
            '<text>----------------------------------------------- &#10;</text>\n' +
            '<text>                         Item Total:' + amount + '&#10;</text>\n' +
            '<text>      Supplier Discount(Exc. Taxes):' + this.printOrderDetails.nonrejectedSupplierDiscount + '&#10;</text>\n' +
            '<text>                         CGST(2.5%):' + cgst + '&#10;</text>\n' +
            '<text>                         SGST(2.5%):' + sgst + '&#10;</text>\n' +
            '<text>      Packaging Charges(Inc. Taxes):' + this.printOrderDetails.nonrejectedPackagingCharges + '&#10;</text>\n' +
            '<text>       Delivery Charges(Inc. Taxes):' + this.delivaryCharges + '&#10;</text>\n' +
            '<text>----------------------------------------------- &#10;</text>\n' +
            '<text>                       Total Amount:' + toPay + '&#10;</text>\n' +
            '<text>----------------------------------------------- &#10;</text>\n' +                
            '<text>         TAFEL Discount(Exc. Taxes):' + this.printOrderDetails.nonrejectedTafelDiscount + '&#10;</text>\n' +
            '<text>    Convenience Charges(Inc. Taxes):' + this.printOrderDetails.nonrejectedConvienceCharges + '&#10;</text>\n' +
            '<text>----------------------------------------------- &#10;</text>\n' +
            '<text>                               Paid:' + grandtotal + '&#10;</text>\n' +
            '<text>-----------------------------------------------&#10;</text>\n' +
            '<text>               Refund Under Process:' + rejectAmount + '&#10;</text>\n' +
            '<text>===============================================&#10;</text>\n' +
            '<text>             Thank you Order Again! &#10;</text>\n' +
            '<text>               Powered By TAFEL! &#10;</text>\n' +
            '<text>          Reach us at contact@tafel.in &#10;</text>\n' +
            '<text>                      ---------------- &#10;</text>\n' +
            '<feed line="3"/>\n' +
            '<cut type="feed"/>\n' +
            '</epos-print>'
        var errordialog = 'yes';
        console.log("test.........", data);
        var urldata = 'tmprintassistant://tmprintassistant.epson.com/print?' +
            'success=' + encodeURIComponent + '&' +
            'ver=' + ver + '&' +
            'data-type=' + datatype + '&' +
            'data=' + encodeURIComponent(data) + '&' +
            'error-dialog=' + errordialog;
        console.log(urldata);
        const browser = this.appBrowser.create(urldata, '_system');
        browser.on('loadstop').subscribe(event => {
            browser.insertCSS({ code: "body{color: red;" });
        });


    }
        });
    
    }

    quantityDecrement(order) {
        //order.rejectedCount = order.data.length;
        if (1 == order.rejectedCount) {
          
            return false;
        } else {
            order.rejectedCount--;
        }

    }
    deleteItemLevel(fullorderData, orderLetData) {
      
        //return false;
        let prompt = this.alertCtrl.create({
            title: "Reject Order!",
            message: "Do you want to reject item Quantity?",
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {

                    }
                },
                {
                    text: 'Proceed',
                    handler: data => {
                        let loading = this.loadingctrl.create({
                            content: 'Please wait...'
                        });
                        loading.present();
                       
                        var rejorderletIds = '';
                        var inProgressOrderLets = '';
                        let rejectedItemsArray = [];
                        let inProgressItemsArray = [];






                        for (var i = 0; i < orderLetData.rejectedCount; i++) {
                            rejectedItemsArray.push({ "id": orderLetData.data[i].id });

                            if (i == orderLetData.rejectedCount - 1) {
                                rejorderletIds = rejorderletIds + orderLetData.data[i].id
                            } else {
                                rejorderletIds = rejorderletIds + orderLetData.data[i].id + ',';
                            }
                        }
                        for (var index = orderLetData.rejectedCount; index < orderLetData.data.length; index++) {
                            inProgressItemsArray.push({ "id": orderLetData.data[index].id });
                            if (index == orderLetData.rejectedCount - 1) {
                                inProgressOrderLets = inProgressOrderLets + orderLetData.data[index].id
                            } else {
                                inProgressOrderLets = inProgressOrderLets + orderLetData.data[index].id + ',';
                            }
                        }

                        var fullOrderRejorderletIds = '';
                        let fullOrderRejectedItemsArray = [];
                        for (var i = 0; i < fullorderData.orderlets.length; i++) {
                            for (var j = 0; j < fullorderData.orderlets[i].rejecetdItems.length; j++) {
                                fullOrderRejectedItemsArray.push({ "id": fullorderData.orderlets[i].rejecetdItems[j].id });


                            }

                        }

                        for (var i = 0; i < orderLetData.rejectedCount; i++) {
                            fullOrderRejectedItemsArray.push({ "id": orderLetData.data[i].id });
                        }
                      

                        for (var l = 0; l < fullOrderRejectedItemsArray.length; l++) {
                           
                            if (l == 0) {
                                fullOrderRejorderletIds = fullOrderRejorderletIds + fullOrderRejectedItemsArray[l].id
                            } else {
                                fullOrderRejorderletIds = fullOrderRejorderletIds + ',' + fullOrderRejectedItemsArray[l].id;
                            }
                        }
                     

                        //return false;
                        // if (i == orderLetData.rejectedCount - 1) {
                        //     fullOrderRejorderletIds = fullOrderRejorderletIds + orderLetData.data[i].id;
                        // } else {
                        //     fullOrderRejorderletIds = fullOrderRejorderletIds + orderLetData.data[i].id + ',';
                        // }

                        // return;
                        var ordeLetLevelurl = "/getrefundamountorderlet" + "/malls/" + fullorderData.mallId + "/orderlets/" + fullOrderRejorderletIds;
                        var deleteUrl = "/malls/" + fullorderData.mallId + "/order/" + orderLetData.data[0].orderId + "/orderletstatuschange";
                        this.oprovider.updateStatus(deleteUrl, rejectedItemsArray, "REJECTED", 0, " due to Unavailablity").subscribe(resp => {
                            console.log('/////////////////////////////////');
                            console.log(resp);
                            console.log('/////////////////////////////////');
                            if (resp.returnValue != 'RECEIVED' && resp.returnValue != 'REJECTED') {
                              
                                this.printFunction(fullorderData);
                            }
                            if (resp.returnValue == 'RECEIVED') {
                                //this.printFunction(fullorderData);
                            } else {

                               // if(this.allpermited == 'No'){
                                    var fullOrderStatusUrl = "/mall/"+fullorderData.mallId+"/fullOrder/"+fullorderData.id;
                                    this.oprovider.getFullOrderStatus(fullOrderStatusUrl).subscribe(resp2 => {

                                        // if(resp2.status!="RECEIVED")
                                        if(resp2.status=="READY" || resp2.status=="COMPLETED" || resp2.status=="REJECTED"){
                                            var  refundurl = "/getrefundamountFullOrder/malls/" + this.mallId + "/fullorder/" + fullorderData.id;
                                            this.oprovider.callRefundAmountServiceFullOrder(refundurl).subscribe(resp => {
                                                        var amount = resp['amount'];
                                                        if(amount>0){
                                                            var fullOrderAmount = resp['amount'] + resp['sgst ']+ resp['cgst']+resp['supplierDeliveryCharge']+resp['tafelDeliveryCharge']+resp['packagingCharge']+resp['convenience'];
                                                                            
                                                            if (amount > fullOrderAmount) {
                                                                amount = fullOrderAmount;
                                                            
                                                            }
                                                            console.log(amount)
                                                            fullOrderRejorderletIds = fullOrderRejorderletIds.replace(/-/g, "");
                                                            this.oprovider.callRefundServiceManager(fullorderData.dinerId, amount, fullorderData.fullOrder5DigitId, fullOrderRejorderletIds, fullorderData.id, fullorderData.mallId).subscribe(resp => {
                                                                this.callRefundServiceOrderlet = resp;
                                                            });
                                                        }
                                                    })
                                            
                                        }
                                    })
                                //}
                               
                                // if(this.allpermited == 'Yes'){
                                //     this.oprovider.callRefundAmountServiceOrderLet(ordeLetLevelurl).subscribe(resp => {
                                      
                                //         var amount = resp['amount'];
                                //         var fullOrderAmount = fullorderData.amount + fullorderData.sgst + fullorderData.cgst+fullorderData.supplierDeliveryCharge+fullorderData.tafelDeliveryCharge+fullorderData.packagingCharge+fullorderData.convenience;

                                //         // var fullOrderAmount = fullorderData.amount + fullorderData.sgst + fullorderData.cgst;
                                //         if (amount > fullOrderAmount) {
                                //             amount = fullOrderAmount;
                                           
                                //         }
                                      
                                //         fullOrderRejorderletIds = fullOrderRejorderletIds.replace(/-/g, "");
                                //         this.oprovider.callRefundServiceManager(fullorderData.dinerId, amount, fullorderData.fullOrder5DigitId, fullOrderRejorderletIds, fullorderData.id, fullorderData.mallId).subscribe(resp => {
                                //             this.callRefundServiceOrderlet = resp;
                                //         });
                                //     });
                                // }


                            }

                            //return;
                            this.getOrderDetails(fullorderData);
                            if (inProgressOrderLets.length > 0) {
                                this.oprovider.updateStatus(deleteUrl, inProgressItemsArray, "INPROGRESS", 0, '').subscribe(resp => {
                                  
                                    if (resp.returnValue == 'INPROGRESS' && fullOrderRejectedItemsArray.length > 0) {
                                        this.printFunction(fullorderData);
                                       
                                    //    if(this.allpermited == 'Yes'){
                                    //         this.oprovider.callRefundAmountServiceOrderLet(ordeLetLevelurl).subscribe(resp => {
                                              
                                    //             var amount = resp['amount'];
                                    //             var fullOrderAmount = fullorderData.amount + fullorderData.sgst + fullorderData.cgst+fullorderData.supplierDeliveryCharge+fullorderData.tafelDeliveryCharge+fullorderData.packagingCharge+fullorderData.convenience;

                                    //            // var fullOrderAmount = fullorderData.amount + fullorderData.sgst + fullorderData.cgst;
                                    //             if (amount > fullOrderAmount) {
                                    //                 amount = fullOrderAmount;
                                                   
                                    //             }
                                              
                                    //             fullOrderRejorderletIds = fullOrderRejorderletIds.replace(/-/g, "");
                                    //             this.oprovider.callRefundServiceManager(fullorderData.dinerId, amount, fullorderData.fullOrder5DigitId, fullOrderRejorderletIds, fullorderData.id, fullorderData.mallId).subscribe(resp => {
                                    //                 this.callRefundServiceOrderlet = resp;
                                    //             });
                                    //         });
                                    //     }

                                       // if(this.allpermited == 'No'){
                                            var fullOrderStatusUrl = "/mall/"+fullorderData.mallId+"/fullOrder/"+fullorderData.id;
                                            this.oprovider.getFullOrderStatus(fullOrderStatusUrl).subscribe(resp2 => {

                                                // if(resp2.status!="RECEIVED")
                                                if(resp2.status=="READY" || resp2.status=="COMPLETED" || resp2.status=="REJECTED"){
                                                    var  refundurl = "/getrefundamountFullOrder/malls/" + this.mallId + "/fullorder/" + fullorderData.id;
                                                    this.oprovider.callRefundAmountServiceFullOrder(refundurl).subscribe(resp => {
                                                        var amount = resp['amount'];
                                                        if(amount>0){
                                                            var fullOrderAmount = resp['amount'] + resp['sgst ']+ resp['cgst']+resp['supplierDeliveryCharge']+resp['tafelDeliveryCharge']+resp['packagingCharge']+resp['convenience'];
                                                                            
                                                            if (amount > fullOrderAmount) {
                                                                amount = fullOrderAmount;
                                                            
                                                            }
                                                            console.log(amount)
                                                            fullOrderRejorderletIds = fullOrderRejorderletIds.replace(/-/g, "");
                                                            this.oprovider.callRefundServiceManager(fullorderData.dinerId, amount, fullorderData.fullOrder5DigitId, fullOrderRejorderletIds, fullorderData.id, fullorderData.mallId).subscribe(resp => {
                                                                this.callRefundServiceOrderlet = resp;
                                                            });
                                                        }
                                                    })
                                                    
                                                }
                                            })
                                        //}
                                    }
                                    loading.dismiss();
                                    let alert = this.alertCtrl.create({
                                        title: orderLetData.data[0].fullOrderId5didgit + ' items deleted!',
                                        subTitle: "All/some items in the orderId: " + orderLetData.data[0].fullOrderId5didgit + " deleted successfully,refund will be credited soon.",
                                        buttons: ['OK']
                                    });
                                    alert.present()
                                    this.segmentChange('Pending', 0);

                                   
                                });

                            }
                            else {

                                loading.dismiss();
                                let alert = this.alertCtrl.create({
                                    title: orderLetData.data[0].fullOrderId5didgit + ' items deleted!',
                                    subTitle: "All/some items in the orderId: " + orderLetData.data[0].fullOrderId5didgit + " deleted successfully,refund will be credited soon.",
                                    buttons: ['OK']
                                });
                                alert.present()
                                this.segmentChange('Pending', 0);
                                this.getOrderDetails(fullorderData);
                             
                            }

                        });

                    }
                }
            ]
        });
        prompt.present();


    }
    rejectFullOrder(fullorder) {

     

        let prompt = this.alertCtrl.create({
            title: "Reject Order!",
            message: "Do YOu want to Reject Order " + fullorder.fullOrder5DigitId + "?",
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {

                    }
                },
                {
                    text: 'Proceed',
                    handler: data => {
                        let loading = this.loadingctrl.create({
                            content: 'Please wait...'
                        });
                        loading.present();
                         
                       
                            var deleteUrl=""
                            if(this.allpermited=="Yes"){
                               
                                deleteUrl = "/malls/" + fullorder.mallId + "/fullorder/" + fullorder.id + "/statusChange"
                    
                            }else{
                                deleteUrl = "/malls/" + fullorder.mallId + "/order/" + fullorder.jmOrderLet[0].orderId + "/statusChange"
                            }
                            this.oprovider.updateStatusChange(deleteUrl, "REJECTED", 0, " due to Unavailablity",fullorder.id).subscribe(resp => {
                                this.pendingOrderCount = this.pendingOrderCount - 1;
                                this.handedHoverCount = this.handedHoverCount + 1;
                                this.getAllReceivedFullOrders(this.mallId, this.outletId, 0);
                                loading.dismiss();
                                var  refundurl = "/getrefundamountFullOrder/malls/" + this.mallId + "/fullorder/" + fullorder.id;
                                this.oprovider.callRefundAmountServiceFullOrder(refundurl).subscribe(resp => {
                                   
                                    var amount = resp['amount'];
                                    if(this.allpermited=="Yes"){
                                        console.log(amount)
                                        var fullOrderAmount = fullorder.amount + fullorder.sgst + fullorder.cgst+fullorder.supplierDeliveryCharge+fullorder.tafelDeliveryCharge+fullorder.packagingCharge+fullorder.convenience;
                                        if (amount > fullOrderAmount) {
                                            amount = fullOrderAmount;
                                        
                                        }
                                        console.log(fullOrderAmount);
                                        this.oprovider.callRefundServicFullOrdereManager(fullorder.dinerId, amount, fullorder.fullOrder5DigitId, fullorder.id, fullorder.id, fullorder.mallId).subscribe(resp => {
                                            this.callRefundServiceFullOrder = resp;
                                        });
                                    }
                                    if(this.allpermited == 'No'){
                                        var fullOrderStatusUrl = "/mall/"+fullorder.mallId+"/fullOrder/"+fullorder.id;
                                        this.oprovider.getFullOrderStatus(fullOrderStatusUrl).subscribe(resp2 => {
    
                                            // if(resp2.status!="RECEIVED")
                                            if(resp2.status=="READY" || resp2.status=="COMPLETED" || resp2.status=="REJECTED"){
                                                var fullOrderAmount = resp['amount'] + resp['sgst ']+ resp['cgst']+resp['supplierDeliveryCharge']+resp['tafelDeliveryCharge']+resp['packagingCharge']+resp['convenience'];
                                                console.log(amount);
                                                console.log(fullOrderAmount);
                                                if (amount > fullOrderAmount) {
                                                    amount = fullOrderAmount;
                                                
                                                }
                                                console.log(amount)
                                                this.oprovider.callRefundServicFullOrdereManager(fullorder.dinerId, amount, fullorder.fullOrder5DigitId, fullorder.id, fullorder.id, fullorder.mallId).subscribe(resp => {
                                                    this.callRefundServiceFullOrder = resp;
                                                });
                                            }
                                        })
                                    }
                                    
                                }); 
                                
                                this.showToast('bottom', 'Order ' + fullorder.fullOrder5DigitId + ' has been rejected');

                               
                            });


                        
                    }
                }
            ]
        });
        prompt.present();

    }
    readyFullOrder(fullorder) {

        var url ="";
        if(this.allpermited=="Yes"){
            url = "/malls/" + fullorder.mallId + "/fullorder/" + fullorder.id + "/statusChange";

        }else{
            url = "/malls/" + fullorder.mallId + "/order/" + fullorder.jmOrderLet[0].orderId + "/statusChange"; 
        }
        this.showLoader = true;
        this.oprovider.updateStatusChange(url, "READY", 0, "",fullorder.id).subscribe(resp => {
           
            this.acceptedOrderCount = this.acceptedOrderCount - 1;
            this.readyOrderCount = this.readyOrderCount + 1;
            // if(this.allpermited == 'No'){
                var fullOrderStatusUrl = "/mall/"+fullorder.mallId+"/fullOrder/"+fullorder.id;
                this.oprovider.getFullOrderStatus(fullOrderStatusUrl).subscribe(resp2 => {

                    // if(resp2.status!="RECEIVED")
                    if(resp2.status=="READY" || resp2.status=="COMPLETED" || resp2.status=="REJECTED"){
                        var  refundurl = "/getrefundamountFullOrder/malls/" + this.mallId + "/fullorder/" + fullorder.id;
                        this.oprovider.callRefundAmountServiceFullOrder(refundurl).subscribe(resp => {
                                    var amount = resp['amount'];
                                    if(amount>0){
                                        var fullOrderAmount = resp['amount'] + resp['sgst ']+ resp['cgst']+resp['supplierDeliveryCharge']+resp['tafelDeliveryCharge']+resp['packagingCharge']+resp['convenience'];
                                                        
                                        if (amount > fullOrderAmount) {
                                            amount = fullOrderAmount;
                                        
                                        }
                                        console.log(amount)
                                        this.oprovider.callRefundServicFullOrdereManager(fullorder.dinerId, amount, fullorder.fullOrder5DigitId, fullorder.id, fullorder.id, fullorder.mallId).subscribe(resp => {
                                            this.callRefundServiceFullOrder = resp;
                                        });
                                    }
                                })
                        
                    }
                })
            // }
            this.showToast('bottom', 'Order has been moved to Ready');
            this.getAllPendingFullOrders(this.mallId, 0);
        });
        this.showLoader = !true;
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
    handOverFullOrder(fullorder) {
        let prompt = this.alertCtrl.create({
            message: "",
            inputs: [
                {
                    name: 'Confirmation Code',
                    type: 'number',
                    placeholder: 'Confirmation Code'
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

                        this.oprovider.checkOtp(data['Confirmation Code'], fullorder.id).subscribe(resp => {
                            if (resp['returnValue'] == "Success") {
                                var status = "HANDEDOVER";
                                var url ="";
                                if(this.allpermited=="Yes"){
                                    url = "/malls/" + fullorder.mallId + "/fullorder/" + fullorder.id + "/statusChange";

                                }else{
                                    url = "/malls/" + fullorder.mallId + "/order/" + fullorder.jmOrderLet[0].orderId + "/statusChange"; 
                                }
                                this.showLoader = true;
                                this.oprovider.updateStatusChange(url, "COMPLETED", 0, "",fullorder.id).subscribe(resp => {

                                    this.readyOrderCount = this.readyOrderCount - 1;
                                    this.hadedOverCount = this.hadedOverCount + 1;
                                    this.showToast('bottom', 'Order has been moved to Handover');
                                    this.getAllReadyFullOrders(this.mallId, this.outletId, 0);
                                });
                                this.showLoader = !true;
                            }
                            else {
                                let alert = this.alertCtrl.create({
                                    title: 'Invalid Code',
                                    subTitle: 'Invalid Confirmation Code',
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

}