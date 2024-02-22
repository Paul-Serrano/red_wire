declare var google: any;
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment_user } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  router = inject(Router);
  private url = `${environment_user.url}`;

  constructor(private http: HttpClient) {}

  signOut() {
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['/']);
  }

  sendUserData(userData: object): Observable<any> {
    console.log(userData);
    let route = this.url;
    console.log(route);
    return this.http.post<any>('http://localhost:5000/user-data', userData);
  }
}
