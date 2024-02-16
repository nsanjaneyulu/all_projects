import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostOrdersPage } from './post-orders';

@NgModule({
  declarations: [
    PostOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(PostOrdersPage),
  ],
})
export class PostOrdersPageModule {}
