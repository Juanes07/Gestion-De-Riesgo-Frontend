import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  items =  [
    {
      label: 'Lista de Proyectos',
      icon: 'pi pi-fw pi-table',
      routerLink: ['lista'],
    },
    {
      label: 'Crear Proyecto',
      icon: 'pi pi-fw pi-plus-circle',
      routerLink: ['crear'],
    },
  ];

  activeItem = this.items[0];

  constructor() {}

  ngOnInit() {}
}
