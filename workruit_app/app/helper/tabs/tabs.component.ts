import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TabsView } from '../tabs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  
  @Input() tabsName: Array<TabsView> = [];
  @Output() tabChange = new EventEmitter<object>();
  
  constructor() { 
    
  }

  ngOnInit(): void {
    console.log("tabsComp",this.tabsName);
  }
  tabsClick(eve: any) {
  console.log("eve",eve);
    this.tabChange.emit(eve);
  }

}
