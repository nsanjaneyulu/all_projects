import { NgModule } from "@angular/core";
import { Routes, RouterModule, ExtraOptions } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { OrdersStatusComponent } from "./orders-status/orders-status.component";
import { CanActivateCheckout } from "./canActivateCheckout";
import { CanActivateOrderStatus } from "./canActivateOrderStatus";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "checkout",
    component: CheckoutComponent,
    canActivate: [CanActivateCheckout]
  },
  {
    path: "order-status",
    component: OrdersStatusComponent,
    canActivate: [CanActivateOrderStatus]
  },
  {
    path: "**",
    redirectTo: "/home"
  }
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: "enabled",
  anchorScrolling: "enabled",
  scrollOffset: [0, 64]
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
