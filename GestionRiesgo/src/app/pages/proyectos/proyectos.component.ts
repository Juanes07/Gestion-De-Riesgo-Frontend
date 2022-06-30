import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  items: MenuItem[] = [
    {
      label: 'Lista de Proyectos',
      icon: 'pi pi-fw pi-table',
      routerLink: ['lista'],
    },
    {
      label: 'Crear Proyecto',
      icon: 'pi pi-fw pi-plus-circle',
      routerLink: ['crear'],
      //disabled: true,
    },
  ];

  activeItem = this.items[0];

  constructor(
    private auth: LoginService
  ) {}

  ngOnInit() {
    if(this.auth.getUser().rol != 'administrador'){
      this.items[1].disabled = true
    }
  }
}
