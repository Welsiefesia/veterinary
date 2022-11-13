import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AnimalsComponent } from './animals.component';
import { ListAnimalsComponent } from './containers/list-animals/list-animals.component';

const routes: Routes = [
  {
    path: '',
    component: AnimalsComponent,
    children: [
      {
        path: 'list',
        component: ListAnimalsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimalsRoutingModule {}
