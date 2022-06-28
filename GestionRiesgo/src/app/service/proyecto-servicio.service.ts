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

  getIdProyecto(id:string): Observable<idProyectoModel>{
    let direccion = this.url + 'obtenerId/' + id
    return this.http.get<idProyectoModel>(direccion);

  }

  actualizarSecuenciaIdProyecto(modelo: idProyectoModel): Observable<idProyectoModel> {
    let direccion = this.url + 'crear'
    return this.http.post<idProyectoModel>(direccion, modelo,{
      responseType: 'text' as 'json'
    })

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


}
