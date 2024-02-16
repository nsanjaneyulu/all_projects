import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { emsAddModal } from '../modals/emsAddModal';
@Injectable()
export class emsService {
  private emsAddUrl = "http://localhost:3000/ems/emsAdd";
  private emsListUrl = "http://localhost:3000/ems/emsList";
  private emsUpdateUrl = "http://localhost:3000/ems/";
  emsInfo = {};
  emsUpdate = {};
  userId: string;
  constructor(private http: HttpClient) { }
  emsAdd(
    // userName, password, retypePassword, fullName, sex, nationality, dob, contactNumber, personalEmail, designation, address, city, pinCode, policyElgible
    emsAddData
    ): Observable<emsAddModal> {
    // var emsAddData = {};
    // emsAddData = {
    //   "userName": userName,
    //   "password": password,
    //   "retypePassword": retypePassword,
    //   "fullName": fullName,
    //   "sex": sex,
    //   "nationality": nationality,
    //   "dob": dob,
    //   // "bloodGroup": bloodGroup,
    //   "contactNumber": contactNumber,
    //   "personalEmail": personalEmail,
    //   "designation": designation,
    //   "address": address,
    //   "city": city,
    //   "pinCode": pinCode,
    //   "policyElgible": policyElgible
    // };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<emsAddModal>(this.emsAddUrl, JSON.stringify(emsAddData), { headers: headers });
  }
  emsAddDataUpdate(id, userName, password, retypePassword, fullName, sex, nationality, dob, contactNumber, personalEmail, designation, address, city, pinCode): Observable<emsAddModal> {
    var emsUpdateData = {};
    emsUpdateData = {
      "userName": userName,
      "password": password,
      "retypePassword": retypePassword,
      "fullName": fullName,
      "sex": sex,
      "nationality": nationality,
      "dob": dob,
      // "bloodGroup": bloodGroup,
      "contactNumber": contactNumber,
      "personalEmail": personalEmail,
      "designation": designation,
      "address": address,
      "city": city,
      "pinCode": pinCode

    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<emsAddModal>(this.emsUpdateUrl + id, JSON.stringify(emsUpdateData), { headers: headers });
  }
  getEmsList() {
    let getEmsListUrl = this.emsListUrl;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let getEmsListData = this.http.get(getEmsListUrl, {
      headers: headers
    });
    return getEmsListData;
  }
}
