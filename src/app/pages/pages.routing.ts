import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IdiomaComponent } from './mantenimientos/idioma/idioma.component';
import { PuestoComponent } from './mantenimientos/puesto/puesto.component';
import { CandidatosComponent } from './mantenimientos/candidatos/candidatos.component';
import { CapacitacionesComponent } from './mantenimientos/capacitaciones/capacitaciones.component';
import { CompetenciasComponent } from './mantenimientos/competencias/competencias.component';
import { EmpleadoComponent } from './mantenimientos/empleado/empleado.component';
import { AuthGuard } from '../guards/auth.guard';
import { UsuaropsComponent } from './mantenimientos/usuarops/usuarops.component';
import { IdiomasComponent } from './mantenimientos/idioma/idiomas.component';
import { CompetenciaComponent } from './mantenimientos/competencias/competencia.component';
import { PuestosComponent } from './mantenimientos/puesto/puestos.component';
import { CapacitacionComponent } from './mantenimientos/capacitaciones/capacitacion.component';



const routes: Routes = [

  { path:'dashboard',
  component: PagesComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
      { path: 'idioma', component: IdiomaComponent, data: {titulo: 'idioma'}},
      { path: 'idiomas/:id', component: IdiomasComponent, data: {titulo: 'idiomas'}},
      { path: 'puesto', component: PuestoComponent, data: {titulo: 'puesto'}},
      { path: 'puestos/:id', component: PuestosComponent, data: {titulo: 'puesto'}},
      { path: 'capacitacion', component: CapacitacionesComponent, data: {titulo: 'capacitacion'}},
      { path: 'capacitaciones/:id', component: CapacitacionComponent, data: {titulo: 'capacitacion'}},
      { path: 'competencia', component: CompetenciasComponent, data: {titulo: 'competencia'}},
      { path: 'competencias/:id', component: CompetenciaComponent, data: {titulo: 'competencia'}},
      { path: 'candidato', component: CandidatosComponent, data: {titulo: 'candidato'}},
      { path: 'empleado', component: EmpleadoComponent, data: {titulo: 'empleado'}},
      { path: 'usuario', component: UsuaropsComponent, data: {titulo: 'Usuarios'}}

    ]
  },
  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
