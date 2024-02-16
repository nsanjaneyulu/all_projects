import { Component, OnInit } from '@angular/core';
import { FiltersService } from '../../Services/filters'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  getFiltersResp: any;
  

  constructor(public filtersService : FiltersService) {
    this.getFilters();
    let numVal = 2
    if (numVal < 30) {
      console.log(numVal + 1);
    }
   }

  ngOnInit(): void {
  }
  getFilters() 
  {
    this.filtersService.getFiltersDetails().subscribe(data => {
        console.log("Data::::::::::", data);
        this.getFiltersResp = data;
    });
  }
}
