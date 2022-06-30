import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ProyectoService } from 'src/app/service/proyecto-servicio.service';

@Component({
  selector: 'app-riesgos',
  templateUrl: './riesgos.component.html',
  styleUrls: ['./riesgos.component.css']
})
export class RiesgosComponent implements OnInit {
  isLoading: boolean = true;

  items: MenuItem[] = [
    {
      label: 'Lista de Riesgos',
      icon: 'pi pi-fw pi-table',
      routerLink: ['lista'],
    },
    {
      label: 'Crear Riesgo',
      icon: 'pi pi-fw pi-plus-circle',
      routerLink: ['crear'],
    }];

  activeItem = this.items[0];

  constructor(private service: ProyectoService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.parent?.params.subscribe((params) => {
      this.service.getProyectoById(params['id']).subscribe((data) => {
        data.estado === 'Activo' || data.estado === 'Creado'
          ? (this.items[1].disabled = false)
          : (this.items[1].disabled = true);
          this.isLoading = false;
      });
    });
  }

}
