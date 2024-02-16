import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { leaveAddModal } from '../modals/attendance';
@Injectable()
export class emsAttendanceService {
  private emsAttendanceServicetUrl = "http://localhost:3000/ems/emsAttendanceAdd";
  private emsAttendanceListServicetUrl = "http://localhost:3000/ems/emsAttendanceList";
  constructor(private http: HttpClient) { }
  emsattendanceservice(emsAttendanceService): Observable<leaveAddModal> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<leaveAddModal>(this.emsAttendanceServicetUrl, JSON.stringify(emsAttendanceService), { headers: headers });
  }
  
  geAttendanceList() {
    let getEmsAttendanceUrl = this.emsAttendanceListServicetUrl;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let getEmsListData = this.http.get(getEmsAttendanceUrl, {
      headers: headers
    });
    return getEmsListData;
  }
}
