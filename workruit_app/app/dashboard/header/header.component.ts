import { Component, OnInit } from '@angular/core';
import { authDataInfo } from '../../../environments/textual-changes';
import { Router} from '@angular/router';
// import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http.service';
import {map} from "rxjs/operators";
import { endpoints, baseUrl, imgURL } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authDataInfo = authDataInfo;
  userId: any;
  // userData: any;
  // dashboard = true;
  constructor(private httpService: HttpService,private route: Router) { 
    this.userId = localStorage.getItem('userId');
    // this.router.params.subscribe( params => 
    //   {
    //     if(params["userId"])
    //     {
    //       this.dashboard = false;
    //       console.log(params) 
    //     }
    //     else {
    //       this.dashboard = true;
    //     }
    //   })
  }
  isLogout() {
    console.log("Clicked");
    const sessionId = localStorage.getItem("sessionId");
    const getCompanyProfileUrl = baseUrl + endpoints.get.user + this.userId + '/' + sessionId + '/' + endpoints.get.dashboardLogout;
    this.httpService.doGet(getCompanyProfileUrl).subscribe((result: any) => {
        console.log("Logout");
        
        let localKeys = Object.keys(localStorage);
        
        localKeys.map((e: any, i: any) => {
          switch (e) {
            case 'masterData':
              break;
            case 'fcm_token':
              break;
            case 'webversion':
              break;
            default:
              localStorage.removeItem(e);
              break;
          }

        });
        this.route.navigate(['/login']);
    }, (err: any) => {
      console.log(err);
    });
  }
  ngOnInit(): void {
    this.userData();
  }
  firstname: any;
  lastname: any;
  email: any;
  picture: any;
  userData() {
    
    this.firstname =  JSON.parse(localStorage.getItem('userData') || '')['userData']['firstname'];
    this.lastname =  JSON.parse(localStorage.getItem('userData') || '')['userData']['lastname'];
    this.email =  JSON.parse(localStorage.getItem('userData') || '')['userData']['email'];
    this.picture = imgURL + JSON.parse(localStorage.getItem('userData') || '')['userData']['picture'];
  }

}
