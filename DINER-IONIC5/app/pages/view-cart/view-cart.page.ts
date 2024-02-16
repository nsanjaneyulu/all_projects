import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilitiesService } from '../../services/utilities.service';
import { ViewCartService } from '../../services/view-cart.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.page.html',
  styleUrls: ['./view-cart.page.scss'],
})
export class ViewCartPage implements OnInit {
  cartItems: any = [];
  cartItemsAmountDetails: any = [];
  outletsData: any = [];
  orderDetails: any = {};
  imageEndPoint: any;
  itemCountDetails: number = 0;
  orderValue: number = 0;
  orderDiscountValue: number = 0;
  noItemsAvailable: boolean = false;
  showcompanyName = false;
  billSummary: any;
  selectedItem = false;
  fullOrderId: any;
  rowAndSeat = "";
  a1selectedadress: String = "";
  a2selectedadress: String = "";
  a3selectedadress: String = "";
  showViewCartPage: boolean = true;
  hasDelivery: boolean = false;
  needDelivery: boolean = false;
  name: string = '';
  paymentDetails: any = {};
  mallData: any;
  aladress: any = [];
  a2adress: any = [];
  a3adress: any = [];
  a1AddressResponse: any = [];
  vehicleNumber: any;
  upiPaymentOptions: any;
  userDetails: any;
  automatiClose: boolean = true;
  seatROWCOM="";
  specialInstruction:string="";
  dinningValue:any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private utilitiesService: UtilitiesService,
    private viewCartService: ViewCartService,
    private storage: Storage
  ) {
    this.imageEndPoint = this.utilitiesService.imageEndPoint;
  }

  ngOnInit() {
    //this.storage.set("NAMEE","")
    console.log('sdkfghfksf')
    this.viewCartSetData();
    this.showViewCartPage = false;
    
    this.storage.get("USERDETAILS").then(userDetailsValue => {
      this.userDetails = userDetailsValue
    })
    // this.storage.get("PHONENUMBER").then(phoneNumber => {
    //   console.log("#%@$@#$@#$@#$#@$@#$@#$@#423");
    //   console.log(phoneNumber);
    //   console.log("$%%#$%#$%#$%#$%#$%#$%34");
    //   this.utilitiesService.userDetails(phoneNumber).subscribe(userData => {
    //     let userDetailsValue: any = [];
    //     userDetailsValue = userData;
    //     for (var i = 0; i < userDetailsValue.length; i++) {
    //       if (userDetailsValue[i].userType == 'DINER' && userDetailsValue[i].email != '') {
    //         this.userDetails = userDetailsValue[i];
    //         console.log(this.userDetails);
    //         break;
    //       }
    //     }
    //   })
    // })

  }

  chooseScreenLayout(){
    //this.storage.set("NAMEE",this.name);
    this.utilitiesService.setNameData(this.name);
    this.utilitiesService.setScreenVision("VC");
    this.router.navigate(['screen-layout']);
  }
  // ngAfterContentChecked(){
  //   console.log(this.storage.get('SEATROW'));
  //   console.log(this.storage.get('COMSEATROW'));
  // }

  ionViewDidEnter(){
    this.storage.get('TYPEOFDINING').then(dinningType=>{
      this.dinningValue = dinningType;
    })
    this.storage.get('COMSEATROW').then(selectCom=>{
      this.storage.get('SEATROW').then(seatRowValue=>{
        this.name = this.utilitiesService.nameData;
        if(this.utilitiesService.screenGetPageData=="VC"){
            this.rowAndSeat = seatRowValue;
            this.seatROWCOM = selectCom;
          }else{
            this.rowAndSeat = "";
            this.seatROWCOM = "";
          }
        
      });
    })
    
    
  }

  viewCartSetData() {
    this.storage.get("MALLDETAILS").then(getOutletDetails => {
      this.storage.get("ITEMSINCART").then(cartData => {
        this.storage.get("CARTITEMS").then(viewCartData => {
          this.storage.get("SETCARTOUTLET").then(cartOutletsData => {
            this.mallData = getOutletDetails;
            this.showViewCartPage = false;
            this.cartItems = cartData;
            if (this.cartItems.length > 0) {
            } else {
              this.noItemsAvailable = true;
            }
            this.cartItemsAmountDetails = viewCartData;
            this.mallData.typeOfDining = this.cartItemsAmountDetails.dinningType;
            if(this.mallData.typeOfDining == "FOOD_COURT"){
              this.mallData.typeOfDining = "FOODCOURT";
            }
            if(this.mallData.typeOfDining == "CAFETERIAS"){
              this.mallData.typeOfDining = "CAFETERIA";
            }
            this.storage.get("DINNERID").then(dinerId => {
              this.cartItemsAmountDetails.dinerId = dinerId;
            })
            console.log(this.cartItemsAmountDetails);
            console.log(this.mallData);
            console.log(this.cartItems)
            this.needDelivery = this.cartItemsAmountDetails.orderType == "Pickup" ? false : true;
            this.outletsData = cartOutletsData;
            var orders = [];
            var orderlets = [];
            const uniqueAddresses = Array.from(new Set(this.cartItems.map(a => a.outletId)))
              .map(id => {
                return this.cartItems.find(a => a.outletId === id)
              });

            for (var i = 0; i < uniqueAddresses.length; i++) {
              for (var j = 0; j < this.outletsData.length; j++) {
                if (uniqueAddresses[i].outletId == this.outletsData[j].id) {
                  orders.push({
                    "name": uniqueAddresses[i].outletName,
                    "outletId": uniqueAddresses[i].outletId,
                    "outletImg": uniqueAddresses[i].outletImg,
                    "mallName": uniqueAddresses[i].mallName,
                    "gst": this.outletsData[j].cgst
                  })
                }
              }
            }
            for (var i = 0; i < uniqueAddresses.length; i++) {
              orderlets = [];
              for (var j = 0; j < this.cartItems.length; j++) {
                if (this.cartItems[j].outletId == uniqueAddresses[i].outletId) {
                  orderlets.push(this.cartItems[j])
                }
              }
              orders[i].orderlets = orderlets;
            }
            var itemDetails = {
              "mallId": this.cartItems[0].mallId,
              "saved": false,
              "orders": orders,
              "packagingChargeStr": "No",
              "specialInstructions": "",
              "dinningType":this.mallData.typeOfDining,
              "orderType": this.needDelivery == false ? "Pickup" : "Delivery"
            }
            console.log(itemDetails);
            this.orderDetails = itemDetails.orders;
            this.orderDetails[0].open = true;
            this.viewCartService.getAmount(this.cartItemsAmountDetails).subscribe(viewCartDetails => {
              console.log(viewCartDetails);
              this.billSummary = viewCartDetails;
              this.billSummary.amount = parseFloat(this.billSummary.amount);
              this.billSummary.cgst = parseFloat(this.billSummary.cgst);
              this.billSummary.convienceCharge = parseFloat(this.billSummary.convienceCharge);
              this.billSummary.convienceChargeCgst = parseFloat(this.billSummary.convienceChargeCgst);
              this.billSummary.convienceChargeSgst = parseFloat(this.billSummary.convienceChargeSgst);
              this.billSummary.discount = parseFloat(this.billSummary.discount);
              this.billSummary.packagingCharge = parseFloat(this.billSummary.packagingCharge);
              this.billSummary.packagingChargeCgst = parseFloat(this.billSummary.packagingChargeCgst);
              this.billSummary.packagingChargeCgst = !this.billSummary.packagingChargeCgst ? 0 : this.billSummary.packagingChargeCgst;
              this.billSummary.packagingChargeSgst = parseFloat(this.billSummary.packagingChargeSgst);
              this.billSummary.packagingChargeSgst = !this.billSummary.packagingChargeSgst ? 0 : this.billSummary.packagingChargeSgst;
              this.billSummary.sgst = parseFloat(this.billSummary.sgst);
              this.billSummary.supplierDeliveryCharges = parseFloat(this.billSummary.supplierDeliveryCharges);
              this.billSummary.supplierDeliveryChargesCgst = parseFloat(this.billSummary.supplierDeliveryChargesCgst);
              this.billSummary.supplierDeliveryChargesSgst = parseFloat(this.billSummary.supplierDeliveryChargesSgst);
              this.billSummary.supplierDiscount = parseFloat(this.billSummary.supplierDiscount);
              this.billSummary.tafelDeliveryCharges = parseFloat(this.billSummary.tafelDeliveryCharges);
              this.billSummary.tafelDeliveryChargesCgst = parseFloat(this.billSummary.tafelDeliveryChargesCgst);
              this.billSummary.tafelDeliveryChargesSgst = parseFloat(this.billSummary.tafelDeliveryChargesSgst);
              this.billSummary.totalAmount = parseFloat(this.billSummary.totalAmount);
              this.showViewCartPage = true;
              console.log(this.billSummary);
            })
          })
        })
      })
    })
  }

  toggleSection(index) {
    this.orderDetails[index].open = !this.orderDetails[index].open;
    if (this.automatiClose && this.orderDetails[index].open) {
      this.orderDetails
        .filter((item, itemIndex) => itemIndex != index)
        .map(item => item.open = false);
    }
  }
  toggleItem(index, childIndex) {
    this.orderDetails[index].orderlets[childIndex].open = !this.orderDetails[index].orderlets[childIndex].open;
  }
  goToBack() {
    this.router.navigate(['items']);
  }

  incrementItem(itemDetails) {
    if(itemDetails.givenQuantity >=50){
      this.utilitiesService.toastFunction("Can't select more 50 quantity per item.");
    }else{
      this.itemCountDetails = 0;
    itemDetails.givenQuantity = itemDetails.givenQuantity + 1;
    
    var count = 0;
    var itemIndexValue;
    for (var i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].id == itemDetails.id) {
        count = 1;
        itemIndexValue = i;
      }
    }
    if (count == 1) {
      this.cartItems[itemIndexValue].givenQuantity = itemDetails.givenQuantity;
      this.orderValue = this.orderValue + itemDetails.discountedPrice;
      if (itemDetails.discount > 0) {
        this.orderDiscountValue = this.orderDiscountValue + itemDetails.price;
      }
    } else {
      this.cartItems.push(itemDetails);

    }
    for (var i = 0; i < this.cartItems.length; i++) {
      this.itemCountDetails = this.itemCountDetails + this.cartItems[i].givenQuantity;
    }
    this.setDataForOrders();
    console.log(this.cartItems);
    console.log(this.orderValue);
    console.log(this.orderDiscountValue);
    }
  }

  decrementItem(itemDetails) {
    this.itemCountDetails = 0;
    
    itemDetails.givenQuantity = itemDetails.givenQuantity - 1;
    
    if (itemDetails.givenQuantity > 0) {
      for (var i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].id == itemDetails.id) {
          this.cartItems[i].givenQuantity = itemDetails.givenQuantity;
          this.orderValue = this.orderValue - itemDetails.discountedPrice;
          if (itemDetails.discount > 0) {
            this.orderDiscountValue = this.orderDiscountValue - itemDetails.price;
          }
        }
      }
    } else {
      for (var i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].id == itemDetails.id) {
          this.cartItems[i].givenQuantity = itemDetails.givenQuantity;
          this.orderValue = this.orderValue - itemDetails.discountedPrice;
          if (itemDetails.discount > 0) {
            this.orderDiscountValue = this.orderDiscountValue - itemDetails.price;
          }
          this.cartItems.splice(i, 1);
        }
      }
    }
    for (var i = 0; i < this.cartItems.length; i++) {
      this.itemCountDetails = this.itemCountDetails + this.cartItems[i].givenQuantity;
    }
    if (this.cartItems.length > 0) {
      this.setDataForOrders();
    } else {
      this.utilitiesService.cartSetData([]);
      this.storage.set('MALLDETAILS', {});
      this.storage.set("ITEMSCOUNT", 0);
      this.storage.set("ITEMSINCART", []);
      this.storage.set("CARTITEMS", {});
      this.storage.set("SETCARTOUTLET", []);
      this.utilitiesService.changeItemsPage.emit("itemsEmitted");
      this.noItemsAvailable = true;
    }
    

  }

  setDataForOrders() {
    this.utilitiesService.cartSetData(this.cartItems);
    // this.utilitiesService.setCartOutletsData(this.outletsData);
    this.storage.set("ITEMSINCART", this.cartItems);
    this.utilitiesService.setCartOutletsData(this.outletsData);
    this.storage.set("SETCARTOUTLET", this.outletsData);
    console.log(this.cartItems)
    let uniqueAddresses = Array.from(new Set(this.cartItems.map(a => a.outletId)))
      .map(id => {
        return this.cartItems.find(a => a.outletId === id)
      });
    var orders = [];
    var orderlets = [];
    for (var i = 0; i < uniqueAddresses.length; i++) {
      for (var j = 0; j < this.outletsData.length; j++) {
        if (uniqueAddresses[i].outletId == this.outletsData[j].id) {
          orders.push({
            "name": uniqueAddresses[i].outletName,
            "outletId": uniqueAddresses[i].outletId,
            "outletImg": uniqueAddresses[i].outletImg,
            "mallName": uniqueAddresses[i].mallName,
            "gst": this.outletsData[j].cgst
          })
        }
      }
    }
    console.log(orders)
    for (var i = 0; i < uniqueAddresses.length; i++) {
      orderlets = [];
      for (var j = 0; j < this.cartItems.length; j++) {
        if (this.cartItems[j].outletId == uniqueAddresses[i].outletId) {
          orderlets.push({
            "itemId": this.cartItems[j].id,
            "name": this.cartItems[j].name,
            "price": this.cartItems[j].price,
            "quantity": this.cartItems[j].givenQuantity,
            "customization": [],
            "discountPrice": this.cartItems[j].discountedPrice
          })
        }
      }
      orders[i].orderlets = orderlets;
    }
    var noOfItems = 0
    for (var i = 0; i < orders.length; i++) {
      for (var j = 0; j < orders[i].orderlets.length; j++) {
        noOfItems = noOfItems + orders[i].orderlets[j].quantity;
      }
    }
    this.storage.set("ITEMSCOUNT", noOfItems);
    var itemDetails = {
      "mallId": this.cartItems[0].mallId,
      "saved": false,
      "orders": orders,
      "packagingChargeStr": "No",
      "specialInstructions": this.specialInstruction,
      "orderType": this.needDelivery == false ? "Pickup" : "Delivery",
      "dinningType":this.mallData.typeOfDining
    }
    this.utilitiesService.setCartViewData(itemDetails);
    this.storage.set("CARTITEMS", itemDetails);
    this.viewCartSetData();
    this.utilitiesService.changeItemsPage.emit("itemsEmitted");
  }

  changeDelivery(deliveryType) {
    this.needDelivery = deliveryType;
    this.setDataForOrders();
    this.viewCartService.getUniqueAdressForA1(this.mallData.id).subscribe((res) => {
      if (this.mallData.typeOfDining == "CINEMAS") {
        this.rowAndSeat="";
        // this.screenData = {
        //   seatNumbers: []
        // };
        // for (var i = 0; i < res['response'].length; i++) {
        //   var iValue = i + 1;
        //   this.screenData.seatNumbers.push({ description: iValue + '' })
        // }
        // console.log(this.screenData.seatNumbers)
        // this.noOfScreens=this.screenData.seatNumbers
      } else {
        this.aladress = res['response'];
        this.a1AddressResponse = res['response'];
        console.log(this.aladress)
      }

      //this.a1selectedadress = this.aladress[0];
    });
  }

  filterCompanyNames(x) {

    var searchTerm = x.toUpperCase();
    this.aladress = this.a1AddressResponse.filter(value => {
      return value.toUpperCase().startsWith(searchTerm);
    })
    console.log(this.aladress);

    x == "" ? this.showcompanyName = false : this.showcompanyName = true;
    // this.selectedItem ? this.showcompanyName = false : this.showcompanyName = true;
    // if (!this.showcompanyName) {
    //   this.selectedItem = false
    // }
    // if (this.a1AddressResponse.indexOf(this.a1selectedadress) < 0) {
    //   this.a2selectedadress = "";
    //   this.a3selectedadress = ""
    // }
  }
  selectCompany(a1address) {
    console.log(a1address);
    this.showcompanyName = false;
    this.a1selectedadress = a1address;
    this.getA2Adress(a1address);
    this.selectedItem = true;
  }

  getA2Adress(a1address) {
    this.showViewCartPage = false;
    this.viewCartService.getUniqueAdressForA2(this.mallData.id, a1address).subscribe((res) => {
      this.a2adress = res['response'];
      console.log(this.a2adress)
      this.a2selectedadress = this.a2adress[0];
      this.getA3Adress();
      this.showViewCartPage = true;
      //	loading.dismissAll();

    });
  }

  getA3Adress() {
    console.log('sdfkshfkjd')
    this.viewCartService.getUniqueAdressForA3(this.mallData.id, this.a1selectedadress, this.a2selectedadress).subscribe((res) => {
      this.a3adress = res['response'];
      this.a3selectedadress = this.a3adress[0];
      //	loading.dismissAll();
    });
  }

  proceedToPaymentOptions() {
    this.utilitiesService.setScreenVision("VC");
    console.log(this.name);
    this.utilitiesService.setNameData(this.name);
    if (this.needDelivery == true) {
      if (!this.name) {
        this.utilitiesService.toastFunction("Name not entered.");
      } else {
        
        if (this.mallData.typeOfDining == "CAFETERIA") {
          if (this.a1selectedadress != '') {
            if (this.a2selectedadress != '') {
              if (this.a3selectedadress != '') {
                this.storage.get("SKIP").then(skipValue => {
                  if (skipValue == false) {
                    this.proceedToPaymentOptions_old();
                  } else {

                  }
                })
              } else {
                this.utilitiesService.toastFunction("Floor is not filled.")
              }
            } else {
              this.utilitiesService.toastFunction("Quadrant is not filled.")
            }
          } else {
            this.utilitiesService.toastFunction("Company name is not filled.");
          }
        }
        if(this.mallData.typeOfDining === 'FOODCOURT'){
          if (this.a1selectedadress != '') {
            
              
                this.storage.get("SKIP").then(skipValue => {
                  if (skipValue == false) {
                    this.proceedToPaymentOptions_old();
                  } else {

                  }
                })
          } else {
            this.utilitiesService.toastFunction("Table Number is not filled.");
          }
        }
        if(this.mallData.typeOfDining == "CINEMAS"){
          if(!this.rowAndSeat){
            this.utilitiesService.toastFunction("Please fill screen,seat and row");
          }else{
            this.storage.get("SKIP").then(skipValue => {
              if (skipValue == false) {
                this.proceedToPaymentOptions_old();
              } else {
  
              }
            })
          }
          
        }
      }
    } else {
      this.storage.get("SKIP").then(skipValue => {
        if (skipValue == false) {
          this.proceedToPaymentOptions_old();
        } else {

        }
      })
    }
  }

  proceedToPaymentOptions_old() {
    console.log('sdfhgsdfsdhf');
    let dataSend: any = {};
    this.showViewCartPage = false;
    if (this.mallData.typeOfDining === 'CAFETERIA' || this.mallData.typeOfDining === 'CINEMAS' || this.mallData.typeOfDining === 'FOODCOURT') {
      if (this.needDelivery == true) {
        if(this.mallData.typeOfDining === 'CINEMAS'){
          this.vehicleNumber = this.name + "," + this.seatROWCOM;
        }else{
          this.vehicleNumber = this.name + "," + this.a1selectedadress + "," + this.a2selectedadress + "," + this.a3selectedadress;
        }
        
        for (var i = 0; i < this.cartItemsAmountDetails.orders.length; i++) {
          this.cartItemsAmountDetails.orders[i].currentVehicleNumber = this.vehicleNumber;
        }
        this.paymentDetails = {
          "amount": this.billSummary.amount,
          "emailId": this.userDetails.email,
          "mallId": this.mallData.id,
          "mallName": this.mallData.name,
          "mallType": this.mallData.typeOfDining,
          "vehicleNumber": this.vehicleNumber
        }
        this.viewCartService.postssFullOrderDetailsWithDeliveryCharges(this.cartItemsAmountDetails).subscribe((res) => {
          let fullOrderDetails: any = {};
          fullOrderDetails = res;
          this.fullOrderId = fullOrderDetails.id;
          console.log(this.userDetails);
          dataSend = {
            "vechileNo": this.vehicleNumber,
            "emailId": this.userDetails.email,
            "paymentDetails": this.paymentDetails,
            "packagingCharge": this.cartItemsAmountDetails.orderType == "Pickup" ? false : true,
            "amount": this.billSummary.amount,
            "mallId": this.mallData.id

          }
          let fullAmount = (fullOrderDetails.amount + fullOrderDetails.cgst + fullOrderDetails.sgst + fullOrderDetails.convenience + fullOrderDetails.packagingCharge + fullOrderDetails.supplierDeliveryCharge + fullOrderDetails.tafelDeliveryCharge).toFixed(2);
          dataSend['fullAmount'] = fullAmount;
          dataSend['fullOrderDetails'] = fullOrderDetails;
          dataSend['userDetails'] = this.userDetails;
          dataSend['upiPaymentOptions'] = this.upiPaymentOptions;
          console.log("@#$@$@#$@#$#@$@#$@#$@#$324")
          console.log(dataSend)
          console.log(res)
          console.log("@#$@#$@#$@#$@#$#@$@#$@#$#$")
          this.utilitiesService.fullOrderDetails(dataSend);
          this.showViewCartPage = true;
          this.router.navigate(['payment-selection'])
          //this.navCtrl.push(ReviewPage, dataSend);
        });
      } else {
        for (var i = 0; i < this.cartItemsAmountDetails.orders.length; i++) {
          this.cartItemsAmountDetails.orders[i].currentVehicleNumber = '';
          for (var i = 0; i < this.cartItemsAmountDetails.orders.length; i++) {
            this.cartItemsAmountDetails.orders[i].currentVehicleNumber = this.vehicleNumber;
          }
          this.paymentDetails = {
            "amount": this.billSummary.amount,
            "emailId": this.userDetails.email,
            "mallId": this.mallData.id,
            "mallName": this.mallData.name,
            "mallType": this.mallData.typeOfDining,
            "vehicleNumber": ''
          }
          this.viewCartService.postssFullOrderDetailsWithDeliveryCharges(this.cartItemsAmountDetails).subscribe((res) => {
            let fullOrderDetails: any = {};
            fullOrderDetails = res;
            this.fullOrderId = fullOrderDetails.id;
            console.log(this.userDetails);
            dataSend = {
              "vechileNo": " User in cafe ",
              "emailId": this.userDetails.email,
              "paymentDetails": this.paymentDetails,
              "packagingCharge": this.cartItemsAmountDetails.orderType == "Pickup" ? false : true,
              "amount": this.billSummary.amount,
              "mallId": this.mallData.id

            }
            let fullAmount = (fullOrderDetails.amount + fullOrderDetails.cgst + fullOrderDetails.sgst + fullOrderDetails.convenience + fullOrderDetails.packagingCharge + fullOrderDetails.supplierDeliveryCharge + fullOrderDetails.tafelDeliveryCharge).toFixed(2);
            dataSend['fullAmount'] = fullAmount;
            dataSend['fullOrderDetails'] = fullOrderDetails;
            dataSend['userDetails'] = this.userDetails;
            dataSend['upiPaymentOptions'] = this.upiPaymentOptions;
            console.log("@#$@$@#$@#$#@$@#$@#$@#$324")
            console.log(dataSend)
            console.log(res)
            console.log("@#$@#$@#$@#$@#$#@$@#$@#$#$");
            this.utilitiesService.fullOrderDetails(dataSend);
            this.showViewCartPage = true;
            this.router.navigate(['payment-selection'])
            //this.navCtrl.push(ReviewPage, dataSend);
          });
        }
      }
    }
  }

}
