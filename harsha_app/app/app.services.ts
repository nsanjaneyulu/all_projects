import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { HttpService } from './services/http.service';

export const AppServices = [HttpService, AuthGuardService, AuthService];