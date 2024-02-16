import { Component, OnInit } from '@angular/core';
import { authDataInfo } from '../../../environments/textual-changes';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {

  authDataInfo = authDataInfo;
  activityTabs: Array<any> = authDataInfo.tabs.viewProfile;
  // tableColumns: Array<Columns> = authDataInfo.tableColumns.intrestedProfile;
  activeTab = {
    name: 'My Profile',
    active: true,
    link: '/myProfile',
  }
  activeTabName: any;
  companyProfileGet: any;
  myProfileGet: any;
  constructor() { }

  ngOnInit(): void {
    this.myProfileGet = true;
  }
  
  tabClick(eve: any) {
    this.activityTabs.map(item => {
      if(item.name === eve.name) {
        item.active = true;
        console.log("eve.name", eve.name);
        if(eve.name == 'Company Profile'){
            this.companyProfileGet = true;
            this.myProfileGet = false;
        }
        if(eve.name == 'My Profile'){
          this.myProfileGet = true;
          this.companyProfileGet= false;
      }
      }
      else {
        item.active = false;
      }
      return item;
    })
    this.activeTabName = "My Profile";
    console.log("tab", eve.name);
  }

}
