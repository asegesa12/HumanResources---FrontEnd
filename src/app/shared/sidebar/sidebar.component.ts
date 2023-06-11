import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItem: any[] = [];

  constructor(public sidebarService: SidebarService){

    this.menuItem = sidebarService.menu
  }

  ngOnInit(): void {

  }

}
