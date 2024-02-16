import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'tafelposapp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentRoute: any;
  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event["url"];
      }
    })
  }

  logout(): void {
    this.authService.logout();
  }

}
