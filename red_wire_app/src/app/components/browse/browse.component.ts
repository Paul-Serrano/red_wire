import { Component, ElementRef, OnInit } from '@angular/core';
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
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [HttpClientModule, CommonModule, NavComponent, RouterOutlet, WeatherHistoryComponent, WeatherNowComponent, FooterComponent, LoaderComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
})
export class BrowseComponent implements OnInit {
  lat!: number;
  lon!: number;
  user!: User;
  weather_now!: Weather;
  weather_history!: Weather[];
  temp_user!: User;

  constructor(private auth: AuthService, private dataservice: DataService) {
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

    this.getLocData();
    this.getWeatherData();
    this.getWeatherHistory();

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

  getLocData(): void {
    const observer: Observer<any> = {
      next: (data) => {
        this.lat = data.coord.lat;
        this.lon = data.coord.lon;
      },
      error: (error) => {
        console.error('Observer map lon & lat');
      },
      complete: () => {
        // Optionally handle completion if needed
      },
    };

    this.dataservice.getWeather().subscribe(observer);
  }
}
