import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { LeftNavComponent } from './components/left-nav/left-nav.component';
import { HeaderComponent } from './components/header/header.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { DashboardService } from './services/dashboard.service';
import { LoginComponent } from './components/login/login.component';
import { LoaderComponent } from './components/loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewOrderComponent } from './components/view-order/view-order.component';
import { RunnerComponent } from './components/runner/runner.component';
import { AddRunnerComponent } from './components/add-runner/add-runner.component';
import { ReportsComponent } from './components/reports/reports.component';
import { LearnComponent } from './components/learn/learn.component';
import { ChildComponent } from './components/child/child.component';
import { ParentComponent } from './components/parent/parent.component';
// import { FilterPipe} from './services/filterPipes';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DeliveryComponent,
    LeftNavComponent,
    HeaderComponent,
    GraphsComponent,
    LoginComponent,
    LoaderComponent,
    ViewOrderComponent,
    RunnerComponent,
    AddRunnerComponent,
    ReportsComponent,
    LearnComponent,
    ChildComponent,
    ParentComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    DashboardService
  ],
  bootstrap: [AppComponent],
  entryComponents:[ViewOrderComponent]
})
export class AppModule { }
