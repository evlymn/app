import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MomentModule
  ]
})
export class LoginModule { }
