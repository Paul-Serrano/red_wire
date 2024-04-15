export class Weather {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: { lat: number; lon: number };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: { description: string; icon: string; id: number; main: string }[];
  wind: { deg: number; speed: number };

  constructor(
    base: string,
    clouds: { all: number },
    cod: number,
    coord: { lat: number; lon: number },
    dt: number,
    id: number,
    main: {
      feels_like: number;
      humidity: number;
      pressure: number;
      temp: number;
      temp_max: number;
      temp_min: number;
    },
    name: string,
    sys: {
      country: string;
      id: number;
      sunrise: number;
      sunset: number;
      type: number;
    },
    timezone: number,
    visibility: number,
    weather: { description: string; icon: string; id: number; main: string }[],
    wind: { deg: number; speed: number }
  ) {
    this.base = base;
    this.clouds = clouds;
    this.cod = cod;
    this.coord = coord;
    this.dt = dt;
    this.id = id;
    this.main = main;
    this.name = name;
    this.sys = sys;
    this.timezone = timezone;
    this.visibility = visibility;
    this.weather = weather;
    this.wind = wind;
  }
}
