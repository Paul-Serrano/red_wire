import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { CommonModule } from '@angular/common';
import { Observer } from 'rxjs';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title: any;
  weatherData: any; // Propriété pour stocker les données

  constructor(private dataservice: DataService) {
    provideHttpClient(withFetch());
  }

  ngOnInit(): void {
    this.getWeatherData();
  }

  getWeatherData(): void {
    const observer: Observer<any> = {
      next: (data) => {
        this.weatherData = data;
      },
      error: (error) => {
        console.error('Observer issue');
      },
      complete: () => {
        // Optionally handle completion if needed
      },
    };

    this.dataservice.getWeather().subscribe(observer);
  }
}
