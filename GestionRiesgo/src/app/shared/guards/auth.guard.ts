import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProyectoService } from 'src/app/service/proyecto-servicio.service';
import { LoginService } from '../../service/login.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private loginService: LoginService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.loginService.isAdmin;
  }
}

@Injectable({
  providedIn: 'root',
})
export class LectorGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private proyectoService: ProyectoService,
    private router: Router
  ) {}

  responsable: string[] = [];
  email: string = '';

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    route.parent?.paramMap.get('id');

    this.proyectoService
      .getProyectoById(route.parent?.paramMap.get('id'))
      .subscribe((data) => {
        this.responsable = data.responsables;
      });

    this.email = this.loginService.getUser().email;

    console.log(this.responsable.includes(this.email));

    if (this.responsable.includes(this.email)) {
      this.email = 'correo';
      this.responsable = [];
      return true;
    }
    this.router.navigate(['/proyectos']);
    this.email = 'correo';
    this.responsable = [];
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class MantenedorGuard implements CanActivate {
  constructor(private loginService: LoginService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.loginService.isMantenedor;
  }
}
