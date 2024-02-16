import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SampleFormPage } from './sample-form';

@NgModule({
  declarations: [
    SampleFormPage,
  ],
  imports: [
    IonicPageModule.forChild(SampleFormPage),
  ],
})
export class SampleFormPageModule {}
