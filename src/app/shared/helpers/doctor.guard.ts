import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap, take, map } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class DoctorGuard implements CanActivate {

  constructor(
    private authSvc: AuthService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authSvc.userData$.pipe(
      take(1),
      map(user => user && user.roles.doctor ? true : false),
      tap(isDoctor => {
        if (!isDoctor) {
          console.error('Access denied - Doctors only');
        }
      })
    );
  }

}
