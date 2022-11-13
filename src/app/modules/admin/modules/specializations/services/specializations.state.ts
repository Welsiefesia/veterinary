import { Injectable } from '@angular/core';
import { BehaviorSubject, first } from 'rxjs';
import { SpecializationsInterface } from '../resources/interfaces/specializations.interface';
import { SpecializationsDataService } from './specializations.data-service';
import { CreateSpecializationsInterface } from '../resources/interfaces/create-specializations-interface';
import { SpecializationsDetailsInterface } from '../resources/interfaces/specializations-details-interface';

@Injectable({ providedIn: 'root' })
export class SpecializationsState {
  specializationsList: BehaviorSubject<SpecializationsInterface[]> =
    new BehaviorSubject<SpecializationsInterface[]>([]);
  newList: BehaviorSubject<CreateSpecializationsInterface[]> =
    new BehaviorSubject<CreateSpecializationsInterface[]>([]);

  constructor(private dataService: SpecializationsDataService) {}

  getList() {
    this.dataService.getList().subscribe((specializationsList) => {
      this.specializationsList.next(specializationsList);
    });
  }

  addSpecialization(payload: CreateSpecializationsInterface) {
    this.newList.pipe(first()).subscribe((newList) => {
      this.newList.next([...newList, payload]);
    });
  }

  updateSpecialization(specializations: SpecializationsDetailsInterface) {
    this.specializationsList.pipe(first()).subscribe((specialization) => {
      let state = specialization.findIndex(
        (state) => state.id == specializations.id
      );
      if (state !== -1) {
        specialization[state] = specializations;
        this.specializationsList.next([...specialization]);
      }
    });
  }

  updateList(specialization: SpecializationsDetailsInterface) {
    this.dataService.updateList(specialization).subscribe(() => {
      this.getList();
    });
  }

  onDelete(deleteSpecializations: SpecializationsInterface) {
    this.specializationsList.pipe(first()).subscribe((specializations) => {
      this.specializationsList.next(
        specializations.filter(
          (specialization) => specialization !== deleteSpecializations
        )
      );
    });
  }
}
