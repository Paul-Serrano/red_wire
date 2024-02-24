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

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
})
export class BrowseComponent implements OnInit {
  user!: User;

  constructor(private auth: AuthService, private dataservice: DataService) {
    provideHttpClient(withFetch());
  }

  ngOnInit(): void {
    let temp_object: any = {};
    let temp_array: any[] = [];
    let temp_user = JSON.parse(sessionStorage.getItem('loggedInUser')!);
    this.user = new User(
      temp_user.aud,
      temp_user.family_name,
      temp_user.given_name,
      temp_user.email,
      temp_user.locale,
      temp_object,
      temp_array,
      temp_object
    );
    console.log(this.user);
    this.getWeatherData();
    this.sendUserDataToBackend(this.user);
  }

  signOut() {
    sessionStorage.removeItem('loggedInUser');
    this.auth.signOut();
  }

  sendUserDataToBackend(userData: any) {
    const observer: Observer<any> = {
      next: (data) => {
        this.user = data;
      },
      error: (error) => {
        console.error('Observer issue : ' + error);
      },
      complete: () => {
        // Optionally handle completion if needed
      },
    };
    // Appel à une méthode dans votre service backend pour envoyer les données vers votre backend Python
    this.auth.sendUserData(userData).subscribe(observer);
  }

  getWeatherData(): void {
    const observer: Observer<any> = {
      next: (data) => {
        console.log(data);
        this.user.weather_now = data;
      },
      error: (error) => {
        console.error('Observer issue');
      },
      complete: () => {
        // Optionally handle completion if needed
      },
    };

    console.log(this.user.weather_now);

    this.dataservice.getWeather().subscribe(observer);
  }
}
