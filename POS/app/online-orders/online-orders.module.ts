import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OnlineOrdersRoutingModule } from './online-orders.routing.module';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DataGridModule } from 'primeng/datagrid';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { AcceptedOrdersComponent } from './accepted-orders/accepted-orders.component';
import { ReadyOrdersComponent } from './ready-orders/ready-orders.component';
import { HandedOrdersComponent } from './handed-orders/handed-orders.component';
import { HandedOverOtpDialog } from './handed-over-otp-dialog';
import { NgQrScannerModule } from 'angular2-qrscanner';



@NgModule({
  declarations: [PendingOrdersComponent, AcceptedOrdersComponent, ReadyOrdersComponent, HandedOrdersComponent, HandedOverOtpDialog],
  imports: [
    CommonModule,
    OnlineOrdersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    DataGridModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgQrScannerModule
  ],
  entryComponents: [HandedOverOtpDialog]
})
export class OnlineOrdersModule { }
