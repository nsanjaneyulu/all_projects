import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { endpoints } from '../../../../environments/environment';
import { HttpService } from '../../../services/http.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  pageTitle = 'User Info';
  user_id = JSON.parse(localStorage.getItem('userData')).user_id;
  cstImageUrl = 'https://res.cloudinary.com/dl9ns0hby/image/upload/v1572075582/plusmax-tracker/icons/plus-max-user.jpg';
  userData;
  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((parmas) => { this.user_id = parmas['id'] });

    this.loadUserProfile();
  }
  loadUserProfile() {
    this.httpService.doGet(endpoints.get.getUserProfile + this.user_id).subscribe((result: any) => {
      this.userData = result.data[0];
      console.log('result', result.data[0]);
    }, err => {
      console.log(err);
    });
  }
}
