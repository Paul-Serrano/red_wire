import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { User } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-weather-now',
  standalone: true,
  imports: [CommonModule, MapComponent, LoaderComponent],
  templateUrl: './weather-now.component.html',
  styleUrl: './weather-now.component.css'
})
export class WeatherNowComponent implements OnInit {

  user!: User;

  constructor(private route: ActivatedRoute, private auth: AuthService) {
    provideHttpClient(withFetch());
   }

  ngOnInit(): void {
    setTimeout(() => {
      const user = sessionStorage.getItem('loggedInUser');
      if (!user) {
        this.auth.signOut();
      } else {
        this.user = JSON.parse(user);
        console.log(this.user);
      }
    }, 2000);
  }
}
