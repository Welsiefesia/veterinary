import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ListPayload } from '../resources/interfaces/list.payload';
import { PetsDataService } from './pets.data-service';

@Injectable({ providedIn: 'root' })
export class PetsState {
  petsList: BehaviorSubject<ListPayload[]> = new BehaviorSubject<ListPayload[]>(
    []
  );

  constructor(private dataService: PetsDataService) {}

  getList(): void {
    this.dataService.getList().subscribe((petsList) => {
      this.petsList.next(petsList);
    });
  }
}
