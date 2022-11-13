import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpeciesState } from '../../services/species.state';
import { MatDialogRef } from '@angular/material/dialog';
import { SpeciesDataService } from '../../services/species.data-service';

@Component({
  selector: 'app-species-create-dialog',
  templateUrl: './species-create-dialog.component.html',
  styleUrls: ['./species-create-dialog.component.scss'],
})
export class SpeciesCreateDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SpeciesCreateDialogComponent>,
    public speciesState: SpeciesState,
    public dataService: SpeciesDataService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      specializationId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getSpecialization();
  }

  addSpecies() {
    this.dialogRef.close(this.form.value);
  }

  getSpecialization() {
    this.speciesState.getSpecialization();
  }
}
