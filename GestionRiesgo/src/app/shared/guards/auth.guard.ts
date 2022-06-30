import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProyectoService } from 'src/app/service/proyecto-servicio.service';
import { LoginService } from '../../service/login.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return new Observable<boolean>((obs) => {
      if (this.loginService.getUser().rol === 'administrador') {
        obs.next(true);
      } else {
        this.router.navigateByUrl('/proyectos');
        obs.next(false);
      }
    });
  }
}

@Injectable({
  providedIn: 'root',
})
export class ResponsableGuard implements CanActivate {
  constructor(
    private proyectoService: ProyectoService,
    private auth: LoginService,
    private router: Router
  ) {}

  email!: string;

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return new Observable<boolean>((obs) => {
      this.proyectoService
        .getProyectoById(route.parent?.paramMap.get('id'))
        .subscribe((data) => {
          this.auth.getUser().email != null
            ? (this.email = this.auth.getUser().email)
            : (this.email = '');
          if (
            data.responsables.includes(this.email) ||
            this.auth.getUser().rol === 'administrador'
          ) {
            obs.next(true);
          } else {
            this.router.navigateByUrl('/proyectos');
            obs.next(false);
          }
        });
    });
  }
}

@Injectable({
  providedIn: 'root',
})
export class MantenedorGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return new Observable<boolean>((obs) => {
      if (
        this.loginService.getUser().rol === 'mantenedor' ||
        this.loginService.getUser().rol === 'administrador'
      ) {
        obs.next(true);
      } else {
        this.router.navigateByUrl('/proyectos');
        obs.next(false);
      }
    });
  }
}

@Injectable({
  providedIn: 'root',
})
export class RiesgoProyectoGuard implements CanActivate {
  constructor(
    private proyectoService: ProyectoService,
    private auth: LoginService,
    private router: Router
  ) {}

  email!: string;

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return new Observable<boolean>((obs) => {
      this.proyectoService
        .getRiesgoById(route.parent?.paramMap.get('id'))
        .subscribe((data) => {
          if (
            data.idProyecto === Number(route.parent?.parent?.paramMap.get('id'))) {
            obs.next(true);
          } else {
            this.router.navigateByUrl('/proyectos');
            obs.next(false);
          }
        });
    });
  }
}
