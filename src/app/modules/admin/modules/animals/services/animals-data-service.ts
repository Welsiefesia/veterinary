import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { apiUrl } from '../../../../../app.config';
import { AnimalsInterface } from '../resources/interfaces/animals.interface';
import { AnimalDetailsDialogInterface } from '../resources/interfaces/animal-details-dialog.interface';
import { Owner } from '../resources/interfaces/owner.interface';
import { CreateAnimalPayloadInterface } from '../resources/interfaces/create-animal-payload.interface';
import { Species } from '../resources/interfaces/species.interface';

@Injectable({ providedIn: 'root' })
export class AnimalsDataService {
  constructor(private http: HttpClient) {}

  getList(): Observable<AnimalsInterface[]> {
    return this.http.get<AnimalsInterface[]>(apiUrl + 'pets').pipe(
      map((animals) =>
        animals.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        })
      )
    );
  }

  getPetDetails(id: number): Observable<AnimalDetailsDialogInterface> {
    return this.http.get<AnimalDetailsDialogInterface>(apiUrl + 'pets/' + id);
  }

  getOwner(): Observable<Owner[]> {
    return this.http.get<Owner[]>(apiUrl + 'owners');
  }

  getSpecies(): Observable<Species[]> {
    return this.http.get<Species[]>(apiUrl + 'species');
  }

  addAnimal(
    payload: CreateAnimalPayloadInterface
  ): Observable<AnimalsInterface> {
    payload.birthDate = (payload.birthDate as unknown as Date)
      .toISOString()
      .slice(0, 10);
    return this.http.post<AnimalsInterface>(apiUrl + 'pets', payload);
  }

  onDelete(id: number): Observable<AnimalsInterface> {
    return this.http.delete<AnimalsInterface>(apiUrl + 'pets/' + id);
  }

  updateList(
    pet: AnimalDetailsDialogInterface
  ): Observable<AnimalDetailsDialogInterface[]> {
    return this.http.put<AnimalDetailsDialogInterface[]>(
      apiUrl + 'pets/' + pet.id,
      {
        name: pet.name,
        gender: pet.gender,
        birthDate: pet.birthDate,
        weightKg: pet.weightKg,
        neutered: pet.neutered,
        ownerId: pet.owner.id,
        speciesId: pet.species.id,
      }
    );
  }
}
