import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  public titulo?: string
  public tituloSub$?: Subscription;

  constructor(private router: Router){
      this.router.events.pipe(
        filter((event: any) => event instanceof ActivationEnd),
        filter ((event:any) => event.snapshot.firstChild === null),
        map( (event: any) => event.snapshot.data),
      ).subscribe( ({titulo}) => {
        this.titulo = titulo;
        document.title = titulo;

      })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.tituloSub$?.unsubscribe();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
}
