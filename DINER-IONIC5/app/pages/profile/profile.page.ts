import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ModalController, AlertController } from '@ionic/angular';
import { UtilitiesService } from '../../services/utilities.service';
import { DashboardService } from '../../services/dashboard.service';
import { LoginModalPage } from '../login-modal/login-modal.page';

import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser/ngx';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userDetailData: any;
  selectionCity: any;
  noSignIn: boolean = false;
  selectedServiceStation: any;
  showProfile: boolean = false;
  pageSelect:string;
  itemsCountDetails:number=0;
  constructor(private alertController:AlertController,private modalController:ModalController,private themeableBrowser: ThemeableBrowser, private dashboardService: DashboardService, private router: Router, private storage: Storage, private utilitiesService: UtilitiesService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log('sdfmhsdfjsdfhkhsdjfsdfjhgsdjgfd');
    this.showProfile = false;
    this.storage.get("ITEMSCOUNT").then(displayItems=>{
      console.log(displayItems);
      if(!displayItems || displayItems==0){
        this.itemsCountDetails = 0;
      }else{
        this.itemsCountDetails = displayItems;
      }
    })


    this.getServiceStation();
    this.storage.get("USERDETAILS").then(userDetails => {
      this.storage.get("LOGIN").then(dataLogin => {
        this.noSignIn = dataLogin;
        console.log(dataLogin)
        this.userDetailData = userDetails;
        if (!this.userDetailData.firstName) {
          this.userDetailData.firstName = "Guest"
        }
      })
    })
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      // header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Logout',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  openLoginProfile(){
    this.storage.get("LOGIN").then(loggedIn => {
      if (loggedIn) {
        this.router.navigate(['view-cart']);
      } else {
        this.presentModal();
      }
    })
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: LoginModalPage, cssClass: "modal-halfscreen"
    });
    
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(!data){
      
    }else{
      this.router.navigate(['editprofile']);
    }
    
  }

  routerChange(pageName){
    this.pageSelect = pageName;
    this.storage.get("LOGIN").then(loggedIn => {
      if (loggedIn || pageName=='dashboard') {
        this.router.navigate(['/'+pageName]);
      } else {
        this.presentPageModal();
      }
    })
    
  }

  async presentPageModal() {
    const modal = await this.modalController.create({
      component: LoginModalPage, cssClass: "modal-halfscreen"
    });
    
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(!data){
      this.router.navigate(['profile']);
    }else{
      this.router.navigate(['/'+this.pageSelect]);
      
    }
    
  }

  getServiceStation() {
    this.dashboardService.getServiceStation().subscribe(serviceStations => {
      //this.selectedServiceStation = data[0];
      this.selectionCity = serviceStations;
      var selectedCity = this.selectionCity.filter(locationData => {
        return parseInt(locationData.location.longitude) == parseInt(this.utilitiesService.longitude);
      });
      console.log(selectedCity)
      if (selectedCity.length > 0) {
        console.log('sdf,bsdkfhmsadmfvmnsdfnb')
        this.selectedServiceStation = selectedCity[0];
        console.log('getServiceStation - selectedServiceStation :' + JSON.stringify(this.selectedServiceStation));
        //this.details.setSelectedCity(this.selectedServiceStation);
        this.utilitiesService.setServiceStation(this.selectedServiceStation);
        this.storage.set("SERVICESTTIONID", this.selectedServiceStation.id)
        // this.cartData.serviceStation = this.selectedServiceStation;
        // this.utilityProvider.setServiceStationId(this.selectedServiceStation.id);
        // this.storage.set("SERVICEID",this.selectedServiceStation.id);
        // this.loading.dismiss();
        this.showProfile = true;
      }
      //  else {
      //   var coordinates = {
      //     latitude: 17.46,
      //     longitude: 78.3489
      //   }
      //   this.coordinates = coordinates;
      //   this.utilityProvider.setCurrentLocation(this.coordinates);
      //   var selectedCity = selectionCity.filter(locationData => {
      //     return parseInt(locationData.location.longitude) == parseInt(this.coordinates.longitude);
      //   });
      //   console.log(selectedCity)
      //   this.selectedServiceStation = selectedCity[0];
      //   this.storage.set('coordinates', coordinates);
      //   console.log('getServiceStation - selectedServiceStation :' + JSON.stringify(this.selectedServiceStation));
      //   //this.details.setSelectedCity(this.selectedServiceStation);
      //   this.userData.setServiceStation(this.selectedServiceStation);
      //   this.cartData.serviceStation = this.selectedServiceStation;
      //   if (this.selectedServiceStation) {
      //     //this.getMalls(this.selectedServiceStation.id);
      //     this.setRegistrationId();
      //     this.getMallsForDashboard(this.selectedServiceStation.id);
      //     this.getOffers();
      //     this.getRecommendedItems(this.selectedServiceStation.id);
      //     this.getOutletsByTafelRating(this.selectedServiceStation.id);
      //     this.getofferDetails(this.selectedServiceStation.id);
      //   }
      //   // this.loading.dismiss();
      //   this.showDashBoard = true;
      //   // this.getServiceStations();
      //   // this.showDiscoverNearYou();
      // }


    });
  }

  changeLocation() {
    //console.log("this is here");
    this.utilitiesService.setProfilePageName("profile");
    this.router.navigate(['select-city']);
  }

  editProfile() {
    this.router.navigate(['editprofile']);
  }
  termsConditions() {
    const options: ThemeableBrowserOptions = {
      // statusbar: {
      //     color: '#ffffffff'
      // },
      toolbar: {
        height: 52,
        color: '#a9435eff'
      },
      title: {
        color: '#ffffffff',
        showPageTitle: true,
        staticText: 'Terms & Conditions'
      },
      // backButton: {
      //     image: 'back',
      //     // imagePressed: 'back_pressed',
      //     align: 'left',
      //     event: 'backPressed',

      // },
      // forwardButton: {          
      //     image: 'forward',
      //     // imagePressed: 'forward_pressed',
      //     align: 'left',
      //     event: 'forwardPressed'
      // },
      closeButton: {
        wwwImage: 'assets/icon/back_arrow.png',
        // imagePressed: 'close_pressed',          
        align: 'left',
        event: 'closePressed'
      },
      backButtonCanClose: true
    };
    const browser: ThemeableBrowserObject = this.themeableBrowser.create('https://s3.ap-south-1.amazonaws.com/tafel-terms-conditions/terms+and+conditions+of+usage+of+TAFEL.html', '_blank', options);
  }
  privacyProlicy() {
    const options: ThemeableBrowserOptions = {
      // statusbar: {
      //     color: '#ffffffff'
      // },
      toolbar: {
        height: 52,
        color: '#a9435eff'
      },
      title: {
        color: '#ffffffff',
        showPageTitle: true,
        staticText: 'Privacy Policy'
      },
      // backButton: {
      //     image: 'back',
      //     // imagePressed: 'back_pressed',
      //     align: 'left',
      //     event: 'backPressed',

      // },
      // forwardButton: {          
      //     image: 'forward',
      //     // imagePressed: 'forward_pressed',
      //     align: 'left',
      //     event: 'forwardPressed'
      // },
      closeButton: {
        wwwImage: 'assets/icon/back_arrow.png',
        // imagePressed: 'close_pressed',          
        align: 'left',
        event: 'closePressed'
      },
      backButtonCanClose: true
    };
    const browser: ThemeableBrowserObject = this.themeableBrowser.create('https://tafel-terms-conditions.s3.ap-south-1.amazonaws.com/Tafel+Technologies+Privacy-Policy.html', '_blank', options);
  }

  offersFunctions() {
    const options: ThemeableBrowserOptions = {
      // statusbar: {
      //     color: '#ffffffff'
      // },
      toolbar: {
        height: 52,
        color: '#a9435eff'
      },
      title: {
        color: '#ffffffff',
        showPageTitle: true,
        staticText: 'Offers'
      },
      // backButton: {
      //     image: 'back',
      //     // imagePressed: 'back_pressed',
      //     align: 'left',
      //     event: 'backPressed',

      // },
      // forwardButton: {          
      //     image: 'forward',
      //     // imagePressed: 'forward_pressed',
      //     align: 'left',
      //     event: 'forwardPressed'
      // },
      closeButton: {
        wwwImage: 'assets/icon/back_arrow.png',
        // imagePressed: 'close_pressed',          
        align: 'left',
        event: 'closePressed'
      },
      backButtonCanClose: true
    };
    const browser: ThemeableBrowserObject = this.themeableBrowser.create('https://tafel-terms-conditions.s3.ap-south-1.amazonaws.com/Offers+terms+and+conditions.html', '_blank', options);
  }

  logout() {
    this.storage.set("CARTITEMS", {});
    this.storage.set("COMSEATROW", "");
    this.storage.set("DINNERID", "");
    this.storage.set("FULLORDER", {});
    this.storage.set("ITEMSCOUNT", 0);
    this.storage.set("ITEMSINCART", []);
    this.storage.set("LOGIN", false);
    this.storage.set("MALLDETAILS", {});
    this.storage.set("NAMEE", "");
    this.storage.set("PHONENUMBER", "");
    this.storage.set("SEATROW", "");
    this.storage.set("SERVICESTTIONID", "");
    this.storage.set("SETCARTOUTLET", []);
    this.storage.set("SKIP", false);
    this.storage.set("TYPEOFDINING", "");
    this.storage.set("USERDETAILS", {});
    this.storage.set("VIEWCARTCOUNT", 0);
    this.router.navigate(['splashscreen']);
  }

  myOrderFunction() {
    this.router.navigate(['myorders'])
  }


}
