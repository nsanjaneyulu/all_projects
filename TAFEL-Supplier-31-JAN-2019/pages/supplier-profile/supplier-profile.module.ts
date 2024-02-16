import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupplierProfilePage } from './supplier-profile';

@NgModule({
  declarations: [
    SupplierProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(SupplierProfilePage),
  ],
})
export class SupplierProfilePageModule {}
