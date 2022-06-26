import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/usuarios/login/login.component';

import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { FormCrearProyectoComponent } from './components/form-crear-proyecto/form-crear-proyecto.component';
import { TablaProyectosComponent } from './components/tabla-proyectos/tabla-proyectos.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'proyectos',
    component: ProyectosComponent,
    children: [
      { path: 'lista', component: TablaProyectosComponent },
      { path: 'crear', component: FormCrearProyectoComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'lista' },
    ],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'proyectos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
