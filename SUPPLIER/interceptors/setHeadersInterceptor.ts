import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse , HttpClient /*, HttpHeaders */} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { UtilityProvider } from '../provider/utility/utility';

@Injectable()
export class SetHeadersInterceptor implements HttpInterceptor {    
    headers:any;
    apiDetails:any;
    constructor(public http: HttpClient, private _utilityProvider: UtilityProvider, private storage: Storage){
        this.headers = this._utilityProvider.getHeadersForServiceInterceptor();
        this.storage.get("API_KEYS").then((val) => {
          this.apiDetails=val;
        });
       
        console.log("SetHeaders -->", this.headers,' this.apiDetails', this.apiDetails);
    }

   

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    req = req.clone({
        setHeaders: this.headers
      });
      
     let currTimeInMillis = new Date().getTime();
      if(this.apiDetails && currTimeInMillis > this.apiDetails.refreshDate) {
        // this._utilityProvider.refreshAccessTokens(this.apiDetails.refreshToken, function(apiDetails) {
        //   this.setHedersOnExpire(apiDetails);
        // });
      }
     

    return next.handle(req).pipe(
        tap(
          event => {
            status = '';
            
            if (event instanceof HttpResponse) {
              status = 'succeeded';
            }
          },
          error => status = 'failed'
        ),      
    );
  }
 
} 