import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GloballoaderPage } from './globalloader';

@NgModule({
  declarations: [
    GloballoaderPage,
  ],
  imports: [
    IonicPageModule.forChild(GloballoaderPage),
  ],
})
export class GloballoaderPageModule {}
