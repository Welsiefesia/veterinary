import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsComponent } from './pets.component';
import { RouterModule } from '@angular/router';
import { PetsRoutingModule } from './pets-routing.module';
import { ListPetsComponent } from './containers/list-pets/list-pets.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [PetsComponent, ListPetsComponent],
  imports: [
    CommonModule,
    RouterModule,
    PetsRoutingModule,
    MatTableModule,
    HttpClientModule,
    MatCardModule,
  ],
})
export class PetsModule {}
