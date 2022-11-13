import { Component, OnInit, ViewChild } from '@angular/core';
import { AnimalsState } from '../../services/animals state';
import { AnimalsDataService } from '../../services/animals-data-service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AnimalDetailsDialogComponent } from '../animal-details-dialog/animal-details-dialog.component';
import { AnimalsInterface } from '../../resources/interfaces/animals.interface';
import { AnimalCreateDialogComponent } from '../animal-create-dialog/animal-create-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { first } from 'rxjs';

@Component({
  selector: 'app-list-animals',
  templateUrl: './list-animals.component.html',
  styleUrls: ['./list-animals.component.scss'],
})
export class ListAnimalsComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'gender',
    'birthDate',
    'weightKg',
    'neutered',
    'edit',
  ];
  dataSource: MatTableDataSource<AnimalsInterface> =
    new MatTableDataSource<AnimalsInterface>([]);
  form: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public animalsDataService: AnimalsDataService,
    public animalsState: AnimalsState,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      search: [''],
    });
  }

  ngOnInit(): void {
    this.animalsState.getList();

    this.animalsState.filteredAnimalsList.pipe(first()).subscribe((list) => {
      this.dataSource.data = list;
    });

    this.form.controls.search.valueChanges.pipe(first()).subscribe((search) => {
      this.animalsState.setSearch(search);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDetailsDialog(animal: AnimalsInterface) {
    this.animalsDataService.getPetDetails(animal.id).subscribe((animal) => {
      this.dialog
        .open(AnimalDetailsDialogComponent, {
          data: {
            animal: animal,
          },
        })
        .afterClosed()
        .subscribe((result) => {
          console.log('The dialog was closed', result);
          if (result) {
            this.animalsState.updateList({ ...animal, ...result });
          }
        });
    });
  }

  openCreateDialog() {
    this.dialog
      .open(AnimalCreateDialogComponent, {
        width: '300px',
      })
      .afterClosed()
      .subscribe((result) => {
        console.log('The dialog was closed', result);
        if (result) {
          this.animalsDataService
            .addAnimal(result)
            .subscribe(() => this.getList());
        }
      });
  }

  onDelete(deleteAnimal: AnimalsInterface) {
    this.animalsDataService
      .onDelete(deleteAnimal.id)
      .subscribe(() => this.getList());
  }

  private getList(): void {
    this.animalsState.getList();
  }
}
