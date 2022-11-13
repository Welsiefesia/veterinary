import { NgModule } from '@angular/core';
import { SpeciesComponent } from './species.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpeciesRoutingModule } from './species-routing.module';
import { ListSpeciesComponent } from './containers/list-species/list-species.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { SpeciesCreateDialogComponent } from './containers/species-create-dialog/species-create-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { SpeciesDetailsDialogComponent } from './containers/species-details-dialog/species-details-dialog.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    SpeciesComponent,
    ListSpeciesComponent,
    SpeciesCreateDialogComponent,
    SpeciesDetailsDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SpeciesRoutingModule,
    MatCardModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule,
  ],
})
export class SpeciesModule {}
