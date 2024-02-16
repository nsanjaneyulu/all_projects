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
  loginBaseUrl: string = "https://wba1lam6og.execute-api.ap-southeast-1.amazonaws.com/dm";
  basicUrl: string = "https://3xpr4y5qmc.execute-api.ap-southeast-1.amazonaws.com/dm";
  headersNonAdmin: HttpHeaders;

  constructor(private httpClient: HttpClient, public router: Router) { }

  login(data): Observable<any> {
    this.loginApi(data);
    let postparameters={
      "phoneNumber": "+91" + data.userId,
			"password": data.password
    }
    return this.httpClient.post(this.url,postparameters).pipe(
      tap((result) => {
        this.save_token(result);
        let mallDetailsAPI = this.loginBaseUrl + "/mall/" + result['mallId']+"?outletInfo=true";
        this.httpClient.get(mallDetailsAPI).subscribe(mallDetailsResp => {
      console.log(mallDetailsResp,"mallDetailsResp")
          sessionStorage.setItem('mallName', mallDetailsResp['name']),
          localStorage.setItem('mallName', mallDetailsResp['name']),
          sessionStorage.setItem('mallImage', mallDetailsResp['img']),
          sessionStorage.setItem('mallID', mallDetailsResp['id']),
          sessionStorage.setItem('mallArea', mallDetailsResp['address']['area']),
          sessionStorage.setItem('mallCity', mallDetailsResp['address']['city'])
          localStorage.setItem('typeOfDining', mallDetailsResp['typeOfDining'])
          localStorage.setItem('outletDetails',JSON.stringify(mallDetailsResp['outlets']));
          localStorage.setItem('token', result['refreshToken']);

          if(result['allpermited']=='Yes'){
            localStorage.setItem('outletDetails',JSON.stringify(mallDetailsResp['outlets']));
          }else{
          let list=  mallDetailsResp['outlets'].filter(value=>{ debugger
              return result['outletIds'].includes(value.id)
            })
            localStorage.setItem('outletDetails',JSON.stringify(list));
          }
          this.router.navigate(['sale']);

        });
        let outletUrl = this.basicUrl + "/mall/" + result['mallId'] + "/outlet/" + result['outletIds'];    
        this.httpClient.get(outletUrl).subscribe(outletName => {        
          sessionStorage.setItem('outletName', outletName['name']);
        });
      }),
      catchError(this.handleError<any>('login'))
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('selectedOutletId');
    localStorage.removeItem('ssId');
    localStorage.removeItem('mallId');
    localStorage.removeItem('outletIds');
    localStorage.removeItem('dinerId');    
    sessionStorage.removeItem('outletName');
    localStorage.removeItem('allpermited'); 
    sessionStorage.removeItem('mallName'); 
    localStorage.removeItem('outletDetails'); 
    localStorage.removeItem('mallName'); 
    sessionStorage.removeItem('mallArea');
    sessionStorage.removeItem('mallCity'); 
    sessionStorage.removeItem('mallID');
    sessionStorage.removeItem('mallImage'); 
    localStorage.removeItem('typeOfDining')
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
    this.url = this.loginBaseUrl + "/login"
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
  private save_token(data) {
    if (data) {
    
      localStorage.setItem('ssId', data.ssId);
      localStorage.setItem('mallId', data.mallId);
      localStorage.setItem('outletIds', data.outletIds[0]);
      localStorage.setItem('dinerId', data.id);
      localStorage.setItem('allpermited', data.allpermited);


      return;
    }
  }
}