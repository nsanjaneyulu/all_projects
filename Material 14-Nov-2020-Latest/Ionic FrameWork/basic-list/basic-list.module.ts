import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BasicListPage } from './basic-list';

@NgModule({
  declarations: [
    BasicListPage,
  ],
  imports: [
    IonicPageModule.forChild(BasicListPage),
  ],
})
export class BasicListPageModule {}
