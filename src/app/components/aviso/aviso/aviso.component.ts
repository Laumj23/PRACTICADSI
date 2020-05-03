import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AvisoI } from 'src/app/shared/models/aviso.interface';
import { ActivatedRoute } from '@angular/router';
import { AvisoService } from '../aviso.service';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrls: ['./aviso.component.scss']
})
export class AvisoComponent implements OnInit {

  public aviso$: Observable<AvisoI>;

  constructor(private route: ActivatedRoute, private avisoSvc: AvisoService) { }

  ngOnInit() {
    const idAviso = this.route.snapshot.params.id;
    this.aviso$ = this.avisoSvc.getOneAviso(idAviso);
  }

}
