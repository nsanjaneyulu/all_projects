import { Injectable } from '@angular/core';

@Injectable()
export class AppConstant {

  static BASE_URL = 'http://jsonplaceholder.typicode.com';

  constructor() {

  }

  API() {
    const url = AppConstant.BASE_URL;
    return {
      users: `${url}/users`
    };
  }

}
