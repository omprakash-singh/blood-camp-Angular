import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  error = false;
  onLoginUser(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService
      .signin(email, password)
      .then((resData: any) => {
        localStorage.setItem('CurrentUser', JSON.stringify(resData));
        this.router.navigate(['/']);
      })
      .catch((err: any) => {
        this.error = true;
      });
  }
}
