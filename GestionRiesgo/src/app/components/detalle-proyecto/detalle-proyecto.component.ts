import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { proyecto } from 'src/app/models/proyecto-modelo.model';
import { LoginService } from 'src/app/service/login.service';
import { ProyectoService } from 'src/app/service/proyecto-servicio.service';
import { EditarProyectoComponent } from '../editar-proyecto/editar-proyecto.component';

@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.component.html',
  styleUrls: ['./detalle-proyecto.component.css'],
})
export class DetalleProyectoComponent implements OnInit {
  proyecto!: proyecto;
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
      this.services.getProyectoById(params['id']).subscribe((data) => {
        this.proyecto = data;
        this.isLoading = false;
        this.proyecto.estado === 'Creado' &&
        (this.auth.getUser().rol === 'administrador' ||
          this.auth.getUser().rol === 'mantenedor')
          ? (this.isDeleteable = true)
          : (this.isDeleteable = false);
      });
    });
  }



  deleteProyecto() {
    if (this.proyecto.estado === 'Creado') {
      this.services.eliminarProyecto(this.proyecto.id).subscribe((data) => {
        this.router.navigate(['/proyectos']);
      });
    }
  }
}
