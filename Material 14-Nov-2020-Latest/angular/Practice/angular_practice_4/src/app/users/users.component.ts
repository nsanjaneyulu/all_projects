import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    const observer = this.userService.getUsersList();
    const subscription: Subscription = observer.subscribe(this.fnValue, this.fnError, this.fnComplete);

    setTimeout(() => {
      subscription.unsubscribe();
    }, 8000);
  }


  fnValue(value) {
    console.log('fnValue', value);
  }

  fnError(error) {
    console.log('fnValue', error);
  }

  fnComplete() {
    console.log('fnComplete');
  }



}
