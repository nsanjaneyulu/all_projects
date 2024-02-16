import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextIconTabPage } from './text-icon-tab';

@NgModule({
  declarations: [
    TextIconTabPage,
  ],
  imports: [
    IonicPageModule.forChild(TextIconTabPage),
  ],
})
export class TextIconTabPageModule {}
