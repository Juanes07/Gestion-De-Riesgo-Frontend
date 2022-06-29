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

  // Servicios de Proyecto(s) //

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

  actualizarProyecto(proyecto: proyecto): Observable<any>{
    let direccion = this.url + 'actualizarProyecto/' + proyecto.id
    return this.http.put<any>(direccion, proyecto,{
      responseType: 'text' as 'json',
    })
  }

  eliminarProyecto(id:number): Observable<any>{
    let direccion = this.url + 'eliminarProyecto/' + id;
    return this.http.delete<any>(direccion);
  }

  // Servicios de Riesgos //

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

  eliminarRiesgo(id:number): Observable<any>{
    let direccion = this.url + 'eliminarRiesgoPorId/' + id;
    return this.http.put<any>(direccion, {});
  }

}
