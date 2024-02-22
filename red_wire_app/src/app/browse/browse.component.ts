import { Component, OnInit, inject } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
})
export class BrowseComponent implements OnInit {
  // auth = inject(AuthServiceService);
  user: any;

  constructor(private auth: AuthServiceService) {
    provideHttpClient(withFetch());
  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('loggedInUser')!);
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
    console.log(this.user);
  }
}
