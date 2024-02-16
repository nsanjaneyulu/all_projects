import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PdfgeneratePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pdfgenerate',
  templateUrl: 'pdfgenerate.html',
})
export class PdfgeneratePage {
  fullorder:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.fullorder = navParams.get('fullorder');
    console.log("this.fullorder", this.fullorder);
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad PdfgeneratePage');
  }

}
