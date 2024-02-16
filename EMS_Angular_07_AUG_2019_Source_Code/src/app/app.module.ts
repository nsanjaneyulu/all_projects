import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmsAddComponent } from './ems-add/ems-add.component';
import { EmsListComponent } from './ems-list/ems-list.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LeftnavComponent } from './leftnav/leftnav.component';
import { ReactiveFormsModule  } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { emsService } from '../services/emsService';
import { emsLeaveRequestService } from '../services/leaveService';
import { emsAttendanceService } from '../services/attendance';
import { EmsInfoComponent } from './ems-info/ems-info.component';
import { EmsUpdateComponent } from './ems-update/ems-update.component';
import {NgxMaskModule} from 'ngx-mask';
import { DataTablesModule } from 'angular-datatables';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { Ng5SliderModule } from 'ng5-slider';
import {NgbModule, NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { LeaveStatusComponent } from './leave-status/leave-status.component';
import { LeaveHistoryComponent } from './leave-history/leave-history.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { LeaveListComponent } from './leave-list/leave-list.component';
import { LeaveInfoComponent } from './leave-info/leave-info.component';
import { LeaveUpdateComponent } from './leave-update/leave-update.component';
import { AttendanceFileImportComponent } from './attendance-file-import/attendance-file-import.component';
import {DatePipe} from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    EmsAddComponent,
    EmsListComponent,
    HeaderComponent,
    FooterComponent,
    LeftnavComponent,
    EmsInfoComponent,
    EmsUpdateComponent,
    DashboardComponent,
    LeaveRequestComponent,
    LeaveStatusComponent,
    LeaveHistoryComponent,
    AttendanceComponent,
    AttendanceListComponent,
    LeaveListComponent,
    LeaveInfoComponent,
    LeaveUpdateComponent,
    AttendanceFileImportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    NgbPaginationModule, NgbAlertModule,
    UiSwitchModule,
    Ng5SliderModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    emsService,
    emsLeaveRequestService,
    emsAttendanceService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
