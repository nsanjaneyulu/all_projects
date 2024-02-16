import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the AvatarListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-avatar-list',
  templateUrl: 'avatar-list.html',
})
export class AvatarListPage {
  users: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {
    httpClient
    .get("https://jsonplaceholder.typicode.com/photos")
    .subscribe( getResponseData => {
      console.log("::: getResponseData :::", getResponseData);
      this.users = getResponseData;
    } )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvatarListPage');
  }

}
