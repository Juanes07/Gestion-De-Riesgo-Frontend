import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { estadoSinCreado } from 'src/app/models/options.model';
import { proyecto } from 'src/app/models/proyecto-modelo.model';
import { ProyectoService } from 'src/app/service/proyecto-servicio.service';

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css']
})
export class EditarProyectoComponent implements OnInit {

  isLoading: boolean = true;
  etiquetshtml:string = '';
  estados = estadoSinCreado;


  liderHtml: string = '';

  responsableHtml: string='';

  modelo: proyecto = {
    id: 0,
    nombre: '',
    fechaInicio: '',
    fechaFin: '',
    etiquetas: [],
    responsables: [],
    descripcion: '',
    liderProyecto: '',
    estado: 'Creado',
  };

  constructor(
    private formBuilder: FormBuilder,
    private services: ProyectoService,
    private messageService: MessageService,
    private _location: Location,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.services.getProyectoById(params['id']).subscribe(data => {
        this.modelo = data;
        this.isLoading = false;
      });
    });
  }


  public form: FormGroup = new FormGroup({
    name: new FormControl ('', Validators.required),
    email: new FormControl( '',Validators.email),
    detalle: new FormControl ('', [Validators.required, Validators.minLength(5), Validators.maxLength(700)]),
    emailLider: new FormControl('', Validators.email),
  });


  eliminarResponsable(responsableIndex: number){
    this.modelo.responsables.forEach((value, index)=>{
      if(index == responsableIndex)
      this.modelo.responsables.splice(index,1);
    })
  }

  agregarEtiqueta(etiqueta: string): void {
    this.modelo.etiquetas.push(etiqueta);
    this.etiquetshtml = '';
  }


  eliminarEtiqueta(etiquetaIndex: number){
    this.modelo.etiquetas.forEach((value, index)=>{
      if(index == etiquetaIndex)
      this.modelo.etiquetas.splice(index,1);
    })
  }


  actualizarProyecto(modelo: proyecto){

    this.cambiarFormatoDate();
    if (
      (this.form.value.name.length <=50) &&
      (this.form.value.detalle.length <700)
    ) {
      this.services.actualizarProyecto(modelo).subscribe({});
      this.liderHtml = '';
      this.messageService.add({
        severity: 'success',
        summary: '!Exitoso¡',
        detail: 'Proyecto Guardado exitosamente',
      })
      setTimeout(() => {
          this._location.back();
      }, 1500);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Usuarios Registrado',
        detail: '(campos-vacios) validar campos requeridos',
      });
    }



  }

  cambiarFormatoDate() {
    const date = this.modelo.fechaInicio;
    const myFormat = 'YYYY-MM-DD';
    const myDate = moment(date, 'YYYYMMDDTHHmmss').format(myFormat);
    this.modelo.fechaInicio = myDate;
    const date2 = this.modelo.fechaFin;
    const myDate2 = moment(date2, 'YYYYMMDDTHHmmss').format(myFormat);
    if (myDate2 === 'Invalid date') {
      this.modelo.fechaFin = '';
    } else {
      this.modelo.fechaFin = myDate2;
    }
  }

  metodoComprobarFormatoCorreo(responsable: string) {
    let result = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
    let otra = result.test(responsable);
    return otra;
  }

  agregarResponsable(responsable: string): void {
    if (this.metodoComprobarFormatoCorreo(responsable)) {
      this.modelo.responsables.push(responsable);
      this.messageService.add({
        severity: 'succes',
        summary: '!Exitoso¡',
        detail: 'Responsable guardado ',
      });
      this.responsableHtml = '';
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Rectifique los datos',
        detail: 'Responsable no guardado (validar formato correo) ',
      });
    }
  }


}
