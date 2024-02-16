import { Component, OnInit } from '@angular/core';
import { authDataInfo } from '../../../environments/textual-changes';

@Component({
  selector: 'app-signupcompany',
  templateUrl: './signupcompany.component.html',
  styleUrls: ['./signupcompany.component.css']
})
export class SignupcompanyComponent implements OnInit {
  authDataInfo = authDataInfo;
  signUpTabs: Array<any> = authDataInfo.tabs.signUp;
  // tableColumns: Array<Columns> = authDataInfo.tableColumns.intrestedProfile;
  activeTab = {
      name: 'Company Profile',
      active: true,
      link: '/applicantsInterestedProfile',
    }
  constructor() { }

  ngOnInit(): void {
  }

}
