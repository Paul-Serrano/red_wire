import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { Observer } from 'rxjs';
import { User } from '../../models/user.model';
import { DataService } from '../../services/data.service';
import { Weather } from '../../models/weather.model';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { Router, RouterOutlet } from '@angular/router';
import { WeatherHistoryComponent } from '../weather-history/weather-history.component';
import { WeatherNowComponent } from '../weather-now/weather-now.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [HttpClientModule, CommonModule, NavComponent, RouterOutlet, WeatherHistoryComponent, WeatherNowComponent, FooterComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
})
export class BrowseComponent implements OnInit {
  user!: User;
  weather_now!: Weather;
  weather_history!: Weather[];
  temp_user!: User;

  constructor(private auth: AuthService, private dataservice: DataService, private router: Router) {
    provideHttpClient(withFetch());
  }

  ngOnInit(): void {
    const temp_object: any = {};
    const temp_array: any[] = [];

    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) return this.auth.signOut();
    const temp_user = JSON.parse(loggedInUser);

    this.user = new User(
      temp_user.aud,
      temp_user.family_name,
      temp_user.given_name,
      temp_user.email,
      temp_object,
      temp_array,
    );

    console.log(temp_user.email);

    this.getWeatherData();
    this.sendUserDataToBackend(this.user);
    this.getWeatherHistory();

  }

  sendUserDataToBackend(userData: any): void {
    const observer: Observer<any> = {
      next: (data) => {
        const parsed = JSON.parse(data)
        this.user = parsed;
       
      },
      error: (error) => {
        console.error('Google observer issue : ', error);
      },
      complete: () => {
        // Optionally handle completion if needed
      },
    };
    this.auth.sendUserData(userData).subscribe(observer);
  }

  getWeatherData(): Weather {
    const observer: Observer<any> = {
      next: (data) => {        
        this.weather_now = data;
      },
      error: (error) => {
        console.error('Observer issue');
      },
      complete: () => {
        // Optionally handle completion if needed
      },
    };

    this.dataservice.getWeather().subscribe(observer);

    return this.weather_now;
  }

  getWeatherHistory(): Weather[] {
    const observer: Observer<any> = {
      next: (data) => {
        const user_data = JSON.parse(data);
        sessionStorage.setItem('loggedInUser', JSON.stringify(user_data));
      },
      error: (error) => {
        console.error('Observer History issue');
      },
      complete: () => {
        // Optionally handle completion if needed
      },
    };

    this.dataservice.getUserHistory(this.user.email).subscribe(observer);

    return this.user.weather_history;
  }
}
