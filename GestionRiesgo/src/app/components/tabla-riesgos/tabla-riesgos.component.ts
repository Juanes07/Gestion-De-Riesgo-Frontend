import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ProyectoService } from 'src/app/service/proyecto-servicio.service';

@Component({
  selector: 'app-tabla-riesgos',
  templateUrl: './tabla-riesgos.component.html',
  styleUrls: ['./tabla-riesgos.component.css']
})
export class TablaRiesgosComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private services: ProyectoService) { }

  ngOnInit(): void {
    this.route.parent?.parent?.params.subscribe(params => {
      this.services.getRiesgosByProyectoId(params['id']).subscribe(data => {
        console.log(data);
      });
    });
  }

}
