import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { PrimalRetailRoute } from './primal-retail-route';
import { PrimalRetailComponent } from './primal-retail.component';
import { PrimalComponent } from './primal/primal.component';
import { RetailComponent } from './retail/retail.component';

const routes: Routes = [
  {
    path: '',
    component: PrimalRetailComponent,
    children: [
        {
          path: '',
          redirectTo: PrimalRetailRoute.Primal,
          pathMatch: 'full'
        },
        {
          path: PrimalRetailRoute.Primal,
          component: PrimalComponent
        },
        {
          path: PrimalRetailRoute.Retail,
          component: RetailComponent
        }    
      ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrimalRetailRoutingModule {}
