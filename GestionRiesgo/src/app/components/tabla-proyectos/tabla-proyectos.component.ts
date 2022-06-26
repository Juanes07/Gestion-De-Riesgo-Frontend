import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
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

  statuses = [
    { label: 'Creado', value: 'creado' },
    { label: 'Activo', value: 'activo' },
    { label: 'Cancelado', value: 'cancelado' },
    { label: 'Pausado', value: 'pausado' },
    { label: 'Culminado', value: 'culminado' },
  ];

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
      // .sort((a, b) => {
      //   return a.id - b.id;
      // });
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
