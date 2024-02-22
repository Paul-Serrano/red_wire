declare var google: any;
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';
import { AuthServiceService } from '../services/auth-service.service';
import { provideHttpClient, withFetch } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private router = inject(Router);

  constructor(private auth: AuthServiceService) {
    provideHttpClient(withFetch());
  }

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id:
        '611241636313-e4mspa3haqippv2eto2m0fj047kcm72r.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp),
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 350,
    });
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleLogin(response: any) {
    if (response) {
      const payload = this.decodeToken(response.credential);

      sessionStorage.setItem('loggedInUser', JSON.stringify(payload));

      console.log(response.credential);

      this.router.navigate(['browse']);
    }
  }
}
