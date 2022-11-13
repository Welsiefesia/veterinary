import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'pets',
        loadChildren: () =>
          import('./modules/pets/pets.module').then((m) => m.PetsModule),
      },
      {
        path: 'visit',
        loadChildren: () =>
          import('./modules/visits/visit/visit.module').then(
            (m) => m.VisitModule
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
  declarations: [UserComponent],
  imports: [
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    CommonModule,
  ],
  exports: [RouterModule],
})
export class UserModule {}
