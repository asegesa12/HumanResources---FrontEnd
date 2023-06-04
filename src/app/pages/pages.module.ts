import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdiomaComponent } from './idioma/idioma.component';
import { PuestoComponent } from './puesto/puesto.component';
import { CandidatosComponent } from './candidatos/candidatos.component';
import { CompetenciasComponent } from './competencias/competencias.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { CapacitacionesComponent } from './capacitaciones/capacitaciones.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DashboardComponent,
    IdiomaComponent,
    PuestoComponent,
    CandidatosComponent,
    CompetenciasComponent,
    EmpleadoComponent,
    CapacitacionesComponent,
    PagesComponent
  ],
  exports: [
    DashboardComponent,
    IdiomaComponent,
    PuestoComponent,
    CandidatosComponent,
    CompetenciasComponent,
    EmpleadoComponent,
    CapacitacionesComponent,
    PagesComponent
  ],

  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class PagesModule { }
