import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilitiesService } from '../../services/utilities.service';
import { PaymentSelectionService } from '../../services/payment-selection.service';
import { Storage } from '@ionic/storage';
import { AlertController,LoadingController } from '@ionic/angular';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { WebIntent } from '@ionic-native/web-intent/ngx';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser/ngx';
@Component({
  selector: 'app-payment-selection',
  templateUrl: './payment-selection.page.html',
  styleUrls: ['./payment-selection.page.scss'],
})
export class PaymentSelectionPage implements OnInit {
  options: ThemeableBrowserOptions = {
    statusbar: {
      color: '#ffffffff'
    },
    toolbar: {
      height: 56,
      color: '#2E8B57'
    },
    title: {
      color: '#ffffffff',
      showPageTitle: true,
      staticText: 'TAFEL Payment'
    },

    closeButton: {
      wwwImage: 'assets/icon/back_arrow.png',

      /* align: 'left', */
      event: 'closePressed'
    },
    backButtonCanClose: true
  }
  paymentMode: any = '';
  cardNumber: any;
  countNumber: number = 0;
  countExpNumber: number = 0;
  cardName: any;
  cardExpiry: any;
  cardMonthExpiry: String = "";
  cardYearExpiry: String = "";
  CVV: any;
  cvvCountNumber: number = 0;
  selectedSaveCard: any;
  evnvariable: string = '';
  fullOrderDetailsDataValues: any;
  vehicleNumber: any;
  emailId: any;
  timer: any;
  mallId: any;
  userDetails: any;
  packagingCharge: any;
  upiOptionAvl = 'false';
  amount: any;
  fullOrderDetails: any;
  fullAmount: any;
  customercardId: String = "";
  isSubmitting: boolean = false;
  toPay: any;
  count = 0;
  upis: any = [];
  summaryModalpresent: number = 0;
  dosaveCard: boolean = true;
  orderuniqueNumber: String = "";
  paymentgatewayEndPoint: any;
  cardType: String = "SavedCard";
  loadingObj:any;
  upiPayment: any;
  upiPaymentOptions:any;
  banks: any = ['HDFC Bank', 'ICICI Bank', 'Citibank', 'Axis Bank', 'State Bank of India', 'Standard Chartered Bank', 'Andhra Bank', 'Central Bank of India', 'DBS Bank Ltd', 'IndusInd Bank', 'Shamrao Vithal Bank', 'Aditya Birla Payments Bank',
    'UCO Bank', 'Kotak Mahindra Bank', 'Jammu and kashmir Bank', 'IDBI Bank', 'Saraswat Bank', 'Bandhan Bank',
    'Indian Overseas Bank', 'JANATA SAHAKARI BANK LTD PUNE', 'DCB Bank', 'Bank of Baroda Corporate',
    'South Indian Bank', 'City Union Bank', 'Karur Vysya Bank', 'Cosmos Bank', 'Punjab National Bank [Corporate]', 'Canara Bank', 'Syndicate Bank', 'YES Bank', 'Karnataka Bank',
    'Federal Bank', 'Vijaya Bank', 'Lakshmi Vilas Bank', 'Bank of India', 'Tamilnad Mercantile Bank',
    'Punjab And Sind Bank', 'Oriental Bank Of Commerce', 'Catholic Syrian Bank', 'Indian Bank', 'Ujjivan Small Finance Bank',
    'Bank of Maharashtra', 'United Bank of India', 'RBL Bank', 'Deutsche Bank', 'Dhanlaxmi Bank', 'IDFC Bank',
    'Bank of Baharin and Kuwait', 'Union Bank of India', 'Punjab National Bank [Retail]', 'Corporation Bank', 'Airtel Payments Bank', 'Suryoday Small Finance Bank Ltd'
  ];
  netBanking = "HDFC Bank";
  constructor(private webIntent: WebIntent,private appAvailability: AppAvailability,private loadingCtrl:LoadingController,private themeableBrowser: ThemeableBrowser, public alertController: AlertController, private storage: Storage, private paymentSelectionService: PaymentSelectionService, private router: Router, private utilitiesService: UtilitiesService) {
    this.paymentgatewayEndPoint = this.utilitiesService.paymentgatewayEndPoint;
  }

  ngOnInit() {
    this.evnvariable = this.utilitiesService.env;
    this.fullOrderDetailsDataValues = this.utilitiesService.fullOrderDetailsData;
    this.vehicleNumber = this.fullOrderDetailsDataValues.vechileNo;
    this.emailId = this.fullOrderDetailsDataValues.emailId;
    this.mallId = this.fullOrderDetailsDataValues.mallId;
    this.userDetails = this.fullOrderDetailsDataValues.userDetails;
    this.packagingCharge = this.fullOrderDetailsDataValues.packagingCharge;
    this.amount = this.fullOrderDetailsDataValues.amount;
    this.fullOrderDetails = this.fullOrderDetailsDataValues.fullOrderDetails;
    this.fullAmount = this.fullOrderDetailsDataValues.fullAmount;
    console.log("fullorder", this.fullOrderDetailsDataValues);
    this.toPay = this.amount;
    this.storage.get("UPI").then(upiData=>{
      this.upiPaymentOptions = upiData;
      console.log(this.upiPaymentOptions);
      if(this.upiPaymentOptions.length > 0){
        this.upiPaymentOptions.forEach(element => {
          this.checkAppAvailability(element);
        });
      }
    });
  }

  checkAppAvailability(paymentOption){
    this.appAvailability.check(paymentOption.packageName).then( 
      (yes: boolean) => { 
        console.log("Available");
        this.upis.push(paymentOption);
        this.upiPayment = this.upis[0].packageName;
        this.upiOptionAvl = 'true';
      },
      (no: boolean) => {
        console.log("Not Available")
      }
  );
  }

  goToBack() {
    if(this.utilitiesService.screenGetPageData=="OC"){
      this.router.navigate(['cart'])
    }
    if(this.utilitiesService.screenGetPageData=="VC"){
      this.router.navigate(['view-cart'])
    }
  }

  cardNumberValidate(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if ((this.countNumber == 0 || this.cardNumber.length != 4 || this.cardNumber.length != 9 || this.cardNumber.length != 14) && (charCode == 32 || (charCode < 48 || charCode > 57))) {
      return false;
    }
    if (this.cardNumber.length == 0) {
      this.countNumber = 0;
    }
    if (this.cardNumber.length == 4 || this.cardNumber.length == 9 || this.cardNumber.length == 14) {
      this.cardNumber = this.cardNumber + ' ';
      this.countNumber = this.countNumber + 1;
    }


    if (charCode > 32 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    this.countNumber = this.countNumber + 1;
    return true;
  }
  expDateValidate(event) {
    var inputChar = String.fromCharCode(event.keyCode);
    var code = event.keyCode;
    var allowedKeys = [8];
    if (this.countExpNumber == 0 && (code == 47 || (code < 48 || code > 57))) {
      return false;
    }
    if (allowedKeys.indexOf(code) !== -1) {
      return;
    }

    event.target.value = event.target.value.replace(
      /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
    ).replace(
      /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
    ).replace(
      /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
    ).replace(
      /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
    ).replace(
      /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
    ).replace(
      /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
    ).replace(
      /\/\//g, '/' // Prevent entering more than 1 `/`
    );
  }

  cvvValidate(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  selectPaymentOption(paymentType) {
    this.paymentMode = paymentType;
    console.log(this.upiPaymentOptions);
  }

  async submitPaymentDetails() {
    if (this.paymentMode === 'CASH') {
      console.log("this.vehicleNumber", this.vehicleNumber)
      this.postOrderDetails(this.vehicleNumber, this.paymentMode, this.fullOrderDetails.specialInstructions);
    }
    if (this.paymentMode == "CARDS1") {
      console.log("this.cardNumber");
      this.isSubmitting = true;
      let number = document.getElementById('number') as any;
      var numberVal = number.value;
      this.cardNumber = numberVal;
      console.log(numberVal);

      let alertPreset = false;
      if (numberVal.length == 19) {
        let numberAfterReplacement = numberVal.replace(/\s/g, "");
        if (!isNaN(Number(numberAfterReplacement))) {

        }
        else {
          alertPreset = true;
        }



        console.log(numberAfterReplacement)
      }
      else {
        alertPreset = true;
      }
      if (this.cardName) {
        if (this.cardName.trim().length == 0) {
          alertPreset = true;
        }
      }
      else {
        alertPreset = true;
      }

      let expiry = document.getElementById('expiry') as any;
      console.log(expiry);
      let cardexpiry = expiry.value;
      this.cardExpiry = expiry.value;
      let CVVVal = document.getElementById('cvc') as any;
      console.log(CVVVal)
      let cvvValues = CVVVal.value;
      this.CVV = cvvValues;
      console.log(cardexpiry, cvvValues);

      if (cardexpiry) {
        if (cardexpiry.length == 5) {
          let cardMonthExpiry = cardexpiry.split("/")[0];
          let cardYearExpiry = cardexpiry.split("/")[1];
          console.log(cardMonthExpiry, cardYearExpiry);
          console.log(isNaN(Number(cardMonthExpiry)));
          if (isNaN(Number(cardMonthExpiry))) {
            alertPreset = true;
          }
          else {

          }

          if (isNaN(Number(cardYearExpiry))) {
            alertPreset = true;
          }
          else {

          }

        }
        else {
          alertPreset = true;
        }
      }
      else {
        alertPreset = true;
      }
      if (cvvValues) {
        if (cvvValues.length == 3) {
          if (isNaN(Number(cvvValues))) {
            alertPreset = true;
          }
          else {

          }
        }
        else {
          alertPreset = true;
        }

      }
      else {
        alertPreset = true;
      }
      console.log(this.paymentMode);
      if (alertPreset) {
        this.utilitiesService.cardsAlert();
        // let alert = this.alertCtrl.create({
        //   title: 'Invalid Card',
        //   subTitle: 'Card details entered are wrong,Pls. check',
        //   buttons: ['OK']
        // });
        // alert.present();
        this.isSubmitting = false;
        this.toPay = this.amount;
      }
      else {
        let numberAfterReplacement = numberVal.replace(/\s/g, "");
        let validateCard = '/isValidCard/' + numberAfterReplacement;
        this.paymentSelectionService.getCardValidity(validateCard).subscribe(cardValidity => {
          //var cardData = cardValidity
          if (cardValidity['response'] == 'Yes') {
            this.postOrderDetailsAndMakePayment(this.toPay);
            this.isSubmitting = false;
          } else {
            this.utilitiesService.cardsAlert();
            this.isSubmitting = false;
            this.toPay = this.amount;
          }

        })

      }

    }
    if (this.paymentMode == "NET_BANKING" || this.paymentMode == "Paytm" || this.paymentMode == "oxigen" || this.paymentMode == "UPI") {
      console.log("this.vehicleNumber", this.vehicleNumber)
      this.postOrderDetailsAndMakePayment(this.toPay);
    }
  }

  postOrderDetails(vehicleNumber, paymentMode, specialInstructions) {

    console.log(this.fullOrderDetails);
    this.isSubmitting = true;
    this.paymentSelectionService.postPostOrderDetails(this.fullOrderDetails.id, paymentMode, this.fullOrderDetailsDataValues).subscribe((res) => {
      let postOrderId: any = res;

      this.storage.set("FULLORDER", {
        "fullOrderDetails": this.fullOrderDetailsDataValues,
        "postOrderId": postOrderId.id,
        "prevPage": 'CartPage',
        "placeInterval": 0
      });
      this.utilitiesService.cartSetData([]);
      this.utilitiesService.setCartViewData([]);
      this.storage.set('MALLDETAILS', {});
      this.storage.set("ITEMSCOUNT", 0);
      this.storage.set("ITEMSINCART", []);
      this.storage.set("CARTITEMS", {});
      this.storage.set("SETCARTOUTLET", []);
      this.storage.set("SEATROW", "");
      //this.storage.set("UPI", []);
      // this.storage.set("VIEWCARTCOUNT",2);
      this.storage.set("COMSEATROW", "");

      this.router.navigate(['order-summary']);
      // let summaryModal = this.modalCtrl.create(OrderSummaryPage, {
      // 	fullOrderDetails: this.fullOrderDetails,
      // 	postOrderId: postOrderId.id,
      // 	prevPage: 'CartPage',
      // 	placeInterval: 0
      // });

      // summaryModal.present();
      this.isSubmitting = false;
    });

  }

  postOrderDetailsAndMakePayment(totalAmount) {
    let fullAmount = (this.fullOrderDetails.amount + this.fullOrderDetails.cgst + this.fullOrderDetails.sgst + this.fullOrderDetails.convenience + this.fullOrderDetails.packagingCharge + this.fullOrderDetails.supplierDeliveryCharge + this.fullOrderDetails.tafelDeliveryCharge).toFixed(2);

    this.openCCAvenue(fullAmount, this.fullOrderDetails);
  }

  // async loadingEffect(){
  //  this.loadingObj = await this.loadingCtrl.create({
	// 		message: 'Payment processing'
  //   });
  //   await this.loadingObj.present();
  // }

  openCCAvenue(totalAmount, fullOrderDetails) {
    this.paymentSelectionService.coldstartccAvenue().subscribe(data => {

    });
    let browserInBrowser: ThemeableBrowserObject;
    if ((this.paymentMode == "CARDS1")) {
      this.paymentMode = "CARDS";
      // let expiry = document.getElementById('expiry') as any;
      // this.cardExpiry = expiry.value;
      // let number = document.getElementById('number') as any;
      // this.cardNumber = number.value;
      // let CVVVal = document.getElementById('cvc') as any;
      // this.CVV = CVVVal.value;
      this.cardExpiry.split("/");
      this.cardMonthExpiry = this.cardExpiry.split("/")[0].trim();
      var d = new Date();
      let n: any = d.getFullYear();
      n = n + "";
      this.cardYearExpiry = n.split("")[0] + n.split("")[1] + this.cardExpiry.split("/")[1].trim();
      this.cardNumber = this.cardNumber.replace(/\s/g, "");
    }
    console.log(this.cardNumber, this.cardMonthExpiry, this.cardYearExpiry, this.CVV,
      fullOrderDetails.fullOrder5DigitId, totalAmount, this.paymentMode, this.netBanking, this.paymentMode, this.selectedSaveCard);
    //let userobj = this.user;
    this.count = 0;
    let countval = this.count;

    this.orderuniqueNumber = fullOrderDetails.fullOrder5DigitId + new Date().getTime();
    console.log("Before CC VAenue :: " + new Date());
    let payment = this.paymentSelectionService.getCCAvenuePostURl(this.cardNumber, this.cardMonthExpiry, this.cardYearExpiry, this.CVV,
      fullOrderDetails.fullOrder5DigitId, totalAmount, this.paymentMode, this.netBanking, this.paymentMode, this.customercardId, this.cardType,
      this.dosaveCard, this.selectedSaveCard, fullOrderDetails.id, this.mallId, this.orderuniqueNumber, this.userDetails.id);
    let url = null;
    
    //this.loadingEffect();
    
    if (this.paymentMode == "UPI") {
      url = this.paymentgatewayEndPoint + '/intiatePaytmTransaction/' + this.paymentMode;
    } else {
      url = this.paymentgatewayEndPoint + '/intiatetransaction/' + this.paymentMode;
    }
    if (this.paymentMode == "CARDS") {

      payment['issuebank'] = " ";
      payment['cardType'] = " ";
      payment['payOptType'] = " ";
      payment['cardName'] = " ";
      payment['customerCardId'] = " ";


      url = url + "/saveCard/" + payment['saveCard'] + "/expiryYear/" + payment['expiryYear'] + "/expiryMonth/" + payment['expiryMonth'] + "/cardNumber/" + payment['cardNumber'] + "/cardType/" + payment['cardType'] + "/payOptType/" + payment['payOptType'] + "/cardName/" + payment['cardName'] + "/cvv/" + payment['cvv'] + "/customerCardId/" + payment['customerCardId'] + "/newCard/" + payment['newCard'] + "/issuebank/" + payment['issuebank'] + "/orderId/" + payment['orderId'] + "/amount/" + payment['amount'] + "/dinnerid/" + payment['dinnerid'] + "/fullOrderid/" + payment['fullOrderid'] + "/mallId/" + payment['mallId'] + "/orderuniqueNumber/" + payment['orderuniqueNumber'];

    }
    else if (this.paymentMode == "NET_BANKING") {
      payment['saveCard'] = " ";
      payment['expiryYear'] = " ";
      payment['expiryMonth'] = " ";
      payment['cardName'] = " ";
      payment['cardType'] = " ";
      payment['payOptType'] = " ";
      payment['customerCardId'] = " ";
      payment['cvv'] = " ";
      payment['newCard'] = " ";
      payment['cardNumber'] = " ";
      url = url + "/saveCard/" + payment['saveCard'] + "/expiryYear/" + payment['expiryYear'] + "/expiryMonth/" + payment['expiryMonth'] + "/cardNumber/" + payment['cardNumber'] + "/cardType/" + payment['cardType'] + "/payOptType/" + payment['payOptType'] + "/cardName/" + payment['cardName'] + "/cvv/" + payment['cvv'] + "/customerCardId/" + payment['customerCardId'] + "/newCard/" + payment['newCard'] + "/issuebank/" + payment['issuebank'] + "/orderId/" + payment['orderId'] + "/amount/" + payment['amount'] + "/dinnerid/" + payment['dinnerid'] + "/fullOrderid/" + payment['fullOrderid'] + "/mallId/" + payment['mallId'] + "/orderuniqueNumber/" + payment['orderuniqueNumber'];

    } else if (this.paymentMode == "Paytm") {
      payment['saveCard'] = " ";
      payment['expiryYear'] = " ";
      payment['expiryMonth'] = " ";
      payment['cardName'] = " ";
      payment['cardType'] = " ";
      payment['payOptType'] = " ";
      payment['customerCardId'] = " ";
      payment['cvv'] = " ";
      payment['newCard'] = " ";
      payment['cardNumber'] = " ";
      url = url + "/saveCard/" + payment['saveCard'] + "/expiryYear/" + payment['expiryYear'] + "/expiryMonth/" + payment['expiryMonth'] + "/cardNumber/" + payment['cardNumber'] + "/cardType/" + payment['cardType'] + "/payOptType/" + payment['payOptType'] + "/cardName/" + payment['cardName'] + "/cvv/" + payment['cvv'] + "/customerCardId/" + payment['customerCardId'] + "/newCard/" + payment['newCard'] + "/issuebank/" + payment['issuebank'] + "/orderId/" + payment['orderId'] + "/amount/" + payment['amount'] + "/dinnerid/" + payment['dinnerid'] + "/fullOrderid/" + payment['fullOrderid'] + "/mallId/" + payment['mallId'] + "/orderuniqueNumber/" + payment['orderuniqueNumber'];


      //url = url+"/saveCard//expiryYear//expiryMonth//cardNumber//cardType//payOptType//cardName//cvv//customerCardId//newCard//issuebank/"+payment['issuebank']+"/orderId/"+payment['orderId']+"/amount/"+payment['amount']+"/dinnerid/"+payment['dinnerid']+"/fullOrderid/"+payment['fullOrderid']+"/mallId/"+payment['mallId'] ;
    }
    let timerStart = 0;
    if (this.paymentMode == "UPI") {
      //loading.dismissAll();
			//this.loadingObj.present();
			//browserInBrowser = this.themeableBrowser.create('https://payment.tafel.in/TafelPaymentGatewayDev/initiateUPITransaction', '_blank', this.options);
			//this.inAppBrowser.create('upi://pay?pa=paytm-tafel@paytm&pn=TAFEL&tr='+payment['orderuniqueNumber']+'&am='+payment['amount'], '_system');
			
			let paymentService;
			// if(this.upiPayment == "Google Pay"){
			// 	paymentService = this.googlePay;
			// }else if(this.upiPayment == "BHIM"){
			// 	paymentService = this.bhimPay;
			// }else if(this.upiPayment == "WhatsApp"){
			// 	paymentService = this.whatsAppPay;
			// }else if(this.upiPayment == "PhonePe"){
			// 	paymentService = this.phonePePay;
			//}else if(this.upiPayment == "Amazon Pay"){
			if(this.upiPayment){	
				paymentService = this.upiPayment;
			}else{
				//this.loadingObj.dismissAll();
				this.isSubmitting = false;
				this.utilitiesService.someError();
				return;
			}
			
			//Initiating the txn
			payment['saveCard'] = " ";
			payment['expiryYear'] = " ";
			payment['expiryMonth'] = " ";
			payment['cardName'] = this.upiPayment;
			payment['cardType'] = " ";
			payment['payOptType'] = " ";
			payment['customerCardId'] = " ";
			payment['cvv'] = " ";
			payment['newCard'] = " ";
			payment['cardNumber'] = " ";
			url = url + "/saveCard/" + payment['saveCard'] + "/expiryYear/" + payment['expiryYear'] + "/expiryMonth/" + payment['expiryMonth'] + "/cardNumber/" + payment['cardNumber'] + "/cardType/" + payment['cardType'] + "/payOptType/" + payment['payOptType'] + "/cardName/" + payment['cardName'] + "/cvv/" + payment['cvv'] + "/customerCardId/" + payment['customerCardId'] + "/newCard/" + payment['newCard'] + "/issuebank/" + payment['issuebank'] + "/orderId/" + payment['orderId'] + "/amount/" + payment['amount'] + "/dinnerid/" + payment['dinnerid'] + "/fullOrderid/" + payment['fullOrderid'] + "/mallId/" + payment['mallId'] + "/orderuniqueNumber/" + payment['orderuniqueNumber'];
			console.log(url);
			this.paymentSelectionService.initPayTMTxn(url).subscribe(cardValidity => { });
			
			const options = {
				action: this.webIntent.ACTION_VIEW,
				url: 'upi://pay?pa=paytm-tafel@paytm&pn=TAFEL123&tr=' + payment['orderuniqueNumber'] + '&am=' + payment['amount']+ '&mc=5499',
				package:paymentService
			}
      this.isSubmitting=true;
			this.webIntent.startActivityForResult(options).then(
				intentResponse=>{
					let paymentSuccess = false;				
					console.log(intentResponse)
					//if(intentResponse != null && intentResponse.extras.resultCode == "-1"){
					//	let response = intentResponse.extras.response.split("&");
					//	for(var i=0; i<response.length;i++){
					//		if(response[i] == "Status=SUCCESS"){
            paymentSuccess = true;
								//this.loadingObj.dismissAll();
								//paymentVerifyingAlert.present();
								if (timerStart > 0) {
									clearInterval(this.timer);
								}
								timerStart++;
								this.timer = setInterval(()=>{
									timerStart++;
									if (timerStart >= 120) {//checking order status for 2 minutes
										clearInterval(this.timer);
										this.isSubmitting = false;
										this.utilitiesService.timeOutError();
										browserInBrowser.close();
			
									}else{
                    console.log('this is new work okay.');
                    
                    //https://developer.paytm.com/docs/transaction-status-api/
                    this.paymentSelectionService.checkTranscationStatus(this.orderuniqueNumber, this.userDetails.id).subscribe(dataVal => {
                      console.log("dataVal**************************");
                      console.log(new Date());
                      console.log(dataVal);
                      //cart.emptyCart();
                      this.refreshMallDetails();
      

                      this.utilitiesService.cartSetData([]);
                      this.utilitiesService.setCartViewData([]);
                      this.storage.set('MALLDETAILS', {});
                      this.storage.set("ITEMSCOUNT", 0);
                      this.storage.set("ITEMSINCART", []);
                      this.storage.set("CARTITEMS", {});
                      this.storage.set("SETCARTOUTLET", []);
                      //this.storage.set("UPI", []);
        
                      if (dataVal['orderStatus'] == "TXN_SUCCESS") {
                        this.storage.set("FULLORDER", {
                          "fullOrderDetails": this.fullOrderDetailsDataValues,
                          "prevPage": 'CartPage',
                          "placeInterval": 0,
                          'sendsms': 'yes',
                          "uniquecode": this.orderuniqueNumber
                        });
                        clearInterval(this.timer);
                        this.router.navigate(['order-summary']);
                        this.isSubmitting=false;
                        // let summaryModal = this.modalCtrl.create(OrderSummaryPage, { fullOrderDetails: fullOrderDetails, prevPage: 'CartPage', placeInterval: 0, 'sendsms': 'yes', uniquecode: this.orderuniqueNumber });
                        // summaryModal.present();
        
                      }else if(dataVal['orderStatus'] == "TXN_FAILURE" || (dataVal['orderStatus'] == "PENDING" && dataVal['orderStatusCode'] == "402")){
												clearInterval(this.timer);
												//paymentVerifyingAlert.dismissAll();
												this.isSubmitting = false;
												this.utilitiesService.paymentFailed();
											}
        
                      // else {
                      //   this.isSubmitting = false;
                      //   this.utilitiesService.paymentFailed();
                      //   browserInBrowser.close();
                      // }
        
        
                    })
										// userobj.checkTranscationStatus(this.orderuniqueNumber).subscribe(dataVal=>{
										// 	console.log(dataVal);
										// 	if (dataVal['orderStatus'] == "TXN_SUCCESS") {
										// 		paymentVerifyingAlert.dismissAll();
										// 		cart.emptyCart();
										// 		this.refreshMallDetails();
										// 		clearInterval(this.timer);
										// 		let summaryModal = this.modalCtrl.create(OrderSummaryPage, { fullOrderDetails: fullOrderDetails, prevPage: 'CartPage',placeInterval:0,'sendsms':'yes',uniquecode:this.orderuniqueNumber });
										// 		summaryModal.present();
                    //   }
                    //   else if(dataVal['orderStatus'] == "TXN_FAILURE" || (dataVal['orderStatus'] == "PENDING" && dataVal['orderStatusCode'] == "402")){
										// 		clearInterval(this.timer);
										// 		paymentVerifyingAlert.dismissAll();
										// 		this.isSubmitting = false;
										// 		let alert = this.alertCtrl.create({
										// 		  title: 'Payment Failed',
										// 		  buttons: ['OK']
										// 		});
										// 		alert.present();
										// 	}
										// })
									}
								}, 3000);//checking the txn status with paytm for every 3 seconds
					//		}
					//	}
					//}
					//if(!paymentSuccess){
					//	loadingObj.dismissAll();
					//	this.isSubmitting = false;
					//	let alert = this.alertCtrl.create({
					//	  title: 'Payment Failed',
					//	  buttons: ['OK']
					//	});
					//	alert.present();
					//}
				}, error => {
					console.error(error)
					//this.loadingObj.dismissAll();
					//loading.dismissAll();
					this.isSubmitting = false;
					//let alert = this.alertCtrl.create({
					//  title: 'Payment Failed',
					//  buttons: ['OK']
					//});
					//alert.present();
				});
    } else {
      browserInBrowser = this.themeableBrowser.create(url, '_blank', this.options);
      //loadingObj.present();
      browserInBrowser.on('loadstop').subscribe(event => {

        //loadingObj.dismissAll();
        //loading.dismissAll();
        this.isSubmitting = false;

      });
      browserInBrowser.on('exit').subscribe(event => {
        browserInBrowser.close();
        //loadingObj.dismiss();
        //loading.dismissAll();
        this.isSubmitting = false;
        if (this.timer) {
          clearInterval(this.timer);
        }

      });
      browserInBrowser.on('loadstart').subscribe(event => {
        console.log(event.url);
        url = event.url;
        if (timerStart > 0) {
          clearInterval(this.timer);
        }
        timerStart++;
        this.timer = setInterval(function () {
          timerStart++;
          console.log("Hello", url, this.paymentgatewayEndPoint + "/checkTransaction");
          console.log(timerStart);
          console.log(new Date());
          // if (url == (this.paymentgatewayEndPoint + "/checkTransaction")) {
          //   clearInterval(this.timer);
          //   console.log(new Date());
          //   console.log("Compled Payment..........");
          //   console.log(new Date());

          //   console.log(new Date());
          //   browserInBrowser.close();

          //   console.log(new Date());
          //   this.paymentSelectionService.checkTranscationStatus(this.orderuniqueNumber, this.userDetails.id).subscribe(dataVal => {
          //     console.log("dataVal**************************");
          //     console.log(new Date());
          //     console.log(dataVal);
          //     //cart.emptyCart();
          //     this.refreshMallDetails();

          //     this.utilitiesService.cartSetData([]);
          //     this.utilitiesService.setCartViewData([]);
          //     this.storage.set('MALLDETAILS', {});
          //     this.storage.set("ITEMSCOUNT", 0);
          //     this.storage.set("ITEMSINCART", []);
          //     this.storage.set("CARTITEMS", {});
          //     this.storage.set("SETCARTOUTLET", []);

          //     if (dataVal['orderStatus'] == "Success") {
          //       this.storage.set("FULLORDER", {
          //         "fullOrderDetails": this.fullOrderDetailsDataValues,
          //         "prevPage": 'CartPage',
          //         "placeInterval": 0,
          //         'sendsms': 'yes',
          //         "uniquecode": this.orderuniqueNumber
          //       });
          //       this.router.navigate(['order-summary']);
          //       // let summaryModal = this.modalCtrl.create(OrderSummaryPage, { fullOrderDetails: fullOrderDetails, prevPage: 'CartPage', placeInterval: 0, 'sendsms': 'yes', uniquecode: this.orderuniqueNumber });
          //       // summaryModal.present();

          //     }

          //     else {
          //       this.isSubmitting = false;
          //       this.utilitiesService.paymentFailed();
          //       browserInBrowser.close();
          //     }


          //   })
          // }
          // else {

          if (timerStart >= 250) {
            clearInterval(this.timer);
            this.isSubmitting = false;
            this.utilitiesService.paymentFailed();
            browserInBrowser.close();

          }
          else {

            this.paymentSelectionService.checkOrderStatus(this.orderuniqueNumber, this.mallId, fullOrderDetails.id, this.userDetails.id).subscribe(orderstatus => {
              console.log("#$%@#$%#$@%#@$%#@$%#$@%#@$%#@$%@#$%");
              console.log(orderstatus)
              console.log("@#$@#$@#$#@$@#$@#$@#$@#$@#$@#$")
              if (orderstatus['order_status'] == "Shipped" || orderstatus['order_status'] == "Successful") {
                this.utilitiesService.cartSetData([]);
                this.utilitiesService.setCartViewData([]);
                this.storage.set('MALLDETAILS', {});
                this.storage.set("ITEMSCOUNT", 0);
                this.storage.set("ITEMSINCART", []);
                this.storage.set("CARTITEMS", {});
                this.storage.set("SETCARTOUTLET", []);
                this.storage.set("SEATROW", "");
                //this.storage.set("UPI", []);
                // this.storage.set("VIEWCARTCOUNT",2);
                this.storage.set("COMSEATROW", "");

                this.refreshMallDetails();
                if (this.summaryModalpresent == 0) {
                  clearInterval(this.timer);
                  browserInBrowser.close();
                  this.storage.set("FULLORDER", {
                    "fullOrderDetails": this.fullOrderDetailsDataValues,
                    "prevPage": 'CartPage',
                    "placeInterval": 0,
                    'sendsms': 'yes',
                    "uniquecode": this.orderuniqueNumber
                  });

                  // let summaryModal = this.modalCtrl.create(OrderSummaryPage, { fullOrderDetails: fullOrderDetails, prevPage: 'CartPage', placeInterval: 0, 'sendsms': 'yes' });
                  // summaryModal.present();
                  console.log("Came here")
                  this.router.navigate(['order-summary']);
                  console.log("This is used to navigate")
                  this.summaryModalpresent++;
                }

              }
              else if (orderstatus['order_status'] == "Unsuccessful") {
                clearInterval(this.timer);
                this.isSubmitting = false;
                this.utilitiesService.paymentFailed();
                browserInBrowser.close();
              }
            });
          }



          //}
        }.bind(this), 1000)


      });
    }
  }

  clearInt(timer) {
    clearInterval(timer);
  }

  refreshMallDetails() {
    console.log("Inside refreshlMallDetails");
    this.utilitiesService.cartSetData([]);
    this.utilitiesService.setCartViewData([]);

  }



}
