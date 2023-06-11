import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
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

  // tslint:disable-next-line: typedef
  busquedaGlobal(termino: string){
    return this.http.get(`http://localhost:3000/api/todo/${ termino }`, this.headers);
  }

  /*private TransformUsers(results: any[]): Usuario[] {

    return results.map(
      user => new Usuario(user.nombre, user.email, '', user.google, user.img, user.uid, user.role)
    );
  }*/


  // tslint:disable-next-line: typedef
  private TransformAnityhing(results: any[]) {

     return results;
  }

  // tslint:disable-next-line: typedef
 /* private TransformHospital(results: any[]): Hospital[] {

    return results;
  }*/

  // tslint:disable-next-line: typedef
  busqueda(tipos: 'idioma' | 'puesto' | 'candidato'|'competencia'|'capacitacion', termino: string) {
    return this.http.get<any[]>(`http://localhost:3000/api/todo/coleccion/${tipos}/${termino}`, this.headers)
      .pipe(
        map((resp: any) => {

          switch (tipos) {
            case 'idioma':
              console.log(resp.resultados);
              return this.TransformAnityhing(resp.resultados);

            case 'puesto':
              console.log(resp.resultados);
              return this.TransformAnityhing(resp.resultados);

            case 'candidato':
              console.log(resp.resultados);
              return this.TransformAnityhing(resp.resultados);

            case 'capacitacion':
                console.log(resp.resultados);
                return this.TransformAnityhing(resp.resultados);
            case 'competencia':
                  console.log(resp.resultados);
                  return this.TransformAnityhing(resp.resultados);

            default:
              return [];
          }
        })
      );
  }
}
