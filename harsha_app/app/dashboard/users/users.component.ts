import { Component, OnInit } from '@angular/core';
import { endpoints } from '../../../environments/environment';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  recentData;
  pageTitle = 'All Users';
  userTableHeadData = ['#', 'company', 'name', 'email', 'actions'];
  constructor(
    private httpService: HttpService,
  ) { }

  ngOnInit() {
    this.loadRequests();
  }
  loadRequests() {
    this.httpService.doGet(endpoints.get.getAllUsers).subscribe((result: any) => {
      console.log('result', result);
      this.recentData = result.data;
    }, err => {
      console.log(err);
    });
  }
}
