import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListDividersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-dividers',
  templateUrl: 'list-dividers.html',
})
export class ListDividersPage {
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
    console.log('ionViewDidLoad ListDividersPage');
  }

}
