import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'BOW';
  showSidebar = true;
  isLogin = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
    
    ) {
    /* state wise components hide show start */
    router.events.subscribe(event => {
      if( event instanceof NavigationEnd) {
        this.isLogin = ((event.urlAfterRedirects.indexOf("login") !== -1) || (event.urlAfterRedirects.indexOf("forgotPassword") !== -1));
      }
    })
    /* state wise components hide show end */
  }
  
/* menu bar icons only hide show start */
  toggleMenu() {
    this.showSidebar = !this.showSidebar;
  }
  ngOnInit(){
    if (localStorage.getItem('LOGIN') == "YES") {
     
      this.router.navigate(['dashboard']);
      
    }
    else {
      this.router.navigate(['login']);
    }
  }
  /* menu bar icons only hide show end */
}
