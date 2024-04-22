import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { provideHttpClient, withFetch } from '@angular/common/http';

@Component({
  selector: 'app-weather-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-history.component.html',
  styleUrl: './weather-history.component.css'
})
export class WeatherHistoryComponent implements OnInit {
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
