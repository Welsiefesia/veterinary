import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { UserInterface } from '../resources/interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthState {
  accessToken: BehaviorSubject<string> = new BehaviorSubject<string>('');
  refreshToken: BehaviorSubject<string> = new BehaviorSubject<string>('');
  user: BehaviorSubject<UserInterface | null> =
    new BehaviorSubject<UserInterface | null>(null);

  constructor(private router: Router) {}

  setAccessToken(token: string): void {
    this.accessToken.next(token);
    let decoded = jwtDecode<UserInterface>(token);
    this.user.next(decoded);
  }

  logout(): void {
    this.accessToken.next('');
    this.refreshToken.next('');
    this.user.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  isAuthenticated(): Observable<boolean> {
    return this.accessToken.pipe(map((token) => Boolean(token)));
  }
}
