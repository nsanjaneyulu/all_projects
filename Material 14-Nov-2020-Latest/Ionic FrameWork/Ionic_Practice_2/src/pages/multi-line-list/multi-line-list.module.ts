import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MultiLineListPage } from './multi-line-list';

@NgModule({
  declarations: [
    MultiLineListPage,
  ],
  imports: [
    IonicPageModule.forChild(MultiLineListPage),
  ],
})
export class MultiLineListPageModule {}
