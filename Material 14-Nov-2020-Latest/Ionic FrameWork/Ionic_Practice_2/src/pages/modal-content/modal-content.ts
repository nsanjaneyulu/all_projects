import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ModalContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-content',
  templateUrl: 'modal-content.html',
})
export class ModalContentPage {
users: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient) {
    httpClient
    .get("https://jsonplaceholder.typicode.com/users")
    .subscribe( getResponseData => {
      console.log("::: getResponseData :::", getResponseData);
      this.users = getResponseData;
    } )
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalContentPage');
  }

}
