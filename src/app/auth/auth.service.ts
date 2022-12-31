import { Injectable } from '@angular/core';
import { firebase } from '../../../firebase-config';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}
  UserAuth = getAuth(firebase);
  async signup(email: string, password: string) {
    return await createUserWithEmailAndPassword(this.UserAuth, email, password);
  }
  async signin(email: string, password: string) {
    return signInWithEmailAndPassword(this.UserAuth, email, password);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }
}
