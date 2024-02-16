import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { emsLeaveRequestModal } from '../modals/leaveRequest';
@Injectable()
export class emsLeaveRequestService {
  private emsLeaveRequestUrl = "http://localhost:3000/ems/emsLeaveRequest";
  private emsLeaveStatusUrl = "http://localhost:3000/ems/emsLeaveStatus";
  private emsUpdateUrl = "http://localhost:3000/ems/";
  constructor(private http: HttpClient) { }
  emsLeaveRequest(leaveRequestservice): Observable<emsLeaveRequestModal> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<emsLeaveRequestModal>(this.emsLeaveRequestUrl, JSON.stringify(leaveRequestservice), { headers: headers });
  }
  getEmsStatus() {
    let getEmsStatusUrl = this.emsLeaveStatusUrl;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let getEmsStatusData = this.http.get(getEmsStatusUrl, {
      headers: headers
    });
    return getEmsStatusData;
  }
//   getEmsList() {
//     let getEmsListUrl = this.emsListUrl;
//     const headers = new HttpHeaders().set('Content-Type', 'application/json');
//     let getEmsListData = this.http.get(getEmsListUrl, {
//       headers: headers
//     });
//     return getEmsListData;
//   }
}
