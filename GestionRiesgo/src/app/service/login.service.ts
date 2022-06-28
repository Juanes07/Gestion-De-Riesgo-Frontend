import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import firebase from 'firebase/compat/app';
import { User } from '../models/usuario-i.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserMongo } from '../models/usermongo.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  userData: any;
  userMongo: UserMongo = {
    nombre: '',
    email: '',
    roles: [],
  };

  credential: any;
  private url: string = environment.url;
  public userLogin: User = {
    uid: '',
    email: '',
    rol: '',
    displayName: '',
    photoURL: '',
    emailVerified: false,
  };
  public idUser = '';
  public rolUser = '';

  constructor(
    public afauth: AngularFireAuth,
    public store: AngularFirestore,
    public http: HttpClient
  ) {}

  saveUser(user: any): Observable<any> {
    let direction = this.url + 'crearUsuario';

    return this.http.post<any>(direction, user, {
      responseType: 'text' as 'json',
    });
  }

  getUser() {
    return this.userData;
  }

  async verifyUserRegistered(user: User) {
    return this.store.collection('users').doc(user.uid).valueChanges();
  }

  async loginWithGoogle() {
    try {
      this.credential = await this.afauth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
      if (this.credential.user !== null) {
        const user = this.credential.user;
        this.getPropertyValue(user);
        return this.credential;
      }
    } catch (error) {
      return null;
    }
  }

  async login(email: string, password: string) {
    try {
        this.credential = await this.afauth.signInWithEmailAndPassword(
          email,
          password
        );
        const user = this.credential.user;
        this.getPropertyValue(user);
        return this.credential;

        } catch (error) {
          return null;
        }
  }

  async register(name: any, email: string, password: string) {
    try {
      this.credential = await this.afauth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (this.credential.user !== null) {
        const user = this.credential.user;
        this.userMongo = {
          nombre: name,
          email: user.email,
          roles: ['lector'],
        };
        const response = this.saveUser(this.userMongo);
        response.subscribe((data) => {
          console.log(data);
        });
        return this.userMongo;
      }
    } catch (error) {
      return console.log(error);
    }
  }

  async registerUserWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      this.credential = await this.afauth.signInWithPopup(provider);
      if (this.credential.user !== null) {
        const user = this.credential.user;
        const userRef: AngularFirestoreDocument<any> = this.store.doc(
          `users/${user.uid}`
        );
        this.userMongo = {
          nombre: user.displayName,
          email: user.email,
          roles: ['lector'],
        };
        const response = this.saveUser(this.userMongo);
        response.subscribe((data) => {
          console.log(data);
        });
        return userRef.set(this.userMongo, {
          merge: true,
        });
      }
    } catch (error) {
      return console.log(error);
    }
  }

  async logout() {
    await this.afauth.signOut();
    localStorage.removeItem('user');
  }

  async resetPassword(email: string): Promise<void> {
    await this.afauth.sendPasswordResetEmail(email);
  }

  getPropertyValue(user: any) {
    let direction = this.url + 'obtenerUsuarios';
    this.http.get<any>(direction).subscribe((data) => {
      data.forEach(
        async (element: { email: any; id: string; roles: string }) => {
          if (element.email === user.email) {
            this.userLogin = {
              uid: element.id,
              email: user.email,
              rol: element.roles[0],
              displayName: user.displayName,
              photoURL: user.photoURL,
              emailVerified: user.emailVerified,
            };
            const verify = await this.verifyUserRegistered(user);
            if (verify) {
              JSON.parse(localStorage.getItem('user')!);
              localStorage.setItem('user', JSON.stringify(this.userLogin));
            } else {
              this.logout();
            }
          }
        }
      );
    });
  }

  getRole(email: string) {
    let direction = this.url + 'obtenerUsuarios';
    return this.http.get<any>(direction).subscribe((data) => {
      data.forEach((element: { email: any; roles: any }) => {
        if (element.email === email) {
          console.log('Element Role', element.roles[0]);
          this.rolUser = element.roles[0];
        }
      });
    });
  }

  getId(email: string) {
    let direction = this.url + 'obtenerUsuarios';
    return this.http.get<any>(direction).subscribe((data) => {
      data.forEach((element: { email: any; id: any }) => {
        if (element.email === email) {
          console.log('Element Id', element.id);
          this.idUser = element.id;
        }
      });
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  get isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.rol === 'administrador' ? true : false;
  }

  get isLector(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.rol === 'lector' ? true : false;
  }

  get isMantenedor(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.rol === 'mantenedor' ? true : false;
  }
}
