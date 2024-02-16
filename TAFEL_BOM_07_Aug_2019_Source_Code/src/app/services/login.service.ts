import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  headers: HttpHeaders
  constructor(private http: HttpClient,) {
    this.headers = this.getHeadersForService();
   }
  getHeadersForService() {
		let headers = new HttpHeaders({
			'content-type': 'application/json'
		});
		return headers;
  }
  // userData( userDataSend): Observable<any> {
  //   let userDataAPIUrl = "";
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this.http.post<any>(userDataAPIUrl, JSON.stringify(userDataSend), { headers: headers });
  // }

  loginSubmit(loginData){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(environment.apiUrl+'admin/login', loginData, { headers: headers });
  }
}
