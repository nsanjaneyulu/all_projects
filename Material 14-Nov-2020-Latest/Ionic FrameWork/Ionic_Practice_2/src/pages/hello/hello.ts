import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
// import { Message } from '@angular/compiler/src/i18n/i18n_ast';

/**
 * Generated class for the HelloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hello',
  templateUrl: 'hello.html',
})
export class HelloPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private events: Events) {
    
    this.events.subscribe('hello', (userName) => {
    this.showToast(userName);
    })
  }
  showToast(userName: string) {
    const dataToast = this.toastCtrl.create({
      message: `hello ${userName}`,
      duration: 3000
    });
    dataToast.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HelloPage');
  }

}
