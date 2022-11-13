import { Component, OnInit } from '@angular/core';
import { PetsDataService } from '../../services/pets.data-service';
import { PetsState } from '../../services/pets state';

@Component({
  selector: 'app-list-pets',
  templateUrl: './list-pets.component.html',
  styleUrls: ['./list-pets.component.scss'],
})
export class ListPetsComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'gender',
    'birthDate',
    'weightKg',
    'neutered',
  ];

  constructor(
    public petsDataService: PetsDataService,
    public petsState: PetsState
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  private getList(): void {
    this.petsState.getList();
  }
}
