import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidatoForm } from 'src/app/interfaces/candidato-interfaces';
import { Idioma } from 'src/app/models/idioma.model';
import { Puesto } from 'src/app/models/puesto.model';
import { CandidatoService } from 'src/app/services/candidato.service';
import { IdiomaService } from 'src/app/services/idioma.service';
import { PuestoService } from 'src/app/services/puesto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public Puesto: Puesto[] = [];
  public SelectPuesto!: Puesto | undefined;
  public candidatoForm!: FormGroup
  public PuestoTemp: Puesto[] = [];
  public idioma: Idioma[] = [];
  public IdiomTemp: Idioma[] = [];
  public SelectIdioma!: Idioma | undefined;
  public total = 0;
  public desde = 0;
  constructor(private _IdiomaService: IdiomaService, private _PuestoService: PuestoService, private fb: FormBuilder, private candidatoService: CandidatoService, private router: Router ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.



     this.candidatoForm = this.fb.group({
      cedula: ['', [ Validators.required, Validators.minLength(3)] ],
      nombre: ['',  Validators.required ],
      idioma: ['',  Validators.required ],
      puesto: ['',  Validators.required ],
      departamento: ['',  Validators.required ],
      salario: ['', [ Validators.required, Validators.minLength(3)] ],
      competencia: ['',  Validators.required ],
      capacitacion: ['',  Validators.required ],
      experiencia_Laboral: ['',  Validators.required ],
      recomendadoPor: ['',  Validators.required ],
    });
    this.LoadIdioms();
    this.LoadSpot();



    this.candidatoForm.get('puesto')?.valueChanges
      .subscribe(uid => {
        this.SelectPuesto = this.Puesto.find(h => h.uid === uid);
      });

      this.candidatoForm.get('idioma')?.valueChanges
      .subscribe(uid => {
        this.SelectIdioma = this.idioma.find(h => h.uid === uid);
      });
  }


  LoadIdioms(){

    this._IdiomaService.cargarIdiomas(this.desde)
      .subscribe(({ total, idioma }) => {



        this.total = total;
        this.idioma = idioma;
        this.IdiomTemp = idioma;



      });
  }

  paginacion_Id(valor: number){
    this.desde += valor;
    console.log(valor);
    if ( this.desde < 0){
      this.desde = 0;


    } else if ( this.desde >= this.total){
      this.desde -= valor;

    }
    this.LoadIdioms();


  }

  LoadSpot(){

    this._PuestoService.cargarPuesto(this.desde)
      .subscribe(({ total, puesto }) => {



        this.total = total;
        this.Puesto = puesto;
        this.PuestoTemp = puesto;



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

  createCandidato(){

    // Realizando La Creacion.
    this.candidatoService.createCandidato( this.candidatoForm.value as CandidatoForm)
        .subscribe((resp: any) =>{
          Swal.fire(
            'Created',
            `created succesfully`,
            'success'
          );
          console.log(resp);
          this.candidatoForm.reset();
          this.router.navigateByUrl('/login');
        }, ( err ) => {
          console.log(err);
        });



  }
}
