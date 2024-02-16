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
    let url=""
    if(localStorage.getItem('allpermited')=='Yes'){
      url= "/mall/" + localStorage.getItem('mallId') + "/outlet/" + "all" + "/getAllReceivedFullOrders"
     }else{
       url= "/mall/" + localStorage.getItem('mallId') + "/outlet/" + localStorage.getItem('outletIds') + "/getAllReceivedOrders"
     }
     console.log(localStorage.getItem('allpermited'))
    if(localStorage.getItem('allpermited')!=null ){ 
      this.checkOnlineOfflineStatus = interval(6000)
      .pipe(
      startWith(0),
      switchMap(() => this.orderItemService.getAllReceivedFullOrders(url))
      )
      .subscribe(res => {
        if (!res) {
          this.isOnline = false;
          this.onlineOfflineService.setOnlineStatus(false);
          this.messageService.setMessage("No internet connected");
        } else {
          this.isOnline = true;
          this.onlineOfflineService.setOnlineStatus(true);
          this.messageService.setMessage("Internet connected");
        }
      });
    }
  }

  ngOnDestroy() {
    this.checkOnlineOfflineStatus.unsubscribe();
  }
  inspect(e) {
    document.addEventListener("contextmenu", function(e){
      e.preventDefault();
    }, false);
    document.addEventListener("keydown", function(e) {
    //document.onkeydown = function(e) {
      // "I" key
      if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
        disabledEvent(e);
      }
      // "J" key
      if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
        disabledEvent(e);
      }
      // "S" key + macOS
      if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        disabledEvent(e);
      }
      // "U" key
      if (e.ctrlKey && e.keyCode == 85) {
        disabledEvent(e);
      }
    }, false);
    function disabledEvent(e){
      if (e.stopPropagation){
        e.stopPropagation();
      } else if (window.event){
        window.event.cancelBubble = true;
      }
      e.preventDefault();
      return false;
    }
  };
}
