import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthState } from './modules/auth/services/auth.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private authState: AuthState) {}

  ngOnInit(): void {
    this.getToken();
  }

  getToken(): void {
    const key = localStorage.getItem('token');

    if (key) {
      const token = JSON.parse(key);
      this.authState.refreshToken.next(token.refresh);
      this.authState.setAccessToken(token.access);
    }
  }
}
