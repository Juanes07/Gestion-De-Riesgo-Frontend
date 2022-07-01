import { Component, OnInit } from '@angular/core';
import { ProyectoStatuses } from 'src/app/models/options.model';
import { proyecto } from 'src/app/models/proyecto-modelo.model';
import { ProyectoService } from 'src/app/service/proyecto-servicio.service';

@Component({
  selector: 'app-tabla-proyectos',
  templateUrl: './tabla-proyectos.component.html',
  styleUrls: ['./tabla-proyectos.component.css'],
})
export class TablaProyectosComponent implements OnInit {
  proyectos: proyecto[];

  first = 0;
  rows = 20;

  statuses = ProyectoStatuses;

  loading: boolean = true;

  constructor(private services: ProyectoService) {
    this.proyectos = new Array<proyecto>();
  }

  ngOnInit(): void {
    this.getProyectos();
  }

  getProyectos() {
    this.services.getProyectos().subscribe((data) => {
      this.proyectos = data
      this.loading = false;
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
    return this.proyectos
      ? this.first === this.proyectos.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.proyectos ? this.first === 0 : true;
  }
}
