import {
	NgModule, ErrorHandler
}from '@angular/core';


import {
	BrowserModule
}
from '@angular/platform-browser';
import {
	IonicApp, IonicModule, IonicErrorHandler
}
from 'ionic-angular';
import {
	MyApp
}
from './app.component';
import {
	AboutPage
}
from '../pages/about/about';
import {
	ContactPage
}
from '../pages/contact/contact';
import {
	HomePage
}
from '../pages/home/home';
import {
	StockPage
}
from '../pages/stock/stock';
import {
	TabsPage
}
from '../pages/tabs/tabs';
import {
	StatusBar
}
from '@ionic-native/status-bar';
import {
	SplashScreen
}
from '@ionic-native/splash-screen';
import {
	HttpClient, HttpClientModule
}
from '@angular/common/http';
import {
	InternationalPhoneModule
}
from 'ng4-intl-phone';
import {
	LoginPage
}
from '../pages/login/login';
import {
	UserDataProvider
}
from '../provider/login/login';
import {
	OrdersProvider
}
from '../provider/orders/orders';
import {
	BackbuttonService
}
from '../provider/backbutton/backbutton.service';
import {
	StockmanagerProvider
}
from '../provider/stockmanager/stockmanager';
import {
	VerifyCodePage
}
from '../pages/verify-code/verify-code';
import {
	PostOrdersPage
}
from '../pages/post-orders/post-orders';
import {
	ItemDetailsPage
}
from '../pages/item-details/item-details';
import {
	SubMenuDetailsPage
}
from '../pages/sub-menu-details/sub-menu-details';
import { ReportsPage } from '../pages/reports/reports';
import {
	RejectorderPage
}
from '../pages/rejectorder/rejectorder';
import {
	UtilityProvider
}
from '../provider/utility/utility';
import {
	ReportsmanagerProvider
}
from '../provider/reports/reports';
import {
	UniqueDeviceID
}
from '@ionic-native/unique-device-id';
import {
	IonicStorageModule
}
from '@ionic/storage';
import {
	CallNumber
}
from '@ionic-native/call-number';
import {
	BrMaskerModule
}
from 'brmasker-ionic-3';
import { LottieAnimationViewModule } from 'ng-lottie';
import { httpInterceptorProviders } from '../provider/header-interceptor/header-interceptor';
import { ProfileProvider } from '../provider/profile/profile';
import { SupplierProfilePage } from '../pages/supplier-profile/supplier-profile';
import { PdfgeneratePage } from '../pages/pdfgenerate/pdfgenerate';
import { Push } from '@ionic-native/push';
import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';
import {
	OrderDetailsPage
}
from '../pages/order-details/order-details';
import {
	AddItemPage
}
from '../pages/add-item/add-item';
import {
	GloballoaderPage
}
from '../pages/globalloader/globalloader';
import {
	OrdersPage
}
from '../pages/orders/orders';
import { PdfViewerModule } from 'ng2-pdf-viewer';
@NgModule({
	declarations: [
		MyApp,
		AboutPage,
		ContactPage,
		HomePage,
		TabsPage,
		LoginPage,
		OrderDetailsPage,
		OrdersPage,
		VerifyCodePage,
		PostOrdersPage,
		ItemDetailsPage,
		GloballoaderPage,
		PdfgeneratePage,
		SubMenuDetailsPage,
		ReportsPage,
		AddItemPage,
		SupplierProfilePage,
		RejectorderPage,
		StockPage
	],
	imports: [
		BrowserModule,
		InternationalPhoneModule,
		HttpClientModule,
		BrMaskerModule,
		PdfViewerModule,
		LottieAnimationViewModule.forRoot(),
		IonicStorageModule.forRoot(),
		IonicModule.forRoot(MyApp,{
		
			// tabsHideOnSubPages: true
			
		  })
	
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		AboutPage,
		ContactPage,
		HomePage,
		TabsPage,
		LoginPage,
		OrderDetailsPage,
		GloballoaderPage,
		PdfgeneratePage,
		OrdersPage,
		PostOrdersPage,
		SubMenuDetailsPage,
		VerifyCodePage,
		AddItemPage,
		ItemDetailsPage,
		ReportsPage,
		RejectorderPage,
		StockPage,
		SupplierProfilePage
	],
	providers: [
		StatusBar,
		AppVersion,
		SplashScreen,
		UtilityProvider,
		UserDataProvider,
		HttpClient,
		OrdersProvider,
		ReportsmanagerProvider,
		UniqueDeviceID,
		CallNumber,
		Push,
		
		Device,
		BackbuttonService,
		httpInterceptorProviders,
    	ProfileProvider,
		StockmanagerProvider, {
			provide: ErrorHandler,
			useClass: IonicErrorHandler
		}
	]
})
export class AppModule {
	
}