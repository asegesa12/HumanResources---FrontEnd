import { Component } from '@angular/core';
import { Idioma } from 'src/app/models/idioma.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { IdiomaService } from 'src/app/services/idioma.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-idioma',
  templateUrl: './idioma.component.html',
  styleUrls: ['./idioma.component.css']
})
export class IdiomaComponent {

  public total = 0;
  public idiomas: Idioma[] = [];
  public idiomasTemp: Idioma[] = [];
  public desde = 0;
  public loading!: boolean;

  constructor(private _IdiomaService: IdiomaService, private busquedaService: BusquedasService) {}


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.LoadIdioms();
  }

  DeleteIdiom(idioma: Idioma) {

    Swal.fire({
      title: 'Are you sure?',
      text: `Are you about to delete: ${idioma.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._IdiomaService.DeleteIdiom(idioma)
          .subscribe(resp => {

            this.LoadIdioms();
            if (this.desde === this.total - 1) {
              this.desde -= 5;
            }
            Swal.fire(
              'Language deleted',
              `${idioma.nombre} has been deleted`,
              'success'
            );
            console.log(resp);
          });
      }
    });

    return;

  }


  LoadIdioms(){
    this.loading = true;
    this._IdiomaService.cargarIdiomas(this.desde)
      .subscribe(({ total, idioma }) => {



        this.total = total;
        this.idiomas = idioma;
        this.idiomasTemp = idioma;
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
    this.LoadIdioms();


  }

  buscar(termino: string ){

    if (termino.length === 0){
      return this.idiomas = this.idiomasTemp;
    }

    return this.busquedaService.busqueda('idioma', termino)
      .subscribe(resp => {
          this.idiomas = resp as Idioma[];
      });

  }
}
