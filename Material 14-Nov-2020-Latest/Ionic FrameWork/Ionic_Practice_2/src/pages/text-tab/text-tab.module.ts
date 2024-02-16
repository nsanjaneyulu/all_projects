import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextTabPage } from './text-tab';

@NgModule({
  declarations: [
    TextTabPage,
  ],
  imports: [
    IonicPageModule.forChild(TextTabPage),
  ],
})
export class TextTabPageModule {}
