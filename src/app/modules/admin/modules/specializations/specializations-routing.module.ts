import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SpecializationsComponent } from './specializations.component';
import { ListSpecializationsComponent } from './containers/list-specializations/list-specializations.component';

const routes: Routes = [
  {
    path: '',
    component: SpecializationsComponent,
    children: [
      {
        path: 'list',
        component: ListSpecializationsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecializationsRoutingModule {}
