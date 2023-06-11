import { Component, OnInit } from '@angular/core';
import { Candidato } from 'src/app/models/candidato.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { CandidatoService } from 'src/app/services/candidato.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})



export class DashboardComponent implements OnInit {

  public total = 0;
  public candidato: Candidato[] = [];
  public CandidatoTemp: Candidato[] = [];
  public desde = 0;
  public loading!: boolean;

  constructor (private CandidatoService: CandidatoService, private busquedaService: BusquedasService ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.LoadIdioms();
  }

  DeleteIdiom(candidato: Candidato) {

    Swal.fire({
      title: 'Are you sure?',
      text: `Are you about to reject: ${candidato.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reject it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.CandidatoService.DeleteIdiom(candidato)
          .subscribe(resp => {

            this.LoadIdioms();
            if (this.desde === this.total - 1) {
              this.desde -= 5;
            }
            Swal.fire(
              'Intern deleted',
              `${candidato.nombre} has been rejected `,
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
    this.CandidatoService.cargarIdiomas(this.desde)
      .subscribe(({ total, candidato }) => {



        this.total = total;
        this.candidato = candidato;
        this.CandidatoTemp = candidato;
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
      return this.candidato = this.CandidatoTemp;
    }

    return this.busquedaService.busqueda('candidato', termino)
      .subscribe(resp => {
          this.candidato = resp as Candidato[];
      });

  }
}
