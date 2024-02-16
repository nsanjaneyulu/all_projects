import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { PosOrdersComponent } from './pos-orders/pos-orders.component';
import { OnlineOrdersComponent } from './online-orders/online-orders.component';
import { AuthService } from './auth.service';
import { InventoryComponent } from './inventory/inventory.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'sale', component: CategoriesComponent, canActivate: [AuthService] },
  { path: 'login', component: LoginComponent },
  { path: 'posorders', component: PosOrdersComponent, canActivate: [AuthService] },
  { path: 'online-orders', component: OnlineOrdersComponent, canActivate: [AuthService] },
  { path: 'inventory', component: InventoryComponent, canActivate: [AuthService] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
