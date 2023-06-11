import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { CapacitacionForm } from 'src/app/interfaces/capacitacion-interfaces';
import { Capacitacion } from 'src/app/models/capacitacion.model';
import { CapacitacionService } from 'src/app/services/capacitacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-capacitacion',
  templateUrl: './capacitacion.component.html',
})

export class CapacitacionComponent implements OnInit{

  public total = 0;
  public capacitacion: Capacitacion[] = [];
  public CapacitacionTemp: Capacitacion[] = [];
  public desde = 0;
  public loading!: boolean;
  public CapacitacionSelecionado!: Capacitacion;
  public CapacitacionForm!: FormGroup;



  constructor(private fb: FormBuilder, private capService: CapacitacionService
    ,private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => {
      this.LoadTraining(id);
    });

    this.CapacitacionForm = this.fb.group({
      descripcion: ['', Validators.required],
      NivelCapacitacion: ['', Validators.required],
      FechaDesde: ['', Validators.required],
      fechaHasta: ['', Validators.required],
      Institucion: ['', Validators.required]
    });

  }

  LoadTraining(id: string) {

    if (id === 'nuevo') {
      return;
    }

    this.capService.TrainingByIdd(id)
    .pipe(
      delay(100)
    )
      .subscribe(capacitacion => {
        const { descripcion, NivelCapacitacion, FechaDesde, fechaHasta, Institucion } = capacitacion;
       // console.log(nombre);
        this.CapacitacionSelecionado = capacitacion;
        console.log(capacitacion);
        this.CapacitacionForm.setValue({ descripcion, NivelCapacitacion, FechaDesde, fechaHasta, Institucion });

      }, error => {
         console.warn(error);
         return this.router.navigateByUrl(`/dashboard/capacitacion`);
      });
  }

  SaveCap(){

    if(this.CapacitacionForm.invalid) return;

    const { descripcion } = this.CapacitacionForm.value;

    if(this.CapacitacionSelecionado){
      const data = {
        ...this.CapacitacionForm.value,
        uid: this.CapacitacionSelecionado.uid
      };

      this.capService.Update(data)
      .subscribe(resp => {
        Swal.fire(
          'Updated',
          `${descripcion} updated succesfully`,
          'success'
        );

        console.log(resp);
      })
    } else {


      this.capService.createTraining(this.CapacitacionForm.value as CapacitacionForm)
      .subscribe((resp: any) => {

        Swal.fire(
          'Created',
          `${descripcion} created succesfully`,
          'success'
        );
        this.CapacitacionForm.reset();
        this.router.navigateByUrl(`/dashboard/capacitacion`);

        console.log(resp);
      });
    }
  }
}
