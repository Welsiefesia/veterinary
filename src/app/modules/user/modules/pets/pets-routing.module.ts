import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetsComponent } from './pets.component';
import { ListPetsComponent } from './containers/list-pets/list-pets.component';

const routes: Routes = [
  {
    path: '',
    component: PetsComponent,
    children: [
      {
        path: 'list',
        component: ListPetsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetsRoutingModule {}
