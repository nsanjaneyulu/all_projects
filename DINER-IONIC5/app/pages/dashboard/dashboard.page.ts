import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { DashboardService } from '../../services/dashboard.service';
import { UtilitiesService } from '../../services/utilities.service';
import { SetGetMallsService } from '../../services/set-get-malls.service';
import { LoginModalPage } from '../login-modal/login-modal.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  selectionCity:any;
  selectedServiceStation:any;
  showDashBoard: boolean = false;
  driveIns:any;
  cinemas:any;
  foodCourts:any;
  restaurants:any;
  cafetrias:any;
  pageSelect:string;
  showHidediv: boolean = false;
  showDiscoverNearYouResp:any;
  offers:any;
  getofferDetailsItems:any;
  imageEndPoint:any;
  recommendedItems:any;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop:true,
    autoplay:2000,
    ppagination: false,
    spaceBetween:10,
    centeredSlides:true,
    slidesPerView:1.6
  };
  outletsListByTafelRating:any=[];
  itemsCountDetails:number=0;
  constructor(private storage:Storage,
    private router:Router,
    private alertCtrl:AlertController,
    private modalController:ModalController,
    private dashboardService:DashboardService,
    private setGetMallsService:SetGetMallsService,
    private utilitiesService:UtilitiesService) {
      this.imageEndPoint = this.utilitiesService.imageEndPoint;
   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get("ITEMSINCART").then(cartItems=>{
      this.utilitiesService.cartSetData(cartItems);
    })
    this.getDetailsForDashBoard();
    this.storage.get("ITEMSCOUNT").then(displayItems=>{
      console.log(displayItems);
      if(!displayItems || displayItems==0){
        this.itemsCountDetails = 0;
      }else{
        this.itemsCountDetails = displayItems;
      }
    })
  }

  goToCartPage(){
    if(this.itemsCountDetails!=0){
      this.router.navigate(["cart"])
    }
  }

  getDetailsForDashBoard(){
    this.storage.get("LOGIN").then(data => {
      if (!data) {
        // this.router.navigate(['home']);
        this.getServiceStation();
        this.showDiscoverNearYou();
      }else{
        this.getServiceStation();
        this.showDiscoverNearYou();
      }
    })
  }
  showDiscoverNearYou() {
    console.log("this is here.")
    this.dashboardService.getshowDiscoverNearYou('ShowPopularsBrands').subscribe(res => {
      console.log(res)
      this.showDiscoverNearYouResp = res;
      console.log(this.showDiscoverNearYouResp);
      let getValue = this.showDiscoverNearYouResp[0].value;
      console.log("getValue", getValue);
      if (getValue == 'YES') {
        this.showHidediv = false;
        console.log("this.showHidediv yes");
      }
      else {
        this.showHidediv = true;
        console.log("this.showHidediv no");
      }
      console.log("this.showDiscoverNearYouResp", this.showDiscoverNearYouResp);
    });
  }

  getServiceStation(){
    this.dashboardService.getServiceStation().subscribe(serviceStations=>{
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
        this.storage.set("SERVICESTTIONID",this.selectedServiceStation.id)
        // this.cartData.serviceStation = this.selectedServiceStation;
        // this.utilityProvider.setServiceStationId(this.selectedServiceStation.id);
        // this.storage.set("SERVICEID",this.selectedServiceStation.id);
        if (this.selectedServiceStation) {
          //this.getMalls(this.selectedServiceStation.id);
          // this.setRegistrationId();
           this.getMallsForDashboard(this.selectedServiceStation);
           this.getOffers(this.selectedServiceStation);
           this.getRecommendedItems(this.selectedServiceStation.id);
           this.getOutletsByTafelRating(this.selectedServiceStation.id);
           this.getofferDetails(this.selectedServiceStation.id);
        }
        // this.loading.dismiss();
        this.showDashBoard = true;
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
  getMallsForDashboard(serviceStationId) {
    console.log(serviceStationId);
    this.storage.get("COORDINATES").then(cords=>{
      this.dashboardService.getDriveIns(serviceStationId.id,cords).subscribe(res => {
        this.driveIns = res;
        console.log(res)
      },error=>{
        console.log(error)
      });

      this.dashboardService.getCinemas(serviceStationId.id,cords).subscribe(res => {
        this.cinemas = res;
        console.log(this.cinemas)
      },error=>{
        console.log(error)
      })
      this.dashboardService.getFoodCourts(serviceStationId.id,cords).subscribe(res => {
        this.foodCourts = res;
        console.log(this.foodCourts)
      },error=>{
        console.log(error)
      })
      this.dashboardService.getRestaurants(serviceStationId.id,cords).subscribe(res => {
        this.restaurants = res;
        console.log(this.restaurants)
      },error=>{
        console.log(error)
      })
      
      this.dashboardService.getCafeterias(serviceStationId.id,cords).subscribe(res => {
        this.cafetrias = res;
        console.log(this.cafetrias)
      })
    })
    
    // this.dashboardData.getGeolocation();
    // this.storage.get("coordinates").then(data => {

    //   this.dashboardData.getDriveIns(serviceStationId, data).subscribe(res => {
    //     this.driveIns = res;
    //     console.log(res)
    //   });

    //   this.dashboardData.getCinemas(serviceStationId, data).subscribe(res => {
    //     this.cinemas = res;
    //   })
    //   this.dashboardData.getFoodCourts(serviceStationId, data).subscribe(res => {
    //     this.foodCourts = res;
    //   })
    //   this.dashboardData.getRestaurants(serviceStationId, data).subscribe(res => {
    //     this.restaurants = res;
    //   })
    // });

  }

  getOffers(selectedServiceStation){
    this.dashboardService.getOffers(selectedServiceStation.id).subscribe(res => {
      this.offers = res;
    });
  }

  getofferDetails(serviceStationID){
    this.dashboardService.getofferDetailsItems(serviceStationID).subscribe(res => {
      var data:any= res;
      this.getofferDetailsItems = data;
      this.getofferDetailsItems = data.filter(value => {
        return value.discount > 0;
      });
      console.log("getofferDetailsItems", this.getofferDetailsItems);
    });
  }
  getRecommendedItems(serviceStationID){
    
      this.dashboardService.getRecommendedItems('tafelRating', serviceStationID).subscribe(res => {
        this.recommendedItems = res;
        console.log(this.recommendedItems)
      });
    
  }

  async goesOffersItems(getItems) {
    console.log(getItems);
    var selectedCinema = [];
    var selectedCafeteria = [];
    if(getItems.typeOfDining=='"CINEMAS"'){
      console.log(this.cinemas);
      this.openModalForMallSelection('CINEMAS');
      return;
      // for(var i=0;i<this.cinemas.length;i++){
      //   if(this.cinemas[i].id === getItems.mallID){
      //     getItems.distanceFromOutlet = this.cinemas[i].distanceFromUser;
      //   }
      // }
    }
    // this.dashboardData.getDriveIns(serviceStationId, data).subscribe(res => {
    //   this.driveIns = res;
    //   console.log(res)
    // });

    // this.dashboardData.getCinemas(serviceStationId, data).subscribe(res => {
    //   this.cinemas = res;
    // })
    // this.dashboardData.getFoodCourts(serviceStationId, data).subscribe(res => {
    //   this.foodCourts = res;
    // })
    // this.dashboardData.getRestaurants(serviceStationId, data).subscribe(res => {
    //   this.restaurants = res;
    // })
    console.log(getItems.typeOfDining)
    if(getItems.typeOfDining==='"CAFETERIA"'){
      console.log(this.cafetrias);
      
      for(var i=0;i<this.cafetrias.length;i++){
        if(this.cafetrias[i].id === getItems.mallID){
          getItems.distanceFromOutlet = this.cafetrias[i].distanceFromUser;
          selectedCafeteria[0] = this.cafetrias[i];
        }
      }
      
    }
    
    if(getItems.typeOfDining==='"FOODCOURT"'){
      console.log(this.foodCourts);
      
      for(var i=0;i<this.foodCourts.length;i++){
        if(this.foodCourts[i].id === getItems.mallID){
          getItems.distanceFromOutlet = this.foodCourts[i].distanceFromUser;
          selectedCinema[0] = this.foodCourts[i];
        }
      }
      
    }
    console.log(getItems);
    if((getItems.distanceFromOutlet*1000)>1000){
      const alert = await this.alertCtrl.create({
        header: 'Hey!!!',
        message: "You don't seem to be at "+getItems.mallName + ' (' + getItems.mallAddress.line2 + ').<br/> Do you still want to continue?',
        buttons: [
          {
            text: "No",
            role: "cancel",
            handler: () => {
            }
          },
          {
            text: "Yes",
            handler: () => {
              if(getItems.typeOfDining==='"FOODCOURT"'){
                this.goFromBanner(selectedCinema[0]);
              }if(getItems.typeOfDining==='"CAFETERIA"'){
                this.goFromBanner(selectedCafeteria[0]);
              }
              
            }
          }
        ]
      });
      await alert.present();
    }else{
      if(getItems.typeOfDining==='"FOODCOURT"'){
        this.goFromBanner(selectedCinema[0]);
      }if(getItems.typeOfDining==='"CAFETERIA"'){
        this.goFromBanner(selectedCafeteria[0]);
      }
    }

    
    

  }

  goFromBanner(getItems){
    // let link = extractRelationPath(getItems.links.length, "outlets");
              
    getItems.typeOfDining = getItems.typeOfDining.replace(/"/g, '');
    console.log(getItems.typeOfDining)

    let offersMallData: any = {
      mallId: getItems.mallID,
      mallName: getItems.mallName,
      mallAddress: getItems.mallAddress,
      // link: getItems.link
      //link: this.getOffersLink(getItems.link)
    };
    console.log("offersMallData", getItems);
    this.utilitiesService.setTogetOutletDetail(getItems);
    console.log(getItems)
    this.storage.set('MALLDETAILS',getItems)
    this.router.navigate(['items'])
    // this.navCtrl.push(ItemPage, {
    //   mallData: offersMallData
    // });
  }

  getOffersLink(link) {
    return this.extractOffersPath(link, "outlet");
  }

  extractOffersPath(link, rel) {
    var value;
    for (var i = 0; i < link.length;) {
      if (link[i].rel == rel) {
        if ("image" == rel) {
          value = this.imageEndPoint + link[i].href;
          break;
        }
        else {
          value = link[i].href;
          break;
        }
      }
      i++;
    }
    return value;
  }

  getOutletsByTafelRating(serviceStationID){
    this.dashboardService.getOutlets('tafelRating', serviceStationID).subscribe(res => {
      this.outletsListByTafelRating = res;
      console.log(this.outletsListByTafelRating);
    });
  }

  openModalForMallSelection(mallType){
    let mallData = [];
    console.log(mallType)
    if (mallType === 'CINEMAS') {
      // mallData = this.cinemas;  
      mallData = this.cinemas.sort((a, b) => {
        return a.distanceFromUser - b.distanceFromUser;
      });
    }
    if (mallType === 'CAFETERIAS') {
      // mallData = this.cinemas;  
      mallData = this.cafetrias.sort((a, b) => {
        return a.distanceFromUser - b.distanceFromUser;
      });
    }
    if (mallType === 'FOOD_COURT') {
      // mallData = this.cinemas;  
      mallData = this.foodCourts.sort((a, b) => {
        return a.distanceFromUser - b.distanceFromUser;
      });
    }
    this.setGetMallsService.setMallData(mallData);
    console.log(mallData);
    this.utilitiesService.setMallData({mallList:mallData,mallTypeData:mallType})
    this.router.navigate(['mallselection']);
  }
  goTipsPayPage() {
    
    this.router.navigate(['tipspay']);
  }

  routerChange(pageName){
    this.pageSelect = pageName;
    this.storage.get("LOGIN").then(loggedIn => {
      if (loggedIn || pageName=='profile') {
        this.router.navigate(['/'+pageName]);
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
      this.router.navigate(['dashboard']);
    }else{
      this.router.navigate(['/'+this.pageSelect]);
      
    }
    
  }

  changeLocation(){
    console.log("this is here");
    this.utilitiesService.setProfilePageName("dahsboard");
    this.router.navigate(['select-city']);
  }

  openItemsPageForRecommendedItem(outletData){
    console.log(outletData);
    var mallDataLists = [];
    if(this.foodCourts.length>0){
      mallDataLists = mallDataLists.concat(this.foodCourts);
    }
    if(this.cafetrias.length>0){
      mallDataLists = mallDataLists.concat(this.cafetrias);
    }
    if(this.cinemas.length>0){
      mallDataLists = mallDataLists.concat(this.cinemas);
    }
    console.log(mallDataLists);
    var mallDataValue = mallDataLists.filter(mallValue=>{
      return mallValue.id == outletData.mallId;
    })
    console.log(mallDataValue);

    this.utilitiesService.setTogetOutletDetail(mallDataValue[0]);
    console.log(mallDataValue[0])
    this.storage.set('MALLDETAILS',mallDataValue[0])
    this.router.navigate(['items'])
  }


}
