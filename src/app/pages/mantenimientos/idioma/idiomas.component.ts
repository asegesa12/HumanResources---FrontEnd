import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { IdiomaForm } from 'src/app/interfaces/idioma-form.interface';
import { Idioma } from 'src/app/models/idioma.model';
import { IdiomaService } from 'src/app/services/idioma.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
})

export class IdiomasComponent implements OnInit{

  public total = 0;
  public idiomas: Idioma[] = [];
  public idiomasTemp: Idioma[] = [];
  public desde = 0;
  public loading!: boolean;
  public IdiomaSelecionado!: Idioma;
  public IdiomaForm!: FormGroup;



  constructor(private fb: FormBuilder, private idiomaService: IdiomaService
    ,private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => {
      this.LoadIdioma(id);
    });

    this.IdiomaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });

  }

  LoadIdioma(id: string) {

    if (id === 'nuevo') {
      return;
    }

    this.idiomaService.IdiomaByIdd(id)
    .pipe(
      delay(100)
    )
      .subscribe(idioma => {
        const { nombre, descripcion } = idioma;
       // console.log(nombre);
        this.IdiomaSelecionado = idioma;
        console.log(idioma);
        this.IdiomaForm.setValue({ nombre, descripcion});

      }, error => {
         console.warn(error);
         return this.router.navigateByUrl(`/dashboard/idiomas`);
      });
  }

  saveIdioma(){

    if(this.IdiomaForm.invalid) return;

    const { nombre } = this.IdiomaForm.value;

    if(this.IdiomaSelecionado){
      const data = {
        ...this.IdiomaForm.value,
        uid: this.IdiomaSelecionado.uid
      };

      this.idiomaService.Update(data)
      .subscribe(resp => {
        Swal.fire(
          'Updated',
          `${nombre} updated succesfully`,
          'success'
        );

        console.log(resp);
      })
    } else {


      this.idiomaService.createIdioma(this.IdiomaForm.value as IdiomaForm)
      .subscribe((resp: any) => {

        Swal.fire(
          'Created',
          `${nombre} created succesfully`,
          'success'
        );
        this.IdiomaForm.reset();
        this.router.navigateByUrl(`/dashboard/idioma`);

        console.log(resp);
      });
    }

}
}


