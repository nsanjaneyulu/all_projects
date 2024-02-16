import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { AuthComponent } from './auth/auth.component'
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component'
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { RequestTableComponent } from './dashboard/request/request-table/request-table.component';
import { RequestFormComponent } from './dashboard/request/request.form/request.form.component';
import { RequestPreformattedComponent } from './dashboard/request/request-preformatted/request-preformatted.component';
import { RequestViewComponent } from './dashboard/request/request-view/request-view.component';
import { UsersComponent } from './dashboard/users/users.component';
import { UserFormComponent } from './dashboard/users/user-form/user-form.component';
import { CmsComponent } from './dashboard/cms/cms.component';
import { PermissionsComponent } from './dashboard/permissions/permissions.component';
import { UserProfileComponent } from './dashboard/users/user-profile/user-profile.component';
import { EditProfileComponent } from './dashboard/users/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './dashboard/users/change-password/change-password.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'restpassword/:randomString', component: ResetPasswordComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: localStorage.getItem('userData') ? [] : null,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'request',
        children: [
          {
            path: 'list',
            component: RequestTableComponent
          },
          {
            path: 'view/:id',
            component: RequestViewComponent
          },
          {
            path: 'new',
            component: RequestFormComponent
          },
          {
            path: 'edit/:id',
            component: RequestFormComponent
          },
          {
            path: 'preformated/:letterType',
            component: RequestPreformattedComponent
          },
          {
            path: 'preformated/:id',
            component: RequestPreformattedComponent
          }
        ]
      },
      {
        path: 'cms',
        component: CmsComponent
      },
      {
        path: 'permissions',
        component: PermissionsComponent
      },
      {
        path: 'user',
        children: [
          {
            path: 'list',
            component: UsersComponent
          },
          {
            path: 'view/:id',
            component: UserProfileComponent
          },
          {
            path: 'new',
            component: UserFormComponent
          },
          {
            path: 'edit/:userId',
            component: EditProfileComponent
          },
          {
            path: 'changePassword/:userId',
            component: ChangePasswordComponent
          }
        ]
      }
    ],
  },
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }





