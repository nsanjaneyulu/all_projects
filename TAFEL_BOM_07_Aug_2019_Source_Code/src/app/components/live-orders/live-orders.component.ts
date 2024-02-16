import { Component, OnInit } from '@angular/core';
import { LiveOrderService } from '../../services/liveOrder.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DashboardService } from '../../services/dashboard.service';
import { all } from 'q';

@Component({
  selector: 'app-live-orders',
  templateUrl: './live-orders.component.html',
  styleUrls: ['./live-orders.component.scss']
})
export class LiveOrdersComponent implements OnInit {
  showLoader: boolean;
  mallID: any;
  otpModel = false;
  pending: boolean = true;
  accept: boolean = false;
  ready: boolean = false;
  handover: boolean = false;
  orderDetails: boolean = false;
  mallDataResp: any;
  mallDetailsDropdown: any;
  outletIDs: any;
  mallOutletId = "all";
  fullOrder5DigitId: any;
  allPermitted = "Yes"
  showAcceptedBlock = false;
  showPendingBlock = false;
  showhandedOverBlock = true;
  showReadyBlock = false;
  getAllPendingFullOrdersLength = 0;
  getAllHandedOverOrdersLength = 0;
  getAllReadyFullOrdersLength = 0;
  getAllReceivedFullOrdersLength = 0;
  public fullOrderObjects: any = [];
  k = 0;
  public fullorder: any = [];
  public fullOrderstatus = "";
  outletOrdersDetails: any;
  pendingOrderCount = 0;
  acceptedOrderCount = 0;
  readyOrderCount = 0;
  hadedOverCount = 0;
  itemFullName = [];
  handedHoverCount = 0;
  ordersList: string = "All";
  outletIds: string[];
  getMallDetailsResp: any = { address: { area: "", city: "", } };
  outletId = "all";
  orders: string;
  mallId: string;
  outletDetailsResp: any;
  fullorders: any = [];
  searchFullorders: any = [];
  segmentSelect: string = "Pending";
  showOrderLoader: boolean;
  segmentName: string;
  clearIntervals: number;
  searchTerm: string = '';
  searchFalse: boolean = true;
  toDate: any;
  fromDate: any;
  getAllCountsResp: any = {};
  handedoverCount = 0;
  constructor(private liveOrderService: LiveOrderService, private toastrModule: ToastrManager, public dashboardService: DashboardService) {
  }

  isActive(index: any) {

    if (index == "pending") {
      this.pending = true;
      this.accept = false;
      this.ready = false;
      this.handover = false;
    }
    else if (index == "accept") {
      this.pending = false;
      this.accept = true;
      this.ready = false;
      this.handover = false;
    }
    else if (index == "ready") {
      this.pending = false;
      this.accept = false;
      this.ready = true;
      this.handover = false;
    }
    else {
      this.pending = false;
      this.accept = false;
      this.ready = false;
      this.handover = true;
    }

  };

  ngOnInit() {
    this.mallDetails();

  }

  outletNameChange(mallOutletId) {
    this.k = -1;
    this.searchFullorders = [];
    this.getAllPendingFullOrdersLength = 0;
    this.getAllHandedOverOrdersLength = 0;
    this.getAllReadyFullOrdersLength = 0;
    this.getAllReceivedFullOrdersLength = 0;
    this.pending = true;
    this.accept = false;
    this.ready = false;
    this.handover = false;
    this.outletId = mallOutletId;
    this.getAllCounts(this.mallID);
    this.getAllReceivedFullOrders(this.mallID, this.outletId);
  }

  getMallDetails(mallId) {
    var getMallDetailsUrl = "/mall/" + mallId;

    this.liveOrderService.getMallDetails(getMallDetailsUrl).subscribe(resp => {
      this.getMallDetailsResp = resp;
    });
  }
  mallDetails() {
    this.liveOrderService.mallDetailsService()
      .subscribe(data => {
        this.mallDataResp = data;
        this.mallDetailsDropdown = this.mallDataResp[0].mallId;
        this.mallID = this.mallDataResp[0].mallId;
        this.getMallDetails(this.mallID);
        if (this.allPermitted == 'No') {
          let getOutletDetailsURL = 'mall/' + this.mallID + '/getOutletByMallID';
          this.dashboardService.outletDetailsService(getOutletDetailsURL)
            .subscribe(data => {
              let outletDetail:any=[];
              outletDetail = data;
              this.outletDetailsResp=[];
              this.outletDetailsResp[0]={id:"all",name:"All"}
              for(var i=0;i<outletDetail['jmoutlet'].length;i++){
                this.outletDetailsResp[i+1] = outletDetail['jmoutlet'][i];
              }
             
              this.outletId = this.mallOutletId;
              this.getAllCounts(this.mallID);
            });
        } else {
          this.outletId = this.outletId;
          this.getAllCounts(this.mallID);
        }
        if (this.mallID) {
          this.segmentChange('Pending', 0);
          this.segmentSelect = "Pending";

        }
        this.mallDataResp.forEach(element => {
          this.outletIDs = element.outletIds;

        });
      },
        error => console.log(error));
  }
  getAllCounts(mallID) {
    let getAllCountsURL = "";
    let page = "liveOrder";
    getAllCountsURL = 'mall/' + mallID + '/outletid/' + this.outletId + '/page/' + page + '/getAllOrderStatusCount';
    this.dashboardService.getAllCountsService(getAllCountsURL)
      .subscribe(data => {
        this.getAllCountsResp = data;
        this.handedoverCount = (this.getAllCountsResp.completed + this.getAllCountsResp.rejected);
       
      },
        error => console.log(error));
  }
  mallNameChange(mallID) {
    this.k = -1;
    this.getAllPendingFullOrdersLength = 0;
    this.getAllHandedOverOrdersLength = 0;
    this.getAllReadyFullOrdersLength = 0;
    this.getAllReceivedFullOrdersLength = 0;
    this.mallID = mallID;
    this.getMallDetails(this.mallID);
    this.mallDataResp.forEach(element => {
      if (element.mallId == mallID) {
        this.allPermitted = element.allPermitted;
        if (this.allPermitted == 'No') {
          let getOutletDetailsURL = 'mall/' + mallID + '/getOutletByMallID';
          this.dashboardService.outletDetailsService(getOutletDetailsURL)
            .subscribe(data => {
              let outletDetail:any=[];
              outletDetail = data;
              console.log("outletDetail", outletDetail);
              this.outletDetailsResp=[];
              this.outletDetailsResp[0]={id:"all",name:"All"}
              for(var i=0;i<outletDetail['jmoutlet'].length;i++){
                this.outletDetailsResp[i+1] = outletDetail['jmoutlet'][i];
              }
              // = data;
              console.log(this.outletDetailsResp);
              this.mallOutletId = this.outletDetailsResp[0].id;
              //   this.outletId = "all";
              console.log(this.mallOutletId);
              this.outletId = this.mallOutletId;
              this.getAllCounts(this.mallID);
              this.getAllReceivedFullOrders(this.mallID, this.outletId);
            });
        } else {
          this.outletId = "all";
          this.getAllCounts(this.mallID);
          this.getAllReceivedFullOrders(this.mallID, this.outletId);
        }
      }
    });
    this.pending = true;
    this.accept = false;
    this.ready = false;
    this.handover = false;
  }
  doRefresh() {
    this.segmentChange(this.segmentName, 1);
  }

  checkAllpermiatable(type, mallId) {
  
    if (this.allPermitted == "Yes") {
      if (type == "PENDING") {
        return "/mall/" + mallId + "/outlet/all/getAllPendingFullOrders";
      }
      else if (type == "RECEIVED") {
        return "/mall/" + mallId + "/outlet/all/getAllReceivedFullOrders";
      }
      else if (type == "READY") {
        return "/mall/" + mallId + "/outlet/all/getAllReadyFullOrders";
      }
      else if (type == "HANDEDOVER") {
        return "/mall/" + mallId + "/outlet/all/getAllCompletedFullOrders";
      }
    }
    else {
    
      if(this.mallOutletId=='all'){
        if (type == "PENDING") {
          return "/mall/" + mallId + "/status/INPROGRESS/getAllOrders";
        }
        else if (type == "RECEIVED") {
          return "/mall/" + mallId + "/status/RECEIVED/getAllOrders";
        }
        else if (type == "READY") {
          return "/mall/" + mallId + "/status/READY/getAllOrders";
        }
        else if (type == "HANDEDOVER") {
          return "/mall/" + mallId + "/status/HANDEDOVER/getAllOrders";
        }
      }else{
        if (type == "PENDING") {
          return "/mall/" + mallId + "/outlet/" + this.outletId + "/getAllPendingOrders";
        }
        else if (type == "RECEIVED") {
          return "/mall/" + mallId + "/outlet/" + this.outletId + "/getAllReceivedOrders";
        }
        else if (type == "READY") {
          return "/mall/" + mallId + "/outlet/" + this.outletId + "/getAllReadyOrders";
        }
        else if (type == "HANDEDOVER") {
          return "/mall/" + mallId + "/outlet/" + this.outletId + "/getAllCompletedOrders";
        }
      }
      
    }
  }
  getAllPendingFullOrders(mallId, flikTime) {
    var getAllFullOrdersUrl = this.checkAllpermiatable("PENDING", mallId);
    this.showLoader = true;
    console.log("this.allPermitted",this.allPermitted);
    this.liveOrderService.getOrders(getAllFullOrdersUrl, this.allPermitted, this.mallOutletId).subscribe(resp => {
      this.fullorders = resp;
      this.showLoader = false;
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
            if (dinnerAddress) {
              var splitDinnerAddress = dinnerAddress.split(",");


              this.fullorders[i].deliveryAddress = splitDinnerAddress[0];

              this.fullorders[i].deliveryAddress1 = splitDinnerAddress[1];

              this.fullorders[i].deliveryAddress2 = splitDinnerAddress[2];
              this.fullorders[i].deliveryAddress3 = splitDinnerAddress[3];
            }
          }
          else {
            var dinnerAddress = this.fullorders[i].orderlets[0].data[0].dinnerVehicleNumber;
            if (dinnerAddress) {
              var splitDinnerAddress = dinnerAddress.split(",");


              this.fullorders[i].deliveryAddress = splitDinnerAddress[0];


              this.fullorders[i].deliveryAddress1 = splitDinnerAddress[1];
              this.fullorders[i].deliveryAddress2 = splitDinnerAddress[2];
              this.fullorders[i].deliveryAddress3 = splitDinnerAddress[3];
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

    var getAllFullOrdersUrl = this.checkAllpermiatable("READY", mallId);
    this.showLoader = true;
    this.liveOrderService.getOrders(getAllFullOrdersUrl,this.allPermitted,this.mallOutletId).subscribe(resp => {
      this.fullorders = resp;
      this.showLoader = false;

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
            if (dinnerAddress) {
              var splitDinnerAddress = dinnerAddress.split(",");


              this.fullorders[i].deliveryAddress = splitDinnerAddress[0];

              this.fullorders[i].deliveryAddress1 = splitDinnerAddress[1];

              this.fullorders[i].deliveryAddress2 = splitDinnerAddress[2];
              this.fullorders[i].deliveryAddress3 = splitDinnerAddress[3];
            }
          }
          else {
            var dinnerAddress = this.fullorders[i].orderlets[0].data[0].dinnerVehicleNumber;
            if (dinnerAddress) {
              var splitDinnerAddress = dinnerAddress.split(",");


              this.fullorders[i].deliveryAddress = splitDinnerAddress[0];


              this.fullorders[i].deliveryAddress1 = splitDinnerAddress[1];
              this.fullorders[i].deliveryAddress2 = splitDinnerAddress[2];
              this.fullorders[i].deliveryAddress3 = splitDinnerAddress[3];
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
  getAllReceivedFullOrders(mallId, outletId) {
    var getAllFullOrdersUrl = this.checkAllpermiatable("RECEIVED", mallId);
    this.showLoader = true;
    this.liveOrderService.getOrders(getAllFullOrdersUrl, this.allPermitted, this.mallOutletId).subscribe(resp => {
      this.fullorders = resp;

      this.showLoader = false;

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
            if (dinnerAddress) {


              var splitDinnerAddress = dinnerAddress.split(",");


              this.fullorders[i].deliveryAddress = splitDinnerAddress[0];

              this.fullorders[i].deliveryAddress1 = splitDinnerAddress[1];

              this.fullorders[i].deliveryAddress2 = splitDinnerAddress[2];
              this.fullorders[i].deliveryAddress3 = splitDinnerAddress[3];

            }
          }
          else {
            var dinnerAddress = this.fullorders[i].orderlets[0].data[0].dinnerVehicleNumber;
            if (dinnerAddress) {
              var splitDinnerAddress = dinnerAddress.split(",");


              this.fullorders[i].deliveryAddress = splitDinnerAddress[0];


              this.fullorders[i].deliveryAddress1 = splitDinnerAddress[1];
              this.fullorders[i].deliveryAddress2 = splitDinnerAddress[2];
              this.fullorders[i].deliveryAddress3 = splitDinnerAddress[3];
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
    var getAllFullOrdersUrl = this.checkAllpermiatable("HANDEDOVER", mallId);
    // var getAllFullOrdersUrl = "/mall/" + mallId + "/outlet/all/getAllCompletedFullOrders/to/" + this.toDate + "/from/" + this.fromDate;/*"/mall/" + mallId + "/outlet/all/getAllCompletedFullOrders";*/
    this.showLoader = true;
    this.liveOrderService.getOrders(getAllFullOrdersUrl,this.allPermitted, this.mallOutletId).subscribe(resp => {
      this.fullorders = resp;
      console.log("this.fullorders",this.fullorders);
      this.showLoader = false;
     
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
            if (dinnerAddress) {
              var splitDinnerAddress = dinnerAddress.split(",");
              this.fullorders[i].deliveryAddress = splitDinnerAddress[0];
              this.fullorders[i].deliveryAddress1 = splitDinnerAddress[1];
              this.fullorders[i].deliveryAddress2 = splitDinnerAddress[2];
              this.fullorders[i].deliveryAddress3 = splitDinnerAddress[3];
            }
          }
          else {
            var dinnerAddress = this.fullorders[i].orderlets[0].data[0].dinnerVehicleNumber;
            if (dinnerAddress) {
              var splitDinnerAddress = dinnerAddress.split(",");
              this.fullorders[i].deliveryAddress = splitDinnerAddress[0];
              this.fullorders[i].deliveryAddress1 = splitDinnerAddress[1];
              this.fullorders[i].deliveryAddress2 = splitDinnerAddress[2];
              this.fullorders[i].deliveryAddress3 = splitDinnerAddress[3];
            }
          }
          this.fullorders[i].name = name;
          this.fullorders[i].phoneNumber = this.fullorders[i].orderlets[0].data[0].dinnerPhoneNumber;
        }
      }
      this.fullorders.map(order => {
        order.createdDateStr = new Date(order.modifiedDate);
        return order;
      });

      this.fullorders.filter((order) => {
        return (order.modifiedDate <= currentEnd.setHours(23, 59, 59, 999)) && (order.modifiedDate >= currentStart.setHours(0, 0, 0, 0));
      });
      this.getAllHandedOverOrdersLength = this.fullorders.length;

      this.setFilteredItems();
      this.showLoader = !true;

    });


  }



  segmentChange(ordersList, flikTime) {
    this.searchFullorders = [];
    this.segmentName = ordersList;

    if (ordersList === 'All') {
      if (this.mallID) {

      }
    } else if (ordersList === 'Pending') {
      this.k = -1;
      this.showAcceptedBlock = false;
      this.showPendingBlock = true;
      this.showhandedOverBlock = true;
      this.showReadyBlock = false;
      this.getAllCounts(this.mallID);
      this.getAllReceivedFullOrders(this.mallID, this.outletId);



    } else if (ordersList === 'Accepted') {
      this.k = -1;
      this.showAcceptedBlock = true;
      this.showPendingBlock = false;
      this.showhandedOverBlock = true;
      this.showReadyBlock = false;
      this.getAllCounts(this.mallID);
      this.getAllPendingFullOrders(this.mallID, flikTime);

    } else if (ordersList === 'Ready') {
      this.k = -1;
      this.showAcceptedBlock = false;
      this.showPendingBlock = false;
      this.showhandedOverBlock = true;
      this.showReadyBlock = true;
      this.getAllCounts(this.mallID);
      this.getAllReadyFullOrders(this.mallID, this.outletId, 0);

    } else if (ordersList === 'handedOver') {
      this.k = -1;
      this.showAcceptedBlock = false;
      this.showPendingBlock = false;
      this.showhandedOverBlock = false;
      this.showReadyBlock = false;
      this.getAllCounts(this.mallID);
      this.getAllHandedOverOrders(this.mallID, this.outletId, flikTime);

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









  setFilteredItems() {
    // this.searchFullorders = [];
    console.log("this.fullorders", this.fullorders);
    this.searchTerm = this.searchTerm.toUpperCase();
    if (!this.searchTerm) {
      this.searchFalse = true;
    } else {
      this.searchFalse = false;
    }
    this.searchFullorders = this.fullorders.filter((order) => {
      return order.fullOrder5DigitId.toString().indexOf(this.searchTerm) > -1;
    });
    console.log("this.searchFullorders", this.searchFullorders);





  }




  acceptFullOrder(fullorder) {
    var url = "";
    if (this.allPermitted == "Yes") {
      url = "/malls/" + fullorder.mallId + "/fullorder/" + fullorder.id + "/statusChange";

    } else {
      url = "/malls/" + fullorder.mallId + "/order/" + fullorder.jmOrderLet[0].orderId + "/statusChange";
    }
    this.showLoader = true;
    this.liveOrderService.updateStatusChange(url, "INPROGRESS", 0, "", fullorder.id).subscribe(resp => {

      this.showLoader = false

      this.pendingOrderCount = this.pendingOrderCount - 1;
      this.acceptedOrderCount = this.acceptedOrderCount + 1;

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

        this.liveOrderService.callRefundAmountServiceOrderLet(ordeLetLevelurl).subscribe(resp => {

          var amount = resp['amount'];
          var fullOrderAmount = fullorder.amount + fullorder.sgst + fullorder.cgst + fullorder.supplierDeliveryCharge + fullorder.tafelDeliveryCharge + fullorder.packagingCharge + fullorder.convenience;
          if (amount > fullOrderAmount) {
            amount = fullOrderAmount;

          }

          rejorderletIds = rejorderletIds.replace(/-/g, "");
          if (this.allPermitted == 'No') {
            var fullOrderStatusUrl = "/mall/" + fullorder.mallId + "/fullOrder/" + fullorder.id;
            this.showLoader = true;
            this.liveOrderService.getFullOrderStatus(fullOrderStatusUrl).subscribe(resp => {

              // if(resp.status!="RECEIVED")
              if (resp.status == "READY" || resp.status == "COMPLETED" || resp.status == "REJECTED") {
                var refundurl = "/getOrderRefundAmountForRejectOrders/malls/" + this.mallID + "/fullorder/" + fullorder.id;
                this.liveOrderService.callRefundAmountServiceFullOrder(refundurl).subscribe(resp1 => {

                  var amount = resp1['amount'];
                  var fullOrderAmount = resp.amount + resp.sgst + resp.cgst + resp.supplierDeliveryCharge + resp.tafelDeliveryCharge + resp.packagingCharge + resp.convenience;


                  if (amount > fullOrderAmount) {
                    amount = fullOrderAmount;

                  }

                  this.liveOrderService.callRefundServiceManager(fullorder.dinerId, amount, fullorder.fullOrder5DigitId, rejorderletIds, fullorder.id, fullorder.mallId).subscribe(resp => {
                    this.callRefundServiceOrderlet = resp;
                  });

                });

              }
            })
          } else {
            this.liveOrderService.callRefundServiceManager(fullorder.dinerId, amount, fullorder.fullOrder5DigitId, rejorderletIds, fullorder.id, fullorder.mallId).subscribe(resp => {
              this.callRefundServiceOrderlet = resp;
            });
          }




        });
      }

      this.toastrModule.successToastr('Your order has been moved Accept', 'Success!');
      this.segmentChange('Pending', 0);









    });

    this.goOrderDetails(event, fullorder, this.k)
    this.showLoader = !true;
  }

  callRefundServiceFullOrder(fullorder, amount) {
    var orderId = fullorder.id;
    orderId = orderId;
    this.liveOrderService.callRefundServicFullOrdereManager(fullorder.dinerId, amount, fullorder.fullOrder5DigitId, orderId, fullorder.id, fullorder.mallId).subscribe(resp => {
      this.callRefundServiceFullOrder = resp;
    });
  }

  callRefundServiceOrderlet(dinnerId, amount, fullOrderId5didgit, orderIds, fullOrderId, mallId) {

    orderIds = orderIds.replace(/-/g, "");
    this.liveOrderService.callRefundServiceManager(dinnerId, amount, fullOrderId5didgit, orderIds, fullOrderId, mallId).subscribe(resp => {
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



  quantityDecrement(order) {
    //order.rejectedCount = order.data.length;
    if (1 == order.rejectedCount) {

      return false;
    } else {
      order.rejectedCount--;
    }

  }
  deleteItemLevel(fullorderData, orderLetData) {





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



    var ordeLetLevelurl = "/getrefundamountorderlet" + "/malls/" + fullorderData.mallId + "/orderlets/" + fullOrderRejorderletIds;
    var deleteUrl = "/malls/" + fullorderData.mallId + "/order/" + orderLetData.data[0].orderId + "/orderletstatuschange";
    this.showLoader = true;
    this.liveOrderService.updateStatus(deleteUrl, rejectedItemsArray, "REJECTED", 0, " due to Unavailablity").subscribe(resp => {
      this.showLoader = false;
     

      if (resp.returnValue != 'RECEIVED' && resp.returnValue != 'REJECTED') {


      }
      if (resp.returnValue == 'RECEIVED') {

      } else {

        if (this.allPermitted == 'No') {
          var fullOrderStatusUrl = "/mall/" + fullorderData.mallId + "/fullOrder/" + fullorderData.id;
          this.liveOrderService.getFullOrderStatus(fullOrderStatusUrl).subscribe(resp2 => {

            // if(resp2.status!="RECEIVED")
            if (resp2.status == "READY" || resp2.status == "COMPLETED" || resp2.status == "REJECTED") {
              var refundurl = "/getOrderRefundAmountForRejectOrders/malls/" + this.mallID + "/fullorder/" + fullorderData.id;
              this.liveOrderService.callRefundAmountServiceFullOrder(refundurl).subscribe(resp => {
                var amount = resp['amount'];
                if (amount > 0) {
                  var fullOrderAmount = resp['amount'] + resp['sgst '] + resp['cgst'] + resp['supplierDeliveryCharge'] + resp['tafelDeliveryCharge'] + resp['packagingCharge'] + resp['convenience'];

                  if (amount > fullOrderAmount) {
                    amount = fullOrderAmount;

                  }

                  fullOrderRejorderletIds = fullOrderRejorderletIds.replace(/-/g, "");
                  this.liveOrderService.callRefundServiceManager(fullorderData.dinerId, amount, fullorderData.fullOrder5DigitId, fullOrderRejorderletIds, fullorderData.id, fullorderData.mallId).subscribe(resp => {
                    this.callRefundServiceOrderlet = resp;
                  });
                }
              })

            }
          })
        }

        if (this.allPermitted == 'Yes') {
          this.liveOrderService.callRefundAmountServiceOrderLet(ordeLetLevelurl).subscribe(resp => {

            var amount = resp['amount'];
            var fullOrderAmount = fullorderData.amount + fullorderData.sgst + fullorderData.cgst + fullorderData.supplierDeliveryCharge + fullorderData.tafelDeliveryCharge + fullorderData.packagingCharge + fullorderData.convenience;

           
            if (amount > fullOrderAmount) {
              amount = fullOrderAmount;

            }

            fullOrderRejorderletIds = fullOrderRejorderletIds.replace(/-/g, "");
            this.liveOrderService.callRefundServiceManager(fullorderData.dinerId, amount, fullorderData.fullOrder5DigitId, fullOrderRejorderletIds, fullorderData.id, fullorderData.mallId).subscribe(resp => {
              this.callRefundServiceOrderlet = resp;
            });
          });
        }


      }


      this.getOrderDetails(fullorderData);
      if (inProgressOrderLets.length > 0) {
        this.showLoader = true;
        this.liveOrderService.updateStatus(deleteUrl, inProgressItemsArray, "INPROGRESS", 0, '').subscribe(resp => {
          this.showLoader = false;
          if (resp.returnValue == 'INPROGRESS' && fullOrderRejectedItemsArray.length > 0) {


            if (this.allPermitted == 'Yes') {
              this.liveOrderService.callRefundAmountServiceOrderLet(ordeLetLevelurl).subscribe(resp => {

                var amount = resp['amount'];
                var fullOrderAmount = fullorderData.amount + fullorderData.sgst + fullorderData.cgst + fullorderData.supplierDeliveryCharge + fullorderData.tafelDeliveryCharge + fullorderData.packagingCharge + fullorderData.convenience;

               
                if (amount > fullOrderAmount) {
                  amount = fullOrderAmount;

                }

                fullOrderRejorderletIds = fullOrderRejorderletIds.replace(/-/g, "");
                this.liveOrderService.callRefundServiceManager(fullorderData.dinerId, amount, fullorderData.fullOrder5DigitId, fullOrderRejorderletIds, fullorderData.id, fullorderData.mallId).subscribe(resp => {
                  this.callRefundServiceOrderlet = resp;
                });
              });
            }

            if (this.allPermitted == 'No') {
              var fullOrderStatusUrl = "/mall/" + fullorderData.mallId + "/fullOrder/" + fullorderData.id;
              this.showLoader = true;
              this.liveOrderService.getFullOrderStatus(fullOrderStatusUrl).subscribe(resp2 => {
                this.showLoader = false;
               
                if (resp2.status == "READY" || resp2.status == "COMPLETED" || resp2.status == "REJECTED") {
                  var refundurl = "/getOrderRefundAmountForRejectOrders/malls/" + this.mallID + "/fullorder/" + fullorderData.id;
                  this.liveOrderService.callRefundAmountServiceFullOrder(refundurl).subscribe(resp => {
                    var amount = resp['amount'];
                    if (amount > 0) {
                      var fullOrderAmount = resp['amount'] + resp['sgst '] + resp['cgst'] + resp['supplierDeliveryCharge'] + resp['tafelDeliveryCharge'] + resp['packagingCharge'] + resp['convenience'];

                      if (amount > fullOrderAmount) {
                        amount = fullOrderAmount;

                      }

                      fullOrderRejorderletIds = fullOrderRejorderletIds.replace(/-/g, "");
                      this.liveOrderService.callRefundServiceManager(fullorderData.dinerId, amount, fullorderData.fullOrder5DigitId, fullOrderRejorderletIds, fullorderData.id, fullorderData.mallId).subscribe(resp => {
                        this.callRefundServiceOrderlet = resp;
                      });
                    }
                  })

                }
              })
            }
          }

          this.segmentChange('Pending', 0);
          this.toastrModule.successToastr('your Item has been rejected' + ' ' + orderLetData.data[0].fullOrderId5didgit + ' ', 'Success!');

        });

      }
      else {
        this.segmentChange('Pending', 0);
        this.getOrderDetails(fullorderData);

      }

    });

  }



  rejectFullOrder(fullorder) {
    var deleteUrl = ""
    if (this.allPermitted == "Yes") {

      deleteUrl = "/malls/" + fullorder.mallId + "/fullorder/" + fullorder.id + "/statusChange"

    } else {
      deleteUrl = "/malls/" + fullorder.mallId + "/order/" + fullorder.jmOrderLet[0].orderId + "/statusChange"
    }
    this.liveOrderService.updateStatusChange(deleteUrl, "REJECTED", 0, " due to Unavailablity", fullorder.id).subscribe(resp => {
      this.pendingOrderCount = this.pendingOrderCount - 1;
      this.handedHoverCount = this.handedHoverCount + 1;
      this.getAllReceivedFullOrders(this.mallID, this.outletId);

      var refundurl = "/getOrderRefundAmountForRejectOrders/malls/" + this.mallID + "/fullorder/" + fullorder.id;
      this.liveOrderService.callRefundAmountServiceFullOrder(refundurl).subscribe(resp => {

        var amount = resp['amount'];
        if (this.allPermitted == "Yes") {

          var fullOrderAmount = fullorder.amount + fullorder.sgst + fullorder.cgst + fullorder.supplierDeliveryCharge + fullorder.tafelDeliveryCharge + fullorder.packagingCharge + fullorder.convenience;
          if (amount > fullOrderAmount) {
            amount = fullOrderAmount;

          }

          this.liveOrderService.callRefundServicFullOrdereManager(fullorder.dinerId, amount, fullorder.fullOrder5DigitId, fullorder.id, fullorder.id, fullorder.mallId).subscribe(resp => {
            this.callRefundServiceFullOrder = resp;
          });
        }
        if (this.allPermitted == 'No') {
          var fullOrderStatusUrl = "/mall/" + fullorder.mallId + "/fullOrder/" + fullorder.id;
          this.liveOrderService.getFullOrderStatus(fullOrderStatusUrl).subscribe(resp2 => {

            // if(resp2.status!="RECEIVED")
            if (resp2.status == "READY" || resp2.status == "COMPLETED" || resp2.status == "REJECTED") {
              var fullOrderAmount = resp['amount'] + resp['sgst '] + resp['cgst'] + resp['supplierDeliveryCharge'] + resp['tafelDeliveryCharge'] + resp['packagingCharge'] + resp['convenience'];


              if (amount > fullOrderAmount) {
                amount = fullOrderAmount;

              }

              this.liveOrderService.callRefundServicFullOrdereManager(fullorder.dinerId, amount, fullorder.fullOrder5DigitId, fullorder.id, fullorder.id, fullorder.mallId).subscribe(resp => {
                this.callRefundServiceFullOrder = resp;
              });
            }
          })
        }

      });

      this.toastrModule.successToastr('Your order has been rejected' + ' ' + fullorder.fullOrder5DigitId + ' ' + 'Success!');


    });








  }
  readyFullOrder(fullorder) {

    var url = "";
    if (this.allPermitted == "Yes") {
      url = "/malls/" + fullorder.mallId + "/fullorder/" + fullorder.id + "/statusChange";

    } else {
      url = "/malls/" + fullorder.mallId + "/order/" + fullorder.jmOrderLet[0].orderId + "/statusChange";
    }
    this.showLoader = true;
    this.liveOrderService.updateStatusChange(url, "READY", 0, "", fullorder.id).subscribe(resp => {
      this.showLoader = false;
      this.acceptedOrderCount = this.acceptedOrderCount - 1;
      this.readyOrderCount = this.readyOrderCount + 1;
      if (this.allPermitted == 'No') {
        var fullOrderStatusUrl = "/mall/" + fullorder.mallId + "/fullOrder/" + fullorder.id;
        this.liveOrderService.getFullOrderStatus(fullOrderStatusUrl).subscribe(resp2 => {

          // if(resp2.status!="RECEIVED")
          if (resp2.status == "READY" || resp2.status == "COMPLETED" || resp2.status == "REJECTED") {
            var refundurl = "/getOrderRefundAmountForRejectOrders/malls/" + this.mallID + "/fullorder/" + fullorder.id;
            this.liveOrderService.callRefundAmountServiceFullOrder(refundurl).subscribe(resp => {
              var amount = resp['amount'];
              if (amount > 0) {
                var fullOrderAmount = resp['amount'] + resp['sgst '] + resp['cgst'] + resp['supplierDeliveryCharge'] + resp['tafelDeliveryCharge'] + resp['packagingCharge'] + resp['convenience'];

                if (amount > fullOrderAmount) {
                  amount = fullOrderAmount;

                }

                this.liveOrderService.callRefundServicFullOrdereManager(fullorder.dinerId, amount, fullorder.fullOrder5DigitId, fullorder.id, fullorder.id, fullorder.mallId).subscribe(resp => {
                  this.callRefundServiceFullOrder = resp;
                });
              }
            })

          }
        })
      }
      this.toastrModule.successToastr('Your order has been moved Handed Over', 'Success!');
      this.getAllPendingFullOrders(this.mallID, 0);
    });
    this.showLoader = !true;
  }

  handOverFullOrder(fullorder) {
    var confirmationCode = prompt("Please Enter Confirmation Code", "");
    if (confirmationCode != null) {
      this.liveOrderService.checkOtp(confirmationCode, fullorder.id).subscribe(resp => {
        if (resp['returnValue'] == "Success") {
          var status = "HANDEDOVER";
          var url = "";
          if (this.allPermitted == "Yes") {
            url = "/malls/" + fullorder.mallId + "/fullorder/" + fullorder.id + "/statusChange";

          } else {
            url = "/malls/" + fullorder.mallId + "/order/" + fullorder.jmOrderLet[0].orderId + "/statusChange";
          }
          this.showLoader = true;
          this.liveOrderService.updateStatusChange(url, "COMPLETED", 0, "", fullorder.id).subscribe(resp => {
            this.showLoader = false;
            this.readyOrderCount = this.readyOrderCount - 1;
            this.hadedOverCount = this.hadedOverCount + 1;
            this.toastrModule.successToastr('Your order has been moved completed', 'Success!');
            this.getAllReadyFullOrders(this.mallID, this.outletId, 0);
          });
        }
        else {
          this.toastrModule.errorToastr("Please Enter Valid Confirmation Code", 'Failure!');
        }
      });
    }



  }


}

