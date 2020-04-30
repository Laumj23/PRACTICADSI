import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CitaService } from '../../cita/cita.service';
import { CitaI } from '../../../shared/models/cita.interface';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss']
})
export class CitaComponent implements OnInit {
  public cita$: Observable<CitaI>;

  constructor(private route: ActivatedRoute, private citaSvc: CitaService) { }

  ngOnInit() {
    const idCita = this.route.snapshot.params.id;

    this.cita$ = this.citaSvc.getOneCita(idCita);
  }

}
