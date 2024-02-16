import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrintComponent } from './print/print.component';


const routes: Routes = [
  { path: 'print', component: PrintComponent},
  { path: '',
    redirectTo: '/print',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
