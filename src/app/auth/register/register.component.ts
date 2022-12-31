import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { firebase } from '../../../../firebase-config';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}
  error = false;
  auth = getAuth(firebase);
  onCreateUser(form: NgForm) {
    if (!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;
    this.authService
      .signup(email, password)
      .then((user: any) => {
        localStorage.setItem('CurrentUser', JSON.stringify(user));
        this.router.navigate(['/']);
      })
      .catch((err: any) => {
        this.error = true;
      });
    form.reset();
  }
}
