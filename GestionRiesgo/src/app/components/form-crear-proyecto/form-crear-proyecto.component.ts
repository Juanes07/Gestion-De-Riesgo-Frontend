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

  idnumero: number = 0;
  responsable:[] = [];

  formulario: proyecto = {
    id: this.idnumero,
    nombre: '',
    fechaInicio: '',
    fechaFin: '',
    etiquetas: [],
    responsables: [],
    descripcion: '',
    liderProyecto: '',
    estado: 'creado',
  };

  etiquetshtml: string = '';

  responsableHtml: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private services: ProyectoService,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  public form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.email]],
    fecha: ['',[Validators.required]],
    detalle:['',[Validators.required, Validators.minLength(5)]]
  });

  guardarProyecto(proyecto: proyecto): void {
    this.cambiarFormatoDate();
    this.idnumero +=1;
    this.formulario.id = this.idnumero
    if (this.form.value.name && this,this.form.value.fecha) {
      this.services.guardarProyecto(this.formulario).subscribe({});
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
    console.log(this.formulario);
  }

  agregarEtiqueta(etiqueta: string): void {
    this.formulario.etiquetas.push(etiqueta);
    console.log(this.formulario.etiquetas);
  }


  agregarResponsable(responsable: string): void {
    if (this.form.value.email) {
      this.formulario.responsables.push(responsable);
      console.log(this.formulario.responsables);
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



  cambiarFormatoDate() {
    const date = this.formulario.fechaInicio;
    const myFormat = 'YYYY-MM-DD';
    const myDate = moment(date, 'YYYYMMDDTHHmmss').format(myFormat);
    this.formulario.fechaInicio = myDate;
    const date2 = this.formulario.fechaFin;
    const myDate2 = moment(date2, 'YYYYMMDDTHHmmss').format(myFormat);
    if(myDate2 === 'Invalid date'){
      this.formulario.fechaFin = ''
    } else {
      this.formulario.fechaFin = myDate2;
    }
  }
}
