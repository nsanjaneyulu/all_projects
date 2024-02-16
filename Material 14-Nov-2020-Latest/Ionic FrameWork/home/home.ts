import { Component } from '@angular/core';
import { TooltipsModule } from 'ionic-tooltips';
import { NavController } from 'ionic-angular';
import { EventsPage } from '../events/events';
import { AlertsPage } from '../alerts/alerts';
import { ListPage } from '../list/list';
import { SegmentPage } from '../segment/segment';
import { TabsPage } from '../tabs/tabs';
import { GridJsonPage } from '../grid-json/grid-json';
import { ModalPage } from '../modal/modal';
import { SampleFormPage } from '../sample-form/sample-form';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  goToEventsPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(EventsPage);
  }
  goToListPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(ListPage);
  }
  goToAlertsPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(AlertsPage);
  }
  goToSegmentPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    console.log(this.navCtrl);
    this.navCtrl.push(SegmentPage, {});
  }
  goToTabsPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(TabsPage);
  }
  goToGridPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(GridJsonPage);
  }
  goToModalPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(ModalPage);
  }
  goToSampleFormPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(SampleFormPage);
  }
  

}
