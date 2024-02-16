import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PostOrderSummaryPage } from './post-order-summary.page';

const routes: Routes = [
  {
    path: '',
    component: PostOrderSummaryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PostOrderSummaryPage]
})
export class PostOrderSummaryPageModule {}
