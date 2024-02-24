declare var google: any;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment_user } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router = inject(Router);
  private url = `${environment_user.url}`;

  constructor(private http: HttpClient) {}

  signOut() {
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['/']);
  }

  sendUserData(userData: any): Observable<any> {
    let route = this.url;
    console.log(route);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(this.url, userData, {
      headers: headers,
    });
  }
}
