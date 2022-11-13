import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VisitInterface } from '../resources/visit.interface';
import { apiUrl } from '../../../../../../app.config';

@Injectable({ providedIn: 'root' })
export class VisitDataService {
  constructor(private http: HttpClient) {}

  getVisit(): Observable<VisitInterface[]> {
    return this.http.get<VisitInterface[]>(apiUrl + 'appointments');
  }
}
