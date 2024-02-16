// dashboard
import { DashboardComponent } from './dashboard.component';
import { AsideMenuComponent } from './includes/aside.menu/aside.menu.component';
import { NotificationsComponent } from './includes/notifications/notifications.component';
import { HomeComponent } from './home/home.component';
import { RequestModuleDeclarations } from './request/request.module';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { CmsComponent } from './cms/cms.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { EditProfileComponent } from './users/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';

export const DashboardModuleDeclarations = [
    DashboardComponent,
    [...RequestModuleDeclarations],
    AsideMenuComponent,
    NotificationsComponent,
    HomeComponent,
    UsersComponent,
    UserFormComponent,
    CmsComponent,
    PermissionsComponent,
    UserProfileComponent,
    EditProfileComponent,
    ChangePasswordComponent
];
