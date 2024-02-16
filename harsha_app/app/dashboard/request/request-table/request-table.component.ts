import { Component, OnInit } from '@angular/core';
import { endpoints } from '../../../../environments/environment';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-request-table',
  templateUrl: './request-table.component.html',
  styleUrls: ['./request-table.component.css']
})
export class RequestTableComponent implements OnInit {
  recentData;
  pageTitle = 'All requests';
  constructor(
    private httpService: HttpService,
  ) { }

  ngOnInit() {
    this.loadRequests();
  }
  loadRequests() {
    this.httpService.doGet(endpoints.get.getUserRequestsData).subscribe((result: any) => {
      console.log('result', result);
      this.recentData = result.data;
    }, err => {
      console.log(err);
    });
  }
}
