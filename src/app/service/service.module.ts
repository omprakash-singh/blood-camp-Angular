import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DonatebloodComponent } from './donateblood/donateblood.component';
import { MatrialModule } from '../matrial/matrial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, DonatebloodComponent],
  imports: [CommonModule, MatrialModule, FormsModule, ReactiveFormsModule],
  exports: [HomeComponent, DonatebloodComponent],
})
export class ServiceModule {}
