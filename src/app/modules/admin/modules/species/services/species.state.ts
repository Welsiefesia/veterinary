import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, first } from 'rxjs';
import { Species } from '../../animals/resources/interfaces/species.interface';
import { SpeciesDataService } from './species.data-service';
import { Specialization } from '../resources/interfaces/specialization.interface';
import { CreateSpeciesPayloadInterface } from '../resources/interfaces/create-species-payload.interface';
import { SpeciesDetails } from '../resources/interfaces/species-details.interface';

@Injectable({ providedIn: 'root' })
export class SpeciesState {
  speciesList: BehaviorSubject<Species[]> = new BehaviorSubject<Species[]>([]);
  specializationList: BehaviorSubject<Specialization[]> = new BehaviorSubject<
    Specialization[]
  >([]);
  newList: BehaviorSubject<CreateSpeciesPayloadInterface[]> =
    new BehaviorSubject<CreateSpeciesPayloadInterface[]>([]);
  search: BehaviorSubject<string> = new BehaviorSubject<string>('');
  filteredSpeciesList: BehaviorSubject<Species[]> = new BehaviorSubject<
    Species[]
  >([]);

  constructor(private dataService: SpeciesDataService) {
    this.search.subscribe(() => {
      this.searchSpecies();
    });
  }

  getList(): void {
    this.dataService.getList().subscribe((speciesList) => {
      this.speciesList.next(speciesList);
      this.searchSpecies();
    });
  }

  getSpecialization() {
    this.dataService.getSpecialization().subscribe((specializationList) => {
      this.specializationList.next(specializationList);
    });
  }

  searchSpecies(): void {
    combineLatest([
      this.speciesList.pipe(first()),
      this.search.pipe(first()),
    ]).subscribe(([species, search]) => {
      this.filteredSpeciesList.next(
        species.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    });
  }

  setSearch(search: string): void {
    this.search.next(search);
  }

  addSpecies(payload: CreateSpeciesPayloadInterface) {
    this.newList.pipe(first()).subscribe((newList) => {
      this.newList.next([...newList, payload]);
    });
  }

  updateSpecies(species: SpeciesDetails) {
    this.speciesList.pipe(first()).subscribe((specie) => {
      let state = specie.findIndex((state) => state.id == species.id);
      if (state !== -1) {
        specie[state] = species;
        this.speciesList.next([...specie]);
      }
    });
  }

  updateList(species: SpeciesDetails) {
    this.dataService.updateList(species).subscribe(() => {
      this.getList();
    });
  }

  detailsSpecies(species: SpeciesDetails) {
    this.speciesList.pipe(first()).subscribe((specie) => {
      const relatedSpecies = specie.find((specie) => specie.id == species.id);
      if (relatedSpecies) {
        relatedSpecies.id = species.id;
        relatedSpecies.name = species.name;
        relatedSpecies.name = species.specialization.name;
        relatedSpecies.id = species.specialization.id;
      }
    });
  }

  onDelete(deleteSpecies: Species) {
    this.speciesList.pipe(first()).subscribe((species) => {
      this.speciesList.next(
        species.filter((specie) => specie !== deleteSpecies)
      );
    });
  }
}
