import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LiveOrdersComponent } from './components/live-orders/live-orders.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DiscountDetailsComponent } from './components/discount-details/discount-details.component';
import { AssignedDiscountDetailsComponent } from './components/assigned-discount-details/assigned-discount-details.component';
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'liveOrders', component: LiveOrdersComponent},
  { path: 'inventory', component: InventoryComponent},
  { path: 'login', component: LoginComponent},
  { path: 'forgotPassword', component: ForgotPasswordComponent},
  { path: 'addDiscount', component: DiscountDetailsComponent},
  { path: 'assignDiscount', component: AssignedDiscountDetailsComponent},
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
