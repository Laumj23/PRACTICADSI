import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AvisoI } from 'src/app/shared/models/aviso.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AvisoService } from '../../../shared/services/aviso.service';
import { UserI } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.scss']
})
export class AvisosComponent implements OnInit {

  public avisos$: Observable<AvisoI[]>;
  public currentImage: string;

  constructor(private avisoSvc: AvisoService, private authSvc: AuthService) { }

  ngOnInit() {
    // La página identifica al usuario conectado
    this.authSvc.userData$.subscribe(user => {
      // Obtiene todos los avisos asociados a ese usuario
      this.avisos$ = this.avisoSvc.getAvisosByUser(user.uid);
    });
  }

}
