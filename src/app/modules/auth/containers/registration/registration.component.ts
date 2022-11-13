import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthDataService } from '../../services/auth.data-service';
import { RegistrationPayload } from '../../resources/interfaces/registration.payload';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  firstFormGroup = this.builder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
  });
  secondFormGroup = this.builder.group({
    address: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', Validators.required],
  });
  thirdFormGroup = this.builder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    password2: ['', [Validators.required, this.validatePassword]],
  });
  isLinear = false;
  hide = true;

  constructor(
    private builder: FormBuilder,
    private authDataService: AuthDataService
  ) {}

  showData() {
    const add: RegistrationPayload = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,
    } as RegistrationPayload;
  }

  validatePassword(control: AbstractControl) {
    if (control.parent) {
      if (control.parent.value.password !== control.value) {
        return { passwordMatch: true };
      }
    }
    return null;
  }
}
