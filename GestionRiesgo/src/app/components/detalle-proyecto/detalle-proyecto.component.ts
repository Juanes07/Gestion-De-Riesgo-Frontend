import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { proyecto } from 'src/app/models/proyecto-modelo.model';
import { ProyectoService } from 'src/app/service/proyecto-servicio.service';

@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.component.html',
  styleUrls: ['./detalle-proyecto.component.css']
})
export class DetalleProyectoComponent implements OnInit {
  proyecto!: proyecto;

  constructor(
    private route: ActivatedRoute,
    private services: ProyectoService) { }

  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      this.services.getProyectoById(params['id']).subscribe(data => {
        this.proyecto = data;
      });
    });

  }


}
