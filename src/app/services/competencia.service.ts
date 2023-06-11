import { Injectable } from '@angular/core';
import { CargarCompetencia, CompForm } from '../interfaces/competencia.interfaces';
import { Competencia } from '../models/competencia.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CompetenciaService {
  constructor(private http: HttpClient) { }

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

  CompByIdd(id: string){
    return this.http.get(`http://localhost:3000/api/competencias/${ id }`, this.headers)
    .pipe(
      map((resp: any) => resp.competencia

    ));

  }

  createComp(compData: CompForm){
    return this.http.post('http://localhost:3000/api/competencias', compData , this.headers);
  }

  DeleteComp(competencia: Competencia) {
    return this.http.delete(`http://localhost:3000/api/competencias/${competencia.uid}`, this.headers);

  }

  Update(competencia: Competencia) {
    return this.http.put(`http://localhost:3000/api/competencias/${competencia.uid}`, competencia, this.headers);

  }

  cargarCompetencia( desde: number = 0 ){

    return this.http.get<CargarCompetencia>(`http://localhost:3000/api/competencias?desde=${ desde}`, this.headers )
        .pipe(

          // Esto transforma una arreglo de objetos a un arreglo  de usuarios.

          map( resp => {
            const competencias = resp.competencia.map(
              Comp => new Competencia(Comp.uid, Comp.descripcion,
              )
            );
            console.log(competencias);
            return {
              total: resp.total,
              competencias
            };

          })
        );
  }
}
