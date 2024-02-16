import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* imports */
import { appImports } from './app.imports';

/* declarations */
import { AppComponent } from './app.component';
import { authModulesDeclarations } from './auth/auth-module';
import { DashboardModuleDeclarations } from './dashboard/dashboard.module';

/* providers */
import { AppServices } from './app.services';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

@NgModule({
  // imports: [BrowserModule, BrowserAnimationsModule, NgbModule.forRoot(),
  //   FormsModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule, ToastrModule.forRoot(), CKEditorModule,
  //   FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(), ForgotpasswordComponent],
  imports: appImports,
  exports: [RouterModule],
  declarations: [AppComponent, [...authModulesDeclarations], [...DashboardModuleDeclarations]],
  bootstrap: [AppComponent],
  providers: AppServices
})
export class AppModule { }
