import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SpeciesComponent } from './species.component';
import { ListSpeciesComponent } from './containers/list-species/list-species.component';

const routes: Routes = [
  {
    path: '',
    component: SpeciesComponent,
    children: [
      {
        path: 'list',
        component: ListSpeciesComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpeciesRoutingModule {}
