import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthDataService } from '../../services/auth.data-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthState } from '../../services/auth.state';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Role } from '../../resources/enums/role.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  disableLogin = false;

  loginForm: FormGroup = this.builder.group({
    email: ['admin@vet.com', [Validators.required, Validators.email]],
    password: ['Admin1234!'],
  });

  constructor(
    private builder: FormBuilder,
    private authDataService: AuthDataService,
    private snackBar: MatSnackBar,
    private authState: AuthState,
    private router: Router
  ) {}

  login(): void {
    this.disableLogin = true;

    this.authDataService.login(this.loginForm.value).subscribe(
      (response) => {
        this.disableLogin = false;
        this.authState.refreshToken.next(response.refreshToken);
        this.authState.setAccessToken(response.token);

        localStorage.setItem(
          'token',
          JSON.stringify({
            access: response.token,
            refresh: response.refreshToken,
          })
        );

        this.authState.user.pipe(first()).subscribe((user) => {
          if (user) {
            const isAdmin =
              user.role.includes(Role.Admin) || user.role.includes(Role.Doctor);

            this.router.navigate([isAdmin ? 'admin' : 'user']);
          }
        });
      },
      () => {
        this.snackBar.open('Nie udało się zalogować', 'Spróbuj ponownie', {
          duration: 2000,
        });
        this.disableLogin = false;
      }
    );
  }
}
