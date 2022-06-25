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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MatrizRiesgoComponent,
    ProyectosComponent,
    RiesgosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNgModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
