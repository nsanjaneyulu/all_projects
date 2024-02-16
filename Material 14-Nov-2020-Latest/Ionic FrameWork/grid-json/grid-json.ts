import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the GridJsonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grid-json',
  templateUrl: 'grid-json.html',
})
export class GridJsonPage {
  users = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {
    this.getJsonGrid();
  }
  getJsonGrid() {
    const URL = 'https://jsonplaceholder.typicode.com/users';
    let getData: Observable<any> = this.httpClient.get(URL);
    getData.subscribe((response: any) => {
            const responseData = response;
            //console.log(responseData);
            this.users = responseData;
        });
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad GridJsonPage');
  }

}
