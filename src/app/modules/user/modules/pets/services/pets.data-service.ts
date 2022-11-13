import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListPayload } from '../resources/interfaces/list.payload';
import { Observable } from 'rxjs';
import { apiUrl } from '../../../../../app.config';

@Injectable({ providedIn: 'root' })
export class PetsDataService {
  constructor(private http: HttpClient) {}

  getList(): Observable<ListPayload[]> {
    return this.http.get<ListPayload[]>(apiUrl + 'pets');
  }
}
