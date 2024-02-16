import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UtilitiesService } from '../../services/utilities.service';
@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.page.html',
  styleUrls: ['./select-city.page.scss'],
})
export class SelectCityPage implements OnInit {
  serviceStationDetails: any;
  showCitiesList: boolean = false;
  coordinates = {
    latitude: 17.46,
    longitude: 78.3489
  };
  constructor(private utilitiesService: UtilitiesService, private storage: Storage, private dashboardService: DashboardService, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getCities();
  }
  getCities() {
    this.showCitiesList = false;
    this.dashboardService.getServiceStation().subscribe(serviceStations => {
      this.serviceStationDetails = serviceStations;
      console.log(this.serviceStationDetails);
      this.showCitiesList = true;
    })
  }

  selectCity(citySelected) {
    console.log(citySelected);
    this.coordinates.latitude = citySelected.location.lattitude;
    this.coordinates.longitude = citySelected.location.longitude;
    this.storage.set('COORDINATES', this.coordinates);
    this.utilitiesService.setGeoCords(this.coordinates);
    if(this.utilitiesService.profileSelection=="dahsboard"){
      this.router.navigate(['dashboard']);
    }
    if(this.utilitiesService.profileSelection=="profile"){
      this.router.navigate(['profile']);
    }
    
  }

  goToDashBoard() {
    if(this.utilitiesService.profileSelection=="dahsboard"){
      this.router.navigate(['dashboard']);
    }
    if(this.utilitiesService.profileSelection=="profile"){
      this.router.navigate(['profile']);
    }
  }

}
