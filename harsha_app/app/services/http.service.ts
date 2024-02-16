import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NgProgress } from 'ngx-progressbar';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap, shareReplay, filter } from 'rxjs/operators';

@Injectable()
export class HttpService {
  constructor(
    private httpService: HttpClient,
    public ngProgress: NgProgress
  ) { }
  //get service
  doGet(endpoint) {
    this.ngProgress.start();
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json;charset=UTF-8');
    const url = endpoint;
    console.log(url);
    return this.httpService.get(url, { headers }).pipe(map((response: Response) => {
      this.ngProgress.done();
      return response;
    }),
      shareReplay(), catchError(e => {
        console.log(e);
        return of(null);
      }), filter(e => !!e));
  };
  //post service
  doPost(endpoint, payload: any) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json;charset=UTF-8');
    const url = endpoint;
    console.log(url);
    return this.httpService.post(url, payload, { headers }).pipe(map((response: Response) => response),
      shareReplay(), catchError(e => {
        console.log(e);
        return of(null);
      }), filter(e => !!e));
  }
  // upload file service
  doUpload(endpoint, payload: any = {}) {
    var fileFormData = new FormData();
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'multipart/form-data');
    Object.keys(payload).forEach(key => fileFormData.append(key, payload[key]));
    // Array.from(payload).forEach(f => fileFormData.append('file', f));
    return this.httpService.post(endpoint, fileFormData)
      .pipe(map((response: Response) => response),
        shareReplay(), catchError(e => {
          console.log(e);
          return of(null);
        }), filter(e => !!e));
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
