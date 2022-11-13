import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, first } from 'rxjs';
import { AnimalsInterface } from '../resources/interfaces/animals.interface';
import { AnimalsDataService } from './animals-data-service';
import { AnimalDetailsDialogInterface } from '../resources/interfaces/animal-details-dialog.interface';
import { Owner } from '../resources/interfaces/owner.interface';
import { CreateAnimalPayloadInterface } from '../resources/interfaces/create-animal-payload.interface';
import { Species } from '../resources/interfaces/species.interface';

@Injectable({ providedIn: 'root' })
export class AnimalsState {
  animalsList: BehaviorSubject<AnimalsInterface[]> = new BehaviorSubject<
    AnimalsInterface[]
  >([]);
  ownerList: BehaviorSubject<Owner[]> = new BehaviorSubject<Owner[]>([]);
  newList: BehaviorSubject<CreateAnimalPayloadInterface[]> =
    new BehaviorSubject<CreateAnimalPayloadInterface[]>([]);
  speciesList: BehaviorSubject<Species[]> = new BehaviorSubject<Species[]>([]);
  search: BehaviorSubject<string> = new BehaviorSubject<string>('');
  filteredAnimalsList: BehaviorSubject<AnimalsInterface[]> =
    new BehaviorSubject<AnimalsInterface[]>([]);

  constructor(private dataService: AnimalsDataService) {
    this.search.subscribe(() => {
      this.searchAnimal();
    });
  }

  getList(): void {
    this.dataService.getList().subscribe((animalsList) => {
      this.animalsList.next(animalsList);
      this.searchAnimal();
    });
  }

  getOwner(): void {
    this.dataService.getOwner().subscribe((ownerList) => {
      this.ownerList.next(ownerList);
    });
  }

  getSpecies(): void {
    this.dataService.getSpecies().subscribe((speciesList) => {
      this.speciesList.next(speciesList);
    });
  }

  searchAnimal(): void {
    combineLatest([
      this.animalsList.pipe(first()),
      this.search.pipe(first()),
    ]).subscribe(([animal, search]) => {
      this.filteredAnimalsList.next(
        animal.filter(
          (item) =>
            item.gender.toLowerCase().includes(search.toLowerCase()) ||
            item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    });
  }

  setSearch(search: string): void {
    this.search.next(search);
  }

  addAnimal(payload: CreateAnimalPayloadInterface) {
    this.newList.pipe(first()).subscribe((newList) => {
      this.newList.next([...newList, payload]);
    });
  }

  onDelete(deleteAnimal: AnimalsInterface) {
    this.animalsList.pipe(first()).subscribe((animals) => {
      this.animalsList.next(
        animals.filter((animal) => animal !== deleteAnimal)
      );
    });
  }

  detailsAnimals(animal: AnimalDetailsDialogInterface): void {
    this.animalsList.pipe(first()).subscribe((animals) => {
      const relatedAnimal = animals.find((animals) => animals.id == animal.id);
      if (relatedAnimal) {
        relatedAnimal.id = animal.id;
        relatedAnimal.name = animal.name;
        relatedAnimal.gender = animal.gender;
        relatedAnimal.birthDate = animal.birthDate;
        relatedAnimal.weightKg = animal.weightKg;
        relatedAnimal.neutered = animal.neutered;
      }
    });
  }

  updateAnimals(animal: AnimalDetailsDialogInterface) {
    this.animalsList.pipe(first()).subscribe((animals) => {
      let state = animals.findIndex((state) => state.id == animal.id);

      if (state !== -1) {
        animals[state] = animal;
        this.animalsList.next([...animals]);
      }
    });
  }

  updateList(pet: AnimalDetailsDialogInterface) {
    this.dataService.updateList(pet).subscribe(() => {
      this.getList();
    });
  }
}
