import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  screenWidth: number;
  public opened = false;
  constructor() {
      this.getScreenSize();
  }
  ngOnInit() {}
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.screenWidth = window.innerWidth;
  }


}
