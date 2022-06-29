import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { riesgo } from 'src/app/models/riesgo-modelo.models';
import { ProyectoService } from 'src/app/service/proyecto-servicio.service';

@Component({
  selector: 'app-detalle-riesgo',
  templateUrl: './detalle-riesgo.component.html',
  styleUrls: ['./detalle-riesgo.component.css']
})
export class DetalleRiesgoComponent implements OnInit {

  riesgo!: riesgo;
  isLoading: boolean = true;
  isEditable: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private services: ProyectoService) { }

  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      this.services.getRiesgoById(params['id']).subscribe(data => {
        this.riesgo = data;
        this.isLoading = false;
      });
    });

  }

}
