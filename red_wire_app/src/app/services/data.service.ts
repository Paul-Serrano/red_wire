import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, environment_delete, environment_history } from '../../environments/environment';

@Injectable({
  providedIn: 'any',
})
export class DataService {
  private weather_url = `${environment.url}`;
  private history_url = `${environment_history.url}`
  private delete_url = `${environment_delete.url}`

  constructor(private http: HttpClient) {}

  getWeather(): Observable<any> {
    return this.http.get<any>(this.weather_url);
  }

  getLoc(): Observable<any> {
    return this.http.get<any>(this.weather_url);
  }

  getUserHistory(email: string): Observable<any> {
    return this.http.get<any>(this.history_url + `?email=${encodeURIComponent(email)}`);
  }

  deleteData(email: string): Observable<any> {
    console.log(this.delete_url + `?email=${encodeURIComponent(email)}`);
    return this.http.get<any>(this.delete_url + `?email=${encodeURIComponent(email)}`);
  }
}
