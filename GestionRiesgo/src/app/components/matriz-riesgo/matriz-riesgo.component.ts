import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
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

  estado!: string[];

  cols!: any[];

  _selectedEstados!: any[];

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
    this.metodoInicial();

    this.cols = [
      { field: 'Abierto', header: 'Abierto' },
      { field: 'Mitigado', header: 'Mitigado' },
      { field: 'Cerrado', header: 'Cerrado' },
      { field: 'Problema', header: 'Problema' },
    ];

    this._selectedEstados = this.cols;
  }

  @Input() get selectedEstados(): any[] {
    return this._selectedEstados;
  }

  set selectedEstados(val: any[]) {
    this.matrizBi = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    // restaura orden original
    this._selectedEstados = this.cols.filter((col) => val.includes(col));
    this._selectedEstados.forEach((col) => {
      if (col.field === 'Abierto') {
        this.metodoAbierto();
      } else if (col.field === 'Mitigado') {
        this.metodoMitigado();
      } else if (col.field === 'Cerrado') {
        this.metodoCerrado();
      } else if (col.field === 'Problema') {
        this.metodoProblema();
      } else if (col.field === 'Todos') {
        this.metodoInicial();
      }
    });
  }

  metodoInicial() {
    this.route.parent?.params.subscribe((params) => {
      this.service.getRiesgosByProyectoId(params['id']).subscribe((data) => {
        for (let riesgo = 0; riesgo < data.length; riesgo++) {
          this.riesgo = data[riesgo];
          if ((this.riesgo.estadoDeVidaDelRiesgo === 'Activo' ||
          this.riesgo.estadoDeVidaDelRiesgo === 'activo')){
          for (let fila = 0; fila < this.matrizBi.length; fila++) {
            for (let columna = 0; columna < this.matrizBi.length; columna++) {
              if (
                this.riesgo.probabilidadDeOcurrenciaDelRiesgo - 1 == fila &&
                this.riesgo.impactoDeOcurrenciaDelRiesgo - 1 == columna
              ) {
                this.matrizBi[fila][columna] += 1;
              }
            }
          }
        }
      }
      });
    });
  }

  metodoAbierto() {
    this.route.parent?.params.subscribe((params) => {
      this.service.getRiesgosByProyectoId(params['id']).subscribe((data) => {
        for (let riesgo = 0; riesgo < data.length; riesgo++) {
          this.riesgo = data[riesgo];
          if (
            this.riesgo.estadoRiesgo === 'Abierto' &&
            (this.riesgo.estadoDeVidaDelRiesgo === 'Activo' ||
              this.riesgo.estadoDeVidaDelRiesgo === 'activo')
          ) {
            for (let fila = 0; fila < this.matrizBi.length; fila++) {
              for (let columna = 0; columna < this.matrizBi.length; columna++) {
                if (
                  this.riesgo.probabilidadDeOcurrenciaDelRiesgo - 1 == fila &&
                  this.riesgo.impactoDeOcurrenciaDelRiesgo - 1 == columna
                ) {
                  this.matrizBi[fila][columna] += 1;
                }
              }
            }
          }
        }
      });
    });
  }

  metodoMitigado() {
    this.route.parent?.params.subscribe((params) => {
      this.service.getRiesgosByProyectoId(params['id']).subscribe((data) => {
        for (let riesgo = 0; riesgo < data.length; riesgo++) {
          this.riesgo = data[riesgo];
          if (
            this.riesgo.estadoRiesgo === 'Mitigado' &&
            (this.riesgo.estadoDeVidaDelRiesgo === 'Activo' ||
              this.riesgo.estadoDeVidaDelRiesgo === 'activo')
          ) {
            for (let fila = 0; fila < this.matrizBi.length; fila++) {
              for (let columna = 0; columna < this.matrizBi.length; columna++) {
                if (
                  this.riesgo.probabilidadDeOcurrenciaDelRiesgo - 1 == fila &&
                  this.riesgo.impactoDeOcurrenciaDelRiesgo - 1 == columna
                ) {
                  this.matrizBi[fila][columna] += 1;
                }
              }
            }
          }
        }
      });
    });
  }

  metodoCerrado() {
    this.route.parent?.params.subscribe((params) => {
      this.service.getRiesgosByProyectoId(params['id']).subscribe((data) => {
        for (let riesgo = 0; riesgo < data.length; riesgo++) {
          this.riesgo = data[riesgo];
          if (
            this.riesgo.estadoRiesgo === 'Cerrado' &&
            (this.riesgo.estadoDeVidaDelRiesgo === 'Activo' ||
              this.riesgo.estadoDeVidaDelRiesgo === 'activo')
          ) {
            for (let fila = 0; fila < this.matrizBi.length; fila++) {
              for (let columna = 0; columna < this.matrizBi.length; columna++) {
                if (
                  this.riesgo.probabilidadDeOcurrenciaDelRiesgo - 1 == fila &&
                  this.riesgo.impactoDeOcurrenciaDelRiesgo - 1 == columna
                ) {
                  this.matrizBi[fila][columna] += 1;
                }
              }
            }
          }
        }
      });
    });
  }

  metodoProblema() {
    this.route.parent?.params.subscribe((params) => {
      this.service.getRiesgosByProyectoId(params['id']).subscribe((data) => {
        for (let riesgo = 0; riesgo < data.length; riesgo++) {
          this.riesgo = data[riesgo];
          if (
            this.riesgo.estadoRiesgo === 'Problema' &&
            (this.riesgo.estadoDeVidaDelRiesgo === 'Activo' ||
              this.riesgo.estadoDeVidaDelRiesgo === 'activo')
          ) {
            for (let fila = 0; fila < this.matrizBi.length; fila++) {
              for (let columna = 0; columna < this.matrizBi.length; columna++) {
                if (
                  this.riesgo.probabilidadDeOcurrenciaDelRiesgo - 1 == fila &&
                  this.riesgo.impactoDeOcurrenciaDelRiesgo - 1 == columna
                ) {
                  this.matrizBi[fila][columna] += 1;
                }
              }
            }
          }
        }
      });
    });
  }
}
