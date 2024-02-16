import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BadgeTabPage } from './badge-tab';

@NgModule({
  declarations: [
    BadgeTabPage,
  ],
  imports: [
    IonicPageModule.forChild(BadgeTabPage),
  ],
})
export class BadgeTabPageModule {}
