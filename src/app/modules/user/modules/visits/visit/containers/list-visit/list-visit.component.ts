import { Component, OnInit } from '@angular/core';
import { VisitDataService } from '../../services/visit.data-service';
import { VisitState } from '../../services/visit.state';

@Component({
  selector: 'app-list-visit',
  templateUrl: './list-visit.component.html',
  styleUrls: ['./list-visit.component.scss'],
})
export class ListVisitComponent implements OnInit {
  displayedColumns: string[] = [
    'date',
    'startTime',
    'diagnosis',
    'recommendations',
  ];

  constructor(
    public dataService: VisitDataService,
    public visitState: VisitState
  ) {}

  ngOnInit(): void {
    this.getVisit();
  }

  private getVisit(): void {
    this.visitState.getVisit();
  }
}
