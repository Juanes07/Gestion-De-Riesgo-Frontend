import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserId } from '../models/userid.model';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio para los roles de usuarios
 */
export class RolesService {
  url: string = environment.url;

  id: number = 0;
  roles: string[] = [];
  nombres: string[] = [];
  emails: string[] = [];

  constructor(private http: HttpClient) {}

  getUsuarios() {
    let direction = this.url + 'obtenerUsuarios';
    return this.http.get<any>(direction);
  }

  updateUsuarios(user: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': 'true',

    });
    let direction = this.url + 'actualizarUsuario/' + user.id;
    const body: UserId = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      roles: [user.roles]
    };
    return this.http.put<any>(direction, body, { headers });
  }

}
