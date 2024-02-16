import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { LoginComponent } from './components/login/login.component';
import { RunnerComponent } from './components/runner/runner.component';
import { AddRunnerComponent } from './components/add-runner/add-runner.component';
import { ReportsComponent } from './components/reports/reports.component';
import { LearnComponent } from './components/learn/learn.component';
import { ChildComponent } from './components/child/child.component';
import { ParentComponent } from './components/parent/parent.component';
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'delivery', component: DeliveryComponent},
  { path: 'graphs', component: GraphsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'runner', component: RunnerComponent},
  { path: 'addRunner', component: AddRunnerComponent},
  { path: 'reports', component: ReportsComponent},
  { path: 'learn', component: LearnComponent},
  { path: 'child', component: ChildComponent},
  { path: 'parent', component: ParentComponent},
  { path: '',  redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
