import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  favoriteSeason = new FormControl('Spring');
  favoriteSeason2 = new FormControl('Winter');
  arrayThree(n: number, startFrom: number): number[] {
    return [...Array(n).keys()].map(i => i + startFrom);
  }
  orderModeType = [
    { name: 'All', value: '9', id: '9', checked: true },
    { name: 'POS', value: '10', id: '10', checked: true },
    { name: 'Online', value: '11', id: '11', checked: true }
  ];
  constructor() { }

  ngOnInit(): void {
  }
 
  seasons = [
    'Winter',
    'Spring',
    'Summer',
    'Autumn',
  ];
  filterDetails(event) {
    console.log("Event:::::::::", event)
  }
}
