import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ReSetPasswordComponent } from './auth/re-set-password/re-set-password.component';
import { RightContentComponent } from './auth/right-content/right-content.component';
import { ActivityComponent } from './dashboard/activity/activity.component';
import { ApplicantsComponent } from './dashboard/applicants/applicants.component';
import { JobsComponent } from './dashboard/jobs/jobs.component';
import { InterviewsComponent } from './dashboard/interviews/interviews.component';
import { ViewprofileComponent } from './dashboard/viewprofile/viewprofile.component';
import { MyprofileComponent } from './dashboard/myprofile/myprofile.component';
import { CompanyprofileComponent } from './dashboard/companyprofile/companyprofile.component';
import { ApplicantintrestedComponent } from './dashboard/applicantintrested/applicantintrested.component';
import { ScheduledinterviewComponent } from './dashboard/scheduledinterview/scheduledinterview.component';
import { HirerejectprofileComponent } from './dashboard/hirerejectprofile/hirerejectprofile.component';
import { EmailverificationComponent } from './auth/emailverification/emailverification.component';
import { SignupcompanyComponent } from './auth/signupcompany/signupcompany.component';
import { WelcomeComponent } from './dashboard/welcome/welcome.component';
import { EditpostComponent } from './dashboard/editpost/editpost.component';
import { PostjobComponent } from './dashboard/postjob/postjob.component';
import { SavedstatusComponent } from './dashboard/savedstatus/savedstatus.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'resetpwd',
    component: ReSetPasswordComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'right-content',
    component: RightContentComponent
  },
  {
    path: 'applicant',
    component: ApplicantsComponent,
    data: {
      breadcrumb: 'applicant'
  },
  },
  {
    path: 'activity',
    component: ActivityComponent
  },
  {
    path: 'jobs',
    component: JobsComponent
  },
  {
    path: 'interviews',
    component: InterviewsComponent
  },
  {
    path: 'viewProfile',
    component: ViewprofileComponent
  },
  {
    path: 'myProfile',
    component: MyprofileComponent
  },
  {
    path: 'companyProfile',
    component: CompanyprofileComponent
  },
  {
    path: 'applicantsInterestedProfile',
    component: ApplicantintrestedComponent
  },
  {
    path: 'matched',
    component: ScheduledinterviewComponent
  },
  {
    path: 'savedstatus',
    component: SavedstatusComponent
  },
  {
    path: 'hirerejectprofile',
    component: HirerejectprofileComponent
  },
  {
    path: 'verifyemail',
    component: EmailverificationComponent
  },
  {
    path: 'company/:userId',
    component: SignupcompanyComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'editpost',
    component: EditpostComponent
  },
  {
    path: 'postjob',
    component: PostjobComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
