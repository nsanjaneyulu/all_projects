import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SetGetMallsService {
  mallList:any;
  constructor(public http: HttpClient) { }

  setMallData(mallsData){
    this.mallList = mallsData;
  }

  getMallData(){
    return this.mallList;
  }
}
