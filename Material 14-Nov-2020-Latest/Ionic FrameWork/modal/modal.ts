import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalContentPage } from '../modal-content/modal-content';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    
  }
  goToModalContent() {
    let modal = this.modalCtrl.create(ModalContentPage);
    modal.present();
    }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalContentPage');
  }

}
