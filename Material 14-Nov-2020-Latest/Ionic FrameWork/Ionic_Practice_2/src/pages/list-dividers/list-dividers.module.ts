import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListDividersPage } from './list-dividers';

@NgModule({
  declarations: [
    ListDividersPage,
  ],
  imports: [
    IonicPageModule.forChild(ListDividersPage),
  ],
})
export class ListDividersPageModule {}
