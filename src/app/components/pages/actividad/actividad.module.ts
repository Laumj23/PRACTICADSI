import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActividadRoutingModule } from './actividad-routing.module';
import { ActividadComponent } from './actividad.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { MaterialModule } from '../../../material.module';


@NgModule({
  declarations: [ActividadComponent, TableComponent],
  imports: [
    CommonModule,
    ActividadRoutingModule,
    MaterialModule
  ]
})
export class ActividadModule { }
