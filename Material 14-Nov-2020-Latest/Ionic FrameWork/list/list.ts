import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasicListPage } from '../basic-list/basic-list';
import { AvatarListPage } from '../avatar-list/avatar-list';
import { IconListPage } from '../icon-list/icon-list';
import { InsetListPage } from '../inset-list/inset-list';
import { ListDividersPage } from '../list-dividers/list-dividers';
import { ListHeadersPage } from '../list-headers/list-headers';
import { MultiLineListPage } from '../multi-line-list/multi-line-list';
import { SlidingListPage } from '../sliding-list/sliding-list';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  basic() {
    this.navCtrl.push(BasicListPage);
  }
  Inset() {
    this.navCtrl.push(InsetListPage);
  }
  ListDividers() {
    this.navCtrl.push(ListDividersPage);
  }
  ListHeaders() {
    this.navCtrl.push(ListHeadersPage);
  }
  IconList() {
    this.navCtrl.push(IconListPage);
  }
  AvatarList() {
    this.navCtrl.push(AvatarListPage);
  }
  MultiLineList() {
    this.navCtrl.push(MultiLineListPage);
  }
  SlidingList() {
    this.navCtrl.push(SlidingListPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

}
