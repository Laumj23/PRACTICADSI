import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AuthGuard } from '../../shared/helpers/auth.guard';

const routes: Routes = [
  { path: '',
  component: AdminComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path:'posts',
      loadChildren: () =>
      import('../posts/list-posts/list-posts.module').then(
        m => m.ListPostsModule
      )
    },
    { path: 'home', loadChildren: () => import('../../components/pages/home/home.module').then(m => m.HomeModule)},
    { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) }
  ]
 }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
