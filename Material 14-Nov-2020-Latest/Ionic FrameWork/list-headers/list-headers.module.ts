import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListHeadersPage } from './list-headers';

@NgModule({
  declarations: [
    ListHeadersPage,
  ],
  imports: [
    IonicPageModule.forChild(ListHeadersPage),
  ],
})
export class ListHeadersPageModule {}
