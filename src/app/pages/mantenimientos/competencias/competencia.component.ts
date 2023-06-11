import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { CompForm } from 'src/app/interfaces/competencia.interfaces';
import { Competencia } from 'src/app/models/competencia.model';
import { CompetenciaService } from 'src/app/services/competencia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-competencia',
  templateUrl: './competencia.component.html',
})

export class CompetenciaComponent implements OnInit{

  public total = 0;
  public Competencia: Competencia[] = [];
  public CompetenciaTemp: Competencia[] = [];
  public desde = 0;
  public loading!: boolean;
  public CompetenciaSelecionado!: Competencia;
  public CompetenciaForm!: FormGroup;



  constructor(private fb: FormBuilder, private competenciaService: CompetenciaService
    ,private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => {
      this.LoadIdioma(id);
    });

    this.CompetenciaForm = this.fb.group({
      descripcion: ['', Validators.required]
    });

  }

  LoadIdioma(id: string) {

    if (id === 'nuevo') {
      return;
    }

    this.competenciaService.CompByIdd(id)
    .pipe(
      delay(100)
    )
      .subscribe(comp => {
        const { descripcion } = comp;
       // console.log(nombre);
        this.CompetenciaSelecionado = comp;
        console.log(comp);
        this.CompetenciaForm.setValue({ descripcion });

      }, error => {
         console.warn(error);
         return this.router.navigateByUrl(`/dashboard/competencias`);
      });
  }



  saveComp(){

    if(this.CompetenciaForm.invalid) return;

    const { descripcion } = this.CompetenciaForm.value;

    if(this.CompetenciaSelecionado){
      const data = {
        ...this.CompetenciaForm.value,
        uid: this.CompetenciaSelecionado.uid
      };

      this.competenciaService.Update(data)
      .subscribe(resp => {
        Swal.fire(
          'Updated',
          `${descripcion} updated succesfully`,
          'success'
        );

        console.log(resp);
      })
    } else {


      this.competenciaService.createComp(this.CompetenciaForm.value as CompForm)
      .subscribe((resp: any) => {

        Swal.fire(
          'Created',
          `${descripcion} created succesfully`,
          'success'
        );
        this.CompetenciaForm.reset();
        this.router.navigateByUrl(`/dashboard/competencia`);

        console.log(resp);
      });
    }

}
}
