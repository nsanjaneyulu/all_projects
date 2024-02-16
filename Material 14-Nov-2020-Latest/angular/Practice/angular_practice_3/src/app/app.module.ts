import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddtestComponent } from './addtest/addtest.component';
import { ListtestComponent } from './listtest/listtest.component';
import { AddtestService } from 'src/app/services/addtest';
import { LoginDetailsComponent } from './login-details/login-details.component';
import { SignupDetailsComponent } from './signup-details/signup-details.component';
import { PersonaddComponent } from './personadd/personadd.component';
import { PersonlistComponent } from './personlist/personlist.component';
import { ContactaddComponent } from './contactadd/contactadd.component';
import { ContactlistComponent } from './contactlist/contactlist.component';
import { MoretableaddComponent } from './moretableadd/moretableadd.component';
import { MoretablelistComponent } from './moretablelist/moretablelist.component';


const routes: Routes = [
  
  
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginDetailsComponent },
  { path: 'signup', component: SignupDetailsComponent },
  { path: 'addtest', component: AddtestComponent },
  { path: 'listtest', component: ListtestComponent },
  { path: 'personadd', component: PersonaddComponent },
  { path: 'personlist', component: PersonlistComponent },
  { path: 'contactadd', component: ContactaddComponent },
  { path: 'contactlist', component: ContactlistComponent },
  { path: 'moretableadd', component: MoretableaddComponent },
  { path: 'moretablelist', component: MoretablelistComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AddtestComponent,
    ListtestComponent,
    LoginDetailsComponent,
    SignupDetailsComponent,
    PersonaddComponent,
    PersonlistComponent,
    ContactaddComponent,
    ContactlistComponent,
    MoretableaddComponent,
    MoretablelistComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AddtestService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
