import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { HomeService } from "./services/homeservice";

@Injectable({
  providedIn: "root"
})
export class CanActivateCheckout implements CanActivate {
  constructor(private homeService: HomeService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const orderDetails = this.homeService.getOrderDetails();
    if (orderDetails && typeof orderDetails === "object") {
      return Object.keys(orderDetails).reduce((acc, key) => {
        const data = orderDetails[key];
        return !!acc && !!data;
      }, true);
    } else {
      this.router.navigateByUrl("/home");
      return false;
    }
  }
}
