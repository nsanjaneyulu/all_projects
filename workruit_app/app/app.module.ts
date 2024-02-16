import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ReSetPasswordComponent } from './auth/re-set-password/re-set-password.component';
import { ApplicantsComponent } from './dashboard/applicants/applicants.component';
import { RightContentComponent } from './auth/right-content/right-content.component';
import { LogoComponent } from './auth/logo/logo.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { ListViewComponent } from './helper/list-view/list-view.component';
import { ActivityComponent } from './dashboard/activity/activity.component';
import { JobsComponent } from './dashboard/jobs/jobs.component';
import { InterviewsComponent } from './dashboard/interviews/interviews.component';
import { TabsComponent } from './helper/tabs/tabs.component';
import { CardViewComponent } from './helper/card-view/card-view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ViewprofileComponent } from './dashboard/viewprofile/viewprofile.component';
import { MyprofileComponent } from './dashboard/myprofile/myprofile.component';
import { CompanyprofileComponent } from './dashboard/companyprofile/companyprofile.component';
import { JobstatusComponent } from './dashboard/jobstatus/jobstatus.component';
import { ApplicantintrestedComponent } from './dashboard/applicantintrested/applicantintrested.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmailverificationComponent } from './auth/emailverification/emailverification.component';
import { ScheduledinterviewComponent } from './dashboard/scheduledinterview/scheduledinterview.component';
import { MatchedjobsComponent } from './dashboard/matchedjobs/matchedjobs.component';
import { HirerejectprofileComponent } from './dashboard/hirerejectprofile/hirerejectprofile.component';
import { SignupcompanyComponent } from './auth/signupcompany/signupcompany.component';
import { CompanyinfoComponent } from './auth/companyinfo/companyinfo.component';
import { WelcomeComponent } from './dashboard/welcome/welcome.component';
import { ToastrModule } from 'ngx-toastr';
import { InterviewdetailsComponent } from './dashboard/interviewdetails/interviewdetails.component';
import { CarddetailsComponent } from './helper/carddetails/carddetails.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { TagInputModule } from 'ngx-chips';
import { EditpostComponent } from './dashboard/editpost/editpost.component';
import { PostjobComponent } from './dashboard/postjob/postjob.component';
import { SavedstatusComponent } from './dashboard/savedstatus/savedstatus.component';
import { BreadcrumbsComponent } from './helper/breadcrumbs/breadcrumbs.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CompanyimageComponent } from './dashboard/companyimage/companyimage.component';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ReSetPasswordComponent,
    ApplicantsComponent,
    RightContentComponent,
    LogoComponent,
    HeaderComponent,
    ListViewComponent,
    ActivityComponent,
    JobsComponent,
    InterviewsComponent,
    TabsComponent,
    CardViewComponent,
    ViewprofileComponent,
    MyprofileComponent,
    CompanyprofileComponent,
    JobstatusComponent,
    ApplicantintrestedComponent,
    EmailverificationComponent,
    ScheduledinterviewComponent,
    MatchedjobsComponent,
    HirerejectprofileComponent,
    SignupcompanyComponent,
    CompanyinfoComponent,
    WelcomeComponent,
    InterviewdetailsComponent,
    CarddetailsComponent,
    EditpostComponent,
    PostjobComponent,
    SavedstatusComponent,
    BreadcrumbsComponent,
    CompanyimageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AutocompleteLibModule,
    TagInputModule,
    NgxSliderModule,
    ImageCropperModule
  ],
  providers: [
    HttpClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
