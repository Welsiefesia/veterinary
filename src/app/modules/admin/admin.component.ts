import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthState } from '../auth/services/auth.state';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  isMenuExpanded = true;

  menuPets = [
    { routerLink: '/admin/pets/list', icon: 'pets', label: 'Zwierzęta' },
    {
      routerLink: '/admin/species/list',
      icon: 'type_specimen',
      label: 'Gatunki',
    },
    {
      routerLink: '/admin/specializations/list',
      icon: 'extension',
      label: 'Specjalizacje',
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
