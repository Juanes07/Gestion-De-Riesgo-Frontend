import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { proyecto } from '../models/proyecto-modelo.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private url: string = 'http://localhost:8080/';


  constructor(private http: HttpClient) {}


  guardarProyecto(proyecto: proyecto): Observable<any>{
    let direccion = this.url + 'crear';
    return this.http.post<any>(direccion,proyecto, {
      responseType: 'text' as 'json',
    })
  }

  getProyectos(): Observable<proyecto[]>{
    let direccion = this.url + 'obtenerProyectos';
    return this.http.get<proyecto[]>(direccion);
  }

}