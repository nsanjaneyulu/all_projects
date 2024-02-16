import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import {MatTabsModule} from '@angular/material/tabs';

import { OnlineOrdersModule } from './online-orders/online-orders.module';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DataGridModule } from 'primeng/datagrid';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryItemsComponent } from './category-items/category-items.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { MenuSearchComponent } from './menu-search/menu-search.component';
import { MenuFilterPipe } from './menu-filter.pipe';
import { UniqueFilterPipe } from './unique-filter.pipe';
import { PosOrdersComponent } from './pos-orders/pos-orders.component';
import { OnlineOrdersComponent } from './online-orders/online-orders.component';
import { BillingDetailsDialog } from './billing-details-dialog';

import { PerfectScrollbarModule, PerfectScrollbarConfigInterface,PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { InventoryComponent } from './inventory/inventory.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { MatGridListModule, MatCardModule, MatProgressSpinnerModule, MatMenuModule, MatIconModule, MatToolbarModule, MatDividerModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSortModule, MatTableModule, MatPaginatorModule, MatDialogModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldControl, MAT_DATE_LOCALE, MatSlideToggleModule, MatListModule, MatExpansionModule, MatSidenavModule } from '@angular/material';
import { ToastrModule } from 'ng6-toastr-notifications';
import { ReportsComponent } from './reports/reports.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = { };

// @dynamic
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoriesComponent,
    CategoryItemsComponent,
    OrderItemComponent,
    LoginComponent,
    MenuSearchComponent,
    MenuFilterPipe,
    UniqueFilterPipe,
    PosOrdersComponent,
    OnlineOrdersComponent,
    BillingDetailsDialog,
    OnlineOrdersComponent,
    InventoryComponent,
    ItemDetailsComponent,
    ReportsComponent
  ],
  imports: [
    OnlineOrdersModule,
    PerfectScrollbarModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    DropdownModule,
    DataGridModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ToastrModule.forRoot(),
    MatTabsModule,
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
  ],
  providers: [{
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }, UniqueFilterPipe],
  bootstrap: [AppComponent],
  entryComponents: [BillingDetailsDialog]
})
export class AppModule { }
