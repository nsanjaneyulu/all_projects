import { Component, OnInit } from '@angular/core';
import { PrimalRetailRoute } from './primal-retail-route';

@Component({
  selector: 'app-primal-retail',
  templateUrl: './primal-retail.component.html',
  styleUrls: ['./primal-retail.component.scss']
})
export class PrimalRetailComponent implements OnInit {
  public primalRetailRouteGet = PrimalRetailRoute;
  constructor() { }

  ngOnInit(): void {
  }

}
