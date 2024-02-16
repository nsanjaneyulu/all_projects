import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnlineOrdersComponent } from './online-orders.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { AcceptedOrdersComponent } from './accepted-orders/accepted-orders.component';
import { ReadyOrdersComponent } from './ready-orders/ready-orders.component';
import { HandedOrdersComponent } from './handed-orders/handed-orders.component';

const routes: Routes = [
    {
        path: 'online-orders',
        component: OnlineOrdersComponent,
        children: [
            { path: '', redirectTo: '/online-orders/pending-orders', pathMatch: 'full' },
            {
                path: 'pending-orders',
                component: PendingOrdersComponent
            },
            {
                path: 'accepted-orders',
                component: AcceptedOrdersComponent
            },
            {
                path: 'ready-orders',
                component: ReadyOrdersComponent
            },
            {
                path: 'handed-orders',
                component: HandedOrdersComponent
            }
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineOrdersRoutingModule { }