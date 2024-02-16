import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'splashscreen', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' },
  { path: 'loader', loadChildren: './pages/loader/loader.module#LoaderPageModule' },
  { path: 'splashscreen', loadChildren: './pages/splashscreen/splashscreen.module#SplashscreenPageModule' },
  { path: 'mallselection', loadChildren: './pages/mallselection/mallselection.module#MallselectionPageModule' },
  { path: 'items', loadChildren: './pages/items/items.module#ItemsPageModule' },
  { path: 'view-cart', loadChildren: './pages/view-cart/view-cart.module#ViewCartPageModule' },
  { path: 'payment-selection', loadChildren: './pages/payment-selection/payment-selection.module#PaymentSelectionPageModule' },
  { path: 'order-summary', loadChildren: './pages/order-summary/order-summary.module#OrderSummaryPageModule' },
  { path: 'tipspay', loadChildren: './pages/tipspay/tipspay.module#TipspayPageModule' },
  { path: 'select-city', loadChildren: './pages/select-city/select-city.module#SelectCityPageModule' },
  { path: 'cart', loadChildren: './pages/cart/cart.module#CartPageModule' },
  { path: 'screen-layout', loadChildren: './pages/screen-layout/screen-layout.module#ScreenLayoutPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'editprofile', loadChildren: './pages/editprofile/editprofile.module#EditprofilePageModule' },
  { path: 'myorders', loadChildren: './pages/myorders/myorders.module#MyordersPageModule' },
  { path: 'post-order-summary', loadChildren: './pages/post-order-summary/post-order-summary.module#PostOrderSummaryPageModule' },
  { path: 'login-modal', loadChildren: './pages/login-modal/login-modal.module#LoginModalPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
