import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Observer } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private lat: any;
  private lon: any;

  private initMap(): void {
    this.getLocData();
    this.map = L.map('map', {
      center: [this.lat, this.lon],
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

  ngAfterViewInit(): void {
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
