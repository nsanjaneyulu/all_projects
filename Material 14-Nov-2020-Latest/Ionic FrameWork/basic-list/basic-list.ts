import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BasicListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-basic-list',
  templateUrl: 'basic-list.html',
})
export class BasicListPage {
  items = [
    'India',
    'USA',
    'UK',
    'Dubai'
  ];
  itemSelected(item: string) {
    console.log("Selected Item", item);
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasicListPage');
  }

}
