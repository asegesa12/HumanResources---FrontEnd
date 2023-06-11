import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdiomaComponent } from './mantenimientos/idioma/idioma.component';
import { PuestoComponent } from './mantenimientos/puesto/puesto.component';
import { CandidatosComponent } from './mantenimientos/candidatos/candidatos.component';
import { CompetenciasComponent } from './mantenimientos/competencias/competencias.component';
import { EmpleadoComponent } from './mantenimientos/empleado/empleado.component';
import { CapacitacionesComponent } from './mantenimientos/capacitaciones/capacitaciones.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuaropsComponent } from './mantenimientos/usuarops/usuarops.component';
import { IdiomasComponent } from "./mantenimientos/idioma/idiomas.component";
import { CompetenciaComponent } from './mantenimientos/competencias/competencia.component';
import { PuestosComponent } from './mantenimientos/puesto/puestos.component';
import { CapacitacionComponent } from './mantenimientos/capacitaciones/capacitacion.component';



@NgModule({
  declarations: [
    DashboardComponent,
    IdiomaComponent,
    PuestoComponent,
    CandidatosComponent,
    CompetenciasComponent,
    EmpleadoComponent,
    CapacitacionesComponent,
    PagesComponent,
    UsuaropsComponent,
    IdiomasComponent,
    CompetenciaComponent,
    PuestosComponent,
    CapacitacionComponent

  ],
  exports: [
    DashboardComponent,
    IdiomaComponent,
    IdiomasComponent,
    PuestoComponent,
    CandidatosComponent,
    CompetenciasComponent,
    EmpleadoComponent,
    CapacitacionesComponent,
    CapacitacionComponent,
    PagesComponent
  ],

  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
