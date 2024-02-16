import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add custom header
    const customReq = request.clone({
      headers: request.headers.set(
        'x-api-key', 'Anji123'
        )
    });

    console.log('processing request', customReq);
    
    // pass on the modified request object
    return next.handle(customReq)
    }
}