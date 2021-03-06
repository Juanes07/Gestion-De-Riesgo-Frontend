import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { riesgo } from 'src/app/models/riesgo-modelo.models';
import { LoginService } from 'src/app/service/login.service';
import { ProyectoService } from 'src/app/service/proyecto-servicio.service';

@Component({
  selector: 'app-detalle-riesgo',
  templateUrl: './detalle-riesgo.component.html',
  styleUrls: ['./detalle-riesgo.component.css'],
})
export class DetalleRiesgoComponent implements OnInit {
  riesgo!: riesgo;
  isLoading: boolean = true;
  isEditable: boolean = true;
  isDeleteable: boolean = false;
  criticidad: string = '';

  constructor(
    private route: ActivatedRoute,
    private services: ProyectoService,
    private router: Router,
    private auth: LoginService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.route.parent?.params.subscribe((params) => {
      this.services.getRiesgoById(params['id']).subscribe((data) => {
        this.riesgo = data;
        this.isLoading = false;

        (this.auth.getUser().rol === 'administrador' ||
          this.auth.getUser().rol === 'mantenedor') &&
        this.riesgo.estadoDeVidaDelRiesgo === 'Activo'
          ? (this.isEditable = true)
          : (this.isEditable = false);

        (this.auth.getUser().rol === 'administrador' ||
          this.auth.getUser().rol === 'mantenedor') &&
        this.riesgo.estadoDeVidaDelRiesgo !== 'Inactivo'
          ? (this.isDeleteable = true)
          : (this.isDeleteable = false);
      });
    });
  }

  deleteRiesgo() {
    if (this.riesgo.estadoDeVidaDelRiesgo === 'Activo') {
      this.services.eliminarRiesgo(this.riesgo.id).subscribe((data) => {});
      this.messageService.add({
        severity: 'success',
        summary: '!Exitoso¡',
        detail: 'Riesgo Eliminado Exitosamente',
      });
    } setTimeout(() => {
      window.location.reload();
    }, 1500);

  }

  getCriticidad(criticidad: number): string {
    return criticidad === 1 ? 'Bajo' : (criticidad === 2 ? 'Medio' : 'Alto');
  }
}
