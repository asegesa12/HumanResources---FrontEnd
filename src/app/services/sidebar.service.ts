import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

    menu: any[] = [
      {
        titulo: 'Mantenimientos',
        icon: 'mdi mdi-folder-lock-open',
        submenu: [
          { titulo: 'Main', url: '/'},
          { titulo: 'Idioma', url: 'idioma'},
          //{ titulo: 'Candidato', url: 'candidato'},
          { titulo: 'Puesto', url: 'puesto'},
          { titulo: 'Competencia', url: 'competencia'},
          { titulo: 'Capacitacion', url: 'capacitacion'},
          //{ titulo: 'Empleados', url: 'empleado'},
          { titulo: 'Administradores', url: 'usuario'},
        ]
      }
    ];
  constructor() { }
}
