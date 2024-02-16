import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { emsLeaveRequestModal } from '../modals/leaveRequest';
@Injectable()
export class emsLeaveRequestService {
  private emsLeaveRequestUrl = "http://localhost:3000/ems/emsLeaveRequest";
  private emsLeaveStatusUrl = "http://localhost:3000/ems/emsLeaveStatus";
  private emsLeaveUpdateUrl = "http://localhost:3000/ems/emsLeaveUpdate/";
  private emsUpdateUrl = "http://localhost:3000/ems/";
  emsLeaveInfo = {};
  emsLeaveUpdate = {};
  constructor(private http: HttpClient) { }
  emsLeaveRequest(leaveRequestservice): Observable<emsLeaveRequestModal> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<emsLeaveRequestModal>(this.emsLeaveRequestUrl, JSON.stringify(leaveRequestservice), { headers: headers });
  }
  emsLeaveRequestDataUpdate(id, userName, leaveType, leaveReason, leaveStatus, noOfDays, fromDate, toDate): Observable<emsLeaveRequestModal> {
    var emsLeaveRequestUpdateData = {};
    emsLeaveRequestUpdateData = {
      "userName": userName,
      "leaveType": leaveType,
      "leaveReason": leaveReason,
      "leaveStatus": leaveStatus,
      "noOfDays": noOfDays,
      "fromDate": fromDate,
      "toDate": toDate
     

    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<emsLeaveRequestModal>(this.emsUpdateUrl + id, JSON.stringify(emsLeaveRequestUpdateData), { headers: headers });
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
