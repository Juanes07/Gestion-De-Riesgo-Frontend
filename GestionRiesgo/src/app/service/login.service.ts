import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import {User} from '../models/usuario-i.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userData: any;
  private url: string = environment.url;

  constructor(
    public afauth: AngularFireAuth,
    public store: AngularFirestore,
    public http: HttpClient) {
        this.afauth.authState.subscribe((user) => {
          if (user) {
            this.userData = {
              uid: user.uid,
              rol: this.getRole,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              emailVerified: user.emailVerified
            };
            JSON.parse(localStorage.getItem('user')!);
            localStorage.setItem('user', JSON.stringify(this.userData));
          }else {
            JSON.parse(localStorage.getItem('user')!);
            localStorage.setItem('user', 'null');
          }
        });
    }

    saveUser(user: User): Observable<any> {
     let direction = this.url + '/crearUsuario';
      return this.http.post<any>(direction, user, {responseType: 'text' as 'json',});
    }

    updateUserData(user:any) {
      this.userData = user;
    }
    getUser(){
      return this.userData;
    }

   getRole(user:any) {
    return this.store.collection('users').doc(user.rol);
   }

    verifyUserRegistered(user:User){
      return this.store.collection('users').doc(user.uid).valueChanges();
    }

    async loginWithGoogle(){
      const provider = new firebase.auth.GoogleAuthProvider();
      try {
      const credential = await this.afauth.signInWithPopup(provider);
      this.updateUserData(credential.user);
      const verify = this.verifyUserRegistered(this.userData);
      if (verify) {
        JSON.parse(localStorage.getItem('user')!);
            localStorage.setItem('user', JSON.stringify(this.userData));
        return this.userData;
      }
      } catch (error) {
        return null;
      }
    }

    async login(email: string, password: string){
      try {
        const credential = await this.afauth.signInWithEmailAndPassword(email, password);
        this.updateUserData(credential.user);
        const verify = this.verifyUserRegistered(this.userData);
        if (verify) {
          JSON.parse(localStorage.getItem('user')!);
            localStorage.setItem('user', JSON.stringify(this.userData));
          return this.userData;
        }
      } catch (error) {
        return null;
      }
    }

    async register(email: string, password: string){
      try {
        const credential = await this.afauth.createUserWithEmailAndPassword(email, password);
        if (credential.user !== null) {
          const user = credential.user;
          this.userData = {
            id: user.uid,
            nombre: user.displayName,
            email: user.email,
            roles: 'lector'

          };
          this.saveUser(this.userData);
          return this.userData;
        }
      } catch (error) {
        return null;
      }
    }


    async registerUserWithGoogle(){
      const provider = new firebase.auth.GoogleAuthProvider();
      try {
        const credential = await this.afauth.signInWithPopup(provider);
        if (credential.user !== null) {
        const user = credential.user;
        const userRef: AngularFirestoreDocument<any> = this.store.doc(`users/${user.uid}`);
        this.userData = {
            id: user.uid,
            nombre: user.displayName,
            email: user.email,
            roles: 'lector'

          };
          this.saveUser(this.userData);
          return userRef.set(this.userData, {
          merge: true
        });
      }
    } catch (error) {
      return null;
    }
  }

    async logout() {
      await this.afauth.signOut();
      localStorage.removeItem('user');
    }

    async resetPassword(email: string) : Promise<void> {
        await this.afauth.sendPasswordResetEmail(email);
    }

    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user')!);
      return (user !== null && user.emailVerified !== false) ? true : false;
    }

    get isAdmin(): boolean {
      const user = JSON.parse(localStorage.getItem('user')!);
      return (user !== null && user.rol === 'administrador') ? true : false;
    }

    get isLector(): boolean {
      const user = JSON.parse(localStorage.getItem('user')!);
      return (user !== null && user.rol === 'lector') ? true : false;
    }

    get isMantenedor(): boolean {
      const user = JSON.parse(localStorage.getItem('user')!);
      return (user !== null && user.rol === 'mantenedor') ? true : false;
    }
}

