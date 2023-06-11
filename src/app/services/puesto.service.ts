import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CargarPuesto, PuestoForm } from '../interfaces/puesto.interface';
import { Puesto } from '../models/puesto.model';

@Injectable({
  providedIn: 'root'
})
export class PuestoService {

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

  SpotByIdd(id: string){
    return this.http.get(`http://localhost:3000/api/puestos/${ id }`, this.headers)
    .pipe(
      map((resp: any) => resp.puesto

    ));

  }

  createPuesto(PuestoData: PuestoForm){
    return this.http.post('http://localhost:3000/api/puestos', PuestoData , this.headers);
  }

  DeletePuesto(puesto: Puesto) {
    return this.http.delete(`http://localhost:3000/api/puestos/${puesto.uid}`, this.headers);

  }

  Update(puesto: Puesto) {
    return this.http.put(`http://localhost:3000/api/puestos/${puesto.uid}`, puesto, this.headers);

  }

  cargarPuesto( desde: number = 0 ){

    return this.http.get<CargarPuesto>(`http://localhost:3000/api/puestos?desde=${ desde}`, this.headers )
        .pipe(

          // Esto transforma una arreglo de objetos a un arreglo  de usuarios.

          map( resp => {
            const puesto = resp.puesto.map(
              puestos => new Puesto(puestos.nombre, puestos.NivelRiesgo,puestos.SalarioMin, puestos.SalarioMax
                , puestos.uid
              )
            );
            console.log(puesto);
            return {
              total: resp.total,
              puesto
            };

          })
        );
  }
}
