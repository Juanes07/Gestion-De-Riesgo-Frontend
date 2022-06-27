import { NgModule } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {RatingModule} from 'primeng/rating';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {MenuModule} from 'primeng/menu';
import {DividerModule} from 'primeng/divider';
import {DialogModule} from 'primeng/dialog';
import {CalendarModule} from 'primeng/calendar';
import { LoginComponent } from '../pages/usuarios/login/login.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from '../pages/usuarios/register/register.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    ButtonModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    RatingModule,
    ProgressSpinnerModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    MenuModule,
    DividerModule,
    DialogModule,
    CalendarModule
  ],
  exports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    RatingModule,
    ProgressSpinnerModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    MenuModule,
    DividerModule,
    DialogModule,
    CalendarModule
  ]
})
export class PrimeNgModule { }
