import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public currentImage: string;

  constructor(public authSvc: AuthService) { }

  ngOnInit() {
    // Coge la imagen del usuario
    this.currentImage = this.authSvc.getUserImage();
  }

  onLogout(): void {
    this.authSvc.logout();
  }

}
