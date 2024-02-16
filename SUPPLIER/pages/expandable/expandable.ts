import { Component, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ExpandablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expandable',
  templateUrl: 'expandable.html',
})
export class ExpandablePage {
  @ViewChild('expandWrapper', {read: ElementRef}) expandWrapper;
    @Input('expanded') expanded;
    @Input('expandHeight') expandHeight;
  constructor(public navCtrl: NavController, public navParams: NavParams,public renderer: Renderer) {
  }

  ngAfterViewInit(){
    this.renderer.setElementStyle(this.expandWrapper.nativeElement, 'height', this.expandHeight + 'px');    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpandablePage');
  }

  goOrderDetails(event, getAllCompletedFullOrdersResp) {
    console.log('sd,sadjfgsdfhjsfdgjhsfd')
  }

}
