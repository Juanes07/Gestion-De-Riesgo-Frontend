import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-riesgos-page',
  templateUrl: './riesgos-page.component.html',
  styleUrls: ['./riesgos-page.component.css']
})
export class RiesgosPageComponent implements OnInit {

  items: MenuItem[] = [];

  activeItem = this.items[0];

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        label: 'Lista de Riesgos',
        icon: 'pi pi-fw pi-table',
        routerLink: ['lista'],
      },
      {
        label: 'Crear Riesgo',
        icon: 'pi pi-fw pi-plus-circle',
        routerLink: ['crear'],
      },
    ]
    //this.items[1].disabled = true;
  }
}
