import { provideHttpClient, withFetch } from '@angular/common/http';
import { Component, Input, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  @Input() user !: User;
  activeItem: string = "weatherNow";
  private router = inject(Router);

  constructor(private auth: AuthService) {
    provideHttpClient(withFetch());
  }

  ngOnInit(): void {

  }

  goToWeatherHistory(): void {
    this.activeItem = 'weatherHistory';
    this.router.navigate(['/browse/weather-history'], { state: { "user":  this.user } });
  }

  goToWeatherNow(): void {
    this.activeItem = 'weatherNow';
    this.router.navigate(['/browse/weather-now'], { state: { "user":  this.user } });
  }

  signOut(): void {
    this.auth.signOut();
  }

  getTabClass(tabName: string): string {
    return this.activeItem === tabName ? 'bg-background-secondary' : 'bg-background-tertiary bg-opacity-50';
  }
}
