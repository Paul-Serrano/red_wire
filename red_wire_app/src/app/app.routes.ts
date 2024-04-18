import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/rgpd/rgpd.component').then((a) => a.RgpdComponent),
  },
  {
    path: 'browse',
    loadComponent: () =>
      import('./components/browse/browse.component').then(
        (a) => a.BrowseComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (a) => a.LoginComponent
      ),
  },
  {
    path: 'browse/weather-now',
    loadComponent: () =>
      import('./components/weather-now/weather-now.component').then(
        (a) => a.WeatherNowComponent
      ),
  },
  {
    path: 'browse/weather-history',
    loadComponent: () =>
      import('./components/weather-history/weather-history.component').then(
        (a) => a.WeatherHistoryComponent
      ),
  },
];
