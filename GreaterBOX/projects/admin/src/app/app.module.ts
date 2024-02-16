import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { PickupLocationComponent } from './pickup-location/pickup-location.component';
import { InventoryComponent } from './inventory/inventory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AddlocationComponent } from './addlocation/addlocation.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { Ng2LoadingSpinnerModule } from 'ng2-loading-spinner';
import { JwtModule } from '@auth0/angular-jwt'
import { AuthGuardServiceService } from './auth-guard-service.service';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    OrdersComponent,
    ProductsComponent,
    ConfigurationComponent,
    HeaderComponent,
    LoginComponent,
    PickupLocationComponent,
    InventoryComponent,
    AddproductComponent,
    AddlocationComponent
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    Ng2LoadingSpinnerModule.forRoot({}),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [AuthGuardServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
