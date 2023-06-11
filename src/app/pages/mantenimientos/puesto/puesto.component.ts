import { Component } from '@angular/core';
import { Puesto } from 'src/app/models/puesto.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { PuestoService } from 'src/app/services/puesto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-puesto',
  templateUrl: './puesto.component.html',
  styleUrls: ['./puesto.component.css']
})
export class PuestoComponent {
  public total = 0;
  public Puesto: Puesto[] = [];
  public PuestoTemp: Puesto[] = [];
  public desde = 0;
  public loading!: boolean;

  constructor(private _PuestoService: PuestoService, private busquedaService: BusquedasService) {}


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.LoadSpot();
  }

  DeletePuesto(puesto: Puesto) {

    Swal.fire({
      title: 'Are you sure?',
      text: `Are you about to delete: ${puesto.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._PuestoService.DeletePuesto(puesto)
          .subscribe(resp => {

            this.LoadSpot();
            if (this.desde === this.total - 1) {
              this.desde -= 5;
            }
            Swal.fire(
              'Vacant deleted',
              `${puesto.nombre} has been deleted`,
              'success'
            );
            console.log(resp);
          });
      }
    });

    return;

  }


  LoadSpot(){
    this.loading = true;
    this._PuestoService.cargarPuesto(this.desde)
      .subscribe(({ total, puesto }) => {



        this.total = total;
        this.Puesto = puesto;
        this.PuestoTemp = puesto;
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
    this.LoadSpot();


  }

  buscar(termino: string ){

    if (termino.length === 0){
      return this.Puesto = this.PuestoTemp;
    }

    return this.busquedaService.busqueda('puesto', termino)
      .subscribe(resp => {
          this.Puesto = resp as Puesto[];
      });

  }
}
