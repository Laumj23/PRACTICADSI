import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../../shared/services/cita.service';
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
  public doctor: boolean;
  public currentImage: string;

  constructor(private citaSvc: CitaService, public authSvc: AuthService) { }

  ngOnInit() {
    // La página identifica al usuario conectado
    this.authSvc.userData$.subscribe(user => {
      // Comprueba si es un doctor y lo guarda
      this.doctor = this.authSvc.isDoctor(user);
      // En caso de serlo, coge las citas con su nombre
      if (this.doctor) {
        this.citasDoctor$ = this.citaSvc.getCitasDoctor(user.displayName);
      // En caso de ser un usuario, coge las citas con su uid
      } else {
        this.citasUser$ = this.citaSvc.getCitasFiltered(user.uid);
      }
      this.currentImage = this.authSvc.getUserImage();
    });
  }

}
