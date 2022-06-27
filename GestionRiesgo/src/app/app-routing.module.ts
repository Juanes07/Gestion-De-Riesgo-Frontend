import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/usuarios/login/login.component';
import { RegisterComponent } from './pages/usuarios/register/register.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { FormCrearProyectoComponent } from './components/form-crear-proyecto/form-crear-proyecto.component';
import { TablaProyectosComponent } from './components/tabla-proyectos/tabla-proyectos.component';

import { ProyectoPageComponent } from './pages/proyecto-page/proyecto-page.component';
import { DetalleProyectoComponent } from './components/detalle-proyecto/detalle-proyecto.component';
import { MatrizRiesgoComponent } from './components/matriz-riesgo/matriz-riesgo.component';
import { FormCrearRiesgoComponent } from './components/form-crear-riesgo/form-crear-riesgo.component';

import { RiesgosPageComponent } from './pages/riesgos-page/riesgos-page.component';
import { TablaRiesgosComponent } from './components/tabla-riesgos/tabla-riesgos.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  {
    path: 'proyectos',
    component: ProyectosComponent,
    children: [
      { path: 'lista', component: TablaProyectosComponent },
      { path: 'crear', component: FormCrearProyectoComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'lista' },
    ],
  },
  {
    path: 'proyecto/:id',
    component: ProyectoPageComponent,
    children: [
      { path: 'detalle', component: DetalleProyectoComponent },
      { path: 'riesgos', component: RiesgosPageComponent,
        children: [
          { path: 'lista', component: TablaRiesgosComponent },
          { path: 'crear', component: FormCrearRiesgoComponent },
          { path: '**', pathMatch: 'full', redirectTo: 'lista' },
        ]
      },
      // { path: 'riesgo/:id', component: RiesgoPageComponent },
      { path: 'matriz', component: MatrizRiesgoComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'detalle' },
    ],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'proyectos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
