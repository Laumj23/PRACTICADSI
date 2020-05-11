import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-container-app',
  templateUrl: './container-app.component.html',
  styleUrls: ['./container-app.component.scss']
})
export class ContainerAppComponent implements OnInit {
      screenWidth: number;

      constructor() {
          this.getScreenSize();
      }
      ngOnInit() {}
      @HostListener('window:resize', ['$event'])
      getScreenSize(event?) {
            this.screenWidth = window.innerWidth;
      }

}
