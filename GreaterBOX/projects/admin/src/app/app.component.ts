import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  title = "admin";

  headerSidenav: boolean;
  subscriptions: Subscription;
  constructor(private router: Router) {
    this.subscriptions = new Subscription();
  }

  ngOnInit() {
    const eventsubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.headerSidenav = !(event.url === '/' || event.url === '/login');
      }
    });
    this.subscriptions.add(eventsubscription);
  }
  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
