import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpeciesState } from '../../services/species.state';
import { SpeciesDataService } from '../../services/species.data-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SpeciesDetails } from '../../resources/interfaces/species-details.interface';

@Component({
  selector: 'app-species-details-dialog',
  templateUrl: './species-details-dialog.component.html',
  styleUrls: ['./species-details-dialog.component.scss'],
})
export class SpeciesDetailsDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public state: SpeciesState,
    public dataService: SpeciesDataService,
    @Inject(MAT_DIALOG_DATA) public data: { species: SpeciesDetails },
    public dialogRef: MatDialogRef<SpeciesDetailsDialogComponent>
  ) {
    console.log(data);
    this.form = this.fb.group({
      specialization: [data.species.specialization.id],
      name: [data.species.name],
    });
  }

  ngOnInit(): void {
    this.getSpecialization();
  }

  updateList() {
    this.dialogRef.close(this.form.getRawValue());
  }

  getSpecialization() {
    this.state.getSpecialization();
  }
}
