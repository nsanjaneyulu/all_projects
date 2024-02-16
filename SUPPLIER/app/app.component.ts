import { Component, ViewChild,OnInit } from '@angular/core';
import { Platform,  MenuController, AlertController, Nav, ToastController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Storage } from '@ionic/storage';
import {Globals, DeRegisterBackButton} from '../app/app.config';
import {BackbuttonService} from '../provider/backbutton/backbutton.service'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { ContactPage } from '../pages/contact/contact';
// import { DashboardPage } from '../pages/dashboard/dashboard';
import { Device } from '@ionic-native/device';
import { env } from '../common/properties'
import { endPointService } from '../common/endPointService';
import { OrdersProvider } from '../provider/orders/orders'
// import { AppVersion } from '@ionic-native/app-version';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;
  headersNonAdmin: HttpHeaders;
  orderServiceEndpoint:any;
  showDiscoverNearYouResp:any;
  alertConnection:any;
  pages: Array<{ title: string; component: any }>;
  alert;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private push:Push,private storage: Storage,
    private backbuttonService: BackbuttonService,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    public menu: MenuController,
    private endpointService:endPointService,
    private device: Device,
    public http: HttpClient,
    public ordersProvider: OrdersProvider,
    public appBrowser:InAppBrowser,) {
      this.endpointService.PropertiesUrlFunction();
    platform.ready().then(() => {
 
      statusBar.styleDefault();
      splashScreen.hide();
      this.forceUpdate()
    //   this.push.hasPermission().then((res: any) => {

    //       if (res.isEnabled) {
    //         console.log('We have permission to send push notifications');
    //       } else {
    //         console.log('We do not have permission to send push notifications');
    //       }

    //  });
      this.setupPush();

      this.pages = [{ title: "List", component: HomePage }];
      this.registerBackButton();
    });
  }

  OnInit(){
    console.log("sdfsjkfjsdhf")
  }

  setupPush()
  {
        const options: PushOptions = {
              android: {
                senderID:'652834813315',
                sound: true,
                vibrate: true,
                clearBadge: true
              },
              ios: {
                  alert: 'true',
                  badge: true,
                  sound: 'true'
              }
          };
   
        const pushObject: PushObject = this.push.init(options);
        pushObject.on('registration').subscribe((registration: any) => {
        this.storage.set("DEVICE_REG_ID",registration.registrationId).then((data) => {
        
          });
        });
  
  }

  openPage(page) {

    this.nav.push(page.component);
  }

  registerBackButton() {
    DeRegisterBackButton.function=this.platform.registerBackButtonAction(() => {
      let toast = this.toastController.create({
        message: "Back button pushed!",

        duration: 1000,

        dismissOnPageChange: false,
        position: "middle",
        cssClass:"my-toast",
      });


      if (this.menu.isOpen()) {
     
        this.menu.close();
    
        return;
      }

      let checkHomePage = true;
      let max = Globals.navCtrls.length;
      for (let i = 0; i < Globals.navCtrls.length; i++) {
        let n = Globals.navCtrls[i];
        if (n) {
          if (n.canGoBack()) {
            console.log("Breaking the loop i: " + JSON.stringify(i));
            let navParams = n.getActive().getNavParams();
            if (navParams) {
              console.log("navParams exists");
              let resolve = navParams.get("resolve");
              if (resolve) {
                n.pop().then(() => resolve({}));
              } else {
                n.pop();
              }
            } else {
              n.pop();
            }
            checkHomePage = false;
            return;
          }
        } else console.log("n was null!");
      }

      console.log("Current Page Name=="+this.nav.getActive().name);

      if (this.nav.getActive().instance instanceof TabsPage /*&& !this.nav.canGoBack()*/) {
        let popPageVal = this.backbuttonService.popPage();
        console.log("popPageVal: " + JSON.stringify(popPageVal));
        if (popPageVal >= 0) {
          console.log("Switching the tab to: ", popPageVal);
          this.switchTab(popPageVal);
        } else {
          console.log("Last page is HomePage");

          if (this.alert) {
            this.alert.dismiss();
            this.alert = null;
          } else {
            this.showAlert();
          }
        }
      } else {
        console.log("Last page is not HomePage");
        if (this.nav.canGoBack()) {
          console.log("We can go back!");
          this.nav.pop();
        }
      }
    });
  }

  forceUpdate(){
    let version = 203
    let propertiesUrl =  "https://s3.ap-south-1.amazonaws.com/tafel-images/properties.json";
    this.http.get(propertiesUrl, { headers: this.headersNonAdmin }).subscribe(resp=>{
     let data = resp[env];
      this.orderServiceEndpoint = data.orderServiceEndpoint;
     let url=this.orderServiceEndpoint + '/givekey/'+'supplier-version';
      this.ordersProvider.getAndroidVersion(url).subscribe(res =>{
        console.log("!@@$$",res)
        this.showDiscoverNearYouResp = res;
        if(this.platform.is('android')) {
          var versionNumberDB=this.showDiscoverNearYouResp[0].value;
          var versionFromDB= versionNumberDB.split('.');
          var versionNumFromDB = versionFromDB[0]+versionFromDB[1]+versionFromDB[2];
          if(version!= parseInt(versionNumFromDB)){ 
            this.alertConnection = this.alertController.create({
              title: "Update!",
              message: "Android New Version Update.",
              enableBackdropDismiss: false,
              buttons: [
                {
                  text: "Exit",
                  handler: () => {
                    this.platform.exitApp();
                  }
                },
                {
                  text: "Update",
                  handler: () => {
                    //
                    this.appBrowser.create("https://play.google.com/store/apps/details?id=in.tafel.outlet&hl=en", '_system');//")
                    this.platform.exitApp();
                  }
                }
              ]
            });
            this.alertConnection.present();
          }
        }
      });
     })
  }

  showAlert() {
    this.alert = this.alertController.create({
      title: "Exit?",
      message: "Are you sure you want to exit?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            this.alert = null;
          }
        },
        {
          text: "Exit",
          handler: () => {
            this.platform.exitApp();
            //this.appCtrl.getRootNav().setRoot(LoginPage);
          }
        }
      ]
    });
    this.alert.present();
  }

  switchTab(tabIndex) {
    if (Globals.tabs && tabIndex >= 0) {
      console.log("Switch condition met");
      Globals.tabIndex = tabIndex;
      Globals.tabs.select(tabIndex);
      Globals.tabs.selectedIndex = tabIndex;
    }
  }

}
