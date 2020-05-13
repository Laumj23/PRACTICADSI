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

  public citasUser$: Observable<CitaI[]>;
  public citasDoctor$: Observable<CitaI[]>;
  public user: UserI;
  public userID: string;
  public userName: string;
  public currentImage: string;

  constructor(private citaSvc: CitaService, public authSvc: AuthService) { }

  ngOnInit() {
    this.authSvc.userData$.subscribe(user => this.user = user);

    this.userName = this.authSvc.getUserName();
    this.citasDoctor$ = this.citaSvc.getCitasDoctor(this.userName);

    this.userID = this.authSvc.getUserID();
    this.citasUser$ = this.citaSvc.getCitasFiltered(this.userID);

    this.currentImage = this.authSvc.getUserImage();
  }

}
