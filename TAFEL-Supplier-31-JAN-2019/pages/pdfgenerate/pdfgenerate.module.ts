import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PdfgeneratePage } from './pdfgenerate';

@NgModule({
  declarations: [
    PdfgeneratePage,
  ],
  imports: [
    IonicPageModule.forChild(PdfgeneratePage),
  ],
})
export class PdfgeneratePageModule {}
