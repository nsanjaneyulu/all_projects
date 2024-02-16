import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimalRetailRoutingModule } from './primal-retail-routing.module';
import { PrimalRetailComponent } from './primal-retail.component';
import { PrimalComponent } from './primal/primal.component';
import { RetailComponent } from './retail/retail.component';


@NgModule({
  declarations: [
    PrimalRetailComponent,
    PrimalComponent,
    RetailComponent
  ],
  imports: [
    CommonModule,
    PrimalRetailRoutingModule
  ],
  exports: [PrimalRetailComponent, PrimalComponent, RetailComponent]
})
export class PrimalRetailModule { }
