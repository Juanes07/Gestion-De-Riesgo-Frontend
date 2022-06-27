import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { riesgo } from 'src/app/models/riesgo-modelo.models';
import { ProyectoService } from 'src/app/service/proyecto-servicio.service';

@Component({
  selector: 'app-form-crear-riesgo',
  templateUrl: './form-crear-riesgo.component.html',
  styleUrls: ['./form-crear-riesgo.component.css']
})
export class FormCrearRiesgoComponent implements OnInit {

  etiquetshtml: string = '';

  audiencia = [
    { label: 'Interno', value: 'interno' },
    { label: 'Externo', value: 'externo' },

  ];

  audienciaHtml:string = '';


  categoria = [
    { label: 'Costo', value: 'costo' },
    { label: 'Tiempo', value: 'Tiempo' },
    { label: 'Calidad', value: 'Calidad' },
  ];

  categoriaHtml:string = '';

  TipoRiesgo = [
    { label: 'Riesgo de Producto o calidad', value: 'Riesgo de Producto o calidad' },
    { label: 'Riesgo de Proyecto', value: 'Riesgo de Proyecto' },
  ];


  formuRiesgo: riesgo = {
    id: null,
    idProyecto: null,
    nombreProyecto: '',
    nombreRiesgo: '',
    fechaDeteccion:'',
    fechaCierre:'',
    etiquetas:[],
    descripcionRiesgo:'',
    estadoRiesgo:'Activo',
    audiencia:'',
    categoria:'',
    detalleTipoRiesgo:'',
    probabilidadDeOcurrenciaDelRiesgo:1,
    impactoDeOcurrenciaDelRiesgo:1,
    descripcionPlanDeMitigacion:'',
    emailsPlanMitigacion:'',
    descripcionPlanDeContingencia:'',
    emailsPlanContingencia:[],
    valorCriticidad:1,
    estadoDeVidaDelRiesgo:'',
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private services: ProyectoService,
    private messageService: MessageService
  ) {}

  public formRiesgo: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: [Validators.email],
    fecha: ['',[Validators.required]],
    detalle:['',[Validators.required, Validators.minLength(5)]]
  });


  ngOnInit(): void {

  }


  agregarEtiqueta(etiqueta: string): void {
    this.formuRiesgo.etiquetas.push(etiqueta);
    console.log(this.formuRiesgo.etiquetas);
  }

}
