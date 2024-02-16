import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';

import { OrderItemService } from '../order-item.service';
import { UniqueFilterPipe } from '../unique-filter.pipe';

@Component({
  selector: 'tafelposapp-online-orders',
  templateUrl: './online-orders.component.html',
  styleUrls: ['./online-orders.component.scss']
})
export class OnlineOrdersComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router, private orderItemService: OrderItemService, private uniqueFilterPipe: UniqueFilterPipe) {
    this.navLinks = [
      {
        label: 'Pending Orders',
        link: './pending-orders',
        index: 0
      }, {
        label: 'Accepted Orders',
        link: './accepted-orders',
        index: 1
      }, {
        label: 'Ready Orders',
        link: './ready-orders',
        index: 2
      }, {
        label: 'Handed Orders',
        link: './handed-orders',
        index: 3
      }
    ];
  }

  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}
