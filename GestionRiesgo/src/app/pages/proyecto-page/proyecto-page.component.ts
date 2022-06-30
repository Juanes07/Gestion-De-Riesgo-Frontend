import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-proyecto-page',
  templateUrl: './proyecto-page.component.html',
  styleUrls: ['./proyecto-page.component.css'],
})
export class ProyectoPageComponent implements OnInit {
  items: MenuItem[] = [];

  activeItem = this.items[1];

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        label: 'Volver',
        icon: 'pi pi-fw pi-arrow-left',
        routerLink: ['/proyectos'],
      },
      {
        label: 'Detalle de Proyecto',
        icon: 'pi pi-fw pi-file',
        routerLink: ['detalle'],
      },
      {
        label: 'Lista de Riesgos',
        icon: 'pi pi-fw pi-list',
        routerLink: ['riesgos'],
      },
      {
        label: 'Matriz de Riesgos',
        icon: 'pi pi-fw pi-table',
        routerLink: ['matriz'],
      },
    ];
  }
}
