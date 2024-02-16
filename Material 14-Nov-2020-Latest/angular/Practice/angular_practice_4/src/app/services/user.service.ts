import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../app.constant';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class UserService {

  static CLASS_NAME = '::: UserService :::';

  public userList = [];

  constructor(
    private httpClient: HttpClient,
    private appConstant: AppConstant
  ) {
    console.log(UserService.CLASS_NAME, httpClient);
  }

  getUsersList(): Observable<any> {
    const myObservable = Observable.create((observer) => {
      setTimeout(() => {
        observer.next('Some Dynamic Text');
      }, 5000);
      let count = 0;
      setInterval(() => {
        observer.next(++count);
      }, 1000);
    });

    return myObservable;
  }

}
