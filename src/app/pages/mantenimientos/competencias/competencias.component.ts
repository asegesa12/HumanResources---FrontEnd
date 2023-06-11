import { Component } from '@angular/core';
import { Competencia } from 'src/app/models/competencia.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { CompetenciaService } from 'src/app/services/competencia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-competencias',
  templateUrl: './competencias.component.html',
  styleUrls: ['./competencias.component.css']
})
export class CompetenciasComponent {
  public total = 0;
  public competencia: Competencia[] = [];
  public competenciaTemp: Competencia[] = [];
  public desde = 0;
  public loading!: boolean;

  constructor(private _CompService: CompetenciaService, private busquedaService: BusquedasService) {}


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.LoadComp();
  }

  DeleteComp(competencia: Competencia) {

    Swal.fire({
      title: 'Are you sure?',
      text: `Are you about to delete: ${competencia.descripcion}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._CompService.DeleteComp(competencia)
          .subscribe(resp => {

            this.LoadComp();
            if (this.desde === this.total - 1) {
              this.desde -= 5;
            }
            Swal.fire(
              'Competence deleted',
              `competence has been deleted`,
              'success'
            );
            console.log(resp);
          });
      }
    });

    return;

  }


  LoadComp(){
    this.loading = true;
    this._CompService.cargarCompetencia(this.desde)
      .subscribe(({ total, competencias }) => {



        this.total = total;
        this.competencia = competencias;
        this.competenciaTemp = competencias;
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
    this.LoadComp();


  }

  buscar(termino: string ){

    if (termino.length === 0){
      return this.competencia = this.competenciaTemp;
    }

    return this.busquedaService.busqueda('competencia', termino)
      .subscribe(resp => {
          this.competencia = resp as Competencia[];
      });

  }
}
