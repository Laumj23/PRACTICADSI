import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AvisoI } from 'src/app/shared/models/aviso.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AvisoService } from '../../aviso/aviso.service';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.scss']
})
export class AvisosComponent implements OnInit {

  public avisos$: Observable<AvisoI[]>;
  public userID: string;

  constructor(private avisoSvc: AvisoService, private authSvc: AuthService) { }

  ngOnInit() {
    this.userID = this.authSvc.getUserID();
    this.avisos$ = this.avisoSvc.getAvisosByUser(this.userID);
  }

}
