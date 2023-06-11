import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CapacitacionForm, CargarCapacitacion } from '../interfaces/capacitacion-interfaces';
import { Capacitacion } from '../models/capacitacion.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CapacitacionService {

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

  TrainingByIdd(id: string){
    return this.http.get(`http://localhost:3000/api/capacitacion/${ id }`, this.headers)
    .pipe(
      map((resp: any) => resp.capacitacion

    ));

  }

  createTraining(capData: CapacitacionForm){
    return this.http.post('http://localhost:3000/api/capacitacion', capData , this.headers);
  }

  DeleteTraining(capacitacion: Capacitacion) {
    return this.http.delete(`http://localhost:3000/api/capacitacion/${capacitacion.uid}`, this.headers);

  }

  Update(capacitacion: Capacitacion) {
    return this.http.put(`http://localhost:3000/api/capacitacion/${capacitacion.uid}`, capacitacion, this.headers);

  }

  cargarCapacitacion( desde: number = 0 ){

    return this.http.get<CargarCapacitacion>(`http://localhost:3000/api/capacitacion?desde=${ desde}`, this.headers )
        .pipe(

          // Esto transforma una arreglo de objetos a un arreglo  de usuarios.

          map( resp => {
            const capacitaciones = resp.capacitacion.map(
              Cap => new Capacitacion(Cap.descripcion, Cap.NivelCapacitacion, Cap.FechaDesde, Cap.fechaHasta, Cap.Institucion, Cap.uid
              )
            );
            console.log(capacitaciones);
            return {
              total: resp.total,
              capacitaciones
            };

          })
        );
  }
}
