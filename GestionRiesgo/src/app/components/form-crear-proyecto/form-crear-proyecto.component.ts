import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import {MenuItem} from 'primeng/api';
import { Calendar, CalendarModule } from 'primeng/calendar';
import { proyecto } from 'src/app/models/proyecto-modelo.model';
import { ProyectoService } from 'src/app/service/proyecto-servicio.service';




@Component({
  selector: 'app-form-crear-proyecto',
  templateUrl: './form-crear-proyecto.component.html',
  styleUrls: ['./form-crear-proyecto.component.css']
})
export class FormCrearProyectoComponent implements OnInit {



  formulario: proyecto = {
    id:  0,
    nombre: '',
    fechaInicio:'',
    fechaFin:'',
    etiquetas: [],
    responsables: [],
    descripcion: '',
    liderProyecto: '',
    estado: 'creado'
  }

  etiquetshtml: string = '';
  responsableHtml: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private services: ProyectoService,
  ){}


  ngOnInit() {

  }



  guardarProyecto(proyecto: proyecto): void{
    console.log(this.formulario)
    const date = this.formulario.fechaInicio
    const myFormat = 'YYYY-MM-DD'
    const myDate = moment(date, 'YYYYMMDDTHHmmss').format(myFormat);
    this.formulario.fechaInicio = myDate
    const date2 = this.formulario.fechaInicio
    const myDate2 = moment(date, 'YYYYMMDDTHHmmss').format(myFormat);
    this.formulario.fechaFin = myDate2;
    this.services.guardarProyecto(this.formulario).subscribe({
      complete: ()=> console.info('guardado')
    })
  }

  agregarEtiqueta(etiqueta:string):void {
    this.formulario.etiquetas.push(etiqueta)
    console.log(this.formulario.etiquetas)

  }


  agregarResponsable(responsable:string):void {
    this.formulario.responsables.push(responsable)
    console.log(this.formulario.responsables)

  }
}
