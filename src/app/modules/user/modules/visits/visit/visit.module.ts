import { NgModule } from '@angular/core';
import { VisitComponent } from './visit.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { ListVisitComponent } from './containers/list-visit/list-visit.component';
import { VisitRoutingModule } from './visit-routing.module';

@NgModule({
  declarations: [VisitComponent, ListVisitComponent],
  imports: [
    CommonModule,
    RouterModule,
    VisitRoutingModule,
    MatTableModule,
    HttpClientModule,
    MatCardModule,
  ],
})
export class VisitModule {}
