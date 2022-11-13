import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../../../app.config';
import { RegistrationPayload } from '../resources/interfaces/registration.payload';
import { LoginPayload } from '../resources/interfaces/login.payload';
import { LoginResponse } from '../resources/interfaces/login.response';
import { RegistrationResponse } from '../resources/interfaces/registration.response';

@Injectable({ providedIn: 'root' })
export class AuthDataService {
  constructor(private http: HttpClient) {}

  register(payload: RegistrationPayload): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(apiUrl + 'owners', payload);
  }

  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(apiUrl + 'users/login', payload);
  }
}
