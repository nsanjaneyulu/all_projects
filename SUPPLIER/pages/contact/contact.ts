import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


//import { AudioProvider } from 'ionic-audio';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  message:string;
  title:string;
  myTracks:any[];
  allTracks: any[];
  bleep = new Audio();
  constructor(public navParams: NavParams,
    public navCtrl: NavController,
    public viewCtrl: ViewController) {
    this.message=this.navParams.data.message;
    this.title=this.navParams.data.title;
    this.bleep.src ='assets/Aalarm.mp3';
    
  }
 closeNotification(){
    this.viewCtrl.dismiss();
    this.bleep.pause();  
  }

  
  ionViewWillEnter() {
     console.log("sound initiated");
     this.bleep = new Audio();
     this.bleep.src ='assets/Aalarm.mp3';
     this.bleep.play(); 
  }

}
