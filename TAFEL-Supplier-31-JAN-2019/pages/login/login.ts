import {
	Component
}
from '@angular/core';
import {
	NavController, NavParams, AlertController, LoadingController
}
from 'ionic-angular';
import {
	TabsPage
}
from '../tabs/tabs';
import {
	UserDataProvider
}
from '../../provider/login/login';
import {
	Storage
}
from '@ionic/storage';
import {
	Platform
}
from 'ionic-angular';
import {
	UniqueDeviceID
}
from '@ionic-native/unique-device-id';
import {
	VerifyCodePage
}
from '../verify-code/verify-code';
import {
	UtilityProvider
}
from '../../provider/utility/utility';
@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {
	phoneNumber: any = "";
	deviceId: string;
	deviceType: string;
	deviceRegisteredId: string;
	showLoginPage: boolean = true;
	splash: boolean = true;
	facebook = {
		loggedIn: false,
		name: '',
		email: '',
		profilePicture: ''
	}
	supplierId: any;
	loading: any;
	platform: any;
	constructor(public navCtrl: NavController, public navParams: NavParams, private utilityProvider: UtilityProvider, private user: UserDataProvider, private alertCtrl: AlertController, private storage: Storage, public plt: Platform, private loadingCtrl: LoadingController, private uniqueDeviceID: UniqueDeviceID) {
		this.getPlatform();
		this.setShowLoginPage();
		this.getDeviceRegistrationId();
		this.getUniqueDeviceId();
	}
	ionViewDidLoad() {
		setTimeout(() => {
			this.splash = false;
		}, 4000);
	}
	getDeviceRegistrationId() {
		this.storage.get("DEVICE_REG_ID").then(val => {
			this.deviceRegisteredId = val;
		});
	}
	showAlert(title, subtitle) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: subtitle,
			buttons: ['OK']
		});
		alert.present();
	}
	initiateApis() {
		this.utilityProvider.initiateApis();
	}
	setShowLoginPage() {
		this.storage.get("SUPPLIER_ID").then((val) => {
			console.log("Supplier Id Already :" + val);
			if(val) {
				this.showLoginPage = false;
				this.navCtrl.setRoot(TabsPage);
			}
		});
	}
	login() {
		console.log("Phone Number =" + this.phoneNumber);
		if(!this.phoneNumber) {
			console.log("Phone Number = Invalid");
			this.presentAlert('Login Failed!', 'Please enter valid phone number');
			this.phoneNumber = "";
			return false;
		}
		this.phoneNumber = this.phoneNumber.substring(1);
		if(this.phoneNumber && (isNaN(this.phoneNumber) || this.phoneNumber.length < 10)) {
			this.presentAlert('Login Failed!', 'Please enter valid phone number');
			this.phoneNumber = "";
			return false;
		} else {
			this.storage.get("DEVICE_REG_ID").then((val) => {
				console.log("DEVICE REG ID ", val);
				this.deviceRegisteredId = val;
				this.presentLoadingDefault();
				this.doLoginWithDevice();
			});
		}
	}
	doLoginWithDevice() {
		this.deviceRegisteredId = "dmN4E7vd2z4:APA91bHHFWI5UZPPdHauqnAfalszPGYz0-9SkMn3dkdoWBeGBWZw2bhTMPIwPsJtv73bDasNbHQmhDkA_5IVrM0OqCiZVX5uEv_qE5-0RbY1f-eaKbRCoRH8CFn6-Pf_uI0QrGg-vc8vDE8hHBbwHnDYxxeNgUwITA";
		this.deviceType = "android";
		this.phoneNumber = "919985488502";
		this.user.getSupplierAccount(this.phoneNumber, this.deviceRegisteredId, this.deviceType).subscribe(data => {
			if(data.id && (data.type == "SUPPLIER" || data.type == "MALL_OWNER")) {
				this.storage.set("SUPPLIER_ID", data.id);
				this.storage.set("OUTLET_ID", data.outletIds);
				this.storage.set("MALL_ID", data.outlets[0].mallId);
				this.storage.set("SS_ID", data.outlets[0].ssId);
				console.log("-------------------------" + data.type);
				this.storage.set("USER_TYPE", data.type);
				this.storage.set("OUTLET_OBJECT", data.outlets);
			} else {
				this.presentAlert('Login Failed!', 'You are not registered with us. Please register and try again');
				this.phoneNumber = "";
			}
		}, error => {
		
			this.presentAlert('Sorry you are not a registered user,', 'please contact TAFEL to register your Business' + this.phoneNumber);
			this.phoneNumber = "";
		});
	}
	presentLoadingDefault() {
		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		loading.present();
		setTimeout(() => {
			loading.dismiss();
		}, 5000);
	}
	presentAlert(title, message) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: message,
			buttons: ['Okay']
		});
		alert.present();
	}
	getUniqueDeviceId() {
		this.uniqueDeviceID.get().then((uuid: any) => {
			this.deviceId = uuid;
			return uuid;
		}).catch((error: any) => {
			this.deviceId = "1111-2222-5555";
			return this.deviceId;
		});
	}
	createOTP() {
		if(this.phoneNumber !== null && this.phoneNumber !== "" && this.phoneNumber.length == 13) {
			this.user.createOTP(this.platform, this.phoneNumber, this.deviceId);
			let registrationDetails = {
				platform: this.platform,
				phoneNumber: this.phoneNumber,
				deviceId: this.deviceId
			};
			this.navCtrl.push(VerifyCodePage, registrationDetails);
		} else {
			this.showAlert('Error', 'Please Enter a valid phone number.');
		}
	}
	getPlatform() {
		if(this.plt.is('ios')) {
			this.platform = 'ios';
		} else if(this.plt.is('android')) {
			this.platform = 'android';
		} else {
			this.platform = 'browser';
		}
	}
}