import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuApi: string;
 
  selectedCategory = new ReplaySubject<any>();
  data$: Observable<any> = this.selectedCategory.asObservable();
  baseApiUrl: string = environment.profileService;

  constructor(private http: HttpClient) { }

  /** GET menu from the server */
  getMenu() {
    this.menuApi = this.baseApiUrl + '/serviceStations/' + localStorage.getItem('ssId') + '/malls/' + localStorage.getItem('mallId') + '/outlets/' + localStorage.getItem('outletIds') + '/inventory?sort=veg&search=';
    this.http.get(this.menuApi).subscribe(res => this.selectedCategory.next(res));
  }

  setCategory(selectedCategory:Category) {
    this.selectedCategory.next(selectedCategory);
  }

  getCategory(): Observable<any> {
    return this.selectedCategory.asObservable(); 
  }
}
