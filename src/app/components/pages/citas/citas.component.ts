import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../cita/cita.service';
import { AuthService } from '../../../shared/services/auth.service';
import { CitaI } from '../../../shared/models/cita.interface';
import { Observable } from 'rxjs';
import { UserI } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {

  public citas$: Observable<CitaI[]>;
  public userID: string;

  constructor(private citaSvc: CitaService, private authSvc: AuthService) { }

  ngOnInit() {
    // this.authSvc.userData$.subscribe(user =>
    //   this.userID = user.displayName);
    this.userID = this.authSvc.getUserID();
    this.citas$ = this.citaSvc.getCitasFiltered(this.userID);
  }

}
