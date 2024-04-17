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
import { MapComponent } from '../map/map.component';
import { Weather } from '../../models/weather.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [HttpClientModule, MapComponent, CommonModule],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
})
export class BrowseComponent implements OnInit {
  user!: User;
  weather_now!: Weather;

  constructor(private auth: AuthService, private dataservice: DataService) {
    provideHttpClient(withFetch());
  }

  ngOnInit(): void {
    const temp_object: any = {};
    const temp_array: any[] = [];

    const loggedInUser =sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) return this.signOut()
    const temp_user = JSON.parse(loggedInUser);
    
    this.user = new User(
      temp_user.aud,
      temp_user.family_name,
      temp_user.given_name,
      temp_user.email,
      temp_user.locale,
      this.getWeatherData(),
      temp_array,
      temp_object
    );

    // this.getWeatherData();
    this.sendUserDataToBackend(this.user);
    // this.getWeatherHistory();
  }

  signOut() {
    sessionStorage.removeItem('loggedInUser');
    this.auth.signOut();
  }

  sendUserDataToBackend(userData: any): void {
    const observer: Observer<any> = {
      next: (data) => {
        const parsed = JSON.parse(data)
        this.user = parsed;
        sessionStorage.setItem('loggedInUser', data);        
      },
      error: (error) => {
        console.error('Google observer issue : ', error);
      },
      complete: () => {
        // Optionally handle completion if needed
      },
    };
    // Appel à une méthode dans votre service backend pour envoyer les données vers votre backend Python
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

    return this.weather_now
  }

  getWeatherHistory(): Weather[] {
    const observer: Observer<any> = {
      next: (data) => {
        this.user.weather_history = JSON.parse(data);
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
