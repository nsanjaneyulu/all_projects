import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListHeadersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-headers',
  templateUrl: 'list-headers.html',
})
export class ListHeadersPage {
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
    console.log('ionViewDidLoad ListHeadersPage');
  }

}
