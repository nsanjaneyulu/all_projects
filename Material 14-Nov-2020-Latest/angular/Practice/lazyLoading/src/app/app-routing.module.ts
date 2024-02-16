import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
const routes: Routes = [
  {
    path: 'customer',
    loadChildren: () => import('./components/customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./components/orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: 'primalRetail',
    loadChildren: () => import('./components/primal-retail/primal-retail.module').then(m => m.PrimalRetailModule)
  },
  {
    path: '',
    redirectTo: 'customer',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
