import {
	Component, Injectable
}
from '@angular/core';
import {
	NavController, NavParams, AlertController
}
from 'ionic-angular';
import {
	OrdersProvider
}
from '../../provider/orders/orders';
import {
	CallNumber
}
from '@ionic-native/call-number';
/**
 * Generated class for the RejectitemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
	selector: 'page-rejectitem',
	templateUrl: 'rejectitem.html',
})
@Injectable()
export class RejectitemPage {
	constructor(public navCtrl: NavController, public navParams: NavParams, public oprovider: OrdersProvider, public alertCtrl: AlertController, public callNumber: CallNumber) {
		console.log(navParams.data);
		this.item = navParams.data.item;
		this.order = navParams.data.order;
	}
	ionViewDidLoad() {
		console.log('ionViewDidLoad RejectitemPage');
	}
	rejectItem() {
		if(Number(this.item.deliveredQuantity) > this.item.quantity) {
			this.presentAlert("Invalid Quantity", "Deliverable quantity should be less than quantity");
			return false;
		}
		if(!this.item.rejectionReason || this.item.rejectionReason.length == 0) {
			this.presentAlert("Reason required", "Please say reason to diner");
			return false;
		}
		this.item.rejected = true;
		this.oprovider.updateOrderLet(this.order, this.item).subscribe(data => {
			this.presentAlert("Success", "Item Rejected");
			this.navCtrl.popToRoot();
		});
	}
	order: any = {};
	item: any = {};
	presentAlert(title, message) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: message,
			buttons: ['Okay']
		});
		alert.present();
	}
	getRoundedValue(n) {
		return Math.round(n);
	}
	callDiner() {
		this.callNumber.callNumber(this.order.diner.phoneNumber, true).then(res => console.log('Launched dialer!', res)).catch(err => console.log('Error launching dialer', err));
	}
}