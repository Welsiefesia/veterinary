import { RouterModule, Routes } from '@angular/router';
import { VisitComponent } from './visit.component';
import { NgModule } from '@angular/core';
import { ListVisitComponent } from './containers/list-visit/list-visit.component';

const routes: Routes = [
  {
    path: '',
    component: VisitComponent,
    children: [
      {
        path: 'list',
        component: ListVisitComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitRoutingModule {}
