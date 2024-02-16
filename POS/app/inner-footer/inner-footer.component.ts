import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
@Component({
  selector: 'tafelposapp-inner-footer',
  templateUrl: './inner-footer.component.html',
  styleUrls: ['./inner-footer.component.scss']
})
export class InnerFooterComponent implements OnInit {
  currentRoute: any;
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event["url"];
      }
    })
  }

}
