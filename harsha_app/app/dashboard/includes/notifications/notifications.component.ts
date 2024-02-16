import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  cstImageUrl = 'https://res.cloudinary.com/dl9ns0hby/image/upload/v1572075582/plusmax-tracker/icons/plus-max-user.jpg';

  constructor() { }

  ngOnInit() {
  }

}
