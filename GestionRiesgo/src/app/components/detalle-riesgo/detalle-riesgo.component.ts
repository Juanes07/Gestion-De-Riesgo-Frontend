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
}
