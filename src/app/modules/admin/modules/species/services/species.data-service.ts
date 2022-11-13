import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Species } from '../resources/interfaces/species.interface';
import { apiUrl } from '../../../../../app.config';
import { Specialization } from '../resources/interfaces/specialization.interface';
import { CreateSpeciesPayloadInterface } from '../resources/interfaces/create-species-payload.interface';
import { SpeciesDetails } from '../resources/interfaces/species-details.interface';

@Injectable({ providedIn: 'root' })
export class SpeciesDataService {
  constructor(private http: HttpClient) {}

  getList(): Observable<Species[]> {
    return this.http.get<Species[]>(apiUrl + 'species').pipe(
      map((species) =>
        species.sort((a, b) => {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
        })
      )
    );
  }

  getSpecialization(): Observable<Specialization[]> {
    return this.http.get<Specialization[]>(apiUrl + 'specializations');
  }

  addSpecies(payload: CreateSpeciesPayloadInterface): Observable<Species> {
    return this.http.post<Species>(apiUrl + 'species', payload);
  }

  getSpeciesDetails(id: number): Observable<SpeciesDetails> {
    return this.http.get<SpeciesDetails>(apiUrl + 'species/' + id);
  }

  updateList(species: SpeciesDetails): Observable<SpeciesDetails[]> {
    return this.http.put<SpeciesDetails[]>(apiUrl + 'species/' + species.id, {
      name: species.name,
      specializationId: species.specialization,
    });
  }

  onDelete(id: number): Observable<Species> {
    return this.http.delete<Species>(apiUrl + 'species/' + id);
  }
}
