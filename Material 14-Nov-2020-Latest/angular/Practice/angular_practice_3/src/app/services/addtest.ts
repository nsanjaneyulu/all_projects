import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Addtest } from '../modal/addtest';
import { Observable } from 'rxjs';

@Injectable()
export class AddtestService {

  public URL = 'http://localhost:3000/addtest';

  constructor(private http: Http) {

  }

  postAddtest(addtest: Addtest): Observable<any> {
    return this.http.post(this.URL, addtest);
  }

}
