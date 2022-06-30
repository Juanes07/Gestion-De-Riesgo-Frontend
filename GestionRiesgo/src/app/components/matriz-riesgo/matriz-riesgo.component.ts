import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { riesgo } from 'src/app/models/riesgo-modelo.models';
import { ProyectoService } from 'src/app/service/proyecto-servicio.service';

@Component({
  selector: 'app-matriz-riesgo',
  templateUrl: './matriz-riesgo.component.html',
  styleUrls: ['./matriz-riesgo.component.css'],
})
export class MatrizRiesgoComponent implements OnInit {
  riesgo!: riesgo;

  matrizBi: Array<Array<number>> = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  constructor(
    private service: ProyectoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.metodo();
  }

  metodo() {
    this.route.parent?.params.subscribe((params) => {
      this.service.getRiesgosByProyectoId(params['id']).subscribe((data) => {
        for (let riesgo = 0; riesgo < data.length; riesgo++) {
          this.riesgo = data[riesgo];
          for (let fila = 0; fila < this.matrizBi.length; fila++) {
            for (let columna = 0; columna < this.matrizBi.length; columna++) {
              if (
                this.riesgo.probabilidadDeOcurrenciaDelRiesgo -1 == fila &&
                this.riesgo.impactoDeOcurrenciaDelRiesgo -1 == columna
              ) {
                this.matrizBi[fila][columna] += 1;
              }
            }
          }
        }
        console.log(this.matrizBi);
      });
    });
  }
}
