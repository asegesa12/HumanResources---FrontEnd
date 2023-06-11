import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { PuestoForm } from 'src/app/interfaces/puesto.interface';
import { Puesto } from 'src/app/models/puesto.model';
import { PuestoService } from 'src/app/services/puesto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-puestos',
  templateUrl: './puestos.compenent.html',
})

export class PuestosComponent implements OnInit{


  public Puesto: Puesto[] = [];
  public PuestoTemp: Puesto[] = [];
  public loading!: boolean;
  public PuestoSelecionado!: Puesto;
  public PuestoForm!: FormGroup;
  public SelectPuesto!: Puesto | undefined;
  public desde = 0;
  public total = 0;



  constructor(private fb: FormBuilder, private puestoService: PuestoService
    ,private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => {
      this.LoadPuesto(id);
    });

    this.PuestoForm = this.fb.group({
      nombre: ['', Validators.required],
      NivelRiesgo: ['', Validators.required],
      SalarioMin: ['', Validators.required],
      SalarioMax: ['', Validators.required]
    });

  }


  LoadPuesto(id: string) {

    if (id === 'nuevo') {
      return;
    }

    this.puestoService.SpotByIdd(id)
    .pipe(
      delay(100)
    )
      .subscribe(puesto => {
        const { nombre, NivelRiesgo, SalarioMin, SalarioMax } = puesto;
        console.log(puesto);
        this.PuestoSelecionado = puesto;
        this.PuestoForm.setValue({ nombre, NivelRiesgo, SalarioMin, SalarioMax});

      }, error => {
         console.warn(error);
         return this.router.navigateByUrl(`/dashboard/puesto`);
      });
  }

  savePuesto(){

    if(this.PuestoForm.invalid) return;

    const { nombre } = this.PuestoForm.value;

    if(this.PuestoSelecionado){
      const data = {
        ...this.PuestoForm.value,
        uid: this.PuestoSelecionado.uid
      };

      this.puestoService.Update(data)
      .subscribe(resp => {
        Swal.fire(
          'Updated',
          `${nombre} updated succesfully`,
          'success'
        );

        console.log(resp);
      })
    } else {


      this.puestoService.createPuesto(this.PuestoForm.value as PuestoForm)
      .subscribe((resp: any) => {

        Swal.fire(
          'Created',
          `${nombre} created succesfully`,
          'success'
        );
        this.PuestoForm.reset();
        this.router.navigateByUrl(`/dashboard/puesto`);

        console.log(resp);
      });
    }

}
}
