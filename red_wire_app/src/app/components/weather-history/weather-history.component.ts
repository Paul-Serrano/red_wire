import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { DataService } from '../../services/data.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-weather-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-history.component.html',
  styleUrl: './weather-history.component.css'
})
export class WeatherHistoryComponent implements OnInit {
  user!: User;

  constructor(private auth: AuthService, private dataservice: DataService) {
    provideHttpClient(withFetch());
   }

  ngOnInit(): void {
    const user = sessionStorage.getItem('loggedInUser');
    if (!user) return this.auth.signOut();
    this.user = JSON.parse(user);
    console.log(this.user);
  }

  deleteData(): void {
    const observer: Observer<any> = {
      next: (data) => {        

      },
      error: (error) => {
        console.error('Observer issue');
      },
      complete: () => {
        // Optionally handle completion if needed
      },
    };

    this.dataservice.deleteData(this.user.email).subscribe(observer);
    setTimeout(() => {
      this.auth.signOut();
    }, 1000);
  }
}
