import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {
  imgPlus: boolean = true;
  imgMinus: boolean = false;
  selectedIndex: number = null;

  navigation = [
    { title: "Dashboard", link: '/dashboard', icon: 'Dashboard-White.png', active: true, showChild: false },
    {
      title: "Operations", link: 'liveOrders', icon: 'Operations-White.png', active: false, showChild: false, children: [
        { title: "Live Orders", link: '/liveOrders', icon: 'right-arrow.png' }
        // { title: "Inventory", link: '/inventory', icon: 'right-arrow.png' }
      ]
    },
    {
      title: "Discounts", link: 'addDiscount', icon: 'Operations-White.png', active: false, showChild: false, children: [
        { title: "Add Discount", link: '/addDiscount', icon: 'right-arrow.png' },
        { title: "Assign Discount", link: '/assignDiscount', icon: 'right-arrow.png' }
      ]
    }

    
  ]

  constructor(
    private router: Router
  ) { }

  ngOnInit(

  ) {
  }
  /* Accordions show hide start */
  toggleActiveMenu($event, menu) {

    this.navigation.forEach(menuItem => {
      menuItem.showChild = false;

      if (menuItem.title == menu.title) {
        menu.active = !menu.active;
      } else {
        menuItem.active = false;
      }

      menuItem.showChild = menuItem.active;
    });

   

    if (!menu.children) {
      this.navigate(menu.link);
    }

  

    
  }


  navigate(link) {
    this.router.navigateByUrl(link);
  }
}
