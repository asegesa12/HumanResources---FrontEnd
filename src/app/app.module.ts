import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { IdiomaComponent } from './pages/idioma/idioma.component';
import { PuestoComponent } from './pages/puesto/puesto.component';
import { AppRoutingModule } from './app-routing.module';
import { CandidatosComponent } from './pages/candidatos/candidatos.component';
import { CompetenciasComponent } from './pages/competencias/competencias.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { CapacitacionesComponent } from './pages/capacitaciones/capacitaciones.component';
import { PagesComponent } from './pages/pages.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    NopagefoundComponent,
    DashboardComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    IdiomaComponent,
    PuestoComponent,
    CandidatosComponent,
    CompetenciasComponent,
    EmpleadoComponent,
    CapacitacionesComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
