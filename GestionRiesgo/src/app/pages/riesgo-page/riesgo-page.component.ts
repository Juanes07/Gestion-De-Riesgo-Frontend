import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-riesgo-page',
  templateUrl: './riesgo-page.component.html',
  styleUrls: ['./riesgo-page.component.css']
})
export class RiesgoPageComponent implements OnInit {

  items: MenuItem[] = [];

  activeItem = this.items[0];

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        label: 'Detalle de Riesgo',
        icon: 'pi pi-fw pi-file',
        routerLink: ['detalle'],
      },
      {
        label: 'Editar Riesgo',
        icon: 'pi pi-fw pi-pencil',
        routerLink: ['edit'],
      },
    ]
    //this.items[1].disabled = true;
  }
}
