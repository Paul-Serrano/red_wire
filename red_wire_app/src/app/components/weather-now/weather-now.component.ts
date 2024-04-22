import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { User } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { provideHttpClient, withFetch } from '@angular/common/http';

@Component({
  selector: 'app-weather-now',
  standalone: true,
  imports: [CommonModule, MapComponent],
  templateUrl: './weather-now.component.html',
  styleUrl: './weather-now.component.css'
})
export class WeatherNowComponent implements OnInit {
  user!: User;

  constructor(private route: ActivatedRoute, private auth: AuthService) {
    provideHttpClient(withFetch());
   }

  ngOnInit(): void {
    const user = sessionStorage.getItem('loggedInUser');
    if (!user) return this.auth.signOut();
    this.user = JSON.parse(user);
    console.log(this.user);
  }
}
