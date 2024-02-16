import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
// import { HelloPage } from '../hello/hello';

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  userName : string;
  users: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events, public httpClient: HttpClient) {
    this.loadData();

  }
  loadData(){
    let getdata = this.httpClient
    .get("https://jsonplaceholder.typicode.com/users")
    .subscribe( getResponseData => {
      console.log("::: getResponseData :::", getResponseData);
      this.users = getResponseData;
    } )
    }
  
  signInEvent() {
    this.events.publish('hello', this.userName)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }

}
