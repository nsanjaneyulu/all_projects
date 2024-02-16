import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthService } from '../auth.service';
import { MessageService } from '../message.service'
@Component({
  selector: 'tafelposapp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentRoute: any;
  mallImage: any;
  message=""
  mallImageURL: string = "https://tafel-images.s3.ap-south-1.amazonaws.com/";
  constructor(private router: Router, public authService: AuthService, private messageService: MessageService) {


  }

  ngOnInit() {
    setInterval(function(){ this.getMessage() }.bind(this), 3000);
    this.getMessage()
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getMallImage();
        this.currentRoute = event["url"];
      }
    })
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  getMessage(): void {
    this.messageService.getMessage().subscribe(message => {
      if (message) {
        this.message = message;
      }
      else {
        this.message = "Internet Connected";
      }

      setTimeout(() => {
        this.message = message;
      }, 1000);
    });
  }
  getMallImage() {
    this.mallImage = sessionStorage.getItem('mallImage');
    if (!this.mallImage) {
      setTimeout(() => {
        this.getMallImage()
      }, 1000);
    }
  }

}
