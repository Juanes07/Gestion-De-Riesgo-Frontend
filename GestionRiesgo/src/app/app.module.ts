import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/usuarios/login/login.component';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { HeaderComponent } from './components/header/header.component';
import { MatrizRiesgoComponent } from './pages/matriz-riesgo/matriz-riesgo.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { RiesgosComponent } from './pages/riesgos/riesgos.component';
import { FormCrearProyectoComponent } from './components/form-crear-proyecto/form-crear-proyecto.component';
import { CalendarModule } from 'primeng/calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,    HeaderComponent,
    MatrizRiesgoComponent,
    ProyectosComponent,
    RiesgosComponent,
    FormCrearProyectoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
    CalendarModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
