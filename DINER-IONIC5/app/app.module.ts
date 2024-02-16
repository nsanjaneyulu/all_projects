
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { ThemeableBrowser } from '@ionic-native/themeable-browser/ngx';
import { NgxContentLoadingModule } from 'ngx-content-loading';
import { LoginModalPage } from './pages/login-modal/login-modal.page';
import { WebIntent } from '@ionic-native/web-intent/ngx';

@NgModule({
  declarations: [AppComponent,LoginModalPage],
  entryComponents: [LoginModalPage],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    NgxContentLoadingModule
    ],
  providers: [
    StatusBar,
    WebIntent,
    ThemeableBrowser,
    AppAvailability,
    SplashScreen,
    Geolocation,
    LocationAccuracy,
    UniqueDeviceID,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
