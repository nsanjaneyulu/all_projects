import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { LiveOrdersComponent } from './components/live-orders/live-orders.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginService } from './services/login.service';
import { DashboardService } from './services/dashboard.service';
import { LiveOrderService } from './services/liveOrder.service';
import { InventoryService } from './services/inventory.service';
import { ToastrModule } from 'ng6-toastr-notifications';
import { TooltipModule} from 'ng2-tooltip-directive';
import { GlobalLoaderComponent } from './components/global-loader/global-loader.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatGridListModule, MatCardModule, MatProgressSpinnerModule, MatMenuModule, MatIconModule, MatToolbarModule, MatDividerModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSortModule, MatTableModule, MatPaginatorModule, MatDialogModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldControl, MAT_DATE_LOCALE, MatSlideToggleModule, MatListModule, MatExpansionModule, MatSidenavModule } from '@angular/material';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { ViewOrderDetailsComponent } from './components/view-order-details/view-order-details.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { DataTablesModule } from 'angular-datatables';
import { DiscountDetailsComponent } from './components/discount-details/discount-details.component';
import { AddDiscountsComponent } from './components/add-discounts/add-discounts.component';
import { AssignDiscountComponent } from './components/assign-discount/assign-discount.component';
import { AssignedDiscountDetailsComponent } from './components/assigned-discount-details/assigned-discount-details.component';
import { DiscountsComponent } from './sharedComponents/discounts/discounts.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    MenuBarComponent,
    LiveOrdersComponent,
    ForgotPasswordComponent,
    GlobalLoaderComponent,
    ViewOrderDetailsComponent,
    InventoryComponent,
    ItemDetailsComponent,
    DiscountDetailsComponent,
    AddDiscountsComponent,
    AssignDiscountComponent,
    AssignedDiscountDetailsComponent,
    DiscountsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    TooltipModule,
    MatCardModule, 
    MatProgressSpinnerModule, 
    MatMenuModule, 
    MatIconModule, 
    MatToolbarModule, 
    MatDividerModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatSortModule, 
    MatTableModule, 
    MatPaginatorModule, 
    MatDialogModule, 
    MatRadioModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatSlideToggleModule, 
    MatListModule, 
    MatExpansionModule, 
    MatSidenavModule,
    MatGridListModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    DataTablesModule,
    AmazingTimePickerModule
  ],
  providers: [
    LoginService,
    DashboardService,
    LiveOrderService,
    InventoryService,
    HttpClient
  ],
  bootstrap: [AppComponent],
  entryComponents:[ViewOrderDetailsComponent, ItemDetailsComponent,AddDiscountsComponent,AssignDiscountComponent]
})
export class AppModule { }
