import { NgModule } from '@angular/core';
import { SpecializationsComponent } from './specializations.component';
import { ListSpecializationsComponent } from './containers/list-specializations/list-specializations.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpecializationsRoutingModule } from './specializations-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SpecializationsCreateDialogComponent } from './containers/specializations-create-dialog/specializations-create-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SpecializationsDetailsDialogComponent } from './containers/specializations-details-dialog/specializations-details-dialog.component';

@NgModule({
  declarations: [
    SpecializationsComponent,
    ListSpecializationsComponent,
    SpecializationsCreateDialogComponent,
    SpecializationsDetailsDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SpecializationsRoutingModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
  ],
})
export class SpecializationsModule {}
