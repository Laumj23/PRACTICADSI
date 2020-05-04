import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActividadComponent } from './actividad.component';

const routes: Routes = [{ path: '', component: ActividadComponent, pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActividadRoutingModule { }
