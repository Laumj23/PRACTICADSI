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
  public user: string;

  constructor(private citaSvc: CitaService, private authSvc: AuthService) { 
    this.user = AuthService.uid;
  }

  ngOnInit() {
    this.citas$ = this.citaSvc.getAllCitas();
  }

}
