import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'pets',
        loadChildren: () =>
          import('./modules/animals/animals.module').then(
            (m) => m.AnimalsModule
          ),
      },
      {
        path: 'owners',
        loadChildren: () =>
          import('./modules/animals/animals.module').then(
            (m) => m.AnimalsModule
          ),
      },

      {
        path: 'species',
        loadChildren: () =>
          import('./modules/species/species.module').then(
            (m) => m.SpeciesModule
          ),
      },
      {
        path: 'specializations',
        loadChildren: () =>
          import('./modules/specializations/specializations.module').then(
            (m) => m.SpecializationsModule
          ),
      },
      {
        path: '**',
        redirectTo: 'pets/list',
      },
    ],
  },
];

@NgModule({
  declarations: [AdminComponent],
  imports: [
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    MatDatepickerModule,
  ],
  exports: [RouterModule],
})
export class AdminModule {}
