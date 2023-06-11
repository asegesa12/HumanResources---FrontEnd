import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CandidatoForm, CargarCandidato } from '../interfaces/candidato-interfaces';
import { map } from 'rxjs';
import { Candidato } from '../models/candidato.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  constructor(private http: HttpClient, ) { }

  get token() {
    return localStorage.getItem('token') || '';
  }

  // tslint:disable-next-line: typedef
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  createCandidato(CandData: CandidatoForm){
    return this.http.post('http://localhost:3000/api/candidato', CandData );
  }

  DeleteIdiom(candidato: Candidato) {
    return this.http.delete(`http://localhost:3000/api/candidato/${candidato.uid}`, this.headers);

  }

  cargarIdiomas( desde: number = 0 ){

    return this.http.get<CargarCandidato>(`http://localhost:3000/api/candidato?desde=${ desde}`, this.headers )
        .pipe(

          // Esto transforma una arreglo de objetos a un arreglo  de usuarios.

          map( resp => {
            const candidato = resp.candidato.map(
              candi => new Candidato(candi.cedula, candi.nombre, candi.idioma,candi.puesto, candi.departamento,
                 candi.salario, candi.competencia, candi.capacitacion, candi.experiencia_Laboral, candi.recomendadoPor, candi.uid,
              )
            );
            console.log(candidato);
            return {
              total: resp.total,
              candidato
            };

          })
        );
  }
}
