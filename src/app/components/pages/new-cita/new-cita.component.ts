import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../cita/cita.service';
import { AuthService } from 'src/app/shared/services/auth.service';

interface Consulta {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-cita',
  templateUrl: './new-cita.component.html',
  styleUrls: ['./new-cita.component.scss']
})
export class NewCitaComponent implements OnInit {

  consultas: Consulta[] = [
    {value: 'Atención primaria', viewValue: 'Atención primaria'},
    {value: 'Atención especializada', viewValue: 'Atención especializada'}
  ];

  constructor(private citaSvc: CitaService, private authSvc: AuthService) { }

  ngOnInit() {
  }

}
