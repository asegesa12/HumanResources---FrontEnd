import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarops',
  templateUrl: './usuarops.component.html',
  styleUrls: ['./usuarops.component.css']
})
export class UsuaropsComponent implements OnInit {

  public total = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde = 0;
  public loading!: boolean;

    constructor(private usuariosService: UsuarioService){

    }

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.loadUsers();
    }

    loadUsers(){
      this.loading = true;
      this.usuariosService.cargarUsuarios(this.desde)
        .subscribe(({ total, usuarios }) => {



          this.total = total;
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
          this.loading = false;


        });
    }

    paginacion(valor: number){
      this.desde += valor;
      console.log(valor);
      if ( this.desde < 0){
        this.desde = 0;


      } else if ( this.desde >= this.total){
        this.desde -= valor;

      }
      this.loadUsers();


    }

    buscar(termino: string){

    }

    RemoveUser(usuario: Usuario){

      if ( usuario.uid === this.usuariosService.uid){
        return Swal.fire('Error', 'You cannot delete it yourself', 'error');
      }

      Swal.fire({
        title: 'Are you sure?',
        text: `Are you about to delete: ${ usuario.nombre}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuariosService.RemoveUserService(usuario)
            .subscribe( resp => {

              this.loadUsers();
              if (this.desde === this.total - 1){
                  this.desde -= 5;
              }
              Swal.fire(
                'User deleted',
                `${usuario.nombre} has been deleted`,
                'success'
              );
            });
        }
      });

      return;
    }

}
