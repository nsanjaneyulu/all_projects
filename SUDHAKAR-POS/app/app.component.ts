import { Component } from '@angular/core';
import { interval } from "rxjs/internal/observable/interval";
import { startWith, switchMap } from "rxjs/operators";

import { OrderItemService } from './order-item.service';
import { OnlineOfflineService } from './online-offline.service';
import { MessageService } from './message.service';


@Component({
  selector: 'tafelposapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isOnline: boolean = true;
  checkOnlineOfflineStatus: any;

  constructor(private orderItemService: OrderItemService, private readonly onlineOfflineService: OnlineOfflineService, private messageService: MessageService) { }

  ngOnInit() {
    this.checkOnlineOfflineStatus = interval(6000)
      .pipe(
      startWith(0),
      switchMap(() => this.orderItemService.getAllReceivedFullOrders())
      )
      .subscribe(res => {
        if (!res) {
          this.isOnline = false;
          this.onlineOfflineService.setOnlineStatus(false);
          this.messageService.setMessage("No internet connection");
        } else {
          this.isOnline = true;
          this.onlineOfflineService.setOnlineStatus(true);
        }
      });
  }

  ngOnDestroy() {
    this.checkOnlineOfflineStatus.unsubscribe();
  }
}
