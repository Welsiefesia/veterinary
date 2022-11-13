import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { AnimalsComponent } from './animals.component';
import { ListAnimalsComponent } from './containers/list-animals/list-animals.component';
import { AnimalsRoutingModule } from './animals-routing.module';
import { AnimalDetailsDialogComponent } from './containers/animal-details-dialog/animal-details-dialog.component';
import { MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AnimalCreateDialogComponent } from './containers/animal-create-dialog/animal-create-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AnimalsComponent,
    ListAnimalsComponent,
    AnimalDetailsDialogComponent,
    AnimalCreateDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AnimalsRoutingModule,
    MatTableModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatSelectModule,
    FormsModule,
    MatSortModule,
    MatPaginatorModule,
  ],
})
export class AnimalsModule {}
