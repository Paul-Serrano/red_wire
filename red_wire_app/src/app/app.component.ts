import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  weatherData: any; // Propriété pour stocker les données

  constructor(private dataservice: DataService) {}

  ngOnInit(): void {
    this.getWeatherData();
  }

  getWeatherData(): void {
    this.dataservice.getWeather().subscribe(
      (data) => {
        this.weatherData = data; // Affectez les données à la propriété
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
