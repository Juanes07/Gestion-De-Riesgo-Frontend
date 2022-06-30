import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-riesgo-page',
  templateUrl: './riesgo-page.component.html',
  styleUrls: ['./riesgo-page.component.css']
})
export class RiesgoPageComponent implements OnInit {

  items: MenuItem[] = [
    {
      label: 'Detalle de Riesgo',
      icon: 'pi pi-fw pi-file',
      routerLink: ['detalle'],
    }
  ]

  activeItem = this.items[0];

  constructor() {}

  ngOnInit() {
    /*
    private auth: LoginService
    this.items
    if(this.auth.getUser().rol != 'administrador' || this.auth.getUser().rol != 'mantenedor'){
      this.items[1].disabled = false
    } */
  }
}
