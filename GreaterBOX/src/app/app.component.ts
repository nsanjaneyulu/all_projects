import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
declare var vestatoken: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'NSMFreshBox';
  ngOnInit() {
    vestatoken.init({ServiceURL : environment.vestaServiceURL,
      AccountName : environment.AccountName});
  }
}
