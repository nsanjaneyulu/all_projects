import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class OnlineOfflineService {
  onlinneStatus = new ReplaySubject<any>();

  constructor(private http: HttpClient) { }
  
  setOnlineStatus(onlinneStatus:boolean) {
    this.onlinneStatus.next(onlinneStatus);
  }

  getOnlineStatus(): Observable<any> {
    return this.onlinneStatus.asObservable(); 
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
}