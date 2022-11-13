import { Component } from '@angular/core';
import { SpecializationsState } from '../../services/specializations.state';
import { SpecializationsDataService } from '../../services/specializations.data-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-specializations-create-dialog',
  templateUrl: './specializations-create-dialog.component.html',
  styleUrls: ['./specializations-create-dialog.component.scss'],
})
export class SpecializationsCreateDialogComponent {
  form: FormGroup;

  constructor(
    public state: SpecializationsState,
    public dataService: SpecializationsDataService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SpecializationsCreateDialogComponent>
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  addSpecialization(): void {
    this.dialogRef.close(this.form.value);
  }
}
