import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../cita/cita.service';
import { AuthService } from '../../../shared/services/auth.service';
import { CitaI } from '../../../shared/models/cita.interface';
import { Observable } from 'rxjs';
import { UserI } from 'src/app/shared/models/user.interface';
import { NewCitaModule } from './new-cita/new-cita.module';
@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {

  public citas$: Observable<CitaI[]>;
  public user: UserI;
  public userID: string;
  public currentImage: string;

  constructor(private citaSvc: CitaService, private authSvc: AuthService) { }

  ngOnInit() {
    // this.authSvc.userData$.subscribe(user =>
    //   this.userID = user.displayName);
    this.authSvc.userData$.subscribe(user => this.user = user);
    this.userID = this.authSvc.getUserID();
    this.citas$ = this.citaSvc.getCitasFiltered(this.userID);
    this.currentImage = this.authSvc.getUserImage();
  }

}
