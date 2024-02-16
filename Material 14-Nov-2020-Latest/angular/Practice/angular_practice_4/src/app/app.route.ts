import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { DetailComponent as UserDetailComponent } from './users/detail/detail.component';

export const routes: Routes = [
  {
    path: 'users', component: UsersComponent
  },

  {
    path: 'user/:username', component: UserDetailComponent
  },

  {
    path: '**',
    redirectTo: '/users'
  }
];
