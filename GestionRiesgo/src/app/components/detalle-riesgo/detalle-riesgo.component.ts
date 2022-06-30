import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private auth: LoginService
  ) {}

  ngOnInit() {
    this.route.parent?.params.subscribe((params) => {
      this.services.getRiesgoById(params['id']).subscribe((data) => {
        this.riesgo = data;
        this.isLoading = false;
        this.riesgo.estadoDeVidaDelRiesgo === 'Activo' &&
        (this.auth.getUser().rol === 'administrador' ||
          this.auth.getUser().rol === 'mantenedor')
          ? (this.isDeleteable = true)
          : (this.isDeleteable = false);
      });
    });
  }

  deleteRiesgo() {
    if (this.riesgo.estadoDeVidaDelRiesgo === 'Activo') {
      this.services.eliminarRiesgo(this.riesgo.id).subscribe((data) => {});
    }
  }

  getCriticidad(probabilidad: number, impacto: number) {
    if (probabilidad == 1 && impacto == 1) {
      return 'Bajo';
    } else if (probabilidad == 2 && impacto == 1) {
      return 'Bajo';
    } else if (probabilidad == 3 && impacto == 1) {
      return 'Bajo';
    } else if (probabilidad == 4 && impacto == 1) {
      return 'Bajo';
    } else if (probabilidad == 1 && impacto == 2) {
      return 'Bajo';
    } else if (probabilidad == 2 && impacto == 2) {
      return 'Bajo';
    } else if (probabilidad == 1 && impacto == 3) {
      return 'Bajo';
    } else if (probabilidad == 5 && impacto == 1) {
      return 'Medio';
    } else if (probabilidad == 5 && impacto == 2) {
      return 'Medio';
    } else if (probabilidad == 4 && impacto == 2) {
      return 'Medio';
    } else if (probabilidad == 3 && impacto == 2) {
      return 'Medio';
    } else if (probabilidad == 3 && impacto == 3) {
      return 'Medio';
    } else if (probabilidad == 2 && impacto == 3) {
      return 'Medio';
    } else if (probabilidad == 2 && impacto == 4) {
      return 'Medio';
    } else if (probabilidad == 1 && impacto == 4) {
      return 'Medio';
    } else if (probabilidad == 1 && impacto == 5) {
      return 'Medio';
    } else if (probabilidad == 5 && impacto == 3) {
      return 'Alto';
    } else if (probabilidad == 4 && impacto == 3) {
      return 'Alto';
    } else if (probabilidad ==5 && impacto == 4) {
      return 'Alto';
    } else if (probabilidad == 4 && impacto == 4) {
      return 'Alto';
    } else if (probabilidad == 3 && impacto == 4) {
      return 'Alto';
    } else if (probabilidad == 5 && impacto == 5) {
      return 'Alto';
    } else if (probabilidad == 4 && impacto == 5) {
      return 'Alto';
    } else if (probabilidad == 3 && impacto == 5) {
      return 'Alto';
    } else if (probabilidad == 2 && impacto == 5) {
      return 'Alto';
    }
    return "No definido";
  }
}
