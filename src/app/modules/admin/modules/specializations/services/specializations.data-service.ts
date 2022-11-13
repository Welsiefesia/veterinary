import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { SpecializationsInterface } from '../resources/interfaces/specializations.interface';
import { apiUrl } from '../../../../../app.config';
import { CreateSpecializationsInterface } from '../resources/interfaces/create-specializations-interface';
import { SpecializationsDetailsInterface } from '../resources/interfaces/specializations-details-interface';

@Injectable({ providedIn: 'root' })
export class SpecializationsDataService {
  constructor(private http: HttpClient) {}

  getList(): Observable<SpecializationsInterface[]> {
    return this.http
      .get<SpecializationsInterface[]>(apiUrl + 'specializations')
      .pipe(
        map((specializations) =>
          specializations.sort((a, b) => {
            if (a.id > b.id) return 1;
            if (a.id < b.id) return -1;
            return 0;
          })
        )
      );
  }

  addSpecialization(
    payload: CreateSpecializationsInterface
  ): Observable<SpecializationsInterface> {
    return this.http.post<SpecializationsInterface>(
      apiUrl + 'specializations',
      payload
    );
  }

  updateList(
    specializations: SpecializationsDetailsInterface
  ): Observable<SpecializationsDetailsInterface> {
    return this.http.put<SpecializationsDetailsInterface>(
      apiUrl + 'specializations/' + specializations.id,
      {
        name: specializations.name,
      }
    );
  }

  getSpecializationsDetails(
    id: number
  ): Observable<SpecializationsDetailsInterface> {
    return this.http.get<SpecializationsDetailsInterface>(
      apiUrl + 'specializations/' + id
    );
  }

  onDelete(id: number): Observable<SpecializationsInterface> {
    return this.http.delete<SpecializationsInterface>(
      apiUrl + 'specializations/' + id
    );
  }
}
