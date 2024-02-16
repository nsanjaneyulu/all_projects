import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CustomerService }  from './services/customer.service'; 
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptor } from './comon/interceptors'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    CustomerService,
    { 
      provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }