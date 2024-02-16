import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ProductService } from './services/product.service';
import { environment } from '../environments/environment';

@Injectable()
export class AuthGuardServiceService implements CanActivate {
  constructor(public auth: ProductService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      window.open(environment.home_url, '_self');
      return false;
    }
    return true;
  }
}