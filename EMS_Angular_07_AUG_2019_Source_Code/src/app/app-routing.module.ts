import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmsAddComponent } from './ems-add/ems-add.component';
import { EmsListComponent } from './ems-list/ems-list.component';
import { EmsInfoComponent } from './ems-info/ems-info.component';
import { EmsUpdateComponent } from './ems-update/ems-update.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { LeaveStatusComponent } from './leave-status/leave-status.component';
import { LeaveHistoryComponent } from './leave-history/leave-history.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { LeaveListComponent } from './leave-list/leave-list.component';
import { LeaveInfoComponent } from './leave-info/leave-info.component';
import { LeaveUpdateComponent } from './leave-update/leave-update.component';
import { AttendanceFileImportComponent } from './attendance-file-import/attendance-file-import.component';
const routes: Routes = [
  { path: '', component: EmsAddComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'empAdd', component: EmsAddComponent },
  { path: 'empList', component: EmsListComponent },
  { path: 'empInfo', component: EmsInfoComponent },
  { path: 'empUpdate', component: EmsUpdateComponent },
  { path: 'leaveRequest', component: LeaveRequestComponent },
  { path: 'leaveStatus', component: LeaveStatusComponent }, 
  { path: 'leaveHistory', component: LeaveHistoryComponent },
  { path: 'addAttendance', component: AttendanceComponent },
  { path: 'listAttendance', component: AttendanceListComponent },
  { path: 'leaveList', component: LeaveListComponent },
  { path: 'emsLeaveInfo', component: LeaveInfoComponent }, 
  { path: 'emsLeaveUpdate', component: LeaveUpdateComponent },
  { path: 'attendanceFileImport', component: AttendanceFileImportComponent }    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
