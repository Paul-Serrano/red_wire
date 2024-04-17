import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, environment_history } from '../../environments/environment';

@Injectable({
  providedIn: 'any',
})
export class DataService {
  private url = `${environment.url}`;
  private history_url = `${environment_history.url}`

  constructor(private http: HttpClient) {}

  getWeather(): Observable<any> {;
    return this.http.get<any>(this.url);
  }

  getLoc(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  getUserHistory(email: string): Observable<any> {
    return this.http.get<any>(this.history_url + `?email=${encodeURIComponent(email)}`);
  }
}
