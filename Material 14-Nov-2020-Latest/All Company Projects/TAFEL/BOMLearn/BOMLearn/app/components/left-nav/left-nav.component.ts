import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {
  navigation = [
    { title: "Dashboard", showMenuItem:true, link: '/dashboard', showChild: true, children: [
      { title: "Graphs", link: '/graphs', showMenuItem:true }
     
    ]},
    { title: "Delivery", showMenuItem:true, link: '/delivery'},
    { title: "Runner", showMenuItem:true, link: '/runner'},
    { title: "Reports", showMenuItem:true, link: '/reports'},
    { title: "Learn", showMenuItem:true, link: '/learn'}
  ]
  constructor() { }

  ngOnInit() {
  }

}
