import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/service/roles.service';
import { MessageService } from 'primeng/api';
import { UserId } from 'src/app/models/userid.model';
import { RolesStatuses } from 'src/app/models/options.model';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  styleUrls: ['./roles.component.css'],
})

/**
 * Componente que muestra la lista de roles
 */
export class RolesComponent implements OnInit {
  public displayModal: boolean = false;
  statuses = RolesStatuses;

  page: number = 0;

  usuarios: UserId[] = [];
  usuario: UserId = {
    id: 0,
    nombre: '',
    email: '',
    roles: [],
  };
  selectedUser: UserId[] = [];
  submitted: boolean = false;
  loading: boolean = true;

  constructor(
    private rolesService: RolesService,
    private messageService: MessageService
  ) {
    this.usuarios = new Array<UserId>();
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  openNew() {
    this.usuario = {
      id: 0,
      nombre: '',
      email: '',
      roles: [],
    };
    this.submitted = false;
  }

  getUsuarios() {
    this.rolesService.getUsuarios().subscribe((res) => {
      this.usuarios = res;
    });
    this.loading = false;
  }

  editUser(user: UserId) {
    try {
      this.usuario = { ...this.usuario };
      const response = this.rolesService.updateUsuarios(user);
      response.subscribe((res) => {});
      this.usuario = {
        id: 0,
        nombre: '',
        email: '',
        roles: [],
      };
      this.messageService.add({
        severity: 'success',
        summary: 'Usuario actualizado',
        detail: 'El usuario ha sido actualizado correctamente',
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo actualizar el usuario',
      });
    }
    window.location.reload();
  }

  showModalDialog(usuarios:any) {
    this.displayModal = true;
    this.usuario = {
      id: usuarios.id,
      nombre: usuarios.nombre,
      email: usuarios.email,
      roles: usuarios.roles,
    };
  }

  hideDialog() {
    this.displayModal = false;
    this.submitted = false;
  }

}
