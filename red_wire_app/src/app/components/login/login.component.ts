declare var google: any;
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { DataService } from '../../services/data.service';
import { Weather } from '../../models/weather.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  user!: User;
  weather_now!: Weather;
  weather_history!: Weather[];

  constructor(private auth: AuthService, private dataservice: DataService) {
    provideHttpClient(withFetch());
  }

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id:
        '611241636313-e4mspa3haqippv2eto2m0fj047kcm72r.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp),
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'outline',
      type: 'icon',
      size: 'large',
      shape: 'rectangle',
      width: 300,
      height: 75,
      locale: 'fr-FR',
    });
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleLogin(response: any) {
    if (response) {
      const payload = this.decodeToken(response.credential);

      sessionStorage.setItem('loggedInUser', JSON.stringify(payload));

      this.router.navigate(['browse', 'weather-now']).then(() => {
        // Recharger la page après la navigation
        window.location.reload();
      });
    }
  }
}
