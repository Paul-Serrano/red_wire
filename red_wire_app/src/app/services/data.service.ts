import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'any',
})
export class DataService {
  private url = `${environment.url}`;

  constructor(private http: HttpClient) {}

  getWeather(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  getLoc(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
