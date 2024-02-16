import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { masterData } from '../../environments/masterdata/masterdata';
import { HttpService } from '../services/http.service';
import { endpoints } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  masterData = masterData;
  asideMenu = true;
  filtersFormView = false;
  constructor(
    private route: Router,
    private httpService: HttpService,
  ) { }
  showFilters() {
    this.filtersFormView = !this.filtersFormView;
  }
  toggleAsideMenu() {
    this.asideMenu = !this.asideMenu;
  }
  ngOnInit() {
    if (!localStorage.getItem('masterData')) {
      this.getMasterData();
    };
  }
  getMasterData() {
    this.httpService.doGet(endpoints.get.getMasterData).subscribe((result: any) => {
      if (result.status === 'success') {
        localStorage.setItem('masterData', JSON.stringify(result.data));
      }
    }, err => {
      console.log(err);
    });
  }
}
