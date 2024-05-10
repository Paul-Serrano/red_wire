import { Component, AfterViewInit, OnInit, Input } from '@angular/core';
import * as L from 'leaflet';
import { Observer } from 'rxjs';
import { DataService } from '../../services/data.service';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LoaderComponent, CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @Input() user!: User;
  public map: any;
  public lat: any;
  public lon: any;

  public initMap(): void {
    this.getLocData();
    this.map = L.map('map', {
      center: [this.user.weather_now.coord.lat, this.user.weather_now.coord.lon],
      zoom: 15,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
  }

  constructor(private dataservice: DataService) {}

  ngOnInit(): void {
    this.initMap();
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
