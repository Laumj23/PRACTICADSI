import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

//variable para guardar el valor del ancho de la pantalla
  screenWidth: number;
  public opened = false;
  constructor() {
    //cogemos el tamaño de la pantalla
      this.getScreenSize();
  }
  ngOnInit() {}
  //con este evento calcula el tamaño cada vez que cambia.
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.screenWidth = window.innerWidth;
  }


}
