import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ListPage } from '../list/list.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public navCtrl : NavController) {

  }
  launchSecondPage() {
    let data = {
      title : 'yummy packers'
    };
    this.navCtrl.navigateForward('ListPage/${data}');
  }
  

}
