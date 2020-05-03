import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvisosRoutingModule } from './avisos-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { AvisosComponent } from './avisos.component';


@NgModule({
  declarations: [AvisosComponent],
  imports: [
    CommonModule,
    AvisosRoutingModule,
    MaterialModule
  ]
})
export class AvisosModule { }
