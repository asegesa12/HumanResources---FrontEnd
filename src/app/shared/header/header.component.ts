import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.models';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public usuario!: Usuario;
  constructor(private usuarioService: UsuarioService, private route: Router) {
   }

  // tslint:disable-next-line: typedef
  logout(){
    this.usuarioService.logout();
  }
}
