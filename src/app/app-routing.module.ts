import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { IdiomaComponent } from './pages/idioma/idioma.component';
import { PuestoComponent } from './pages/puesto/puesto.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { CapacitacionesComponent } from './pages/capacitaciones/capacitaciones.component';
import { CompetenciasComponent } from './pages/competencias/competencias.component';
import { CandidatosComponent } from './pages/candidatos/candidatos.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { PagesComponent } from './pages/pages.component';


const routes: Routes = [

  { path:'', component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent},
      { path: 'idioma', component: IdiomaComponent},
      { path: 'puesto', component: PuestoComponent},
      { path: 'capacitacion', component: CapacitacionesComponent},
      { path: 'competencia', component: CompetenciasComponent},
      { path: 'candidato', component: CandidatosComponent},
      { path: 'empleado', component: EmpleadoComponent},
      { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]
  },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegistroComponent},



    { path: '**', component: NopagefoundComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
