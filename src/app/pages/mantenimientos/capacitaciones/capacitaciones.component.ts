import { Component } from '@angular/core';
import { Capacitacion } from 'src/app/models/capacitacion.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { CapacitacionService } from 'src/app/services/capacitacion.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-capacitaciones',
  templateUrl: './capacitaciones.component.html',
  styleUrls: ['./capacitaciones.component.css'],
  providers: [DatePipe]
})
export class CapacitacionesComponent {

  public total = 0;
  public Capacitacion: Capacitacion[] = [];
  public CapacitacionTemp: Capacitacion[] = [];
  public desde = 0;
  public loading!: boolean;

  constructor(private _CapacitacionService: CapacitacionService, private busquedaService: BusquedasService) {}


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.LoadTraining();
  }

  DeleteTraining(capacitacion: Capacitacion) {

    Swal.fire({
      title: 'Are you sure?',
      text: `Are you about to delete: ${capacitacion.descripcion}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._CapacitacionService.DeleteTraining(capacitacion)
          .subscribe(resp => {

            this.LoadTraining();
            if (this.desde === this.total - 1) {
              this.desde -= 5;
            }
            Swal.fire(
              'Language deleted',
              `${capacitacion.descripcion} has been deleted`,
              'success'
            );
            console.log(resp);
          });
      }
    });

    return;

  }


  LoadTraining(){
    this.loading = true;
    this._CapacitacionService.cargarCapacitacion(this.desde)
      .subscribe(({ total, capacitaciones }) => {



        this.total = total;
        this.Capacitacion = capacitaciones;
        this.CapacitacionTemp = capacitaciones;
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
    this.LoadTraining();


  }

  buscar(termino: string ){

    if (termino.length === 0){
      return this.Capacitacion = this.CapacitacionTemp;
    }

    return this.busquedaService.busqueda('capacitacion', termino)
      .subscribe(resp => {
          this.Capacitacion = resp as Capacitacion[];
      });

  }
}
