import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { TooltipsModule } from 'ionic-tooltips';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { EventsPage } from '../pages/events/events';
import { HelloPage } from '../pages/hello/hello';
import { AlertsPage } from '../pages/alerts/alerts';
import { BasicListPage } from '../pages/basic-list/basic-list';
import { AvatarListPage } from '../pages/avatar-list/avatar-list';
import { IconListPage } from '../pages/icon-list/icon-list';
import { InsetListPage } from '../pages/inset-list/inset-list';
import { ListDividersPage } from '../pages/list-dividers/list-dividers';
import { ListHeadersPage } from '../pages/list-headers/list-headers';
import { MultiLineListPage } from '../pages/multi-line-list/multi-line-list';
import { SlidingListPage } from '../pages/sliding-list/sliding-list';
import { SegmentPage } from '../pages/segment/segment';
import { TabsPage } from '../pages/tabs/tabs';
import { TextTabPage } from '../pages/text-tab/text-tab';
import { IconTabPage } from '../pages/icon-tab/icon-tab';
import { TextIconTabPage } from '../pages/text-icon-tab/text-icon-tab';
import { BadgeTabPage } from '../pages/badge-tab/badge-tab';
import { GridJsonPage } from '../pages/grid-json/grid-json';
import { ModalPage } from '../pages/modal/modal';
import { ModalContentPage } from '../pages/modal-content/modal-content';
import { SampleFormPage } from '../pages/sample-form/sample-form';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    EventsPage,
    HelloPage,
    AlertsPage,
    BasicListPage,
    AvatarListPage, 
    IconListPage,
    InsetListPage,
    ListDividersPage,
    ListHeadersPage,
    MultiLineListPage,
    SlidingListPage,
    SegmentPage,
    TabsPage,
    TextTabPage,
    IconTabPage,
    TextIconTabPage,
    BadgeTabPage,
    GridJsonPage,
    ModalPage,
    ModalContentPage,
    SampleFormPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    EventsPage,
    HelloPage,
    AlertsPage,
    BasicListPage,
    AvatarListPage, 
    IconListPage,
    InsetListPage,
    ListDividersPage,
    ListHeadersPage,
    MultiLineListPage,
    SlidingListPage,
    SegmentPage,
    TabsPage,
    TextTabPage,
    IconTabPage,
    TextIconTabPage,
    BadgeTabPage,
    GridJsonPage,
    ModalPage,
    ModalContentPage,
    SampleFormPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
