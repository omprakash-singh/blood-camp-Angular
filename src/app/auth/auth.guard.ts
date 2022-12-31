import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { firebase } from '../../../firebase-config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): any {
    const auth = localStorage.getItem('CurrentUser');
    if (!auth) this.router.navigate(['auth/login']);
    return auth;
  }
}
