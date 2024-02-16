import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.page.html',
  styleUrls: ['./splashscreen.page.scss'],
})
export class SplashscreenPage implements OnInit {
  coordinates = {
    latitude: 17.46,
    longitude: 78.3489
  };
  upiPaymentOptions: any;
  constructor(private storage:Storage,private geolocation:Geolocation,private utilitiesService:UtilitiesService,
    private router:Router) {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.coordinates.latitude = resp.coords.latitude;
        this.coordinates.longitude = resp.coords.longitude;
        this.storage.set('COORDINATES', this.coordinates);
        this.utilitiesService.setGeoCords(this.coordinates);
      }).catch((error) => {
        this.storage.set('COORDINATES', this.coordinates);
        this.utilitiesService.setGeoCords(this.coordinates);
      });
      
    
   }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.storage.get("ITEMSINCART").then(cartItems=>{
      if(!cartItems){
        this.storage.set("ITEMSINCART",[]);
      }
    });
    let UPIUrl = '/getUpiPaymentOption';
    this.utilitiesService.getUPIOptions(UPIUrl).subscribe(options => {
      this.upiPaymentOptions = options;
      this.storage.set("UPI",this.upiPaymentOptions);
    })

    this.storage.get("LOGIN").then(data => {
      console.log(data);
      if (data == true) {
        this.router.navigate(['dashboard'])
      }
      else{
        this.router.navigate(['home'])
      }
    })
  }

}
