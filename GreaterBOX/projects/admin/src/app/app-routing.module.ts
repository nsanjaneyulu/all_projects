import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OrdersComponent } from "./orders/orders.component";
import { ConfigurationComponent } from "./configuration/configuration.component";
import { ProductsComponent } from "./products/products.component";
import { LoginComponent } from "./login/login.component";
import { PickupLocationComponent } from "./pickup-location/pickup-location.component";
import { InventoryComponent } from "./inventory/inventory.component";
import { AddproductComponent } from "./addproduct/addproduct.component";
import { AddlocationComponent } from "./addlocation/addlocation.component";
import { AuthGuardServiceService as AuthGuard } from "./auth-guard-service.service";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "orders",
    component: OrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "products",
    component: ProductsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "addproducts",
    component: AddproductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "inventory",
    component: InventoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "pickup-location",
    component: PickupLocationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "addlocation",
    component: AddlocationComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: "configurations",
  //   component: ConfigurationComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: "**",
    redirectTo: "/login",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
