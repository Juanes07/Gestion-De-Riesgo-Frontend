import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/usuarios/login/login.component';

import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { FormCrearProyectoComponent } from './components/form-crear-proyecto/form-crear-proyecto.component';
import { TablaProyectosComponent } from './components/tabla-proyectos/tabla-proyectos.component';

import { ProyectoPageComponent } from './pages/proyecto-page/proyecto-page.component';
import { DetalleProyectoComponent } from './components/detalle-proyecto/detalle-proyecto.component';
import { MatrizRiesgoComponent } from './components/matriz-riesgo/matriz-riesgo.component';
import { FormCrearRiesgoComponent } from './components/form-crear-riesgo/form-crear-riesgo.component';

import { TablaRiesgosComponent } from './components/tabla-riesgos/tabla-riesgos.component';
import { RegisterComponent } from './pages/usuarios/register/register.component';
import { RiesgosComponent } from './pages/riesgos/riesgos.component';
import { RiesgoPageComponent } from './pages/riesgo-page/riesgo-page.component';
import { DetalleRiesgoComponent } from './components/detalle-riesgo/detalle-riesgo.component';
import { EditarProyectoComponent } from './components/editar-proyecto/editar-proyecto.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
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
      { path:'editar',component: EditarProyectoComponent},
      // { path: 'edit', component: EditProyectoComponent },
      { path: 'riesgos', component: RiesgosComponent,
        children: [
          { path: 'lista', component: TablaRiesgosComponent },
          { path: 'crear', component: FormCrearRiesgoComponent },
          { path: '**', pathMatch: 'full', redirectTo: 'lista' },
        ]
      },
      { path: 'riesgo/:id',
        component: RiesgoPageComponent,
        children: [
          { path: 'detalle', component: DetalleRiesgoComponent },
          // { path: 'edit', component: EditRiesgoComponent },
          { path: '**', pathMatch: 'full', redirectTo: 'detalle' },
        ]
      },
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
