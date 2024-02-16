import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { OrdersPage } from '../orders/orders';
import { StockPage } from '../stock/stock';
import { PostOrdersPage } from '../post-orders/post-orders';
import { ReportsPage } from '../reports/reports';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = OrdersPage;
  tab2Root = StockPage;
  tab3Root = ReportsPage;
  tab4Root = PostOrdersPage;
  inventoryValue=0;

  constructor() {

  }

  inventorytab(){
    if(this.inventoryValue==1){
      this.inventoryValue=1
    }else{
      this.inventoryValue=0;
    }
  }

  
}
