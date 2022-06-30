import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/usuarios/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { MatrizRiesgoComponent } from './components/matriz-riesgo/matriz-riesgo.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { FormCrearProyectoComponent } from './components/form-crear-proyecto/form-crear-proyecto.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { TablaProyectosComponent } from './components/tabla-proyectos/tabla-proyectos.component';
import { DetalleProyectoComponent } from './components/detalle-proyecto/detalle-proyecto.component';
import { ProyectoPageComponent } from './pages/proyecto-page/proyecto-page.component';
import { TablaRiesgosComponent } from './components/tabla-riesgos/tabla-riesgos.component';
import { FormCrearRiesgoComponent } from './components/form-crear-riesgo/form-crear-riesgo.component';
import { RegisterComponent } from './pages/usuarios/register/register.component';
import { RiesgosComponent } from './pages/riesgos/riesgos.component';
import { RiesgoPageComponent } from './pages/riesgo-page/riesgo-page.component';
import { DetalleRiesgoComponent } from './components/detalle-riesgo/detalle-riesgo.component';
import { RolesComponent } from './pages/usuarios/roles/roles.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditarProyectoComponent } from './components/editar-proyecto/editar-proyecto.component';
import { EditarRiesgoComponent } from './components/editar-riesgo/editar-riesgo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    MatrizRiesgoComponent,
    ProyectosComponent,
    FormCrearProyectoComponent,
    TablaProyectosComponent,
    DetalleProyectoComponent,
    ProyectoPageComponent,
    TablaRiesgosComponent,
    FormCrearRiesgoComponent,
    RiesgosComponent,
    RiesgoPageComponent,
    DetalleRiesgoComponent,
    RolesComponent,
    EditarProyectoComponent,
    EditarRiesgoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNgModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
