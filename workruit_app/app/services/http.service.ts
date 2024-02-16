import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as CryptoJS from 'crypto-js'

// import { of } from 'rxjs/observable/of';
import { catchError, map, tap, shareReplay, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  headers: HttpHeaders = new HttpHeaders({
    'content-type': 'application/json'
  });
  constructor(private httpService: HttpClient, ) {
  }
  doGet(endpoint: string) {
    const authKey = localStorage.getItem('sessionId') || 'password';
    const sessionId = JSON.parse(JSON.stringify(localStorage.getItem('sessionId') !== null ? localStorage.getItem('sessionId'): "94b51cc4-11e7-11e7-a919-92361f00hie9"));
    this.headers = this.headers.set('Token', sessionId);
    return this.httpService.get(endpoint, { headers: this.headers }).pipe(map((response: any) => {
      return response;
    }),
      shareReplay(), catchError(e => {
        let response = decrypt(e.error.text, authKey)
        return of(response);
      }), filter(e => !!e));
  };
  //post service
  doPost(endpoint: string, payload: object) {
    const authKey = localStorage.getItem('sessionId') || 'password';
    const encryptPayload = encrypt(JSON.stringify(payload), authKey, '');
    const sessionId = JSON.parse(JSON.stringify(localStorage.getItem('sessionId') !== null ? localStorage.getItem('sessionId'): "94b51cc4-11e7-11e7-a919-92361f00hie9"));
    this.headers = this.headers.set('token', sessionId);
    return this.httpService.post(endpoint, encryptPayload, { headers: this.headers }).pipe(map((response: any) => {
      return response;
    }),
      shareReplay(), catchError(e => {
        let response = decrypt(e.error.text, authKey);
        return of(response);
      }), filter(e => !!e));
  };
}
const iv = CryptoJS.enc.Hex.parse('0x00');
const authTokenTypeOne = function () {
  return "password";
};
const authTokenTypeTwo = function () {
  return "94b51cc4-11e7-11e7-a919-92361f00hie9";
}

function encrypt(message: any, key: any, token: any) {
  var ekey = key.length ? key : token;
  var encryptedString = CryptoJS.AES.encrypt(message, CryptoJS.enc.Latin1.parse(CryptoJS.enc.Latin1.stringify(CryptoJS.SHA256(ekey))), {
    iv: iv
  }).toString();
  return encryptedString;
}

function decrypt(message: any, key: any) {
  // console.log(message);
  const cMessage = message;
  const ckey = key == authTokenTypeOne() ? 'password' : key;
  // console.log(message, ckey);
  if (message && ckey) {
    var decryptString = CryptoJS.AES.decrypt(cMessage, CryptoJS.enc.Latin1.parse(CryptoJS.enc.Latin1.stringify(CryptoJS.SHA256(ckey))), {
      iv: iv
    }).toString(CryptoJS.enc.Utf8);
    // console.log("decryptString", decryptString);
    return JSON.parse(decryptString);
  }
}
