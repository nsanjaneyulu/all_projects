import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string;
  loginBaseUrl: string = "http://ec2-3-1-103-205.ap-southeast-1.compute.amazonaws.com:8081";

  constructor(private httpClient: HttpClient, public router: Router) { }

  login(data): Observable<any> {
    this.loginApi(data);
    return this.httpClient.get(this.url).pipe(
      tap((result) => this.save_token(result)),
      catchError(this.handleError<any>('login'))
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('ssId');
    localStorage.removeItem('mallId');
    localStorage.removeItem('outletIds');
    localStorage.removeItem('dinerId');    
  }

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token == null) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  loginApi(data): void {
    this.url = this.loginBaseUrl + "/login?phoneNumber=" + data.userId + "&password=" + data.password;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
  private save_token(data) {
    if (data) {
      localStorage.setItem('token', data.refreshToken);
      localStorage.setItem('ssId', data.ssId);
      localStorage.setItem('mallId', data.mallId);
      localStorage.setItem('outletIds', data.outletIds[0]);
      localStorage.setItem('dinerId', data.id);

      return;
    }
  }
}