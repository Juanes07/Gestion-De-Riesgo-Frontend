import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { proyecto } from 'src/app/models/proyecto-modelo.model';
import { ProyectoService } from 'src/app/service/proyecto-servicio.service';

@Component({
  selector: 'app-form-crear-proyecto',
  templateUrl: './form-crear-proyecto.component.html',
  styleUrls: ['./form-crear-proyecto.component.css'],
})
export class FormCrearProyectoComponent implements OnInit {
  responsable: [] = [];

  etiquetshtml: string = '';

  responsableHtml: string = '';
  liderHtml: string = '';



  formulario: proyecto = {
    id: 0,
    nombre: '',
    fechaInicio: '',
    fechaFin: '',
    etiquetas: [],
    responsables: [],
    descripcion: '',
    liderProyecto: '',
    estado: 'creado',
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private services: ProyectoService,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  public form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.email],
    fecha: ['', [Validators.required]],
    detalle: ['', [Validators.required, Validators.minLength(5)]],
    emailLider: ['', [Validators.email]],
  });

  guardarProyecto(proyecto: proyecto): void {
    this.cambiarFormatoDate();
    if (
      this.form.value.name &&
      this.form.value.fecha &&
      this.form.value.detalle
    ) {
      this.services.guardarProyecto(this.formulario).subscribe({});
      this.liderHtml = '';
      this.messageService.add({
        severity: 'success',
        summary: '!Exitoso¡',
        detail: 'Proyecto Guardado exitosamente',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Usuarios Registrado',
        detail: '(campos-vacios) validar campos requeridos',
      });
    }
  }

  agregarEtiqueta(etiqueta: string): void {
    this.formulario.etiquetas.push(etiqueta);
    this.etiquetshtml = '';
  }

  agregarResponsable(responsable: string): void {
    if (this.metodoComprobarFormatoCorreo(responsable)) {
      this.formulario.responsables.push(responsable);
      this.messageService.add({
        severity: 'succes',
        summary: '!Exitoso¡',
        detail: 'Responsable guardado ',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Rectifique los datos',
        detail: 'Responsable no guardado (validar formato correo) ',
      });
    }
  }

  eliminarResponsable(responsableIndex: number){
    this.formulario.responsables.forEach((value, index)=>{
      if(index == responsableIndex)
      this.formulario.responsables.splice(index,1);
    })
  }

  agregarLider(responsable: string): void {
    if (this.metodoComprobarFormatoCorreo(responsable)) {
      this.formulario.liderProyecto = responsable;
      this.messageService.add({
        severity: 'succes',
        summary: '!Exitoso¡',
        detail: 'Responsable guardado ',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Rectifique los datos',
        detail: 'Responsable no guardado (validar formato correo) ',
      });
    }
  }

  metodoComprobarFormatoCorreo(responsable: string) {
    let result = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
    let otra = result.test(responsable);
    return otra;
  }

  cambiarFormatoDate() {
    const date = this.formulario.fechaInicio;
    const myFormat = 'YYYY-MM-DD';
    const myDate = moment(date, 'YYYYMMDDTHHmmss').format(myFormat);
    this.formulario.fechaInicio = myDate;
    const date2 = this.formulario.fechaFin;
    const myDate2 = moment(date2, 'YYYYMMDDTHHmmss').format(myFormat);
    if (myDate2 === 'Invalid date') {
      this.formulario.fechaFin = '';
    } else {
      this.formulario.fechaFin = myDate2;
    }
  }
}
