import { provideHttpClient, withFetch } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  private router = inject(Router);

  constructor(private auth: AuthService) {
    provideHttpClient(withFetch());
  }

  ngOnInit(): void {
    
  }

  goToWeatherHistory(): void {
    this.router.navigate(['browse/weather-history']);
  }

  goToWeatherNow(): void {
    this.router.navigate(['browse/weather-now']);
  }

  signOut(): void {
    this.auth.signOut();
  }
}
