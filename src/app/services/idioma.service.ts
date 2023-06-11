import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { _Idioma } from '../interfaces/idioma-interface';
import { HttpClient } from '@angular/common/http';
import { Idioma } from '../models/idioma.model';
import { IdiomaForm } from '../interfaces/idioma-form.interface';

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {

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

  IdiomaByIdd(id: string){
    return this.http.get(`http://localhost:3000/api/idiomas/${ id }`, this.headers)
    .pipe(
      map((resp: any) => resp.idioma

    ));

  }

  createIdioma(idiomaData: IdiomaForm){
    return this.http.post('http://localhost:3000/api/idiomas', idiomaData , this.headers);
  }

  DeleteIdiom(idioma: Idioma) {
    return this.http.delete(`http://localhost:3000/api/idiomas/${idioma.uid}`, this.headers);

  }

  Update(idioma: Idioma) {
    return this.http.put(`http://localhost:3000/api/idiomas/${idioma.uid}`, idioma, this.headers);

  }

  cargarIdiomas( desde: number = 0 ){

    return this.http.get<_Idioma>(`http://localhost:3000/api/idiomas?desde=${ desde}`, this.headers )
        .pipe(

          // Esto transforma una arreglo de objetos a un arreglo  de usuarios.

          map( resp => {
            const idioma = resp.idioma.map(
              lang => new Idioma(lang.uid, lang.nombre, lang.descripcion
              )
            );
            console.log(idioma);
            return {
              total: resp.total,
              idioma
            };

          })
        );
  }
}
