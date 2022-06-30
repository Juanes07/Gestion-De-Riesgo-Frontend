import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { proyecto } from '../models/proyecto-modelo.model';
import { idProyectoModel } from '../models/idproyecto-modelo.model';
import { riesgo } from '../models/riesgo-modelo.models';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  private url: string = 'https://gestion-riesgo.herokuapp.com/';

  constructor(private http: HttpClient) {}


  guardarProyecto(proyecto: proyecto): Observable<proyecto> {
    let direccion = this.url + 'crearProyecto';
    return this.http.post<any>(direccion, proyecto, {
      responseType: 'text' as 'json',
    });
  }

  getProyectos(): Observable<proyecto[]> {
    let direccion = this.url + 'obtenerProyectos';
    return this.http.get<proyecto[]>(direccion);
  }

  getProyectoById(id:any): Observable<proyecto> {
    let direccion = this.url + 'obtenerProyecto/' + id;
    return this.http.get<proyecto>(direccion);
  }


  getRiesgosByProyectoId(id:any): Observable<riesgo[]> {
    let direccion = this.url + 'obtenerRiesgoPorProyecto/' + id;
    return this.http.get<riesgo[]>(direccion);
  }


  guardarRiesgo(riesgo:riesgo): Observable<riesgo>{
    let direccion = this.url + 'crearRiesgo'
    return this.http.post<riesgo>(direccion,riesgo, {
      responseType: 'text' as 'json',
    })
  }

  getRiesgoById(id:any): Observable<riesgo> {
    let direccion = this.url + 'obtenerRiesgo/' + id;
    return this.http.get<riesgo>(direccion);
  }

  actualizarProyecto(proyeto:proyecto): Observable<any>{
    let direccion = this.url + 'actualizarProyecto/' + proyeto.id
    return this.http.put<any>(direccion, proyeto,{
      responseType: 'text' as 'json',
    })
  }

  actualizarRiesgo(riesgo:riesgo): Observable<any>{
    let direccion = this.url + 'actualizarRiesgo/' + riesgo.id
    return this.http.put<any>(direccion, riesgo,{
      responseType: 'text' as 'json',
    })
  }

}
