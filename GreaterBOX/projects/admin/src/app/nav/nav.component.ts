import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
})
export class NavComponent implements OnInit {
  navigateList = [
    "Orders",
    "Products",
    "Inventory",
    "PickUp Location",
    "Configuration",
  ];

  constructor() {}

  ngOnInit() {}
}
