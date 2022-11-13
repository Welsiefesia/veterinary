import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { first, map, Observable } from 'rxjs';
import { AuthState } from '../auth/services/auth.state';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private authState: AuthState, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authState.user.pipe(
      first(),
      map((user) => {
        return user ? true : this.router.createUrlTree(['auth', 'login']);
      })
    );
  }
}
