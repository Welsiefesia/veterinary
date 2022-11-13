import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AnimalsState } from '../../services/animals state';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AnimalDetailsDialogInterface } from '../../resources/interfaces/animal-details-dialog.interface';

@Component({
  selector: 'app-animal-details-dialog',
  templateUrl: './animal-details-dialog.component.html',
  styleUrls: ['./animal-details-dialog.component.scss'],
})
export class AnimalDetailsDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public animalsState: AnimalsState,
    @Inject(MAT_DIALOG_DATA)
    public data: { animal: AnimalDetailsDialogInterface },
    public dialogRef: MatDialogRef<AnimalDetailsDialogComponent>
  ) {
    this.form = this.fb.group({
      name: [data.animal.name],
      gender: [data.animal.gender],
      birthDate: [data.animal.birthDate],
      weightKg: [data.animal.weightKg],
      neutered: [{ value: data.animal.neutered, disabled: true }],
      id: [{ value: data.animal.id, disabled: true }],
      firstName: [{ value: data.animal.owner.firstName, disabled: true }],
      lastName: [{ value: data.animal.owner.lastName, disabled: true }],
      phone: [{ value: data.animal.owner.phone, disabled: true }],
    });
  }

  updateList() {
    this.dialogRef.close(this.form.getRawValue());
  }
}
