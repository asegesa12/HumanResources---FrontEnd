import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IdiomaComponent } from './idioma/idioma.component';
import { PuestoComponent } from './puesto/puesto.component';
import { CandidatosComponent } from './candidatos/candidatos.component';
import { CapacitacionesComponent } from './capacitaciones/capacitaciones.component';
import { CompetenciasComponent } from './competencias/competencias.component';
import { EmpleadoComponent } from './empleado/empleado.component';



const routes: Routes = [

  { path:'dashboard',
  component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent},
      { path: 'idioma', component: IdiomaComponent},
      { path: 'puesto', component: PuestoComponent},
      { path: 'capacitacion', component: CapacitacionesComponent},
      { path: 'competencia', component: CompetenciasComponent},
      { path: 'candidato', component: CandidatosComponent},
      { path: 'empleado', component: EmpleadoComponent},

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
