import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { masterData } from '../../../../environments/masterdata/masterdata';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside.menu.component.html',
  styleUrls: ['./aside.menu.component.scss']
})
export class AsideMenuComponent implements OnInit {
  masterData = masterData;
  userData = JSON.parse(localStorage.getItem('userData'));
  viewNotifications = false;
  cstImageUrl = 'https://res.cloudinary.com/dl9ns0hby/image/upload/v1572075582/plusmax-tracker/icons/plus-max-user.jpg';
  constructor(
    public route: Router
  ) { }

  ngOnInit() {
    console.log(this.masterData);
  }
  showNotifications() {
    this.viewNotifications = !this.viewNotifications;
  }
  logOut() {
    localStorage.clear();
    this.route.navigate(['/']);
  }
}
