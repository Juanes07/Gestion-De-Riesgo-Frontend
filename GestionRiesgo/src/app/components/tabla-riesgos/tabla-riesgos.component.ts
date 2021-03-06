import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { riesgo } from 'src/app/models/riesgo-modelo.models';
import { ProyectoService } from 'src/app/service/proyecto-servicio.service';
import {
  Categorias,
  Audiencias,
  RiesgoStatuses,
  RiesgoLifeStatuses,
  CriticidadesRiesgo,
  TipoRiesgos,
} from 'src/app/models/options.model';

@Component({
  selector: 'app-tabla-riesgos',
  templateUrl: './tabla-riesgos.component.html',
  styleUrls: ['./tabla-riesgos.component.css'],
})
export class TablaRiesgosComponent implements OnInit {
  riesgos: riesgo[];

  first = 0;
  rows = 30;

  loading: boolean = true;

  // Options dropwdowns
  categorias = Categorias;
  audiencias = Audiencias;
  statuses = RiesgoStatuses;
  lifeStatuses = RiesgoLifeStatuses;
  criticidades = CriticidadesRiesgo;
  tipoRiesgos = TipoRiesgos;

  constructor(
    private route: ActivatedRoute,
    private services: ProyectoService
  ) {
    this.riesgos = new Array<riesgo>();
  }

  ngOnInit(): void {
    this.route.parent?.parent?.params.subscribe((params) => {
      this.services.getRiesgosByProyectoId(params['id']).subscribe((data) => {
        this.riesgos = data;
        this.loading = false;
      });
    });
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.riesgos ? this.first === this.riesgos.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.riesgos ? this.first === 0 : true;
  }

  riskPage(id: any){
  }

  getCriticidad(criticidad: number): string {
    return criticidad === 1 ? 'Bajo' : (criticidad === 2 ? 'Medio' : 'Alto');
  }
}
