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
import { CalendarModule } from 'primeng/calendar';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { TablaProyectosComponent } from './components/tabla-proyectos/tabla-proyectos.component';
import { DetalleProyectoComponent } from './components/detalle-proyecto/detalle-proyecto.component';
import { ProyectoPageComponent } from './pages/proyecto-page/proyecto-page.component';
import { RiesgosPageComponent } from './pages/riesgos-page/riesgos-page.component';
import { TablaRiesgosComponent } from './components/tabla-riesgos/tabla-riesgos.component';
import { FormCrearRiesgoComponent } from './components/form-crear-riesgo/form-crear-riesgo.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MatrizRiesgoComponent,
    ProyectosComponent,
    FormCrearProyectoComponent,
    TablaProyectosComponent,
    DetalleProyectoComponent,
    ProyectoPageComponent,
    RiesgosPageComponent,
    TablaRiesgosComponent,
    FormCrearRiesgoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
