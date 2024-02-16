import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output('toggleMenu') toggleMenu = new EventEmitter();
  userName : any;
  constructor() { }

  ngOnInit() {
    this.userName = localStorage.getItem("NAME");
    console.log("this.userName",this.userName);
    if(window.innerWidth < 640) {
      this.onMenuIconClick();
    }
  }
  onMenuIconClick() {
    this.toggleMenu.emit();
  }
  logoutClick() {
  console.log("localStorage.getItem", localStorage.getItem('LOGIN'));
  localStorage.clear();
  }
}
