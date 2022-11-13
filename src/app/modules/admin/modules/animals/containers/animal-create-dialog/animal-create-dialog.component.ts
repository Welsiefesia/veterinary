import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimalsState } from '../../services/animals state';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-animal-create-dialog',
  templateUrl: './animal-create-dialog.component.html',
  styleUrls: ['./animal-create-dialog.component.scss'],
})
export class AnimalCreateDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public animalsState: AnimalsState,
    public dialogRef: MatDialogRef<AnimalCreateDialogComponent>
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      weightKg: ['', Validators.required],
      neutered: [false, Validators.required],
      ownerId: ['', Validators.required],
      speciesId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getOwner();
    this.getSpecies();
  }

  addAnimal() {
    this.dialogRef.close(this.form.value);
  }

  private getOwner() {
    this.animalsState.getOwner();
  }

  private getSpecies() {
    this.animalsState.getSpecies();
  }
}
