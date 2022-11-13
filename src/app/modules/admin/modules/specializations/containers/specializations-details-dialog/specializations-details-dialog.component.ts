import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpecializationsState } from '../../services/specializations.state';
import { SpecializationsDataService } from '../../services/specializations.data-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SpecializationsDetailsInterface } from '../../resources/interfaces/specializations-details-interface';

@Component({
  selector: 'app-specializations-details-dialog',
  templateUrl: './specializations-details-dialog.component.html',
  styleUrls: ['./specializations-details-dialog.component.scss'],
})
export class SpecializationsDetailsDialogComponent {
  form: FormGroup;

  constructor(
    public state: SpecializationsState,
    public dataService: SpecializationsDataService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: { specializations: SpecializationsDetailsInterface },
    public dialogRef: MatDialogRef<SpecializationsDetailsDialogComponent>
  ) {
    this.form = this.fb.group({
      name: [data.specializations.name],
    });
  }

  updateList() {
    this.dialogRef.close(this.form.value);
  }
}
