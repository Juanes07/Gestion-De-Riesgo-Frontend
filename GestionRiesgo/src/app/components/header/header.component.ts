import { Component, OnInit } from '@angular/core';
import {LoginService} from 'src/app/service/login.service';
import {Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  correo : string = "";
  photoURL: string = "";
  constructor(
    private loginService: LoginService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    if (JSON.parse(localStorage.getItem('user')!)) {
      this.correo = JSON.parse(localStorage.getItem('user')!).email;
      this.photoURL = JSON.parse(localStorage.getItem('user')!).photoURL;
    }
  }

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(['/login']);
  }

  SignOut() {
    this.loginService.logout();
    window.location.reload()
  }

}
