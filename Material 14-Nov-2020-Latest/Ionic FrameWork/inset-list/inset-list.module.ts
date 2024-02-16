import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsetListPage } from './inset-list';

@NgModule({
  declarations: [
    InsetListPage,
  ],
  imports: [
    IonicPageModule.forChild(InsetListPage),
  ],
})
export class InsetListPageModule {}
