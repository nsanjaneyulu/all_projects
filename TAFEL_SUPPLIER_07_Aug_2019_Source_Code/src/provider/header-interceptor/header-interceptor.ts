import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SetHeadersInterceptor } from '../../interceptors/setHeadersInterceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: SetHeadersInterceptor, multi: true }
];
