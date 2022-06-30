import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { riesgo } from 'src/app/models/riesgo-modelo.models';
import { ProyectoService } from 'src/app/service/proyecto-servicio.service';
import {
  Categorias,
  Audiencias,
  RiesgoStatuses,
  RiesgoLifeStatuses,
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
    console.log("go to page");
  }

  getCriticidad(probabilidad: number, impacto: number) {
    if (probabilidad == 1 && impacto == 1) {
      return 'Bajo';
    } else if (probabilidad == 2 && impacto == 1) {
      return 'Bajo';
    } else if (probabilidad == 3 && impacto == 1) {
      return 'Bajo';
    } else if (probabilidad == 4 && impacto == 1) {
      return 'Bajo';
    } else if (probabilidad == 1 && impacto == 2) {
      return 'Bajo';
    } else if (probabilidad == 2 && impacto == 2) {
      return 'Bajo';
    } else if (probabilidad == 1 && impacto == 3) {
      return 'Bajo';
    } else if (probabilidad == 5 && impacto == 1) {
      return 'Medio';
    } else if (probabilidad == 5 && impacto == 2) {
      return 'Medio';
    } else if (probabilidad == 4 && impacto == 2) {
      return 'Medio';
    } else if (probabilidad == 3 && impacto == 2) {
      return 'Medio';
    } else if (probabilidad == 3 && impacto == 3) {
      return 'Medio';
    } else if (probabilidad == 2 && impacto == 3) {
      return 'Medio';
    } else if (probabilidad == 2 && impacto == 4) {
      return 'Medio';
    } else if (probabilidad == 1 && impacto == 4) {
      return 'Medio';
    } else if (probabilidad == 1 && impacto == 5) {
      return 'Medio';
    } else if (probabilidad == 5 && impacto == 3) {
      return 'Alto';
    } else if (probabilidad == 4 && impacto == 3) {
      return 'Alto';
    } else if (probabilidad ==5 && impacto == 4) {
      return 'Alto';
    } else if (probabilidad == 4 && impacto == 4) {
      return 'Alto';
    } else if (probabilidad == 3 && impacto == 4) {
      return 'Alto';
    } else if (probabilidad == 5 && impacto == 5) {
      return 'Alto';
    } else if (probabilidad == 4 && impacto == 5) {
      return 'Alto';
    } else if (probabilidad == 3 && impacto == 5) {
      return 'Alto';
    } else if (probabilidad == 2 && impacto == 5) {
      return 'Alto';
    }
    return "No definido";
  }
}
