import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCrearProyectoComponent } from './components/form-crear-proyecto/form-crear-proyecto.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { LoginComponent } from './pages/usuarios/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {path: 'crearproyecto', component: FormCrearProyectoComponent},
  { path: 'proyectos', component: ProyectosComponent},
  { path: '', redirectTo: '/proyectos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
