import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { catchError, map, tap, shareReplay, filter } from 'rxjs/operators';

@Injectable()
export class AuthService {

    constructor() { }
    // ...
}
