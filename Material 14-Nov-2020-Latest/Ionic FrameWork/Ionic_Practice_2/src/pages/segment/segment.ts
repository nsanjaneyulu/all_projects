import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the SegmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-segment',
  templateUrl: 'segment.html',
})
export class SegmentPage {
  pet: string = "puppies";
  isAndroid: boolean = false;

  users: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public httpClient: HttpClient,
    private platform: Platform) {
    this.isAndroid = platform.is('android');




    console.log("Platforms :", platform.is('mobileweb') );
    console.log( "Payload", this.navParams )
    console.log( "Payload Data", this.navParams.get('__data__') )


    httpClient
      .get("https://jsonplaceholder.typicode.com/photos")
      .subscribe( getResponseData => {
        console.log("::: getResponseData :::", getResponseData);
        this.users = getResponseData;
      } )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SegmentPage');
  }

}
