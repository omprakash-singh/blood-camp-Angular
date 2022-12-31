import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatrialModule } from '../matrial/matrial.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, MatrialModule, ReactiveFormsModule, FormsModule],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
