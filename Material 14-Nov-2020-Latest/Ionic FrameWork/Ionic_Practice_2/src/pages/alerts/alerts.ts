import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';

/**
 * Generated class for the AlertsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alerts',
  templateUrl: 'alerts.html',
})
export class AlertsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private events: Events) {
    // this.events.subscribe('hello', (name) => {
    //   console.log("name Value", name)
    //   // this.showToast(userName);
    //   })
  }
  openToPromptAlert() {
    let openToPromptAlert = this.alertCtrl.create({
      title: 'Add To alert',
      message: 'Enter Value For Alert',
      inputs:[{
        type: 'text',
        name: 'addToAlert'
      }],
      
      buttons:[
        {
          text:'Cancel'
        },
        {
          text:'Add To Alert',
          handler: data => {
            console.log(JSON.stringify(data)); //to see the object
            console.log(data.addToAlert);
            // console.log(data.LastName);
        },
        },
        
      ]
    });
    openToPromptAlert.present();
  }
  openToBasicAlert() {
    const openToMessageAlert = this.alertCtrl.create({
      title: 'Hello World!!!',
      subTitle: 'Welcome To India',
      buttons: ['OK']
    });
    openToMessageAlert.present();
  }
  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Hello World',
      message: 'Welcome To India',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Hello World');

    alert.addInput(
      {
      type: 'radio',
      label: 'India',
      value: 'india',
      checked: true
      },
      
    );
    alert.addInput(
      {
      type: 'radio',
      label: 'UK',
      value: 'uk'
      },
      
    );

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK'
      // handler: data => {
      //   this.testRadioOpen = false;
      //   this.testRadioResult = data;
      // }
    });
    alert.present();
  }

  showCheckbox() {
    let checkBoxAlert = this.alertCtrl.create();
    checkBoxAlert.setTitle('World List');

    checkBoxAlert.addInput({
      type: 'checkbox',
      label: 'India',
      value: 'india',
      checked: true
    });

    checkBoxAlert.addInput({
      type: 'checkbox',
      label: 'UK',
      value: 'uk'
    });

    checkBoxAlert.addButton('Cancel');
    checkBoxAlert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        // this.testCheckboxOpen = false;
        // this.testCheckboxResult = data;
      }
    });
    checkBoxAlert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlertsPage');
  }

}
