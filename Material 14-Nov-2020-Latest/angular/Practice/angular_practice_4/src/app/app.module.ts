import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { DetailComponent } from './users/detail/detail.component';


import { routes } from './app.route';
import { UserService } from './services/user.service';
import { AppConstant } from './app.constant';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [UserService, AppConstant],
  bootstrap: [AppComponent]
})
export class AppModule { }
