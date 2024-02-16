import {
	Component
}
from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams,
	AlertController,
	ToastController
}
from 'ionic-angular';
import {
	Storage
}
from '@ionic/storage';
import {
	TabsPage
}
from '../tabs/tabs';
import {
	UserDataProvider
}
from '../../provider/login/login';
/**
 * Generated class for the VerifyCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-verify-code',
	templateUrl: 'verify-code.html',
})
export class VerifyCodePage {
	code: any = "";
	confirmationResult: any;
	alertMessage: string = "Invalid OTP";
	facebook = {
		loggedIn: false,
		name: '',
		email: '',
		profilePicture: ''
	}
	phoneNumber: string;
	deviceId: any;
	platform: any;
	resendDisabled: any = true;
	seconds: any;
	minutes: any;
	timerElement: any;
	loading: any;
	selectedCity: any;
	maskedNumber: any;
	deviceRegisteredId: any;
	phoneNumberWithoutPlus: string;
	isValidating: any = false;
	constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private toastCtrl: ToastController, private storage: Storage, private user: UserDataProvider) {
		this.confirmationResult = this.navParams.get('confirmationResult');
		this.phoneNumber = this.navParams.get('phoneNumber');
		this.deviceId = this.navParams.get('deviceId');
		this.platform = this.navParams.get('platform');
		this.maskedNumber = this.phoneNumber.substr(-4);
	}
	//kjnkljlkjlkjkjklj
	validateOTP() {
		if(this.code !== null && this.code !== '') {
			this.user.validateOTP(this.code, this.platform, this.phoneNumber, this.deviceId).subscribe(res => {
				let supplierOtpResponse = res;
				console.log('After Validate OTP :::: ', supplierOtpResponse);
				if(supplierOtpResponse.id != null) {
					this.doLoginWithDevice(supplierOtpResponse);
				} else {
					this.showAlert('Invalid OTP', 'Please enter a valid OTP');
				}
			});
		} else {
			this.showAlert('Invalid OTP', 'Please enter a valid OTP');
		}
	}
	doLoginWithDevice(OTPResponse) {
		let apiDetails = {
			id: OTPResponse.id,
			encryptedPassword: OTPResponse.encriptedPassword,
			refreshDate: (OTPResponse.refreshDate + 1800000),
			refreshToken: OTPResponse.refreshToken,
			accessToken: OTPResponse.accessToken,
			idToken: OTPResponse.idToken
		}
		this.storage.set("ENCRY_PWD", OTPResponse.encriptedPassword);
		this.storage.set("SUPPLIER_ID", OTPResponse.id);
		this.storage.set("API_KEYS", apiDetails);
		this.phoneNumberWithoutPlus = this.phoneNumber.substring(1);
		this.storage.get("DEVICE_REG_ID").then((val) => {
			if(val == null) {
				val = "123546";
			}
			this.deviceRegisteredId = val;
			this.user.setAPIDetails(apiDetails);
			this.user.getSupplierAccount(this.phoneNumberWithoutPlus, this.deviceRegisteredId, this.platform).subscribe(data => {
				console.log("getSupplierAccount", data);
				if(data.id && (data.type == "SUPPLIER" || data.type == "MALL_OWNER")) {
					this.storage.set("SUPPLIER_PHONE", this.phoneNumberWithoutPlus);
					this.storage.set("OUTLET_ID", data.outletIds);
					this.storage.set("MALL_ID", (data.outlets && data.outlets.length > 0 ? data.outlets[0].mallId : ""));
					this.storage.set("SS_ID", (data.outlets && data.outlets.length > 0 ? data.outlets[0].ssId : ""));
					console.log("data.type" + data.type);
					this.storage.set("USER_TYPE", data.type);
					this.storage.set("OUTLET_OBJECT", data.outlets);
					this.storage.set("ALL_PERMITABLE", data.allpermited
					);
					this.navCtrl.setRoot(TabsPage);
				} else {
					this.presentAlert('Request Failed!', 'You are not registered with us. Please register and try again');
				}
			}, error => {
			
				this.presentAlert('Request Failed!', 'Oops..! Unknown server error.' + this.phoneNumber);
			});
		});
	}
	showToast(position: string, message) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 1500,
			position: position,
			cssClass: 'toast-style'
		});
		toast.present(toast);
	}
	resendOTP() {
		this.user.createOTP(this.platform, this.phoneNumber, this.deviceId);
		// let registrationDetails= {
		//   platform: this.platform, 
		//   phoneNumber: this.phoneNumber, 
		//   deviceId: this.deviceId
		// };
		this.showToast('bottom', 'OTP Request Sent');
	}
	showAlert(title, subtitle) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: subtitle,
			buttons: ['OK']
		});
		alert.present();
	}
	presentAlert(title, message) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: message,
			buttons: ['Okay']
		});
		alert.present();
	}
	ionViewDidLoad() {
		console.log('ionViewDidLoad VerifyCodePage');
	}
}