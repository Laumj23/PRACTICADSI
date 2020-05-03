import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './components/posts/post/post.component';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';

const routes: Routes = [
{ path: '', component: ContainerAppComponent, children: [
  { path: 'home', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule) },
  { path: 'post/:id', component: PostComponent},
  { path: 'about', loadChildren: () => import('./components/pages/about/about.module').then(m => m.AboutModule) },
  { path: 'citas', loadChildren: () => import('./components/pages/citas/citas.module').then(m => m.CitasModule) },
  { path: 'avisos', loadChildren: () => import('./components/pages/avisos/avisos.module').then(m => m.AvisosModule) },
  { path: '', redirectTo: '/login', pathMatch: 'full'}
  ]
},
{ path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) },
{ path: 'login', loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
