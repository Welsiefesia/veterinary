import { Injectable } from '@angular/core';
import { BehaviorSubject, first } from 'rxjs';
import { VisitInterface } from '../resources/visit.interface';
import { VisitDataService } from './visit.data-service';

@Injectable({ providedIn: 'root' })
export class VisitState {
  visit: BehaviorSubject<VisitInterface[]> = new BehaviorSubject<
    VisitInterface[]
  >([]);

  constructor(private dataService: VisitDataService) {}

  getVisit(): void {
    this.dataService
      .getVisit()
      .pipe(first())
      .subscribe((visit) => {
        this.visit.next(visit);
      });
  }
}
