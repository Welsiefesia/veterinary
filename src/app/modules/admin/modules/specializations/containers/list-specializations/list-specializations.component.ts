import { Component, OnInit, ViewChild } from '@angular/core';
import { SpecializationsDataService } from '../../services/specializations.data-service';
import { SpecializationsState } from '../../services/specializations.state';
import { MatTableDataSource } from '@angular/material/table';
import { SpecializationsInterface } from '../../resources/interfaces/specializations.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SpecializationsCreateDialogComponent } from '../specializations-create-dialog/specializations-create-dialog.component';
import { SpecializationsDetailsDialogComponent } from '../specializations-details-dialog/specializations-details-dialog.component';
import { first } from 'rxjs';

@Component({
  selector: 'app-list-specializations',
  templateUrl: './list-specializations.component.html',
  styleUrls: ['./list-specializations.component.scss'],
})
export class ListSpecializationsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'edit'];
  dataSource: MatTableDataSource<SpecializationsInterface> =
    new MatTableDataSource<SpecializationsInterface>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dataService: SpecializationsDataService,
    public state: SpecializationsState,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getList();
    this.getSpecializationList();
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
    this.state.getList();
  }

  openCreateDialog() {
    this.dialog
      .open(SpecializationsCreateDialogComponent, {
        width: '300px',
      })
      .afterClosed()
      .subscribe((result) => {
        console.log('The dialog was closed', result);
        if (result) {
          this.dataService
            .addSpecialization(result)
            .subscribe(() => this.getList());
        }
      });
  }

  openDetailsDialog(specializations: SpecializationsInterface) {
    this.dataService
      .getSpecializationsDetails(specializations.id)
      .subscribe((specializations) => {
        this.dialog
          .open(SpecializationsDetailsDialogComponent, {
            data: {
              specializations: specializations,
            },
          })
          .afterClosed()
          .subscribe((result) => {
            console.log('The dialog was closed', result);
            if (result) {
              this.state.updateList({ ...specializations, ...result });
            }
          });
      });
  }

  onDelete(deleteSpecializations: SpecializationsInterface) {
    this.dataService
      .onDelete(deleteSpecializations.id)
      .subscribe(() => this.getList());
  }

  private getSpecializationList(): void {
    this.state.specializationsList.pipe(first()).subscribe((list) => {
      this.dataSource.data = list;
    });
  }
}
