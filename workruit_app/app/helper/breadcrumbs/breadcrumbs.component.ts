import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';
export interface BreadCrumb {
  label: string;
  url: string;
};
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  // breadcrumbs$ = this.router.events.pipe(
  //   filter(event => event instanceof NavigationEnd),
  //   distinctUntilChanged(),
  //   map(event => this.buildBreadCrumb(this.activatedRoute.root))
  // );

  // // Build your breadcrumb starting with the root route of your current activated route

  // constructor(private activatedRoute: ActivatedRoute,
  //             private router: Router) {
  // }

  ngOnInit() {
  }

  // buildBreadCrumb(route: ActivatedRoute, url: string = '',
  //                 breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {
  //                   console.log(route);
  //                   console.log(url);
  //                    console.log(breadcrumbs);
  //   // If no routeConfig is avalailable we are on the root path
  //   const label = 'Home';
  //   // const label = route.routeConfig ? route.routeConfig.data['breadcrumb'] : 'Home';
  //   const path = route.routeConfig ? route.routeConfig.path : '';
  //   // In the routeConfig the complete path is not available,
  //   // so we rebuild it each time
  //   console.log(url);
  //     console.log(path);
  //   const nextUrl = `${url}${path}/`;
  //   const breadcrumb = {
  //     label: label,
  //     url: nextUrl,
  //   };
  //   const newBreadcrumbs = [...breadcrumbs, breadcrumb];
  //   if (route.firstChild) {
  //     // If we are not on our current path yet,
  //     // there will be more children to look after, to build our breadcumb
  //     return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
  //   }
  //   return newBreadcrumbs;
  // }

}
