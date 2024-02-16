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

const routes: Routes = [
  { path: '', component: EmsAddComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'empAdd', component: EmsAddComponent },
  { path: 'empList', component: EmsListComponent },
  { path: 'empInfo', component: EmsInfoComponent },
  { path: 'empUpdate', component: EmsUpdateComponent },
  { path: 'leaveRequest', component: LeaveRequestComponent },
  { path: 'leaveStatus', component: LeaveStatusComponent }, 
  { path: 'leaveHistory', component: LeaveHistoryComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
