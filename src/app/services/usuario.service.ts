import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Usuario } from '../models/usuario.models';
import { HttpClient } from '@angular/common/http';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { CargarUsuarios } from '../interfaces/cargar-usuarios.interface';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

 public usuario!: Usuario;
  auth2: any;


  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) { }

  get token() {
    return localStorage.getItem('token') || '';
  }

  get role(): string | undefined{
    return this.usuario.role;
  }


  // tslint:disable-next-line: typedef
  get uid(){
    return this.usuario.uid || '';
  }

  // tslint:disable-next-line: typedef
  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  saveLocalStorage(token: string){
    localStorage.setItem('token', token);

  }



  login( formData: LoginForm ){

    return this.http.post('http://localhost:3000/api/login', formData)
              .pipe(
                tap( (resp: any ) => {
                  this.saveLocalStorage(resp.token);
                  console.log(resp);

                })
              );
  }

  validarToken(): Observable<boolean>{

    // const token = localStorage.getItem('token') || '';

     return this.http.get('http://localhost:3000/api/login/renew', {
       headers: {
         'x-token': this.token
       }
     }).pipe(
       map( (resp: any ) => {

         const { email, google, nombre, role, img = '', uid  } = resp.usuario;

         this.usuario = new Usuario(nombre, email, '' , google , img, uid, role);
         this.saveLocalStorage(resp.token);
         return true;
       }),
          catchError( err => of(false))
     );

   }

   cargarUsuarios( desde: number = 0 ){

    return this.http.get<CargarUsuarios>(`http://localhost:3000/api/usuarios?desde=${ desde}`, this.headers )
        .pipe(

          // Esto transforma una arreglo de objetos a un arreglo  de usuarios.

          map( resp => {
            const usuarios = resp.usuarios.map(
              user => new Usuario(user.nombre, user.email, '', user.google, user.img, user.uid,
                user.role
              )
            );
              console.log(resp);
            return {
              total: resp.total,
              usuarios
            };

          })
        );

  }

  RemoveUserService( usuario: Usuario){

    return this.http.delete(`http://localhost:3000/api/usuarios/${usuario.uid}`, this.headers);
  }

}
