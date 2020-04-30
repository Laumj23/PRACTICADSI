import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../cita/cita.service';
import { CitaI } from '../../../shared/models/cita.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {

  public citas$: Observable<CitaI[]>;

  constructor(private citaSvc: CitaService) { }

  ngOnInit() {
    this.citas$ = this.citaSvc.getAllCitas();
  }

}
