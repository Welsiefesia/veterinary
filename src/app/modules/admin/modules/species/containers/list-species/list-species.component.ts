import { Component, OnInit, ViewChild } from '@angular/core';
import { SpeciesDataService } from '../../services/species.data-service';
import { SpeciesState } from '../../services/species.state';
import { SpeciesCreateDialogComponent } from '../species-create-dialog/species-create-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Species } from '../../resources/interfaces/species.interface';
import { SpeciesDetailsDialogComponent } from '../species-details-dialog/species-details-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-species',
  templateUrl: './list-species.component.html',
  styleUrls: ['./list-species.component.scss'],
})
export class ListSpeciesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'edit'];
  dataSource: MatTableDataSource<Species> = new MatTableDataSource<Species>([]);
  form: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dataService: SpeciesDataService,
    public speciesState: SpeciesState,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      search: [''],
    });
  }

  ngOnInit(): void {
    this.getList();
    this.getFilteredSpeciesList();
    this.handleSearchChanges();
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

  getList(): void {
    this.speciesState.getList();
  }

  openCreateDialog() {
    this.dialog
      .open(SpeciesCreateDialogComponent, {
        width: '300px',
      })
      .afterClosed()
      .subscribe((result) => {
        console.log('The dialog was closed', result);
        if (result) {
          this.dataService.addSpecies(result).subscribe(() => this.getList());
        }
      });
  }

  openDetailsDialog(species: Species) {
    this.dataService.getSpeciesDetails(species.id).subscribe((species) => {
      this.dialog
        .open(SpeciesDetailsDialogComponent, {
          data: {
            species: species,
          },
        })
        .afterClosed()
        .subscribe((result) => {
          console.log('The dialog was closed', result);
          if (result) {
            this.speciesState.updateList({ ...species, ...result });
          }
        });
    });
  }
  onDelete(deleteSpecies: Species) {
    this.dataService.onDelete(deleteSpecies.id).subscribe(() => this.getList());
  }

  private getFilteredSpeciesList() {
    this.speciesState.filteredSpeciesList.subscribe((list) => {
      this.dataSource.data = list;
    });
  }
  private handleSearchChanges() {
    this.form.controls.search.valueChanges.subscribe((search) => {
      this.speciesState.setSearch(search);
    });
  }
}
