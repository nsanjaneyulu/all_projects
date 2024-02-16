import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';

import { OrderItemService } from '../order-item.service';
import { UniqueFilterPipe } from '../unique-filter.pipe';
import { MessageService } from '../message.service';
@Component({
  selector: 'tafelposapp-online-orders',
  templateUrl: './online-orders.component.html',
  styleUrls: ['./online-orders.component.scss']
})
export class OnlineOrdersComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;
  message: string;
  allpermited="";
  outletDetails:any=[];
  outeltId="";
  mallName=""
  constructor(private messageService: MessageService,private router: Router, private orderItemService: OrderItemService, private uniqueFilterPipe: UniqueFilterPipe) {
    this.navLinks = [
      {
        label: 'Pending Orders',
        link: './pending-orders',
        index: 0
      }, {
        label: 'Completed Orders',
        link: './handed-orders',
        index: 1
      }, 
      {
        label: 'Rejected Orders',
        link: './ready-orders',
        index: 2
      }
      // {
      //   label: 'Handed Orders',
      //   link: './handed-orders',
      //   index: 3
      // }
      // {
      //   label: 'Completed',
      //   link: './handed-orders',
      //   index: 4
      // }, {
      //   label: 'Rejected',
      //   link: './handed-orders',
      //   index: 5
      // }
    ];
    this.allpermited = localStorage.getItem('allpermited')
    this.outletDetails = JSON.parse(localStorage.getItem('outletDetails'))
    console.log("outletDetails",this.outletDetails)
    this.outeltId= this.outletDetails[0].id
    this.mallName = localStorage.getItem('mallName')
  }
  selectoutLet(outletId){ 
    this.outeltId=outletId;
    
  }
  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
    this.getMessage();
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
}
