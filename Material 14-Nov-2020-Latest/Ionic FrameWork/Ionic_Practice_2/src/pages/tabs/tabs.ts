import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TextTabPage } from '../text-tab/text-tab';
import { IconTabPage } from '../icon-tab/icon-tab';
import { TextIconTabPage } from '../text-icon-tab/text-icon-tab';
import { BadgeTabPage } from '../badge-tab/badge-tab';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  textTab() {
    this.navCtrl.push(TextTabPage);
  }
  iconTab() {
    this.navCtrl.push(IconTabPage);
  }
  textIconTab() {
    this.navCtrl.push(TextIconTabPage);
  }
  badgeTab() {
    this.navCtrl.push(BadgeTabPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
