import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthState } from '../auth/services/auth.state';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  isMenuExpanded = true;

  menuPets = [
    { routerLink: '/user/pets/list', icon: 'pets', label: 'Zwierzęta' },
    {
      routerLink: '/user/visit/list',
      icon: 'emergency',
      label: 'Wizyty',
    },
  ];

  constructor(private authState: AuthState) {}

  toggleMenu(): void {
    this.isMenuExpanded = !this.isMenuExpanded;
  }

  logout(): void {
    this.authState.logout();
  }
}
