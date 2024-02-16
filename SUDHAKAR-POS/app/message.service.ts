import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message = new ReplaySubject<any>();

  constructor() { }

  setMessage(message:string) {
    this.message.next(message);
  }

  getMessage(): Observable<any> {
    return this.message.asObservable(); 
  }
}
