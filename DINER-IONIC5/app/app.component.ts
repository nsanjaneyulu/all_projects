import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UtilitiesService } from './services/utilities.service';
import { Storage } from '@ionic/storage';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  coordinates = {
    latitude: 17.46,
    longitude: 78.3489
  };
  constructor(private utilitiesService:UtilitiesService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage:Storage,
    private geolocation:Geolocation,
    private locationAccuracy:LocationAccuracy
    
  ) {
    
    this.utilitiesService.propertiesUrlFunction();
    this.storage.get('COORDINATES').then(cordinates=>{
      this.utilitiesService.setGeoCords(cordinates);
    });
    this.initializeApp();
  }


  initializeApp() {
    AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
          this.geolocation.getCurrentPosition().then((resp) => {
            this.coordinates.latitude = resp.coords.latitude;
            this.coordinates.longitude = resp.coords.longitude;
            this.storage.set('COORDINATES', this.coordinates);
            this.utilitiesService.setGeoCords(this.coordinates);
          }).catch((error) => {
            this.storage.set('COORDINATES', this.coordinates);
            this.utilitiesService.setGeoCords(this.coordinates);
          });
          //If having permission show 'Turn On GPS' dialogue
        } else {
 
          //If not having permission ask for permission
        }
      },
      err => {
        //alert(err);
      }
    );
    AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.READ_SMS).then(
      success => {
        console.log('Permission granted');
      },
      err => AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.READ_SMS)
    );
    

    AndroidPermissions.requestPermissions([AndroidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,AndroidPermissions.PERMISSION.READ_SMS]);
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
