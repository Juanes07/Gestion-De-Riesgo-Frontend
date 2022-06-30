import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import {
  Audiencias,
  Categorias,
  ImpactoDeOcurrenciaDelRiesgo,
  ProbabilidadOcurriencia,
  RiesgoStatuses,
  TipoRiesgos,
} from 'src/app/models/options.model';
import { riesgo } from 'src/app/models/riesgo-modelo.models';
import { ProyectoService } from 'src/app/service/proyecto-servicio.service';

@Component({
  selector: 'app-editar-riesgo',
  templateUrl: './editar-riesgo.component.html',
  styleUrls: ['./editar-riesgo.component.css'],
})
export class EditarRiesgoComponent implements OnInit {
  etiquetahtml: string = '';

  fechaHoy: Date = new Date();

  responsableMitigacionHtml: string = '';
  responsableContingenciaHtml: string = '';

  riesgo!: riesgo;
  isLoading: boolean = true;

  formuRiesgo: riesgo = {
    id: 0,
    idProyecto: 0,
    creadorRiesgo: '',
    nombreProyecto: '',
    nombreRiesgo: '',
    fechaDeteccion: '',
    fechaCierre: '',
    etiquetas: [],
    descripcionRiesgo: '',
    estadoRiesgo: '',
    audiencia: '',
    categoria: '',
    tipoRiesgo: '',
    detalleTipoRiesgo: '',
    probabilidadDeOcurrenciaDelRiesgo: 1,
    impactoDeOcurrenciaDelRiesgo: 1,
    descripcionPlanDeMitigacion: '',
    emailsPlanDeMitigacion: [],
    descripcionPlanDeContingencia: '',
    emailsPlanDeContingencia: [],
    valorCriticidad: 1,
    estadoDeVidaDelRiesgo: 'Activo',
  };

  audiencias = Audiencias;
  categorias = Categorias;
  tipoRiesgos = TipoRiesgos;
  ocurrenciariesgo = ProbabilidadOcurriencia;
  impactoDeOcurrenciaDelRiesgo = ImpactoDeOcurrenciaDelRiesgo;
  estadoRiesgo = RiesgoStatuses;

  /**
   * formulario validacion
   */
  public formRiesgo: FormGroup = new FormGroup({
    etiquetahtml: new FormControl('', Validators.minLength(2)),
    name: new FormControl('', [Validators.required]),
    detalle: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(699),
    ]),
    estadoRiesgo: new FormControl('', [Validators.required]),
    audiencia: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    TipoRiesgos: new FormControl('', Validators.required),
    DetalleTipoRiesgo: new FormControl('', [
      Validators.required,
      Validators.maxLength(499),
    ]),
    descripcionPlanDeMitigacion: new FormControl('', [
      Validators.required,
      Validators.maxLength(1000),
    ]),
    descripcionPlanDeContingencia: new FormControl('', [
      Validators.required,
      Validators.maxLength(1000),
    ]),
    emailsPlanMitigacion: new FormControl('', Validators.email),
    emailsPlanContingencia: new FormControl('', Validators.email),
  });

  constructor(
    private route: ActivatedRoute,
    private services: ProyectoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe((params) => {
      this.services.getRiesgoById(params['id']).subscribe((data) => {
        this.formuRiesgo = data;
        this.isLoading = false;
      });
    });
  }

  /**
   * Metodo para agregar dentro del array de etiquetas
   * @param etiqueta string
   */
  agregarEtiqueta(etiqueta: string): void {
    this.formuRiesgo.etiquetas.push(etiqueta);
  }

  eliminarEtiqueta(etiquetaIndex: number) {
    this.formuRiesgo.etiquetas.forEach((value, index) => {
      if (index == etiquetaIndex) this.formuRiesgo.etiquetas.splice(index, 1);
    });
  }

  agregarResponsableMitigacion(emailPlanMitigacion: string): void {
    if (this.metodoComprobarFormatoCorreo(emailPlanMitigacion)) {
      this.formuRiesgo.emailsPlanDeMitigacion.push(emailPlanMitigacion);
      this.messageService.add({
        severity: 'succes',
        summary: '!Exitoso¡',
        detail: 'Responsable guardado ',
      });
      console.log(this.formuRiesgo.emailsPlanDeMitigacion);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Rectifique los datos',
        detail: 'Responsable no guardado (validar formato correo) ',
      });
    }
    this.responsableMitigacionHtml = '';
  }

  eliminarResponsableMitigacion(responsableIndex: number) {
    this.formuRiesgo.emailsPlanDeMitigacion.forEach((value, index) => {
      if (index == responsableIndex)
        this.formuRiesgo.emailsPlanDeMitigacion.splice(index, 1);
    });
    console.log(this.formuRiesgo.emailsPlanDeMitigacion);
  }

  agregarResponsableContingencia(emailPlanMitigacion: string): void {
    if (this.metodoComprobarFormatoCorreo(emailPlanMitigacion)) {
      this.formuRiesgo.emailsPlanDeContingencia.push(emailPlanMitigacion);
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
    this.responsableContingenciaHtml = '';
  }

  eliminarResponsableContingencia(responsableIndex: number) {
    this.formuRiesgo.emailsPlanDeContingencia.forEach((value, index) => {
      if (index == responsableIndex)
        this.formuRiesgo.emailsPlanDeContingencia.splice(index, 1);
    });
    console.log(this.formuRiesgo.emailsPlanDeContingencia);
  }

  metodoComprobarFormatoCorreo(responsable: string) {
    let result = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
    let otra = result.test(responsable);
    return otra;
  }

  actualizarRiesgo(riesgo: riesgo): void {
    this.cambiarFormatoDate();
    if (
      this.formRiesgo.value.name.length <= 50 &&
      this.formRiesgo.value.detalle.length < 700 &&
      this.formRiesgo.value.estadoRiesgo &&
      this.formRiesgo.value.audiencia &&
      this.formRiesgo.value.categoria &&
      this.formRiesgo.value.TipoRiesgos &&
      this.formRiesgo.value.DetalleTipoRiesgo.length < 499 &&
      this.formRiesgo.value.descripcionPlanDeMitigacion.length < 1000 &&
      this.formRiesgo.value.descripcionPlanDeContingencia.length < 1000
    ) {
      this.services.actualizarRiesgo(riesgo).subscribe({});
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

  cambiarFormatoDate() {
    const date = this.formuRiesgo.fechaDeteccion;
    const myFormat = 'YYYY-MM-DD';
    const myDate = moment(date, 'YYYYMMDDTHHmmss').format(myFormat);
    this.formuRiesgo.fechaDeteccion = myDate;
    const date2 = this.formuRiesgo.fechaCierre;
    const myDate2 = moment(date2, 'YYYYMMDDTHHmmss').format(myFormat);
    if (myDate2 === 'Invalid date') {
      this.formuRiesgo.fechaCierre = '';
    } else {
      this.formuRiesgo.fechaCierre = myDate2;
    }
  }

  actualizarValorCriticidad(event: Event) {
    let probabilidad = this.formuRiesgo.probabilidadDeOcurrenciaDelRiesgo;
    let impacto = this.formuRiesgo.impactoDeOcurrenciaDelRiesgo;
    let resultado = probabilidad * impacto;
    if (resultado < 5) {
      if (probabilidad === 1 && impacto === 4) {
        this.formuRiesgo.valorCriticidad = 2;
      } else {
        this.formuRiesgo.valorCriticidad = 1;
      }
    } else if (resultado >= 5 && resultado <= 10) {
      if (probabilidad === 2 && impacto === 5) {
        this.formuRiesgo.valorCriticidad = 3;
      } else {
        this.formuRiesgo.valorCriticidad = 2;
      }
    } else if (resultado >= 10) {
      this.formuRiesgo.valorCriticidad = 3;
    }
  }
}
