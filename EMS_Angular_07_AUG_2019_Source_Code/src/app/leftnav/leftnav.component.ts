import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.css']
})
export class LeftnavComponent implements OnInit {
  imgPlus: boolean = true;
  imgMinus: boolean = false;
  selectedIndex: number = null;
  // navigation = [
  //   { title: "Dashboard", link: '/dashboard', icon: 'Dashboard-White.png', active: true, showChild: false },
  //   {
  //     title: "Operations", link: '', icon: 'Operations-White.png', active: false, showChild: false, children: [
  //       { title: "Live Orders", link: '/liveOrders', icon: 'right-arrow.png' },
  //     ]
  //   }
  // ]
  navigation = [
    { title: "EMP Add", link: '/empAdd', icon: 'Dashboard-White.png', active: true, showChild: false },
    { title: "EMP List", link: '/empList', icon: 'Dashboard-White.png', active: true, showChild: false },
    { title: "Leave Request", link: '/leaveRequest', icon: 'Dashboard-White.png', active: true, showChild: false },
    { title: "Leave Status", link: '/leaveStatus', icon: 'Dashboard-White.png', active: true, showChild: false },
    { title: "Leave History", link: '/leaveHistory', icon: 'Dashboard-White.png', active: true, showChild: false },
    { title: "Add Attendance", link: '/addAttendance', icon: 'Dashboard-White.png', active: true, showChild: false },
    { title: "List Attendance", link: '/listAttendance', icon: 'Dashboard-White.png', active: true, showChild: false },
    { title: "Leave List", link: '/leaveList', icon: 'Dashboard-White.png', active: true, showChild: false },
    { title: "File Import", link: '/attendanceFileImport', icon: 'Dashboard-White.png', active: true, showChild: false }
    // { title: "List Attendance", link: '/leaveHistory', icon: 'Dashboard-White.png', active: true, showChild: false }
  ]
  constructor(private router: Router) { }
  toggleActiveMenu($event, menu) {

    this.navigation.forEach(menuItem => {
      menuItem.active = false;
      menuItem.showChild = false;
    });

    menu.active = true;
    menu.showChild = true;

    if(!menu.children) {
      this.navigate(menu.link);
    }

    console.log(this.navigation)

  }
  navigate(link) {
    this.router.navigateByUrl(link);
  }
  ngOnInit() {
  }

}
